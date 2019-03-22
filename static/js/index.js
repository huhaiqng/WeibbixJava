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
			//生成实例列表
			for(i=0;i<response.length;i++){
				change_instance_html(response[i]);
			}
			for(i=0;i<response.length;i++){
// 				var li = document.createElement("li");
// 				var a = document.createElement("a");
// 				var id = response[i]+"_cluster";
// 				$(a).attr("id",id);
// 				$(a).text(response[i].toUpperCase()+" 集群");
// 				$(li).append(a);
// 				$("#cluster_ul").append(li);
				change_cluster_html(response[i]);
			}
		}
	});
	load_user_html();
}

//修改实例页面的相关属性
function change_instance_html(value){
	var li = document.createElement("li");
	var a = document.createElement("a");
	$(a).text(value.toUpperCase()+" 实例");
	$(a).attr("id",value);
	$(a).click(function(){
		$("#index_main_content").load("instance.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/instance.js");
			document.body.appendChild(script);
            //修改标题名称
			var html_code="<strong>"+value.toUpperCase()+" 实例"+"</strong>";
			$("#instance_name_li").html(html_code);
			var html_code2="<h5>创建 "+value.toUpperCase()+" 实例</h5>";
			$("#instance_label").html(html_code2);
			//修改instance_head value 值，用于查询数据
			$("#instance_head").attr("value",value)

		});
		change_active_li(this);
	});
	$(li).append(a);
	$("#instance_ul").append(li);
}

//修改集群页面的相关属性
function change_cluster_html(value){
	var li = document.createElement("li");
	var a = document.createElement("a");
	$(a).text(value.toUpperCase()+" 集群");
	$(a).attr("id",value+"_cluster");
	$(a).click(function(){
		$("#index_main_content").load("cluster.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/cluster.js");
			document.body.appendChild(script);
            //修改标题名称
			var html_code="<strong>"+value.toUpperCase()+" 集群"+"</strong>";
			$("#cluster_name_li").html(html_code);
			var html_code2="<h5>创建 "+value.toUpperCase()+" 集群</h5>";
			$("#cluster_label").html(html_code2);
			//修改cluster_head value 值，用于查询数据
			$("#cluster_head").attr("value",value)

		});
		change_active_li(this);
	});
	$(li).append(a);
	$("#cluster_ul").append(li);
}

function load_user_html(){
// ---------------------------------------- 系统管理 ----------------------------------------
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
	
// ---------------------------------------- 主机管理 ----------------------------------------
	$("#linux_hosts").click(function(){
		$("#index_main_content").load("linux_host.html",function(){
			var script = document.createElement('script');
			script.setAttribute('src', 'js/linux_host.js'); 
			document.body.appendChild(script);
		})
		change_active_li(this);
	});

// ---------------------------------------- 项目管理 ----------------------------------------
	$("#my_project").click(function(){
		$("#index_main_content").load("my_project.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/my_project.js");
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