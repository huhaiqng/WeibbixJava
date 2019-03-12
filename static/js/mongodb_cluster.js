$(function(){
	$("#create_mongodb_cluster_btn").click(function(){
		$("#mongodb_cluster_table_div").hide();
		$("#create_mongodb_cluster_div").show();
		create_mongodb_instance_option();
		$("#mongodb_instance_select").select2();
	});
	
	//取消创建mongodb集群
	$("#console_create_mongodb_cluster_btn").click(function(){
		reload_mongodb_cluster_html();
	});
	//保存集群
	$("#save_mongodb_instance_cluster").click(function(){
		save_mongodb_cluster();
	});
	
	$("#search_mongodb_cluster_btn").click(function(){
		create_mongodb_cluster_table();
	});
	
	create_mongodb_cluster_table();
});
//获取mongodb集群
function create_mongodb_cluster_table(){
	var env=$("#mongodb_cluster_env_select option:selected").attr("value");
	var count = $("#one_page_count_select option:selected").val();
	var name = document.getElementById("search_mongodb_cluster_name").value;
	var data = {"currentPage":1,"count":count,"name":name,"env":env};
	$.ajax({
		type: "POST",
		url: "/api/getMongodbCluster",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function(response){
			var pages = response.pages;
			var clusters = response.pageList;
			
			if(pages == 0){
				$.jqPaginator("#pagination", {
					totalPages: 1,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						if(type == "change"){
							get_pages_mongodb_cluster_change(num,count,env,name);
						}
					}
				});
				$("#mongodb_cluster_table_tbody").empty();
			}else{
				$.jqPaginator("#pagination", {
					totalPages: pages,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						if(type == "change"){
							get_pages_mongodb_cluster_change(num,count,env,name);
						}
					}
				});
				
				$("#mongodb_cluster_table_tbody").empty();
				for(i=0;i<clusters.length;i++){
					var clusterId = clusters[i].id;
					var clusterName = clusters[i].name;
					var instances = get_mongodb_instances_by_clusterId(clusterId);
					for(j=0;j<instances.length;j++){
						create_mongodb_cluster_table_line(clusterId,clusterName,instances[j]);
					}
				}
			}
			
			autoRowSpan(DataTables_Table_0,0,0);
		}
	});
	
}
//页面更改触发
function get_pages_mongodb_cluster_change(num,count,env,name){
	var data = {"currentPage":num,"count":count,"name":name,"env":env};
	$.ajax({
		type: "POST",
		url: "/api/getMongodbCluster",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function(response){
			var pages = response.pages;
			var clusters = response.pageList;
			
			$.jqPaginator("#pagination", {
				totalPages: pages,
				visiblePages: 10,
				currentPage: num,
				onPageChange: function(num, type) {
					if(type == "change"){
						get_pages_mongodb_cluster_change(num,count,env,name);
					}
				}
			});
			
			$("#mongodb_cluster_table_tbody").empty();
			for(i=0;i<clusters.length;i++){
				var clusterId = clusters[i].id;
				var clusterName = clusters[i].name;
				var instances = get_mongodb_instances_by_clusterId(clusterId);
				for(j=0;j<instances.length;j++){
					create_mongodb_cluster_table_line(clusterId,clusterName,instances[j]);
				}
			}
			
			autoRowSpan(DataTables_Table_0,0,0);
		}
	});
	
}
//创建mongodb集群表格记录
function create_mongodb_cluster_table_line(clusterId,name,instance){
	var tbody = document.getElementById("mongodb_cluster_table_tbody");
	
	var tr = document.createElement("tr");
	
	var td = document.createElement("td");
	td.textContent = name;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = instance.name;
	tr.appendChild(td);
		
	var td = document.createElement("td");
	td.textContent = instance.ip;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = instance.port;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = instance.env;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = instance.project;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	$(td).attr("align","center");
	var recreate_btn = document.createElement("a");
	recreate_btn.className = "label label-success";
	recreate_btn.innerText = "重建";
	$(recreate_btn).click(function(){
		host_info(host);
	});
	td.appendChild(recreate_btn);
	var blank = document.createElement("span");
	blank.innerHTML = "&nbsp;";
	td.appendChild(blank);
	
	var delete_btn = document.createElement("a");
	delete_btn.innerText = "删除";
	delete_btn.className = "label label-danger";
	$(delete_btn).click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{ 
			delete_mongodb_cluster_instance(instance.id,clusterId);
		});
	});
	td.appendChild(delete_btn);
	tr.appendChild(td);
	
	tbody.appendChild(tr);
}
//删除集群实例
function delete_mongodb_cluster_instance(instanceId,clusterId){
	$.ajax({
		type: "POST",
		url: "/api/deleteMongodbClusterInstance",
		data: JSON.stringify({"instanceId":instanceId,"clusterId":clusterId}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(){
			$("#mongodb_cluster_table_tbody").empty();
			create_mongodb_cluster_table();
		}
	});
}
//通过集群id获取该集群所有的实例
function get_mongodb_instances_by_clusterId(clusterId){
	var instanceIds =[];
	$.ajax({
		type: "POST",
		url: "/api/getMongodbInstancesByClusterId",
		data: JSON.stringify({"clusterId":clusterId}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(response){
			instanceIds = response;
		}
	});
	return instanceIds;
}
//重新加载mongodb集群页面
function reload_mongodb_cluster_html(){
	$("#index_main_content").load("mongodb_cluster.html",function(){
		var script = document.createElement("script");
		script.setAttribute("src","js/mongodb_cluster.js");
		document.body.appendChild(script);
	});
}
//获取mongodb实例供选择
function create_mongodb_instance_option(){
	var env = $("#env_select option:selected").attr("value"); 
	$.ajax({
		type: "POST",
		url: "/api/getNotAllocatedMongodbInstance",
		data: JSON.stringify({"env":env}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			var select = document.getElementById("mongodb_instance_select");
			$(select).empty();
			for(i=0;i<response.length;i++){
				var instance = response[i];
				var option = document.createElement("option");
				$(option).text(instance.ip+"-"+instance.name);
				$(option).attr("id",instance.ip+"-"+instance.name);
				$(option).attr("value",instance.id);
				select.appendChild(option);
			}
		}
	});	
}
//保存mongodb集群
function save_mongodb_cluster(){
	var id = (new Date()).valueOf();
	var name = $("#mongodb_cluster_name").val();
	var env = $("#env_select option:selected").attr("value");
	var createdAt = new Date();
	
	data = {"id":id,"name":name,"env":env,"createdAt":createdAt};
	$.ajax({
		type: "POST",
		url: "/api/addMongodbCluster",
		data: JSON.stringify(data),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(){
			save_mongodb_cluster_instance(id,name);
			reload_mongodb_cluster_html();
		}
	});	
}
//保存集群实例关系
function save_mongodb_cluster_instance(clusterId,name){
	$(".select2-selection__choice").each(function(){
		var id = (new Date()).valueOf();
		var option = document.getElementById($(this).attr("title"));
		var instanceId = $(option).attr("value");
		data = {"id":id.toString(),"instanceId":instanceId,"clusterId":clusterId.toString(),"name":name},
		$.ajax({
			type: "POST",
			url: "/api/addMongodbInstanceCluster",
			data: JSON.stringify(data),
			contentType: "application/json",
			async: false,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
			},
			success: function(){
				
			}
		});	
	})
}