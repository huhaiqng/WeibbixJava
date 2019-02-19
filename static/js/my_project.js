$(function(){
	var pro_children = get_tree_app_by_env("pro");
	var test_children = get_tree_app_by_env("test");
	var dev_children = get_tree_app_by_env("dev");
	
	$('#tree').jstree({
		'core' : {
		'data' : [
			{
				"text" : "生产环境",
				"id" : "pro",
				"state" : {"opened" : true , "disabled" : true },
				"icon" : "glyphicon glyphicon-hdd",
				"children" : pro_children
			},
			{
				"text" : "测试环境",
				"id" : "test",
				"state" : {"disabled" : true},
				"icon" : "glyphicon glyphicon-hdd",
				"children" : test_children
			},
			{
				"text" : "开发环境",
				"id" : "dev",
				"state" : {"disabled" : true},
				"icon" : "glyphicon glyphicon-hdd",
				"children" : dev_children
			}
		]
		}
	});
	
	$('#tree').on("changed.jstree", function (e, data) {
		var node_data = data.node.original;
		var id = node_data.id;
		if(id.indexOf("app_") == 0){
			$("#app_info_div").show();
			$("#tomcat_model_info_div").hide();
			$("#app_name").text(node_data.text);
			$("#app_env").text(node_data.env);
			$("#delete_tomcat_tree_app_btn").attr("value",id);
		}else{
			$("#tomcat_model_info_div").show();
			$("#app_info_div").hide();
			$("#model_tomcat_cluster_tbody").empty();
			show_tomcat_model_data(node_data);
			$("#delete_tomcat_tree_model_btn").attr("value",id);
		}
	});
	
	$("#create_app_btn").click(function(){
		$("#project_content_div").hide();
		$("#create_tree_app_div").show();
		$("#create_model_btn").attr("disabled",true);
	});
	
	$("#console_create_tree_app_btn").click(function(){
		$("#project_content_div").show();
		$("#create_tree_app_div").hide();
		$("#create_model_btn").attr("disabled",false);
	});
	
	//显示创建模块页面
	$("#create_model_btn").click(function(){
		$("#project_content_div").hide();
		$("#create_tree_model_div").show();
		$("#create_app_btn").attr("disabled",true);
		
		get_app_for_model();
	});
	
	//取消创建模块
	$("#console_create_tree_model_btn").click(function(){
		$("#project_content_div").show();
		$("#create_tree_model_div").hide();
		$("#create_app_btn").attr("disabled",false);
	});
	
	$("#save_tree_model").click(function(){
		save_tree_model();
	});
	
	$("#save_tree_app").click(function(){
		save_tree_app();
	});
	//删除项目
	$("#delete_tomcat_tree_app_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{ 
			delete_tomcat_tree_app();
		});
	});
	//删除项目模块
	$("#delete_tomcat_tree_model_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{ 
			delete_tomcat_tree_model();
		});
	});
});
//删除模块
function delete_tomcat_tree_model(){
	var id = $("#delete_tomcat_tree_model_btn").attr("value");
	$.ajax({
		type: "POST",
		url: "/api/deleteTomcatTreeModel",
		data: JSON.stringify({"id":id}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(response){
			reload_project_div();
		}
	});
}
//删除项目
function delete_tomcat_tree_app(){
	var id = $("#delete_tomcat_tree_app_btn").attr("value");
	$.ajax({
		type: "POST",
		url: "/api/deleteTomcatTreeApp",
		data: JSON.stringify({"id":id}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(response){
			if(response == "success"){
				reload_project_div();
			}else{
				$.MsgBox.Alert("消息",response);
			}
		}
	});
}
//保存模块
function save_tree_model(){
	var id = (new Date()).valueOf().toString();
	var text = $("#model_name_select option:selected").attr("value");
	var icon = "glyphicon glyphicon-th";
	var appId = $("#model_select option:selected").attr("value");
	var clusterId = $("#cluster_select option:selected").attr("value");
	
	data = {"id":id,"text":text,"icon":icon,"appId":appId,"clusterId":clusterId};
	$.ajax({
		type: "POST",
		url: "/api/saveTreeModel",
		data: JSON.stringify(data),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			if(response == "success"){
				reload_project_div();
			}else{
				$.MsgBox.Alert("消息",response);
			}
		}
	});
	
}
//获取集群
function get_cluster_for_model(){
	$("#cluster_select").empty();
	var name = $("#model_name_select option:selected").attr("value");
	var env = $("#model_env_select option:selected").attr("value");
	var url = "/api/getCluster/"+name;
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify({"env":env}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			for(i=0;i<response.length;i++){
				var option = document.createElement("option");
				$(option).text(response[i].name);
				$(option).attr("value",response[i].id);
				$("#cluster_select").append(option);
			}
		}
	});
}
//重新加载项目div
function reload_project_div(){
	$("#index_main_content").load("my_project.html",function(){
		var script = document.createElement("script");
		script.setAttribute("src","js/my_project.js");
		document.body.appendChild(script);
	});
}
//保存项目
function save_tree_app(){
	var id =(new Date()).valueOf().toString();
	var text = $("#tree_app_text").val();
	var icon = "glyphicon glyphicon-th-large";
	
	var data = {"id":id,"text":text,"icon":icon};
	$.ajax({
		type: "POST",
		url: "/api/saveTreeApp",
		data: JSON.stringify(data),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			if(response == "success"){
				reload_project_div();
			}else{
				$.MsgBox.Alert("消息",response);
			}
		}
	});
}

//获取创建模块的项目
function get_app_for_model(){
	$("#model_select").empty();
	var env = $("#model_env_select option:selected").attr("value");
	var apps = get_tree_app_by_env(env);
	for(i=0;i<apps.length;i++){
		var option = document.createElement("option");
		$(option).text(apps[i].text);
		$(option).attr("value",apps[i].id);
		$("#model_select").append(option);
	}
	get_cluster_for_model();
}
//获取项目
function get_tree_app_by_env(env){
	var result = [];
	$.ajax({
		type: "POST",
		url: "/api/getTreeAppByEnv",
		data: JSON.stringify({"env":env}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(response){
			result = response;
		}
	});
	return result;
}
//获取tomcat集群数据
function show_tomcat_model_data(data){
	var clusterId = data.clusterId;
	$.ajax({
		type: "POST",
		url: "/api/getTomcatInstanceByClusterId",
		data: JSON.stringify({"clusterId":clusterId}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(response){
			for(i=0;i<response.length;i++){
				var instance = response[i];
				var tr = document.createElement("tr");
				
				var td = document.createElement("td");
				td.textContent = instance.name;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.ip;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.port;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.dir;
				tr.append(td);
				
				$("#model_tomcat_cluster_tbody").append(tr);
				
				$("#model_name").text(instance.cluster);
				$("#model_env").text(instance.env);
			}
		}
	});
}