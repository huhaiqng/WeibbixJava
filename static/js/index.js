$(function () {
/* 	$("#usermanage").click(function(){
	 	$("#indexcontent").load("user.html");
		var script = document.createElement('script');
		script.async = false;
		script.setAttribute('src', 'js/user.js'); 
		document.body.appendChild(script);
    }); */
	
	load_user_html();
	
}); 

function load_user_html(){
	$("#usermanage").click(function(){
	 	$("#indexcontent1").load("user.html #user_head");
		$("#indexcontent2").load("user.html #users_table_div");
		var script = document.createElement('script');
		script.async = false;
		script.setAttribute('src', 'js/user.js'); 
		document.body.appendChild(script);
		$(".active").removeClass("active");
        $(this).parent().addClass("active");
    });
	
	$("#group_manage").click(function(){
	 	$("#indexcontent1").load("group.html #group_head");
		$("#indexcontent2").load("group.html #groups_table_div",function(){
			var script = document.createElement('script');
			script.setAttribute('src', 'js/group.js'); 
			document.body.appendChild(script);
		});
		$(".active").removeClass("active");
        $(this).parent().addClass("active");
    });
}