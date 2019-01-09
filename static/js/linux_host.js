$(function(){
	$("#create_host_btn").click(function(){
		$("#hosts_table_div").hide();
		$("#create_host_div").show();
	});
	
	$("#show_import_host_div_btn").click(function(){
		$("#hosts_table_div").hide();
		$("#import_host_div").show();
	});
	
	$("#import_host_btn").click(function(){
		$("#import_host_btn").prop("disabled",true);
		import_host();
	});
	
	$("#import_host_back_btn").click(function(){
		$("#hosts_table_div").show();
		$("#import_host_div").hide();
	});
	
	$("#search_hostname_btn").click(function(){
		get_hosts();
	});
	
	get_hosts();
});
//获取主机并在表中展示
function get_hosts(){
	$("#hosts_table_tbody").empty();
	
	var envType=$("#env_select option:selected").attr("value"); 
	var hostGroup=$("#group_select option:selected").attr("value");
	var ip = document.getElementById("search_hostname").value;
	
	var onePageHostsCount = $("#page_select option:selected").val();
	
	var data = {"envType":envType,"hostGroup":hostGroup,"ip":ip,"currentPage":1,"hostsCount":onePageHostsCount};
	
	$.ajax({
		type: "POST",
		url: "/api/get/hosts",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function(response){
			
// 			for(i=0;i<response.length;i++){
// 				create_host_line(response[i]);
// 			}
			
			var totalPages = response.pages;
			var hosts = response.hostList;
			
			if(totalPages == 0){
				$.jqPaginator("#pagination", {
					totalPages: 1,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						// $("#p1").text(type + "：" + num)
						if(type == "change"){
							// get_pages_hostss_change(num,onePageGroupsCount,search_groupname);
						}
					}
				});
				
				$("#hosts_table_tbody").empty();
			}else{
				$.jqPaginator("#pagination", {
					totalPages: totalPages,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						// $("#p1").text(type + "：" + num)
						if(type == "change"){
							// get_pages_groups_change(num,onePageGroupsCount,search_groupname);
						}
					}
				});
				
				$("#hosts_table_tbody").empty();
				for(i=0;i<hosts.length;i++){
					create_host_line(hosts[i]);
				}
			}
		}
	});
}

function create_host_line(host){
	var tbody = document.getElementById("hosts_table_tbody");
	
	var tr = document.createElement("tr");
	
	var td = document.createElement("td");
	td.textContent = host.hostName;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = host.ip;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = host.hostGroup;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = host.envType;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = host.osVersion;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	var info_btn = document.createElement("a");
	info_btn.className = "label label-success";
	info_btn.innerText = "详情";
	$(info_btn).click(function(){
		// edit_group(group);
	});
	td.appendChild(info_btn);
	var blank = document.createElement("span");
	blank.innerHTML = "&nbsp;";
	td.appendChild(blank);
	
	var delete_btn = document.createElement("a");
	delete_btn.innerText = "删除";
	delete_btn.className = "label label-danger";
	$(delete_btn).click(function(){
		// delete_group(group.groupId,tr);
	});
	td.appendChild(delete_btn);
	tr.appendChild(td);
	
	tbody.appendChild(tr);
}

function import_host(){
	var form = document.getElementById("fileUploadForm");
	var formData = new FormData(form);

	$.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/import/host",
        data: formData,
        //http://api.jquery.com/jQuery.ajax/
        //http://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: false,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
        cache: false,
        timeout: 600000,
        success: function (data) {
			$("#import_host_btn").prop("disabled",false);
			
// 
//             $("#result").text(data);
//             console.log("SUCCESS : ", data);
//             $("#btnSubmit").prop("disabled", false);
// 
        },
        error: function (e) {
			$("#import_host_btn").prop("disabled",false);
// 
//             $("#result").text(e.responseText);
//             console.log("ERROR : ", e);
//             $("#btnSubmit").prop("disabled", false);

        }
    });
}