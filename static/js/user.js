$(function () {
	$("#create_user_div").hide();
	$("#create_user_row").remove();
	$("#create_user_btn").click(function(){
		$("#create_user_btn").hide();
		$("#users_table_div").hide();
		$("#create_user_div").show();
		$("#create_user_div").load("user.html #create_user_row",function(){
			$(".select2-container--default").css("width","600px");
			$(".select2_demo_2").select2();
			
			$("#console_add_user_btn").click(function(){
				$("#create_user_btn").show();
				$("#users_table_div").show();
				$("#create_user_div").hide();
				$("#create_user_row").remove();
			});
	
			$("#save_add_user_btn").click(function(){
				save_new_user();
			});
	
			$(":radio").click(function(){
				$(this).prop("checked", true);
			});
			
			create_group_select();
		});
	});
	
	creat_users_table();
	
	$("#console_edit_user_btn").click(function(){
		$("#edit_user_div").hide();
		$("#users_table_div").show();
		reset_edit_user_div();
	});
	
	$("#change_password_btn").click(function(){
		$("#no_change_password_div").hide();
		$("#change_password_div").show();
	});
});

function reset_edit_user_div(){
	$("#create_user_btn").show();
	$("#no_change_password_div").show();
	$("#change_password_div").hide();
	document.getElementById("edit_password1").value ="";
  document.getElementById("edit_password2").value = "";
	document.getElementById("new_add_user_fail_info").innerHTML="";
	$("#save_edit_user_btn").unbind("click");
	$("#groups_select").empty();
	$(".bootstrap-duallistbox-container").remove();
}

function show_dual_listbox(){
 	$('.dual_select').bootstrapDualListbox({
		selectorMinimalHeight: 160
	});
	$(".btn-group").remove();
	$(".filter").remove();
	$(".info-container").remove();
	$($(".box1").find("label")[0]).show();
	$($(".box2").find("label")[0]).show();
	$(".box1").find("label")[0].innerText = "未在的组";
	$(".box2").find("label")[0].innerText = "所在的组";
}

function create_group_select(){
	response = get_enabled_groups();
 	for(i=0;i<response.length;i++){
		var group_select = document.getElementById("group_select");
		var select_option = document.createElement("option");
		select_option.innerText = response[i].groupName;
		group_select.appendChild(select_option);
	}
}

function get_enabled_groups(){
	
	var enabled_groups;
	
	$.ajax({
		type: "GET",
		url: "/api/get/enabledGroups",
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(response){
			enabled_groups = response;
		}
	});
	return enabled_groups;
}

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
			if(response.status == "error"){
				document.getElementById("username_error_info").innerHTML=response.message;
				return false;
			}
			
			$(".select2-selection__choice").each(function(){
				groupName = $(this).attr("title");
				save_user_groups(new_username,groupName);
			});
			
			$("#create_user_btn").show();
			$("#users_table_div").show();
			$("#create_user_div").hide();
			$("#create_user_row").remove();
			$("#users_table_tbody").empty();
			creat_users_table();
		},
		error: function (response) {
			console.log(response);
		}
	});	
}

function save_user_groups(new_username,groupName){
	data = {"groupName":groupName,"userName":new_username};
	$.ajax({
		type: "POST",
		url: "/api/add/userGroups",
		data: JSON.stringify(data),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(){
		}
	});
}

function creat_users_table(){
	$.ajax({
		type: "GET",
		url: "/api/get/users",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			for(i=0;i<response.length;i++){
				create_user_table_line(response[i]);
			}
		}
	});
}

function create_user_table_line(user){
	var tbody = document.getElementById("users_table_tbody");
	
	var tr = document.createElement("tr");
	
	var td = document.createElement("td");
	td.textContent = user.userName;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = get_user_groups(user.userId);
	tr.appendChild(td);
	
	var td = document.createElement("td");
	var user_status_btn = document.createElement("a");
	if(user.enabled == true){
		user_status_btn.innerText = "启用";
		user_status_btn.className = "label label-primary"
	}
	else{
		user_status_btn.innerText = "禁用";
		user_status_btn.className = "label label-warning"
	}
	$(user_status_btn).click(function(){
		if(user.enabled){
			user.enabled = false;
		}
		else{
			user.enabled = true;
		}
		change_user_status(user,user_status_btn);
	});
	td.appendChild(user_status_btn);
	tr.appendChild(td);
	
	var td = document.createElement("td");
	
	var user_edit_btn = document.createElement("a");
	user_edit_btn.className = "label label-success";
	user_edit_btn.innerText = "编辑";
	$(user_edit_btn).click(function(){
		edit_user(user);
	});
	td.appendChild(user_edit_btn);
	var blank = document.createElement("span");
	blank.innerHTML = "&nbsp;";
	td.appendChild(blank);
	
	var user_delete_btn = document.createElement("a");
	user_delete_btn.innerText = "删除";
	user_delete_btn.className = "label label-danger";
	$(user_delete_btn).click(function(){
		delete_user(user.userId,tr);
	});
	td.appendChild(user_delete_btn);
	tr.appendChild(td);
	
	tbody.appendChild(tr);
}

