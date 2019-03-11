$(function(){
	$("#create_redis_instance_btn").click(function(){
		$("#redis_instance_table_div").hide();
		$("#create_redis_instance_div").show();
		select2Object = $("#redis_instance_template_select").select2();
		get_redis_host_for_create_instance("redis");
	});
	
	$("#save_redis_instance_btn").click(function(){
		save_redis_instance();
	});
	
	$("#create_redis_instance_back_btn").click(function(){
		reload_redis_instance_html();
	});
	
	$("#search_redis_instance_btn").click(function(){
		get_redis_instance();
	});
	
	get_redis_instance();
	
})

//获取一页redis实例
function get_redis_instance(){
	var env=$("#redis_instance_env_select option:selected").attr("value");
	var count = $("#one_page_count_select option:selected").val();
	var ip = document.getElementById("search_redis_instance_ip").value;
	var data = {"currentPage":1,"count":count,"ip":ip,"env":env};
	$.ajax({
		type: "POST",
		url: "/api/getOnePageRedisInstance",
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
							get_pages_redis_instance_change(num,count,env,ip);
						}
					}
				});
				$("#redis_instance_table_tbody").empty();
			}else{
				$.jqPaginator("#pagination", {
					totalPages: pages,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						if(type == "change"){
							get_pages_redis_instance_change(num,count,env,ip);
						}
					}
				});
				
				$("#redis_instance_table_tbody").empty();
				for(i=0;i<instances.length;i++){
					create_redis_instance_table_line(instances[i]);
				}
			}
			
			autoRowSpan(DataTables_Table_0,0,0);
			
		}
	});
}

function get_pages_redis_instance_change(num,count,env,ip){
	var data = {"currentPage":num,"count":count,"ip":ip,"env":env};
	
	$.ajax({
		type: "POST",
		url: "/api/getOnePageRedisInstance",
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
						get_pages_redis_instance_change(num,count,env,ip);
					}
				}
			});
			
			$("#redis_instance_table_tbody").empty();
			for(i=0;i<instances.length;i++){
				create_redis_instance_table_line(instances[i]);
			}
			
			autoRowSpan(DataTables_Table_0,0,0);
		}
	});
}
//生成表格记录
function create_redis_instance_table_line(instance){
	var tbody = document.getElementById("redis_instance_table_tbody");
	
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
	td.textContent = instance.sen_port;
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
			delete_redis_instance(instance.id,instance.ip);
		});
	});
	td.appendChild(delete_btn);
	tr.appendChild(td);
	
	tbody.appendChild(tr);
}
//删除redis实例
function delete_redis_instance(id,ip){
	$.ajax({
		type: "POST",
		url: "/api/deleteRedisInstance",
		data: JSON.stringify({"id":id,"ip":ip}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			if(response == "success"){
				get_redis_instance();
			}else{
				// $.MsgBox.Alert("消息",response);
			}
		}
	});
}
//保存redis实例
function save_redis_instance(){
	var env = $("#create_redis_instance_env_select option:selected").attr("value"); 
	var name = "";
	var ip = "";
	var port = "";
	var dir = "";
	$("#redis_instance_template_select_div .select2-selection__choice").each(function(){
		name = $(this).attr("title");
		$("#redis_instance_host_select_div .select2-selection__choice").each(function(){
			var id = (new Date()).valueOf().toString();
			ip = $(this).attr("title").split(" ",1)[0];
			if(name === "redis1"){
				port = 6379;
				sen_port = 26379;
				dir = "/user/local/redis1";
			}
			if(name === "redis2"){
				port = 6380;
				sen_port = 26380;
				dir = "/user/local/redis2";
			}
			if(name === "redis3"){
				port = 6381;
				sen_port = 26381;
				dir = "/user/local/redis3";
			}
			if(name === "redis4"){
				port = 6382;
				sen_port = 26382;
				dir = "/user/local/redis4";
			}
			
			var data = {"id":id,"ip":ip,"port":port,"sen_port":sen_port,"name":name,"dir":dir,"env":env,"allocated":false};
			$.ajax({
				type: "POST",
				url: "/api/saveRedisInstance",
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

function reload_redis_instance_html() {
	$("#index_main_content").load("redis_instance.html",function(){
		var script = document.createElement("script");
		script.setAttribute("src","js/redis_instance.js");
		document.body.appendChild(script);
	});
}

//获取要创建实例的主机
function get_redis_host_for_create_instance(hostGroup){
	var hosts = [];
	var hostGroup = hostGroup;
	var envType = $("#create_redis_instance_env_select option:selected").attr("value"); 
	
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
	
	var select = document.getElementById("redis_instance_host_select");
	$(select).empty();
	for(i=0;i<hosts.length;i++){
		var host = hosts[i];
		var option = document.createElement("option");
		$(option).text(host.ip + " " + host.ins_num);
		$(option).attr("id",host.ip);
		select.appendChild(option);
	}
	select2Object = $("#redis_instance_host_select").select2();
}