$(function(){
	$('#tree').jstree({
		'core' : {
		'data' : [
			{
				"text" : "生产环境",
				"id" : "pro",
				"state" : {"opened" : true , "disabled" : true },
				"icon" : "glyphicon glyphicon-hdd",
				"children" : [
					{
						"text" : "应用A",
						"id" : "app_a",
						"icon": "glyphicon glyphicon-th-large",
						"children" : [
							{
								"text" : "中间件",
								"id" : "zjj",
								"icon" : "glyphicon glyphicon-th"
							},
						]
					},
					{ 
						"text" : "应用B",
						"id" : "app_b",
						"icon": "glyphicon glyphicon-th-large"
					}
				]
			},
			{
				"text" : "测试环境",
				"id" : "test",
				"state" : {"disabled" : true},
				"icon" : "glyphicon glyphicon-hdd",
				"children" : [
					{
						"text" : "应用A",
						"id" : "test_app_a",
						"icon": "glyphicon glyphicon-th-large",
						"children" : [
							{
								"text" : "中间件",
								"id" : "test_zjj",
								"icon" : "glyphicon glyphicon-th"
							}
						]
					},
					{ 
						"text" : "应用B",
						"id" : "test_app_b",
						"icon": "glyphicon glyphicon-th-large"
					}
				]
			},
			{
				"text" : "开发环境",
				"id" : "dev",
				"state" : {"disabled" : true},
				"icon" : "glyphicon glyphicon-hdd",
				"children" : [
					{
						"text" : "应用A",
						"id" : "dev_app_a",
						"icon": "glyphicon glyphicon-th-large",
						"children" : [
							{
								"text" : "中间件",
								"id" : "dev_zjj",
								"icon" : "glyphicon glyphicon-th"
							}
						]
					},
					{ 
						"text" : "应用B",
						"id" : "dev_app_b",
						"icon": "glyphicon glyphicon-th-large"
					}
				]
			}
		]
		}
	});
	
	$('#tree').on("changed.jstree", function (e, data) {
		console.log("The selected nodes are:");
		console.log(data.selected);
	});
});

