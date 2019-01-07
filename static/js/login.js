$(document).ready(function () {

    $("#login").submit(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();
				signIn();
    });
	
/*  	window.onbeforeunload = function(){
		localStorage.removeItem("ls.token")
	} */
	
// 	 $('#isRmbPwd').click(function () {
//         if (!$('#isRmbPwd').attr('checked')) {
//             var cookie = new rememberPassword();
//             cookie.cookieDelete();
//         }
//     });
//     //cookie记住密码
//     var cookie = new rememberPassword();
//     cookie.cookieInit();
	
}); 


function signIn() {
	
	var login_username = document.getElementById("username").value;
	localStorage.setItem("login_username",login_username);
	
	$.ajax({
		type : 'POST',
		url : '/oauth/token',
		data : {
			'client_id' : 'test',
			'client_secret' : '123456',
			'grant_type' : 'password',
			'username' : encodeURIComponent($('#username').val()),
			'password' : encodeURIComponent($('#password').val()),
			'scope' : 'read write'
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader('Authorization', 'Basic dGVzdDoxMjM0NTY=')
		   },
		success : function(response) {
			 var expiredAt = new Date();
				expiredAt.setSeconds(expiredAt.getSeconds() + response.expires_in);
				response.expires_at = expiredAt.getTime();
				localStorage.setItem('ls.token', JSON.stringify(response));
				$.cookie("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token );				
				
// 				if ($('#isRmbPwd').is(':checked')) {
// 						var cookie = new rememberPassword();
// 						cookie.cookieRemeber();
// 				}
				// console.log("Response: "+JSON.stringify(response));
				window.location.href="./";
		},
			error: function (e) {
				document.getElementById("login_err_info_p").innerHTML = "登陆失败，请确保输入的用户名和密码正确!";
				console.log("ERROR : ", e);
		}
	});		
}

/* function apiBar(){
	$.ajax({
			url: '/api/bar',
			type: 'GET',
			beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token )
			},
			success: function(data) {}
			});
		    console.log("Apibar: "+"Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token);
} */

function rememberPassword() {
    //存储变量
    this.username = $('#username').val();
    this.password = $('#password').val();
    this.cookie;
    if (!!$.cookie('user')) {
        this.cookie = eval($.cookie('user'));
    } else {
        $.cookie('user', '[]');
        this.cookie = eval($.cookie('user'));
    };
}
rememberPassword.prototype = {
    cookieInit: function() { //初始化
        var temp = this.cookie,
				username = this.username,
        start = false;
        console.log(temp);
        if (temp.length > 0) {
            $.each(temp, function(i, item) {
                if (item.first == true) {
                    $('#username').val(item.username);
                    $('#password').val(item.password);
                    $('#isRmbPwd').attr('checked', true)
                }
            });
        }
        $('#username').blur(function() {
            console.log('失去焦点');
            //检查是否存在该用户名,存在则赋值，不存在则不做任何操作
            $.each(temp, function(i, item) {
                if (item.username == $('#username').val()) {
                    $('#username').val(item.username);
                    $('#password').val(item.password);
                    $('#isRmbPwd').attr('checked', true)
                    start = true;
                    return false;
                } else {
                    $('#password').val('');
                }

            });
        });
    },
    //记住密码
    cookieRemeber: function() {
        var temp = this.cookie,
				username = this.username,
				password = this.password,
				start = false;
        //检测用户是否存在
        $.each(temp, function(i, item) {
            if (item.username == username) {
                //记录最后一次是谁登录的
                item.first = true;
                $('#password').val(item.password);
                start = true;
                return;
            } else {
                item.first = false;
            }
        });
        //不存在就把用户名及密码保存到cookie中
        if (!start) {
            temp.push({
                username: username,
                password: password,
                first: true
            });
        }
        //存储到cookie中
        $.cookie('user', JSON.stringify(temp));

        //持久化储存写法，解决浏览器关闭不储存的情况
        $.cookie('user', JSON.stringify(temp), { expires: 7 });
		//注：当指明时间时，故称为持久cookie，并且有效时间为天。
	}, 
	//删除密码 
	cookieDelete: function() { 
		var temp = this.cookie, 
		username = this.username, 
		num = 0; 
		//检测用户是否存在 
		$.each(temp, function(i, item) { 
		if (item.username === username) { 
			num = i; 
		} }); 
		//删除里面的密码 
		temp.splice(num, 1); 
		//存储到cookie中 
		$.cookie('user', JSON.stringify(temp)); 
	} 
}