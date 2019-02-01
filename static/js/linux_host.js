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
		get_hosts();
	});
	
	$("#search_hostname_btn").click(function(){
		get_hosts();
	});
	
	$("#host_info_back_btn").click(function(){
		$("#hosts_table_div").show();
		$("#host_info_div").hide();
		$("#show_import_host_div_btn").prop("disabled",false);
		// get_hosts();
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
			
			var totalPages = response.pages;
			var hosts = response.pageList;
			
			if(totalPages == 0){
				$.jqPaginator("#pagination", {
					totalPages: 1,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						if(type == "change"){
							get_pages_hosts_change(num,onePageHostsCount,envType,hostGroup,ip);
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
						if(type == "change"){
							get_pages_hosts_change(num,onePageHostsCount,envType,hostGroup,ip);
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

function get_pages_hosts_change(currentPage,hostsCount,envType,hostGroup,ip){
	var data = {"envType":envType,"hostGroup":hostGroup,"ip":ip,"currentPage":currentPage,"hostsCount":hostsCount};
	$.ajax({
		type: "POST",
		url: "/api/get/hosts",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function(response){
		
			var totalPages = response.pages;
			var hosts = response.hostList;
			
			$.jqPaginator("#pagination", {
				totalPages: totalPages,
				visiblePages: 10,
				currentPage: currentPage,
				onPageChange: function(num, type) {
					// $("#p1").text(type + "：" + num)
					if(type == "change"){
						get_pages_hosts_change(num,hostsCount,envType,hostGroup,ip);
					}
				}
			});
			
			$("#hosts_table_tbody").empty();
			for(i=0;i<hosts.length;i++){
				create_host_line(hosts[i]);
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
	$(td).attr("align","center");
	var status_btn = document.createElement("a");
	if(host.enabled == true){
		status_btn.innerText = "是";
		status_btn.className = "label label-primary"
	}
	else{
		status_btn.innerText = "否";
		status_btn.className = "label label-warning"
	}
	$(status_btn).click(function(){
		if(host.enabled){
			host.enabled = false;
		}
		else{
			host.enabled = true;
		}
		change_host_status(host.hostId,status_btn,host.enabled);
	});
	td.appendChild(status_btn);
	tr.appendChild(td);
	
	var td = document.createElement("td");
	$(td).attr("align","center");
	var info_btn = document.createElement("a");
	info_btn.className = "label label-success";
	info_btn.innerText = "详情";
	$(info_btn).click(function(){
		host_info(host);
	});
	td.appendChild(info_btn);
	var blank = document.createElement("span");
	blank.innerHTML = "&nbsp;";
	td.appendChild(blank);
	
	var delete_btn = document.createElement("a");
	delete_btn.innerText = "删除";
	delete_btn.className = "label label-danger";
	$(delete_btn).click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？温馨提示", function ()
		{ 
			delete_host(host.hostId);
		});
	});
	td.appendChild(delete_btn);
	tr.appendChild(td);
	
	tbody.appendChild(tr);
}

function change_host_status(hostId,status_btn,enabled){
	$.ajax({
		type: "POST",
		url: "/api/change/host/status",
		data: JSON.stringify({"hostId":hostId,"enabled":enabled}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(){
			if(status_btn.innerText == "是"){
				status_btn.innerText = "否";
				$(status_btn).removeClass("label label-primary");
				$(status_btn).addClass("label label-warning");
			}
			else{
				status_btn.innerText = "是";
				$(status_btn).removeClass("label label-warning");
				$(status_btn).addClass("label label-primary");
			}
		},
		error: function () {
			console.log("error");
		}
	});
}

function delete_host(hostId){
	$.ajax({
		type: "POST",
		url: "/api/delete/host",
		contentType: "application/json",
		data: JSON.stringify({"hostId":hostId}),
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			get_hosts();
		}
	});
}

function host_info(host){
	
	$("#show_import_host_div_btn").prop("disabled",true);
	$("#hosts_table_div").hide();
	$("#host_info_div").show();
	
	$("#hostName").text(host.hostName);
	$("#ip").text(host.ip);
	$("#envType").text(host.envType);
	$("#hostGroup").text(host.hostGroup);
	$("#place").text(host.place);
	$("#rootPassword").text(host.rootPassword);
	if(host.allocated){
		$("#allocated").text("是");
	}else{
		$("#allocated").text("否");
	}
	$("#createdAt").text(new Date(host.createdAt).toLocaleString());
	$("#osVersion").text(host.osVersion);
	$("#configuration").text(host.configuration);
	$("#hostType").text(host.hostType);
	if(host.enabled){
		$("#enabled").text("是");
	}else{
		$("#enabled").text("否");
	}
	
	$("#esxiIp").text(host.esxiIp);
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