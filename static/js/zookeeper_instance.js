$(function(){
	$("#create_zookeeper_instance_btn").click(function(){
		$("#zookeeper_instance_table_div").hide();
		$("#create_zookeeper_instance_div").show();
		select2Object = $("#zookeeper_instance_template_select").select2();
		get_zookeeper_host_for_create_instance("zookeeper");
	});
	
	$("#save_zookeeper_instance_btn").click(function(){
		save_zookeeper_instance();
	});
	
	$("#create_zookeeper_instance_back_btn").click(function(){
		reload_zookeeper_instance_html();
	});
	
	$("#search_zookeeper_instance_btn").click(function(){
		get_zookeeper_instance();
	});
	
	get_zookeeper_instance();
	
})

//获取一页zookeeper实例
function get_zookeeper_instance(){
	var env=$("#zookeeper_instance_env_select option:selected").attr("value");
	var count = $("#one_page_count_select option:selected").val();
	var ip = document.getElementById("search_zookeeper_instance_ip").value;
	var data = {"currentPage":1,"count":count,"ip":ip,"env":env};
	$.ajax({
		type: "POST",
		url: "/api/getOnePageZookeeperInstance",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function(response){
			var pages = response.pages;
			var instances = response.pageList;
			
			if(pages == 0){
				$.jqPaginator("#pagination", {
					totalPages: 1,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						if(type == "change"){
							get_pages_zookeeper_instance_change(num,count,env,ip);
						}
					}
				});
				$("#zookeeper_instance_table_tbody").empty();
			}else{
				$.jqPaginator("#pagination", {
					totalPages: pages,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						if(type == "change"){
							get_pages_zookeeper_instance_change(num,count,env,ip);
						}
					}
				});
				
				$("#zookeeper_instance_table_tbody").empty();
				for(i=0;i<instances.length;i++){
					create_zookeeper_instance_table_line(instances[i]);
				}
			}
			
			autoRowSpan(DataTables_Table_0,0,0);
			
		}
	});
}

function get_pages_zookeeper_instance_change(num,count,env,ip){
	var data = {"currentPage":num,"count":count,"ip":ip,"env":env};
	
	$.ajax({
		type: "POST",
		url: "/api/getOnePageZookeeperInstance",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function(response){
		
			var pages = response.pages;
			var instances = response.pageList;
			
			$.jqPaginator("#pagination", {
				totalPages: pages,
				visiblePages: 10,
				currentPage: num,
				onPageChange: function(num, type) {
					// $("#p1").text(type + "：" + num)
					if(type == "change"){
						get_pages_zookeeper_instance_change(num,count,env,ip);
					}
				}
			});
			
			$("#zookeeper_instance_table_tbody").empty();
			for(i=0;i<instances.length;i++){
				create_zookeeper_instance_table_line(instances[i]);
			}
			
			autoRowSpan(DataTables_Table_0,0,0);
		}
	});
}
//生成表格记录
function create_zookeeper_instance_table_line(instance){
	var tbody = document.getElementById("zookeeper_instance_table_tbody");
	
	var tr = document.createElement("tr");
	
	var td = document.createElement("td");
	td.textContent = instance.ip;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = instance.name;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = instance.port;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = instance.dir;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = instance.env;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = instance.check_port;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = instance.data_port;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = instance.cluster;
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
			delete_zookeeper_instance(instance.id,instance.ip);
		});
	});
	td.appendChild(delete_btn);
	tr.appendChild(td);
	
	tbody.appendChild(tr);
}
//删除zookeeper实例
function delete_zookeeper_instance(id,ip){
	$.ajax({
		type: "POST",
		url: "/api/deleteZookeeperInstance",
		data: JSON.stringify({"id":id,"ip":ip}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			if(response == "success"){
				get_zookeeper_instance();
			}else{
				$.MsgBox.Alert("消息",response);
			}
		}
	});
}
//保存zookeeper实例
function save_zookeeper_instance(){
	var env = $("#create_zookeeper_instance_env_select option:selected").attr("value"); 
	var name = "";
	var ip = "";
	var port = "";
	var dir = "";
	var check_port = "";
	var data_port = "";
	$("#zookeeper_instance_template_select_div .select2-selection__choice").each(function(){
		name = $(this).attr("title");
		$("#zookeeper_instance_host_select_div .select2-selection__choice").each(function(){
			var id = (new Date()).valueOf().toString();
			ip = $(this).attr("title").split(" ",1)[0];
			if(name === "zookeeper1"){
				port = 2181;
				dir = "/user/local/zookeeper1";
				check_port = 12888;
				data_port = 13888;
			}
			if(name === "zookeeper2"){
				port = 2182;
				dir = "/user/local/zookeeper2";
				check_port = 22888;
				data_port = 23888;
			}
			if(name === "zookeeper3"){
				port = 2183;
				dir = "/user/local/zookeeper3";
				check_port = 32888;
				data_port = 33888;
			}
			if(name === "zookeeper4"){
				port = 2184;
				dir = "/user/local/zookeeper4";
				check_port = 42888;
				data_port = 43888;
			}
			
			var data = {"id":id,"ip":ip,"port":port,"name":name,"dir":dir,"env":env,"allocated":false,"check_port":check_port,"data_port":data_port};
			$.ajax({
				type: "POST",
				url: "/api/saveZookeeperInstance",
				data: JSON.stringify(data),
				contentType: "application/json",
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
				},
				async: false,
				success: function(response){
					if(response == "success"){
						$.MsgBox.Alert("消息", "添加成功！");
					}else{
						// $.MsgBox.Alert("消息", response);
					}
				}
			});
			
		});
	});
}

function reload_zookeeper_instance_html() {
	$("#index_main_content").load("zookeeper_instance.html",function(){
		var script = document.createElement("script");
		script.setAttribute("src","js/zookeeper_instance.js");
		document.body.appendChild(script);
	});
}

//获取要创建实例的主机
function get_zookeeper_host_for_create_instance(hostGroup){
	var hosts = [];
	var hostGroup = hostGroup;
	var envType = $("#create_zookeeper_instance_env_select option:selected").attr("value"); 
	
	$.ajax({
		type: "POST",
		url: "/api/getHostForCreateInstance",
		data: JSON.stringify({"hostGroup":hostGroup,"envType":envType}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(response){
			hosts = response;
		}
	});
	
	var select = document.getElementById("zookeeper_instance_host_select");
	$(select).empty();
	for(i=0;i<hosts.length;i++){
		var host = hosts[i];
		var option = document.createElement("option");
		$(option).text(host.ip + " " + host.ins_num);
		$(option).attr("id",host.ip);
		select.appendChild(option);
	}
	select2Object = $("#zookeeper_instance_host_select").select2();
}