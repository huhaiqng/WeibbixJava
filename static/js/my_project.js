var data = [
  {
    text: "生产环境",
    nodes: [
      {
        text: "机票系统",
        nodes: [
          {
            text: "中间件"
          },
          {
            text: "数据库"
          }
        ]
      },
      {
        text: "车票系统",
		nodes: [
          {
            text: "中间件"
          },
          {
            text: "数据库"
          }
        ]
      }
    ]
  },
];

$(function(){
	$('#tree').treeview({
	data: data,
	showBorder: false
	});
	$('#container').on("changed.jstree", function (e, data) {
	console.log("The selected nodes are:");
	console.log(data.selected);
	});
		
});


