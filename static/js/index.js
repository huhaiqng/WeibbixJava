$(function () {
	load_user_html();
	
}); 

function load_user_html(){

	$("#usermanage").click(function(){
		$("#index_main_content").load("user.html",function(){
			var script = document.createElement('script');
			script.setAttribute('src', 'js/user.js'); 
			document.body.appendChild(script);
		});
		$(".active").removeClass("active");
        $(this).parent().addClass("active");
	});
	
	
 	$("#group_manage").click(function(){
	 	$("#index_main_content").load("group.html",function(){
			var script = document.createElement('script');
			script.setAttribute('src', 'js/group.js'); 
			document.body.appendChild(script);
		});
		$(".active").removeClass("active");
        $(this).parent().addClass("active");
    });

}