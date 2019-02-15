$(function () {
	Pace.options.ajax.trackWebSockets = false;
	load_user_html();
	
//	显示用户名
	var login_username = localStorage.getItem("login_username");
	if(login_username === null){
		window.location.href="login.html";
	}else{
		$("#user_span").text(login_username);
		$("#index_main_content").load("main.html");
	}
	
	$("#logout_weibbix").click(function(){
		localStorage.removeItem("login_username");
		window.location.href="login.html";
	})
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
	
	//加载tomcat集群实例
	$("#tomcat_cluster").click(function(){
		$("#index_main_content").load("tomcat_cluster.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/tomcat_cluster.js");
			document.body.appendChild(script);
		});
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
	
	$("#my_project").click(function(){
		$("#index_main_content").load("my_project.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/my_project.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	
	$("#tomcat_instance").click(function(){
		$("#index_main_content").load("tomcat_instance.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/tomcat_instance.js");
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