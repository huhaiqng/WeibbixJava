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
		var text = node_data.text;
		if(id.indexOf("app_") == 0){
			$("#project_content_div .col-sm-10").css('display','block').hide();
			$("#app_info_div").show();
			$("#app_name").text(node_data.text);
			$("#app_env").text(node_data.env);
			$("#delete_tomcat_tree_app_btn").attr("value",id);
		}else{
			$("#project_content_div .col-sm-10").css('display','block').hide();
			if(text == "nginx"){
				$("#nginx_model_info_div").show();
				$("#nginx_model_info_div").show();
				$("#model_nginx_cluster_tbody").empty();
				show_nginx_model_data(node_data);
				$("#delete_nginx_tree_model_btn").attr("value",id);
			}
			if(text == "tomcat"){
				$("#tomcat_model_info_div").show();
				$("#model_tomcat_cluster_tbody").empty();
				show_tomcat_model_data(node_data);
				$("#delete_tomcat_tree_model_btn").attr("value",id);
			}
			if(text == "mysql"){
				$("#mysql_model_info_div").show();
				$("#model_mysql_cluster_tbody").empty();
				show_mysql_model_data(node_data);
				$("#delete_mysql_tree_model_btn").attr("value",id);
			}
			if(text == "mysql"){
				$("#mysql_model_info_div").show();
				$("#model_mysql_cluster_tbody").empty();
				show_mysql_model_data(node_data);
				$("#delete_mysql_tree_model_btn").attr("value",id);
			}
			if(text == "zookeeper"){
				$("#zookeeper_model_info_div").show();
				$("#model_zookeeper_cluster_tbody").empty();
				show_zookeeper_model_data(node_data);
				$("#delete_zookeeper_tree_model_btn").attr("value",id);
			}
			if(text == "kafka"){
				$("#kafka_model_info_div").show();
				$("#model_kafka_cluster_tbody").empty();
				show_kafka_model_data(node_data);
				$("#delete_kafka_tree_model_btn").attr("value",id);
			}
			if(text == "mongodb"){
				$("#mongodb_model_info_div").show();
				$("#model_mongodb_cluster_tbody").empty();
				show_mongodb_model_data(node_data);
				$("#delete_mongodb_tree_model_btn").attr("value",id);
			}
			if(text == "redis"){
				$("#redis_model_info_div").show();
				$("#model_redis_cluster_tbody").empty();
				show_redis_model_data(node_data);
				$("#delete_redis_tree_model_btn").attr("value",id);
			}
			if(text == "rabbitmq"){
				$("#rabbitmq_model_info_div").show();
				$("#model_rabbitmq_cluster_tbody").empty();
				show_rabbitmq_model_data(node_data);
				$("#delete_rabbitmq_tree_model_btn").attr("value",id);
			}
			if(text == "java"){
				$("#java_model_info_div").show();
				$("#model_java_cluster_tbody").empty();
				show_java_model_data(node_data);
				$("#delete_java_tree_model_btn").attr("value",id);
			}
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
		
		// get_app_for_model();
		create_model_name_option();
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
	//删除tomcat项目
	$("#delete_tomcat_tree_app_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{ 
			var id = $("#delete_tomcat_tree_app_btn").attr("value");
			delete_tree_app(id);
		});
	});
	//删除tomcat项目模块
	$("#delete_tomcat_tree_model_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{
			var id = $("#delete_tomcat_tree_model_btn").attr("value");
			delete_tree_model(id);
		});
	});
	
	//删除nginx项目
	$("#delete_nginx_tree_app_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{ 
			var id = $("#delete_nginx_tree_app_btn").attr("value");
			delete_tree_app(id);
		});
	});
	//删除nginx项目模块
	$("#delete_nginx_tree_model_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{
			var id = $("#delete_nginx_tree_model_btn").attr("value");
			delete_tree_model(id);
		});
	});
	
	//删除mysql项目
	$("#delete_mysql_tree_app_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{ 
			var id = $("#delete_mysql_tree_app_btn").attr("value");
			delete_tree_app(id);
		});
	});
	//删除mysql项目模块
	$("#delete_mysql_tree_model_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{
			var id = $("#delete_mysql_tree_model_btn").attr("value");
			delete_tree_model(id);
		});
	});
	
	//删除zookeeper项目
	$("#delete_zookeeper_tree_app_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{ 
			var id = $("#delete_zookeeper_tree_app_btn").attr("value");
			delete_tree_app(id);
		});
	});
	//删除zookeeper项目模块
	$("#delete_zookeeper_tree_model_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{
			var id = $("#delete_zookeeper_tree_model_btn").attr("value");
			delete_tree_model(id);
		});
	});
	
	//删除kafka项目
	$("#delete_kafka_tree_app_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{ 
			var id = $("#delete_kafka_tree_app_btn").attr("value");
			delete_tree_app(id);
		});
	});
	//删除kafka项目模块
	$("#delete_kafka_tree_model_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{
			var id = $("#delete_kafka_tree_model_btn").attr("value");
			delete_tree_model(id);
		});
	});
	
	//删除mongodb项目
	$("#delete_mongodb_tree_app_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{ 
			var id = $("#delete_mongodb_tree_app_btn").attr("value");
			delete_tree_app(id);
		});
	});
	//删除mongodb项目模块
	$("#delete_mongodb_tree_model_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{
			var id = $("#delete_mongodb_tree_model_btn").attr("value");
			delete_tree_model(id);
		});
	});
	
	//删除redis项目
	$("#delete_redis_tree_app_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{ 
			var id = $("#delete_redis_tree_app_btn").attr("value");
			delete_tree_app(id);
		});
	});
	//删除redis项目模块
	$("#delete_redis_tree_model_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{
			var id = $("#delete_redis_tree_model_btn").attr("value");
			delete_tree_model(id);
		});
	});
	
	//删除rabbitmq项目
	$("#delete_rabbitmq_tree_app_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{ 
			var id = $("#delete_rabbitmq_tree_app_btn").attr("value");
			delete_tree_app(id);
		});
	});
	//删除rabbitmq项目模块
	$("#delete_rabbitmq_tree_model_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{
			var id = $("#delete_rabbitmq_tree_model_btn").attr("value");
			delete_tree_model(id);
		});
	});
	
	//删除java项目
	$("#delete_java_tree_app_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{ 
			var id = $("#delete_java_tree_app_btn").attr("value");
			delete_tree_app(id);
		});
	});
	//删除java项目模块
	$("#delete_java_tree_model_btn").click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{
			var id = $("#delete_java_tree_model_btn").attr("value");
			delete_tree_model(id);
		});
	});
});
//生成模块下拉列表选项
function create_model_name_option(){
	$.ajax({
		type: "GET",
		url: "/api/getSoftwareName",
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(response){
			for(i=0;i<response.length;i++){
				var option = document.createElement("option");
				$(option).text(response[i].toUpperCase());
				$(option).attr("value",response[i]);
				$("#model_name_select").append(option);
			}
		}
	});
	// get_cluster_for_model();
	get_app_for_model();
}
//删除模块
function delete_tree_model(id){
	$.ajax({
		type: "POST",
		url: "/api/deleteTreeModel",
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
function delete_tree_app(id){
	$.ajax({
		type: "POST",
		url: "/api/deleteTreeApp",
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
//展示tomcat集群数据
function show_tomcat_model_data(data){
	var clusterId = data.clusterId;
	var hostGroup = data.text;
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
				
				var td = document.createElement("td");
				$(td).attr("align","center");
				var info_btn = document.createElement("a");
				info_btn.className = "label label-success";
				info_btn.innerText = "主机详情";
				$(info_btn).attr("value",instance.ip);
				$(info_btn).attr("name",hostGroup);
				$(info_btn).click(function(){
					var ip=$(this).attr("value");
					var hostGroup=$(this).attr("name");
					instance_host_info(ip,hostGroup);
				});
				td.appendChild(info_btn);
				tr.appendChild(td);
				
				$("#model_tomcat_cluster_tbody").append(tr);
				
				$("#model_name").text(instance.cluster);
				$("#model_env").text(instance.env);
			}
		}
	});
}

//展示nginx集群数据
function show_nginx_model_data(data){
	var clusterId = data.clusterId;
	var hostGroup = data.text;
	$.ajax({
		type: "POST",
		url: "/api/getNginxInstanceByClusterId",
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
				td.textContent = instance.ip;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.http_port;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.https_port;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.dir;
				tr.append(td);
				
				var td = document.createElement("td");
				$(td).attr("align","center");
				var info_btn = document.createElement("a");
				info_btn.className = "label label-success";
				info_btn.innerText = "主机详情";
				$(info_btn).attr("value",instance.ip);
				$(info_btn).attr("name",hostGroup);
				$(info_btn).click(function(){
					var ip=$(this).attr("value");
					var hostGroup=$(this).attr("name");
					instance_host_info(ip,hostGroup);
				});
				td.appendChild(info_btn);
				tr.appendChild(td);
				
				$("#model_nginx_cluster_tbody").append(tr);
				
				$("#nginx_model_name").text(instance.cluster);
				$("#nginx_model_env").text(instance.env);
			}
		}
	});
}

