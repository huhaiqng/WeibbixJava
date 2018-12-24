$(function () {
	$("#usermanage").click(function(){
		$("#indexcontent").load("user.html");
		var script = document.createElement('script');
		script.async = false;
		script.setAttribute('src', 'js/user.js'); 
		document.body.appendChild(script);
    });
}); 