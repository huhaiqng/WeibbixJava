$(function(){
	$("#create_tomcat_instance_btn").click(function(){
		$("#tomcat_instance_table_div").hide();
		$("#create_tomcat_instance_div").show();
		select2Object = $("#tomcat_instance_template_select").select2();
		
		//获取主机
		get_host_for_create_instance("tomcat");
		
	});
	
	$("#save_create_tomcat_instance_btn").click(function(){
		save_create_tomcat_instance();
	});
	
	$("#create_tomcat_instance_back_btn").click(function(){
		reload_index_main_content();
	});
	
	$("#search_tomcat_instance_btn").click(function(){
		get_tomcat_instance();
	});
	
	get_tomcat_instance();
	
})

//获取所有tomcat实例主机
function get_tomcat_instance(){
	var env=$("#tomcat_instance_env_select option:selected").attr("value");
	var count = $("#one_page_count_select option:selected").val();
	var ip = document.getElementById("search_tomcat_instance_ip").value;
	var data = {"currentPage":1,"count":count,"ip":ip,"env":env};
	$.ajax({
		type: "POST",
		url: "/api/getOnePageTomcatInstance",
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
							get_pages_tomcat_instance_change(num,count,env,ip);
						}
					}
				});
				$("#tomcat_instance_table_tbody").empty();
			}else{
				$.jqPaginator("#pagination", {
					totalPages: pages,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						if(type == "change"){
							get_pages_tomcat_instance_change(num,count,env,ip);
						}
					}
				});
				
				$("#tomcat_instance_table_tbody").empty();
				for(i=0;i<instances.length;i++){
					create_tomcat_instance_table_line(instances[i]);
				}
			}
			
			autoRowSpan(DataTables_Table_0,0,0);
			
		}
	});
}

function get_pages_tomcat_instance_change(num,count,env,ip){
	var data = {"currentPage":num,"count":count,"ip":ip,"env":env};
	
	$.ajax({
		type: "POST",
		url: "/api/getOnePageTomcatInstance",
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
						get_pages_tomcat_instance_change(num,count,env,ip);
					}
				}
			});
			
			$("#tomcat_instance_table_tbody").empty();
			for(i=0;i<instances.length;i++){
				create_tomcat_instance_table_line(instances[i]);
			}
		}
	});
}
//生成表格记录
function create_tomcat_instance_table_line(instance){
	var tbody = document.getElementById("tomcat_instance_table_tbody");
	
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
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{ 
			delete_tomcat_instance(instance.id,instance.ip);
		});
	});
	td.appendChild(delete_btn);
	tr.appendChild(td);
	
	tbody.appendChild(tr);
}
//删除删除tomcat实例
function delete_tomcat_instance(id,ip){
	$.ajax({
		type: "POST",
		url: "/api/deleteTomcatInstance",
		data: JSON.stringify({"id":id,"ip":ip}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(){
			get_tomcat_instance();
		}
	});
}
//保存实例
function save_create_tomcat_instance(){
	var env = $("#create_tomcat_instance_env_select option:selected").attr("value"); 
	var name = "";
	var ip = "";
	var port = "";
	var dir = "";
	$("#tomcat_instance_template_select_div .select2-selection__choice").each(function(){
		name = $(this).attr("title");
		$("#tomcat_instance_host_select_div .select2-selection__choice").each(function(){
			var id = (new Date()).valueOf();
			ip = $(this).attr("title").split(" ",1)[0];
			if(name === "tomcat1"){
				port = 8080;
				dir = "/user/local/tomcat_8080";
			}
			if(name === "tomcat2"){
				port = 8081;
				dir = "/user/local/tomcat_8081";
			}
			if(name === "tomcat3"){
				port = 8082;
				dir = "/user/local/tomcat_8082";
			}
			if(name === "tomcat4"){
				port = 8083;
				dir = "/user/local/tomcat_8083";
			}
			
			var data = {"id":id,"ip":ip,"port":port,"name":name,"dir":dir,"env":env,"allocated":false};
			$.ajax({
				type: "POST",
				url: "/api/saveTomcatInstance",
				data: JSON.stringify(data),
				contentType: "application/json",
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
				},
				async: false,
				success: function(response){
					$.MsgBox.Alert("消息", "哈哈，添加成功！");
				}
			});
			
		});
	});
}

function reload_index_main_content() {
	$("#index_main_content").load("tomcat_instance.html",function(){
		var script = document.createElement("script");
		script.setAttribute("src","js/tomcat_instance.js");
		document.body.appendChild(script);
	});
}

//获取要创建实例的主机
function get_host_for_create_instance(hostGroup){
	var hosts = [];
	var hostGroup = hostGroup;
	var envType = $("#create_tomcat_instance_env_select option:selected").attr("value"); 
	
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
	
	var select = document.getElementById("tomcat_instance_host_select");
	$(select).empty();
	for(i=0;i<hosts.length;i++){
		var host = hosts[i];
		var option = document.createElement("option");
		$(option).text(host.ip + " " + host.ins_num);
		$(option).attr("id",host.ip);
		select.appendChild(option);
	}
	select2Object = $("#tomcat_instance_host_select").select2();
}