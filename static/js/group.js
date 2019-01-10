$(function(){
	$("#create_group_row").remove();
	$("#create_group_btn").click(function(){
		$("#groups_table_div").hide();
		$("#create_group_btn").hide();
		$("#create_group_div").show();
		
		$("#create_group_div").load("group.html #create_group_row",function(){
			$("#console_add_group_btn").click(function(){
				$("#groups_table_div").show();
				$("#create_group_btn").show();
				$("#create_group_div").hide();
				$("#create_group_row").remove();
				$("#create_group_div").load("group.html #edit_group_row",function(){
					$("#console_edit_group_btn").click(function(){
						$("#edit_group_row").hide();
						$("#groups_table_div").show();
						$('#save_edit_group_btn').unbind("click");
					});
				});
			});
			
			$("#save_add_group_btn").click(function(){
				
				save_add_group();
			});
		});
	});
	
	get_groups();
	
	$("#console_edit_group_btn").click(function(){
		$("#edit_group_row").hide();
		$("#groups_table_div").show();
		$('#save_edit_group_btn').unbind("click");
	});
	
	$("#search_groupname_btn").click(function(){
		get_groups();
	});
});

function save_add_group(){
	var groupname = document.getElementById("new_groupname").value;
	var radio_value = $('input[name="optionsRadios"]:checked').val();
	if(groupname.length < 2){
		document.getElementById("groupname_error_info").innerHTML="组名必须不少于2个字符";
		$("#new_groupname").focus();
		return false;
	}
	
	data = {"groupName":groupname,"enabled":radio_value};
	
	$.ajax({
		type: "POST",
		url: "/api/group/add",
		data: JSON.stringify(data),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			if(response.status == "error"){
				document.getElementById("groupname_error_info").innerHTML=response.message;
				console.log("error");
				return false;
			}

			$("#create_group_div").load("group.html #edit_group_row",function(){
				$("#console_edit_group_btn").click(function(){
					$("#edit_group_row").hide();
					$("#groups_table_div").show();
					$('#save_edit_group_btn').unbind("click");
				});
			});
	
			$("#create_group_btn").show();
			$("#create_group_div").hide();
			$("#create_group_row").remove();
			$("#group_tbody").empty();
			$("#groups_table_div").show();
			get_groups();
		},
		error: function(response){
			console.log("error");
		}
	});	
}

function get_groups(){
	var options=$("#group_page_select option:selected"); 
	var onePageGroupsCount = options.val();
	var search_groupname = document.getElementById("search_groupname").value;
	
	$.ajax({
		type: "POST",
		url: "/api/get/groups",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		contentType: "application/json",
		data: JSON.stringify({"currentPage":1,"groupsCount":onePageGroupsCount,"search_groupname":search_groupname}),
		success: function(response){
			
			var totalPages = response.pages;
			var groups = response.groups;
			
			if(totalPages == 0){
				$.jqPaginator("#pagination", {
					totalPages: 1,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						// $("#p1").text(type + "：" + num)
						if(type == "change"){
							get_pages_groups_change(num,onePageGroupsCount,search_groupname);
						}
					}
				});
				
				$("#group_tbody").empty();
			}else{
				$.jqPaginator("#pagination", {
					totalPages: totalPages,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						// $("#p1").text(type + "：" + num)
						if(type == "change"){
							get_pages_groups_change(num,onePageGroupsCount,search_groupname);
						}
					}
				});
				
				$("#group_tbody").empty();
				for(i=0;i<groups.length;i++){
					create_group_line(groups[i]);
				}
			}

		}
	});
}

function get_pages_groups_change(currentPage,groupsCount,search_groupname){
	var onePageUsersCount = groupsCount;
	$.ajax({
		type: "POST",
		url: "/api/get/groups",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		contentType: "application/json",
		data: JSON.stringify({"currentPage":currentPage,"groupsCount":groupsCount,"search_groupname":search_groupname}),
		success: function(response){
		
			var totalPages = response.pages;
			var groups = response.groups;
			
			$.jqPaginator("#pagination", {
				totalPages: totalPages,
				visiblePages: 10,
				currentPage: currentPage,
				onPageChange: function(num, type) {
					// $("#p1").text(type + "：" + num)
					if(type == "change"){
						get_pages_groups_change(num,onePageUsersCount,search_groupname);
					}
				}
			});
			
			$("#group_tbody").empty();
			for(i=0;i<groups.length;i++){
				create_group_line(groups[i]);
			}
		}
	});
}

