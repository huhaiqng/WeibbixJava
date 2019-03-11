$(function(){
	$("#create_rabbitmq_instance_btn").click(function(){
		$("#rabbitmq_instance_table_div").hide();
		$("#create_rabbitmq_instance_div").show();
		select2Object = $("#rabbitmq_instance_template_select").select2();
		get_rabbitmq_host_for_create_instance("rabbitmq");
	});
	
	$("#save_rabbitmq_instance_btn").click(function(){
		save_rabbitmq_instance();
	});
	
	$("#create_rabbitmq_instance_back_btn").click(function(){
		reload_rabbitmq_instance_html();
	});
	
	$("#search_rabbitmq_instance_btn").click(function(){
		get_rabbitmq_instance();
	});
	
	get_rabbitmq_instance();
	
})

//获取一页rabbitmq实例
function get_rabbitmq_instance(){
	var env=$("#rabbitmq_instance_env_select option:selected").attr("value");
	var count = $("#one_page_count_select option:selected").val();
	var ip = document.getElementById("search_rabbitmq_instance_ip").value;
	var data = {"currentPage":1,"count":count,"ip":ip,"env":env};
	$.ajax({
		type: "POST",
		url: "/api/getOnePageRabbitmqInstance",
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
							get_pages_rabbitmq_instance_change(num,count,env,ip);
						}
					}
				});
				$("#rabbitmq_instance_table_tbody").empty();
			}else{
				$.jqPaginator("#pagination", {
					totalPages: pages,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						if(type == "change"){
							get_pages_rabbitmq_instance_change(num,count,env,ip);
						}
					}
				});
				
				$("#rabbitmq_instance_table_tbody").empty();
				for(i=0;i<instances.length;i++){
					create_rabbitmq_instance_table_line(instances[i]);
				}
			}
			
			autoRowSpan(DataTables_Table_0,0,0);
			
		}
	});
}

function get_pages_rabbitmq_instance_change(num,count,env,ip){
	var data = {"currentPage":num,"count":count,"ip":ip,"env":env};
	
	$.ajax({
		type: "POST",
		url: "/api/getOnePageRabbitmqInstance",
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
						get_pages_rabbitmq_instance_change(num,count,env,ip);
					}
				}
			});
			
			$("#rabbitmq_instance_table_tbody").empty();
			for(i=0;i<instances.length;i++){
				create_rabbitmq_instance_table_line(instances[i]);
			}
			
			autoRowSpan(DataTables_Table_0,0,0);
		}
	});
}
//生成表格记录
function create_rabbitmq_instance_table_line(instance){
	var tbody = document.getElementById("rabbitmq_instance_table_tbody");
	
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
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？", function ()
		{ 
			delete_rabbitmq_instance(instance.id,instance.ip);
		});
	});
	td.appendChild(delete_btn);
	tr.appendChild(td);
	
	tbody.appendChild(tr);
}
//删除rabbitmq实例
function delete_rabbitmq_instance(id,ip){
	$.ajax({
		type: "POST",
		url: "/api/deleteRabbitmqInstance",
		data: JSON.stringify({"id":id,"ip":ip}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			if(response == "success"){
				get_rabbitmq_instance();
			}else{
				// $.MsgBox.Alert("消息",response);
			}
		}
	});
}
//保存rabbitmq实例
function save_rabbitmq_instance(){
	var env = $("#create_rabbitmq_instance_env_select option:selected").attr("value"); 
	var name = "";
	var ip = "";
	var port = "";
	var dir = "";
	$("#rabbitmq_instance_template_select_div .select2-selection__choice").each(function(){
		name = $(this).attr("title");
		$("#rabbitmq_instance_host_select_div .select2-selection__choice").each(function(){
			var id = (new Date()).valueOf().toString();
			ip = $(this).attr("title").split(" ",1)[0];
			if(name === "rabbitmq1"){
				port = 4369;
				dir = "/user/local/rabbitmq1";
			}
			if(name === "rabbitmq2"){
				port = 4370;
				dir = "/user/local/rabbitmq2";
			}
			if(name === "rabbitmq3"){
				port = 4371;
				dir = "/user/local/rabbitmq3";
			}
			if(name === "rabbitmq4"){
				port = 4372;
				dir = "/user/local/rabbitmq4";
			}
			
			var data = {"id":id,"ip":ip,"port":port,"name":name,"dir":dir,"env":env,"allocated":false};
			$.ajax({
				type: "POST",
				url: "/api/saveRabbitmqInstance",
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
						$.MsgBox.Alert("消息", response);
					}
				}
			});
			
		});
	});
}

function reload_rabbitmq_instance_html() {
	$("#index_main_content").load("rabbitmq_instance.html",function(){
		var script = document.createElement("script");
		script.setAttribute("src","js/rabbitmq_instance.js");
		document.body.appendChild(script);
	});
}

//获取要创建实例的主机
function get_rabbitmq_host_for_create_instance(hostGroup){
	var hosts = [];
	var hostGroup = hostGroup;
	var envType = $("#create_rabbitmq_instance_env_select option:selected").attr("value"); 
	
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
	
	var select = document.getElementById("rabbitmq_instance_host_select");
	$(select).empty();
	for(i=0;i<hosts.length;i++){
		var host = hosts[i];
		var option = document.createElement("option");
		$(option).text(host.ip + " " + host.ins_num);
		$(option).attr("id",host.ip);
		select.appendChild(option);
	}
	select2Object = $("#rabbitmq_instance_host_select").select2();
}