function change_user_status(user,user_status_btn){
	$.ajax({
		type: "POST",
		url: "/api/change/user/status",
		data: JSON.stringify({"userId":user.userId,"enabled":user.enabled}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(){
			if(user_status_btn.innerText == "启用"){
				user_status_btn.innerText = "禁用";
				$(user_status_btn).removeClass("label label-primary");
				$(user_status_btn).addClass("label label-warning");
			}
			else{
				user_status_btn.innerText = "启用";
				$(user_status_btn).removeClass("label label-warning");
				$(user_status_btn).addClass("label label-primary");
			}
		},
		error: function () {
			console.log("error");
		}
	});
}
//更新用户
function edit_user(user){
	$("#create_user_btn").hide();
	$("#users_table_div").hide();
	$("#edit_user_div").show();
	document.getElementById("edit_username").value = user.userName;
	
	if(user.enabled){
      $("#edit_optionsRadios1").prop("checked",true);
	}else{
      $("#edit_optionsRadios2").prop("checked",true);
	}
	
	//生成 select option
	users_groups = get_enabled_groups();
	user_groups = get_user_groups(user.userId);
	
	var groups_select = document.getElementById("groups_select");
	
	for(i=0;i<users_groups.length;i++){
		var group_option = document.createElement("option");
		group_option.innerText = users_groups[i].groupName;
		$(group_option).attr("value",users_groups[i].groupName);
		for(j=0;j<user_groups.length;j++){
			if(user_groups[j] == users_groups[i].groupName){
				$(group_option).attr("selected","true");
				break;
			}
		}
		groups_select.appendChild(group_option);
	}
	
	show_dual_listbox();
	
	$("#save_edit_user_btn").click(function(){
		save_edit_user(user);
	});
}
//保存修改用户的信息
function save_edit_user(user){
	var userName = document.getElementById("edit_username").value;
	var radio_value = $('input[name="edit_optionsRadios"]:checked').val();
	
	edit_user_data = {"userId":user.userId,"userName":userName,"enabled":radio_value};
	
	
	//判断是否修改用户密码
	change_password_status = $("#change_password_div").attr("style");
	if(change_password_status != "display: none;"){
		if(!change_user_password(user.userId)){
			return false;
		};
	}
	
	//添加所属用户的组
	$("#bootstrap-duallistbox-selected-list_").find("option").each(function(){
		sort = $(this).attr("data-sortindex");
		if(sort){
			groupName = $(this).attr("value");
			save_user_groups(user.userName,groupName);
		}
	});
	
	//删除所属用户的组
	$("#bootstrap-duallistbox-nonselected-list_").find("option").each(function(){
		select_status = $(this).attr("selected");
		if(select_status){
			groupName = $(this).attr("value");
			delete_user_group(user.userName,groupName)
		}
	});
	
	//修改用户
	$.ajax({
		type: "POST",
		url: "/api/update/user",
		data: JSON.stringify(edit_user_data),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			$("#edit_user_div").hide();
			$("#users_table_tbody").empty();
			creat_users_table();
			$("#users_table_div").show();
			reset_edit_user_div();
		},
		error: function (response) {
			console.log(response);
		}
	});	
}

//删除用户组
function delete_user_group(userName,groupName){
	$.ajax({
		type: "POST",
		url: "/api/delete/userGroup",
		data: JSON.stringify({"userName":userName,"groupName":groupName}),
		contentType: "application/json",
		async: false,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			
		},
		error: function (response) {
			console.log(response);
		}
	});	
}

//修改用户密码
function change_user_password(userId){
	var user_password1 = document.getElementById("edit_password1").value;
	var user_password2 = document.getElementById("edit_password2").value;
	
	if(user_password1.length < 6){
		document.getElementById("username_error_info").innerHTML="";
		document.getElementById("new_password_length_error_info").innerHTML="密码必须不少于6个字符";
		$("#edit_password1").focus();
		return false;
	}
		
	if(user_password1!=user_password2){
		document.getElementById("new_password_length_error_info").innerHTML="";
		document.getElementById("new_add_user_fail_info").innerHTML="密码与确认密码确认不一致";
		$("#edit_password1").focus();
		return false;
	};
	
	user_data = {"userId":userId,"password":user_password1};
	$.ajax({
		type: "POST",
		url: "/api/update/userPassword",
		data: JSON.stringify(user_data),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
		},
		error: function (response) {
			console.log(response);
		}
	});	
	return true;
}

function get_user_groups(userId){
	var user_groups;
	
	$.ajax({
		type: "POST",
		url: "/api/get/userGroups",
		contentType: "application/json",
		data: JSON.stringify({"userId":userId}),
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(response){
			user_groups = response;
		}
	});
	return user_groups;
}

function delete_user(userId,tr){
	$.ajax({
		type: "POST",
		url: "/api/delete/user",
		data: JSON.stringify({"userId":userId}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(){
			$(tr).remove();
		}
	});
}