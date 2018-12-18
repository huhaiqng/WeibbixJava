$(document).ready(function () {
    $("#login").submit(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();
		signIn();
    });
	
/*  	window.onbeforeunload = function(){
		localStorage.removeItem("ls.token")
	} */
	
}); 


function signIn() {
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
				console.log("Response: "+JSON.stringify(response));

				window.location.href="index.html";
		},
			error: function (e) {
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