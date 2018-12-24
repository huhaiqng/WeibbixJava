$(function () {
	
	$("#create_user_div").hide();
	
	$("#create_user_btn").click(function(){
		$("#create_user_btn").hide();
		$("#users_table_div").hide();
		$("#create_user_div").show();
		
    });
	
	$("#console_add_user_btn").click(function(){
		show_users_table();
	});
	
	$("#save_add_user_btn").click(function(){
		save_new_user();
	});
	
	$(":radio").click(function(){
		$(this).prop("checked", true);
	});
});

function save_new_user(){
	var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
	var new_username = document.getElementById("new_username").value;
	var radio_value = $('input[name="optionsRadios"]:checked').val();
	
	if(new_username.length < 4){
		document.getElementById("username_error_info").innerHTML="用户名必须不少于4个字符";
		$("#new_username").focus();
		return false;
	}
	
	if(password1.length < 6){
		document.getElementById("username_error_info").innerHTML="";
		document.getElementById("password_length_error_info").innerHTML="密码必须不少于6个字符";
		$("#password1").focus();
		return false;
	}
		
	if(password1!=password2){
		document.getElementById("password_length_error_info").innerHTML="";
		document.getElementById("add_user_fail_info").innerHTML="密码与确认密码确认不一致";
		$("#password2").focus();
		return false;
	};
	
	new_user = {"userName":new_username,"password":password1,"enabled":radio_value};
	
	$.ajax({
		type: "POST",
		url: "/api/user/add",
		data: JSON.stringify(new_user),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			console.log(response);
			if(response.status == "error"){
				document.getElementById("username_error_info").innerHTML=response.message;
				return false;
			}
			show_users_table();
		},
		error: function (response) {
			console.log(response);
		}
	});	
}

function show_users_table(){
/* 	$("#create_user_btn").show();
	$("#users_table_div").show();
	$("#create_user_div").hide(); */
	$("#indexcontent").load("user.html");
	var script = document.createElement('script');
	script.async = false;
	script.setAttribute('src', 'js/user.js'); 
	document.body.appendChild(script);	
}