// ----------------------------------- mysql -----------------------------------
//展示mysql集群数据
function show_mysql_model_data(data){
	var clusterId = data.clusterId;
	var hostGroup = data.text;
	$.ajax({
		type: "POST",
		url: "/api/getMysqlInstanceByClusterId",
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
				td.textContent = instance.ip;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.name;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.port;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.dir;
				tr.append(td);
				
				var td = document.createElement("td");
				$(td).attr("align","center");
				var info_btn = document.createElement("a");
				info_btn.className = "label label-success";
				info_btn.innerText = "主机详情";
				$(info_btn).attr("value",instance.ip);
				$(info_btn).attr("name",hostGroup);
				$(info_btn).click(function(){
					var ip=$(this).attr("value");
					var hostGroup=$(this).attr("name");
					instance_host_info(ip,hostGroup);
				});
				td.appendChild(info_btn);
				tr.appendChild(td);
				
				$("#model_mysql_cluster_tbody").append(tr);
				
				$("#mysql_model_name").text(instance.cluster);
				$("#mysql_model_env").text(instance.env);
			}
		}
	});
}

// ----------------------------------- zookeeper -----------------------------------
//展示zookeeper集群数据
function show_zookeeper_model_data(data){
	var hostGroup = data.text;
	var clusterId = data.clusterId;
	$.ajax({
		type: "POST",
		url: "/api/getZookeeperInstanceByClusterId",
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
				td.textContent = instance.ip;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.name;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.port;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.dir;
				tr.append(td);
				
				var td = document.createElement("td");
				$(td).attr("align","center");
				var info_btn = document.createElement("a");
				info_btn.className = "label label-success";
				info_btn.innerText = "主机详情";
				$(info_btn).attr("value",instance.ip);
				$(info_btn).attr("name",hostGroup);
				$(info_btn).click(function(){
					var ip=$(this).attr("value");
					var hostGroup=$(this).attr("name");
					instance_host_info(ip,hostGroup);
				});
				td.appendChild(info_btn);
				tr.appendChild(td);
				
				$("#model_zookeeper_cluster_tbody").append(tr);
				
				$("#zookeeper_model_name").text(instance.cluster);
				$("#zookeeper_model_env").text(instance.env);
			}
		}
	});
}

