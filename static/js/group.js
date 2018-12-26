$(function(){
	$("#create_group_div").hide();
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
});

function save_add_group(){
	var groupname = document.getElementById("new_groupname").value;
	var radio_value = $('input[name="optionsRadios"]:checked').val();
	if(groupname.length < 4){
		document.getElementById("groupname_error_info").innerHTML="组名必须不少于4个字符";
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

			$("#groups_table_div").show();
			$("#create_group_btn").show();
			$("#create_group_div").hide();
			$("#create_group_row").remove();
		},
		error: function (response) {
			console.log(response);
		}
	});	
}