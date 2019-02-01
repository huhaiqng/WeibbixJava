$(function(){
	$("#create_tomcat_instance_btn").click(function(){
		$("#tomcat_instance_table_div").hide();
		$("#create_tomcat_instance_div").show();
		select2Object = $("#tomcat_instance_template_select").select2();
		
		//获取主机
		var hosts = get_host_for_create_instance("tomcat");
		
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
		
	});
	
	$("#save_create_tomcat_instance_btn").click(function(){
		save_create_tomcat_instance();
	});
	
	$("#create_tomcat_instance_back_btn").click(function(){
		reload_index_main_content();
	});
	
	get_tomcat_instance();
})

//获取所有tomcat实例主机
function get_tomcat_instance(){
	var count = $("#one_page_count_select option:selected").val();
	var data = {"currentPage":1,"count":count};
	$.ajax({
		type: "POST",
		url: "/api/getOnePageTomcatInstance",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function(response){
			for()
			create_tomcat_instance_table_line();
		}
	});
}
//生成表格记录
function create_tomcat_instance_table_line(ins){
	
}

//保存实例
function save_create_tomcat_instance(){
	var env = $("#tomcat_instance_env_select option:selected").attr("value"); 
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
	var envType = $("#tomcat_instance_env_select option:selected").attr("value"); 
	
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
	return hosts;
}