// ----------------------------------- kafka -----------------------------------
//展示kafka集群数据
function show_kafka_model_data(data){
	var clusterId = data.clusterId;
	var hostGroup = data.text;
	$.ajax({
		type: "POST",
		url: "/api/getKafkaInstanceByClusterId",
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
				td.textContent = instance.ip;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.name;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.port;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.dir;
				tr.append(td);
				
				var td = document.createElement("td");
				$(td).attr("align","center");
				var info_btn = document.createElement("a");
				info_btn.className = "label label-success";
				info_btn.innerText = "主机详情";
				$(info_btn).attr("value",instance.ip);
				$(info_btn).attr("name",hostGroup);
				$(info_btn).click(function(){
					var ip=$(this).attr("value");
					var hostGroup=$(this).attr("name");
					instance_host_info(ip,hostGroup);
				});
				td.appendChild(info_btn);
				tr.appendChild(td);
				
				$("#model_kafka_cluster_tbody").append(tr);
				
				$("#kafka_model_name").text(instance.cluster);
				$("#kafka_model_env").text(instance.env);
			}
		}
	});
}

// ----------------------------------- mongodb -----------------------------------
//展示mongodb集群数据
function show_mongodb_model_data(data){
	var clusterId = data.clusterId;
	var hostGroup = data.text;
	$.ajax({
		type: "POST",
		url: "/api/getMongodbInstanceByClusterId",
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
				td.textContent = instance.ip;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.name;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.port;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.dir;
				tr.append(td);
				
				var td = document.createElement("td");
				$(td).attr("align","center");
				var info_btn = document.createElement("a");
				info_btn.className = "label label-success";
				info_btn.innerText = "主机详情";
				$(info_btn).attr("value",instance.ip);
				$(info_btn).attr("name",hostGroup);
				$(info_btn).click(function(){
					var ip=$(this).attr("value");
					var hostGroup=$(this).attr("name");
					instance_host_info(ip,hostGroup);
				});
				td.appendChild(info_btn);
				tr.appendChild(td);
				
				$("#model_mongodb_cluster_tbody").append(tr);
				
				$("#mongodb_model_name").text(instance.cluster);
				$("#mongodb_model_env").text(instance.env);
			}
		}
	});
}

