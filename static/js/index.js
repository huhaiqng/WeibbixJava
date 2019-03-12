$(function () {
	//socket 禁用进度插件
	Pace.options.ajax.trackWebSockets = false;
	//生成实例集群管理列表
	create_instance_cluster_ul();
	// load_user_html();
	
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
//生成实例集群管理列表
function create_instance_cluster_ul(){
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
				var li = document.createElement("li");
				var a = document.createElement("a");
				var id = response[i]+"_instance";
				$(a).attr("id",id);
				$(a).text(response[i].toUpperCase()+" 实例");
				$(li).append(a);
				$("#instance_ul").append(li);
			}
			for(i=0;i<response.length;i++){
				var li = document.createElement("li");
				var a = document.createElement("a");
				var id = response[i]+"_cluster";
				$(a).attr("id",id);
				$(a).text(response[i].toUpperCase()+" 集群");
				$(li).append(a);
				$("#cluster_ul").append(li);
			}
		}
	});
	load_user_html();
}
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
	
	//加载nginx集群实例
	$("#nginx_cluster").click(function(){
		$("#index_main_content").load("nginx_cluster.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/nginx_cluster.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});	
	
	//加载mysql集群实例
	$("#mysql_cluster").click(function(){
		$("#index_main_content").load("mysql_cluster.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/mysql_cluster.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	
	//加载zookeeper集群实例
	$("#zookeeper_cluster").click(function(){
		$("#index_main_content").load("zookeeper_cluster.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/zookeeper_cluster.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	
	//加载kafka集群实例
	$("#kafka_cluster").click(function(){
		$("#index_main_content").load("kafka_cluster.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/kafka_cluster.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	
	//加载mongodb集群实例
	$("#mongodb_cluster").click(function(){
		$("#index_main_content").load("mongodb_cluster.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/mongodb_cluster.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	
	//加载redis集群实例
	$("#redis_cluster").click(function(){
		$("#index_main_content").load("redis_cluster.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/redis_cluster.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	
	//加载rabbitmq集群实例
	$("#rabbitmq_cluster").click(function(){
		$("#index_main_content").load("rabbitmq_cluster.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/rabbitmq_cluster.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	
	//加载java集群实例
	$("#java_cluster").click(function(){
		$("#index_main_content").load("java_cluster.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/java_cluster.js");
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
	//加载nginx实例页面
	$("#nginx_instance").click(function(){
		$("#index_main_content").load("nginx_instance.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/nginx_instance.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	//加载tomcat实例页面
	$("#tomcat_instance").click(function(){
		$("#index_main_content").load("tomcat_instance.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/tomcat_instance.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	//加载mysql实例页面
	$("#mysql_instance").click(function(){
		$("#index_main_content").load("mysql_instance.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/mysql_instance.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	//加载zookeeper实例页面
	$("#zookeeper_instance").click(function(){
		$("#index_main_content").load("zookeeper_instance.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/zookeeper_instance.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	//加载kafka实例页面
	$("#kafka_instance").click(function(){
		$("#index_main_content").load("kafka_instance.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/kafka_instance.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	//加载mongodb实例页面
	$("#mongodb_instance").click(function(){
		$("#index_main_content").load("mongodb_instance.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/mongodb_instance.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	//加载redis实例页面
	$("#redis_instance").click(function(){
		$("#index_main_content").load("redis_instance.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/redis_instance.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	//加载rabbitmq实例页面
	$("#rabbitmq_instance").click(function(){
		$("#index_main_content").load("rabbitmq_instance.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/rabbitmq_instance.js");
			document.body.appendChild(script);
		});
		change_active_li(this);
	});
	//加载java实例页面
	$("#java_instance").click(function(){
		$("#index_main_content").load("java_instance.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/java_instance.js");
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