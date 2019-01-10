$(function () {
	load_user_html();
	
//	显示用户名
	var login_username = localStorage.getItem("login_username");
	$("#user_span").text(login_username);
	
	$("#index_main_content").load("main.html");
}); 

function load_user_html(){
	
	$("#usermanage").click(function(){
		$("#index_main_content").load("user.html",function(){
			var script = document.createElement('script');
			script.setAttribute('src', 'js/user.js'); 
			document.body.appendChild(script);

		});
		change_active_li(this);
	});
	
	
 	$("#group_manage").click(function(){
	 	$("#index_main_content").load("group.html",function(){
			var script = document.createElement('script');
			script.setAttribute('src', 'js/group.js'); 
			document.body.appendChild(script);
		});
		change_active_li(this);
    });
	
	$("#windows_hosts_pool").click(function(){
		change_active_li(this);
	});
	
	$("#linux_hosts").click(function(){
		$("#index_main_content").load("linux_host.html",function(){
			var script = document.createElement('script');
			script.setAttribute('src', 'js/linux_host.js'); 
			document.body.appendChild(script);
		})
		change_active_li(this);
	});
	
	$("#kafka_cluster").click(function(){
		$("#index_main_content").load("kafka_cluster.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/kafka_cluster.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	
}

function change_active_li(obj){
	// var select_ul = $(obj).parent().parent();
	var active_li = $("#side-menu").find("li .active");
	$(active_li).removeClass("active");
	$(obj).parent().addClass("active");
}