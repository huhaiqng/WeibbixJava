$(function(){
	$("#create_tomcat_cluster_btn").click(function(){
		$("#tomcat_cluster_table_div").hide();
		$("#create_tomcat_cluster_div").show();
		create_tomcat_instance_option();
		$("#tomcat_instance_select").select2();
	});
	
	//取消创建tomcat集群
	$("#console_create_tomcat_cluster_btn").click(function(){
		reload_tomcat_cluster_html();
	});
	//保存集群
	$("#save_tomcat_instance_cluster").click(function(){
		save_tomcat_cluster();
	});
	
	$("#search_tomcat_cluster_btn").click(function(){
		create_tomcat_cluster_table();
	});
	
	create_tomcat_cluster_table();
});
//获取tomcat集群
function create_tomcat_cluster_table(){
	var env=$("#tomcat_cluster_env_select option:selected").attr("value");
	var count = $("#one_page_count_select option:selected").val();
	var name = document.getElementById("search_tomcat_cluster_name").value;
	var data = {"currentPage":1,"count":count,"name":name,"env":env};
	$.ajax({
		type: "POST",
		url: "/api/getTomcatCluster",
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
							get_pages_tomcat_cluster_change(num,count,env,name);
						}
					}
				});
				$("#tomcat_cluster_table_tbody").empty();
			}else{
				$.jqPaginator("#pagination", {
					totalPages: pages,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						if(type == "change"){
							get_pages_tomcat_cluster_change(num,count,env,name);
						}
					}
				});
				
				$("#tomcat_cluster_table_tbody").empty();
				for(i=0;i<clusters.length;i++){
					var clusterId = clusters[i].id;
					var clusterName = clusters[i].name;
					var instances = get_tomcat_instances_by_clusterId(clusterId);
					for(j=0;j<instances.length;j++){
						create_tomcat_cluster_table_line(clusterId,clusterName,instances[j]);
					}
				}
			}
			
			autoRowSpan(DataTables_Table_0,0,0);
		}
	});
	
}
//页面更改触发
function get_pages_tomcat_cluster_change(num,count,env,name){
	var data = {"currentPage":num,"count":count,"name":name,"env":env};
	$.ajax({
		type: "POST",
		url: "/api/getTomcatCluster",
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
						get_pages_tomcat_cluster_change(num,count,env,name);
					}
				}
			});
			
			$("#tomcat_cluster_table_tbody").empty();
			for(i=0;i<clusters.length;i++){
				var clusterId = clusters[i].id;
				var clusterName = clusters[i].name;
				var instances = get_tomcat_instances_by_clusterId(clusterId);
				for(j=0;j<instances.length;j++){
					create_tomcat_cluster_table_line(clusterId,clusterName,instances[j]);
				}
			}
			
			autoRowSpan(DataTables_Table_0,0,0);
		}
	});
	
}
//创建tomcat集群表格记录
function create_tomcat_cluster_table_line(clusterId,name,instance){
	var tbody = document.getElementById("tomcat_cluster_table_tbody");
	
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
			delete_tomcat_cluster_instance(instance.id,clusterId);
		});
	});
	td.appendChild(delete_btn);
	tr.appendChild(td);
	
	tbody.appendChild(tr);
}
//删除集群实例
function delete_tomcat_cluster_instance(instanceId,clusterId){
	$.ajax({
		type: "POST",
		url: "/api/deleteTomcatClusterInstance",
		data: JSON.stringify({"instanceId":instanceId,"clusterId":clusterId}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(){
			$("#tomcat_cluster_table_tbody").empty();
			create_tomcat_cluster_table();
		}
	});
}
//通过集群id获取该集群说有的实例
function get_tomcat_instances_by_clusterId(clusterId){
	var instanceIds =[];
	$.ajax({
		type: "POST",
		url: "/api/getTomcatInstancesByClusterId",
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
//重新加载tomcat集群页面
function reload_tomcat_cluster_html(){
	$("#index_main_content").load("tomcat_cluster.html",function(){
		var script = document.createElement("script");
		script.setAttribute("src","js/tomcat_cluster.js");
		document.body.appendChild(script);
	});
}
//获取tomcat实例供选择
function create_tomcat_instance_option(){
	var env = $("#env_select option:selected").attr("value"); 
	$.ajax({
		type: "POST",
		url: "/api/getNotAllocatedTomcatInstance",
		data: JSON.stringify({"env":env}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			var select = document.getElementById("tomcat_instance_select");
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
//保存tomcat集群
function save_tomcat_cluster(){
	var id = (new Date()).valueOf();
	var name = $("#tomcat_cluster_name").val();
	var env = $("#env_select option:selected").attr("value");
	var createAt = new Date();
	
	data = {"id":id,"name":name,"env":env,"createAt":createAt};
	$.ajax({
		type: "POST",
		url: "/api/addTomcatCluster",
		data: JSON.stringify(data),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(){
			save_tomcat_cluster_instance(id,name);
			reload_tomcat_cluster_html();
		}
	});	
}
//保存集群实例关系
function save_tomcat_cluster_instance(clusterId,name){
	$(".select2-selection__choice").each(function(){
		var id = (new Date()).valueOf();
		var option = document.getElementById($(this).attr("title"));
		var instanceId = $(option).attr("value");
		data = {"id":id.toString(),"instanceId":instanceId,"clusterId":clusterId.toString(),"name":name},
		$.ajax({
			type: "POST",
			url: "/api/addInstanceCluster",
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