// var data = [
//   {
//     text: "生产环境",
//     nodes: [
//       {
//         text: "机票系统",
//         nodes: [
//           {
//             text: "中间件",
// 			href: "javascript:jp_zjj(this)"
//           },
//           {
//             text: "数据库"
//           }
//         ]
//       },
//       {
//         text: "车票系统",
// 		nodes: [
//           {
//             text: "中间件"
//           },
//           {
//             text: "数据库"
//           }
//         ]
//       }
//     ]
//   },
//   {
//   text: "测试环境",
//   state: {"expanded":false},
//   nodes: [
//   	{
//   	text: "机票系统",
//   	nodes: [
//   		{
//   		text: "中间件",
//   		href: "javascript:jp_zjj()"
//   		},
//   		{
//   		text: "数据库"
//   		}
//   	]
//   	},
//   	{
//   	text: "车票系统",
//   	nodes: [
//   		{
//   		text: "中间件"
//   		},
//   		{
//   		text: "数据库"
//   		}
//   	]
//   	}
//   ]
//   },
//   {
//   text: "开发环境",
//   state: {"expanded":false},
//   nodes: [
//   {
//   text: "机票系统",
//   nodes: [
//   	{
//   	text: "中间件",
//   	href: "javascript:jp_zjj()"
//   	},
//   	{
//   	text: "数据库"
//   	}
//   ]
//   },
//   {
//   text: "车票系统",
//   nodes: [
//   	{
//   	text: "中间件"
//   	},
//   	{
//   	text: "数据库"
//   	}
//   ]
//   }
//   ]
//   }
// ];

$(function(){
// 	$('#tree').treeview({
// 	data: data,
// 	showBorder: false,
// 	enableLinks: true
// 	});
	
	
	$("#demo1").jstree({ 
		"json_data" : {
			"data" : [
				{ 
					"data" : "A node", 
					"metadata" : { id : 23 },
					"children" : [ "Child 1", "A Child 2" ]
				},
				{ 
					"attr" : { "id" : "li.node.id1" }, 
					"data" : { 
						"title" : "Long format demo", 
						"attr" : { "href" : "#" } 
					} 
				}
			]
		},
		"plugins" : [ "themes", "json_data", "ui" ]
	}).bind("select_node.jstree", function (e, data) { alert(data.rslt.obj.data("id")); });
	
	
	
	
});

function jp_zjj(){
	// $('#tree').treeview('getParent', node);
	console.log("机票中间件");
}
