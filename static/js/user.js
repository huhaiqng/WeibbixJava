$(function () {
	$("#createUser").click(function(){
		console.log("hello js");
		$("#indexcontent").load("user.html");
		var script = document.createElement('script');
		script.async = false;
		script.setAttribute('src', 'js/user.js'); 
		document.body.appendChild(script);
    });
});