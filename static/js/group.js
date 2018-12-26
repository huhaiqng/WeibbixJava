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
			});
			
			$("#save_add_group_btn").click(function(){
				console.log("save_add_group_btn");
				save_add_group();
			});
		});
	});
	
	get_groups()
	
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
				return false;
			}

			$("#create_group_btn").show();
			$("#create_group_div").hide();
			$("#create_group_row").remove();
			$("#group_tbody").empty();
			$("#groups_table_div").show();
			get_groups();
		},
		error: function (response) {
			return false;
		}
	});	
}

function get_groups(){
	$.ajax({
		type: "GET",
		url: "/api/get/groups",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			var groups = response.result;
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
	tr.appendChild(td);
	
	var td = document.createElement("td");
	var a = document.createElement("a");
	if(group.enable == true){
		a.innerText = "启用";
		a.className = "label label-primary"
	}
	else{
		a.innerText = "禁用";
		a.className = "label label-warning"
	}
	td.appendChild(a);
	tr.appendChild(td);
	
	var td = document.createElement("td");
	var a = document.createElement("a");
	a.className = "label label-success";
	a.innerText = "编辑";
	td.appendChild(a);
	td.innerHTML += " ";
	var a = document.createElement("a");
	a.innerText = "删除";
	a.className = "label label-danger";
	td.appendChild(a);
	tr.appendChild(td);
	
	tbody.appendChild(tr);
}