// ----------------------------------- redis -----------------------------------
//展示redis集群数据
function show_redis_model_data(data){
	var hostGroup = data.text;
	var clusterId = data.clusterId;
	$.ajax({
		type: "POST",
		url: "/api/getRedisInstanceByClusterId",
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
				td.textContent = instance.ip;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.name;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.port;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.dir;
				tr.append(td);
				
				var td = document.createElement("td");
				$(td).attr("align","center");
				var info_btn = document.createElement("a");
				info_btn.className = "label label-success";
				info_btn.innerText = "主机详情";
				$(info_btn).attr("value",instance.ip);
				$(info_btn).attr("name",hostGroup);
				$(info_btn).click(function(){
					var ip=$(this).attr("value");
					var hostGroup=$(this).attr("name");
					instance_host_info(ip,hostGroup);
				});
				td.appendChild(info_btn);
				tr.appendChild(td);
				
				$("#model_redis_cluster_tbody").append(tr);
				
				$("#redis_model_name").text(instance.cluster);
				$("#redis_model_env").text(instance.env);
			}
		}
	});
}

// ----------------------------------- rabbitmq -----------------------------------
//展示rabbitmq集群数据
function show_rabbitmq_model_data(data){
	var clusterId = data.clusterId;
	var hostGroup = data.text;
	$.ajax({
		type: "POST",
		url: "/api/getRabbitmqInstanceByClusterId",
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
				td.textContent = instance.ip;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.name;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.port;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.dir;
				tr.append(td);
				
				var td = document.createElement("td");
				$(td).attr("align","center");
				var info_btn = document.createElement("a");
				info_btn.className = "label label-success";
				info_btn.innerText = "主机详情";
				$(info_btn).attr("value",instance.ip);
				$(info_btn).attr("name",hostGroup);
				$(info_btn).click(function(){
					var ip=$(this).attr("value");
					var hostGroup=$(this).attr("name");
					instance_host_info(ip,hostGroup);
				});
				td.appendChild(info_btn);
				tr.appendChild(td);
				
				$("#model_rabbitmq_cluster_tbody").append(tr);
				
				$("#rabbitmq_model_name").text(instance.cluster);
				$("#rabbitmq_model_env").text(instance.env);
			}
		}
	});
}
// ----------------------------------- java -----------------------------------
//展示java集群数据
function show_java_model_data(data){
	var clusterId = data.clusterId;
	var hostGroup = data.text;
	$.ajax({
		type: "POST",
		url: "/api/getJavaInstanceByClusterId",
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
				td.textContent = instance.ip;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.name;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.port;
				tr.append(td);
				
				var td = document.createElement("td");
				td.textContent = instance.dir;
				tr.append(td);
				
				var td = document.createElement("td");
				$(td).attr("align","center");
				var info_btn = document.createElement("a");
				info_btn.className = "label label-success";
				info_btn.innerText = "主机详情";
				$(info_btn).attr("value",instance.ip);
				$(info_btn).attr("name",hostGroup);
				$(info_btn).click(function(){
					var ip=$(this).attr("value");
					var hostGroup=$(this).attr("name");
					instance_host_info(ip,hostGroup);
				});
				td.appendChild(info_btn);
				tr.appendChild(td);
				
				$("#model_java_cluster_tbody").append(tr);
				
				$("#java_model_name").text(instance.cluster);
				$("#java_model_env").text(instance.env);
			}
		}
	});
}

// 展示实例主机详情
function instance_host_info(ip,hostGroup){
	$.ajax({
		type: "POST",
		url: "/api/getHostByIp",
		data: JSON.stringify({"ip":ip,"hostGroup":hostGroup}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(host){
			$("#p_hostname").text(host.hostName);
			$("#p_ip").text(host.ip);
			$("#p_envType").text(host.envType);
			$("#p_hostGroup").text(host.hostGroup);
			$("#p_place").text(host.place);
			$("#p_rootPassword").text(host.rootPassword);
			$("#p_allocated").text(host.allocated);
			
			var time = new Date(host.createdAt);
			var y = time.getFullYear();
			var m = time.getMonth()+1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			
			$("#p_createdAt").text(y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s));
			$("#p_osVersion").text(host.osVersion);
			$("#p_enabled").text(host.enabled);
			$("#p_hostType").text(host.hostType);
			$("#p_configuration").text(host.configuration);
			$("#p_esxiip").text(host.esxiip);
		}
	});
	$("#instance_host_info_div").show();
	var instance_host = new mSlider({dom: "#instance_host_info_div",direction: "right",distance:"40%"});
	instance_host.open();
}
function add0(m){
	return m<10?'0'+m:m;
}