function create_group_line(group){
	var tbody = document.getElementById("group_tbody");
	
	var tr = document.createElement("tr");
	
	var td = document.createElement("td");
	td.textContent = group.groupName;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = get_group_users(group.groupId)
	tr.appendChild(td);
	
	var td = document.createElement("td");
	$(td).attr("align","center");
	var status_btn = document.createElement("a");
	if(group.enabled == true){
		status_btn.innerText = "启用";
		status_btn.className = "label label-primary"
	}
	else{
		status_btn.innerText = "禁用";
		status_btn.className = "label label-warning"
	}
	$(status_btn).click(function(){
		if(group.enabled){
			group.enabled = false;
		}
		else{
			group.enabled = true;
		}
		change_group_status(group.groupId,status_btn,group.enabled);
	});
	td.appendChild(status_btn);
	tr.appendChild(td);
	
	var td = document.createElement("td");
	$(td).attr("align","center");
	var edit_btn = document.createElement("a");
	edit_btn.className = "label label-success";
	edit_btn.innerText = "编辑";
	$(edit_btn).click(function(){
		edit_group(group);
	});
	td.appendChild(edit_btn);
	var blank = document.createElement("span");
	blank.innerHTML = "&nbsp;";
	td.appendChild(blank);
	
	var delete_btn = document.createElement("a");
	delete_btn.innerText = "删除";
	delete_btn.className = "label label-danger";
	$(delete_btn).click(function(){
		delete_group(group.groupId,tr);
	});
	td.appendChild(delete_btn);
	tr.appendChild(td);
	
	tbody.appendChild(tr);
}

function get_group_users(groupId){
	var group_users;
	
	$.ajax({
		type: "POST",
		url: "/api/get/groupUsers",
		contentType: "application/json",
		data: JSON.stringify(groupId),
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(response){
			group_users = response;
		}
	});
	return group_users;
}

function delete_group(groupId,tr){
	$.ajax({
		type: "POST",
		url: "/api/delete/group",
		data: JSON.stringify({"groupId":groupId}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(){
			$(tr).remove();
		}
	});
}

function change_group_status(groupId,status_btn,enabled){
	$.ajax({
		type: "POST",
		url: "/api/change/group/status",
		data: JSON.stringify({"groupId":groupId,"enabled":enabled}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(){
			if(status_btn.innerText == "启用"){
				status_btn.innerText = "禁用";
				$(status_btn).removeClass("label label-primary");
				$(status_btn).addClass("label label-warning");
			}
			else{
				status_btn.innerText = "启用";
				$(status_btn).removeClass("label label-warning");
				$(status_btn).addClass("label label-primary");
			}
		},
		error: function () {
			console.log("error");
		}
	});
}

function edit_group(group){
	$("#groups_table_div").hide();
	$("#create_group_div").show();
	$("#edit_group_row").show();
	document.getElementById("edit_groupname").value = group.groupName;
	
	if(group.enabled){
      $("#optionsRadios1").prop("checked",true);
	}else{
      $("#optionsRadios2").prop("checked",true);
	}
	
	$("#save_edit_group_btn").click(function(){
		save_edit_group(group.groupId);
	});
}

function save_edit_group(groupId){
	var groupname = document.getElementById("edit_groupname").value;
	var radio_value = $('input[name="optionsRadios"]:checked').val();
	if(groupname.length < 2){
		document.getElementById("groupname_error_info").innerHTML="组名必须不少于2个字符";
		$("#edit_groupname").focus();
		return false;
	}
	
	data = {"groupId":groupId,"groupName":groupname,"enabled":radio_value};
	
	$.ajax({
		type: "POST",
		url: "/api/update/group",
		data: JSON.stringify(data),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			if(response.status == "error"){
				document.getElementById("groupname_error_info").innerHTML=response.message;
				console.log("error");
				return false;
			}
			
			$("#edit_group_row").hide();
			$("#groups_table_div").show();
			$("#group_tbody").empty();
			get_groups();
			$('#save_edit_group_btn').unbind("click");
		},
		error: function (response) {
			return false;
		}
	});	
}