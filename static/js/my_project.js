$(function(){
// 	$('#tree').jstree({
// 		'core' : {
// 		'data' : [
// 			{
// 				"text" : "生产环境",
// 				"id" : "pro",
// 				"state" : {"opened" : true , "disabled" : true },
// 				"icon" : "glyphicon glyphicon-hdd",
// 				"children" : [
// 					{
// 						"text" : "应用A",
// 						"id" : "app_a",
// 						"icon": "glyphicon glyphicon-th-large",
// 						"children" : [
// 							{
// 								"text" : "中间件",
// 								"id" : "zjj",
// 								"icon" : "glyphicon glyphicon-th"
// 							},
// 						]
// 					},
// 					{ 
// 						"text" : "应用B",
// 						"id" : "app_b",
// 						"icon": "glyphicon glyphicon-th-large"
// 					}
// 				]
// 			},
// 			{
// 				"text" : "测试环境",
// 				"id" : "test",
// 				"state" : {"disabled" : true},
// 				"icon" : "glyphicon glyphicon-hdd",
// 				"children" : [
// 					{
// 						"text" : "应用A",
// 						"id" : "test_app_a",
// 						"icon": "glyphicon glyphicon-th-large",
// 						"children" : [
// 							{
// 								"text" : "中间件",
// 								"id" : "test_zjj",
// 								"icon" : "glyphicon glyphicon-th"
// 							}
// 						]
// 					},
// 					{ 
// 						"text" : "应用B",
// 						"id" : "test_app_b",
// 						"icon": "glyphicon glyphicon-th-large"
// 					}
// 				]
// 			},
// 			{
// 				"text" : "开发环境",
// 				"id" : "dev",
// 				"state" : {"disabled" : true},
// 				"icon" : "glyphicon glyphicon-hdd",
// 				"children" : [
// 					{
// 						"text" : "应用A",
// 						"id" : "dev_app_a",
// 						"icon": "glyphicon glyphicon-th-large",
// 						"children" : [
// 							{
// 								"text" : "中间件",
// 								"id" : "dev_zjj",
// 								"icon" : "glyphicon glyphicon-th"
// 							}
// 						]
// 					},
// 					{ 
// 						"text" : "应用B",
// 						"id" : "dev_app_b",
// 						"icon": "glyphicon glyphicon-th-large"
// 					}
// 				]
// 			}
// 		]
// 		}
// 	});

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
		console.log("The selected nodes are:");
		console.log(data.selected);
	});
	
	$("#create_app_btn").click(function(){
		$("#project_content_div").hide();
		$("#create_tree_app_div").show();
	});
	
	$("#console_create_tree_app_btn").click(function(){
		$("#project_content_div").show();
		$("#create_tree_app_div").hide();
	});
	
	$("#save_tree_app").click(function(){
		save_tree_app();
	});
});
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
	var env = $("#env_select option:selected").val();
	
	var data = {"id":id,"text":text,"icon":icon,"env":env};
	$.ajax({
		type: "POST",
		url: "/api/saveTreeApp",
		data: JSON.stringify(data),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(){
			reload_project_div();
		}
	});
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