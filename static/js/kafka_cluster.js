var stompClient = null;

$(function(){
	$("#show_create_kafka_cluster_div_btn").click(function(){
		$("#kafka_clusters_table_div").hide();
		$("#create_kafka_clusters_div").show();
		select2Object = $("#host_select").select2();
		
		get_group_not_allocated_hosts();
	});
	
	$("#console_create_kafka_cluster_btn").click(function(){
		$("#create_kafka_clusters_div").hide();
		$("#kafka_clusters_table_div").show();
		reload_kafka_cluster_html();
	});
	
	$("#save_kafka_cluster_btn").click(function(){
		save_kafka_cluster();
	});
	
	$("#create_kafka_cluster_btn").click(function(){
		$("#result_pre").empty();
		$("#create_kafka_cluster_btn").prop("disabled",true);
		$("#create_kafka_cluster_back_btn").prop("disabled",true);
		
		var rec_btn = function(){
			$("#create_kafka_cluster_btn").prop("disabled",false);		
			$("#create_kafka_cluster_back_btn").prop("disabled",false);	
		}
		
		var api_uri="/api/shellCommand/createCluster";
		ws_connect(api_uri,rec_btn);
		
	});
	
	$("#create_kafka_cluster_back_btn").click(function(){
		$("#result_pre").empty();
		$("#commnad_div").hide();
		$("#kafka_clusters_table_div").show();
		$("#show_create_kafka_cluster_div_btn").prop("disabled",false);		
	});
	
	$("#recreate_kafka_cluster_back_btn").click(function(){
		$("#result_pre").empty();
		$("#commnad_div").hide();
		$("#kafka_clusters_table_div").show();
		$("#show_create_kafka_cluster_div_btn").prop("disabled",false);		
	});
	
	$("#console_edit_kafka_cluster_btn").click(function(){
		$("#index_main_content").load("kafka_cluster.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/kafka_cluster.js");
			document.body.appendChild(script);
		});
	});
	
	$("#save_edit_kafka_cluster_btn").click(function(){
		$("#save_edit_kafka_cluster_btn").prop("disabled",true);		
		save_edit_kafka_cluster();
		$("#index_main_content").load("kafka_cluster.html",function(){
			var script = document.createElement("script");
			script.setAttribute("src","js/kafka_cluster.js");
			document.body.appendChild(script);
		});
	});
	
	create_kafkaCluster_table();
})
//保存修改kafka cluster
function save_edit_kafka_cluster(){
	var clusterId = $("#edit_kafka_clustername").attr("value");
	//将新增的kafka主机添加到数据库
	$("#bootstrap-duallistbox-selected-list_").find("option").each(function(){
		var hcId = (new Date()).valueOf();
		sort = $(this).attr("data-sortindex");
		if(sort){
			ip = $(this).attr("value");
			add_kafka_cluster_host(hcId,clusterId,ip);
		}
	});
	//删除kafka集群主机
	$("#bootstrap-duallistbox-nonselected-list_").find("option").each(function(){
		select_status = $(this).attr("selected");
		if(select_status){
			ip = $(this).attr("value");
			del_kafka_cluster_host(clusterId,ip)
		}
	});
}
//将新增的kafka主机添加到数据库
function add_kafka_cluster_host(hcId,clusterId,ip){
	$.ajax({
		type: "POST",
		url: "/api/add/kafkaClusterHost",
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		data: JSON.stringify({"clusterId":clusterId,"ip":ip,"hcId":hcId}),
		success: function(response){
			
		}
	});
}

//删除kafka集群主机
function del_kafka_cluster_host(clusterId,ip){
	$.ajax({
		type: "POST",
		url: "/api/del/kafkaClusterHost",
		contentType: "application/json",
		data: JSON.stringify({"clusterId":clusterId,"ip":ip}),
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(response){

		}
	});
}


function create_kafkaCluster_table(){
	$.ajax({
		type: "GET",
		url: "/api/get/kafkaCluster",
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			for(i=0;i<response.length;i++){
				create_kafkaCluster_table_line(response[i]);
			}
		}
	});	
}

function create_kafkaCluster_table_line(kafkaCluster){
	var tbody = document.getElementById("kafka_clusters_table_tbody");
	
	var tr = document.createElement("tr");
	
	var td = document.createElement("td");
	td.textContent = kafkaCluster.clusterName;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = kafkaCluster.clusterEnv;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	var clusterMember = get_cluster_member(kafkaCluster.clusterId);
	td.textContent = clusterMember;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	// td.textContent = get_user_groups(user.userId);
	tr.appendChild(td);
	
	var td = document.createElement("td");
	$(td).attr("align","center");
	var command_btn = document.createElement("a");
	command_btn.className = "label label-success";
	command_btn.innerText = "创建";
	$(command_btn).click(function(){
		change_cluster(kafkaCluster,command_btn,clusterMember);
	});
	td.appendChild(command_btn);
	var blank = document.createElement("span");
	blank.innerHTML = "&nbsp;";
	td.appendChild(blank);
	
	var edit_btn = document.createElement("a");
	edit_btn.className = "label label-success";
	edit_btn.innerText = "编辑";
	$(edit_btn).click(function(){
		edit_kafka_cluster(kafkaCluster,edit_btn,clusterMember);
	});
	td.appendChild(edit_btn);
	var blank = document.createElement("span");
	blank.innerHTML = "&nbsp;";
	td.appendChild(blank);
	
	var delete_btn = document.createElement("a");
	delete_btn.innerText = "删除";
	delete_btn.className = "label label-danger";
	$(delete_btn).click(function(){
		delete_user(kafkaCluster.clusterId,tr);
	});
	td.appendChild(delete_btn);
	tr.appendChild(td);
	
	tbody.appendChild(tr);
}

//修改kafka集群
function edit_kafka_cluster(kafkaCluster,edit_btn,clusterMember){
	$("#edit_kafka_clustername").attr("value",kafkaCluster.clusterId);
	$("#edit_kafka_clustername").val(kafkaCluster.clusterName);
	$("#kafka_clusters_table_div").remove();
	$("#edit_kafka_cluster_div").show();
	
	
	$.ajax({
		type: "POST",
		url: "/api/getKafkaNoAllocatedHost",
		data: JSON.stringify({"clusterEnv":kafkaCluster.clusterEnv}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(kafka_no_allocated_host){
			var groups_select = document.getElementById("kafka_host_select");
			for(i=0;i<kafka_no_allocated_host.length;i++){
				var group_option = document.createElement("option");
				group_option.innerText = kafka_no_allocated_host[i];
				$(group_option).attr("value",kafka_no_allocated_host[i]);
				groups_select.appendChild(group_option);
			}
			for(j=0;j<clusterMember.length;j++){
				var group_option = document.createElement("option");
				group_option.innerText = clusterMember[j];
				$(group_option).attr("value",clusterMember[j]);
				$(group_option).attr("selected","true");
				groups_select.appendChild(group_option);
			}
			show_dual_listbox();
		}
	});

}

//展示选择列表
function show_dual_listbox(){
 	$('.dual_select').bootstrapDualListbox({
		selectorMinimalHeight: 160
	});
	$(".btn-group").remove();
	$(".filter").remove();
	$(".info-container").remove();
	$($(".box1").find("label")[0]).show();
	$($(".box2").find("label")[0]).show();
	$(".box1").find("label")[0].innerText = "未分配主机";
	$(".box2").find("label")[0].innerText = "已选主机";
}

function change_cluster(kafkaCluster,command_btn,clusterMember){
	$("#show_create_kafka_cluster_div_btn").prop("disabled",true);
	$("#kafka_clusters_table_div").hide();
	$("#commnad_div").show();
	$("#clusterName").text(kafkaCluster.clusterName);
	$("#clusertMember").text(clusterMember);
}

function delete_user(clusterId,tr){
	$.ajax({
		type: "POST",
		url: "/api/delete/kafkaCluster",
		data: JSON.stringify({"clusterId":clusterId}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(){
			$(tr).remove();
		}
	});
}

function get_cluster_member(clusterId){
	var clusterMembers;
	$.ajax({
		type: "POST",
		url: "/api/get/clusterMember",
		data: JSON.stringify({"clusterId":clusterId}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(response){
			clusterMembers = response;
		}
	});
	return clusterMembers;
}

function save_kafka_cluster(){
	var clusterId = (new Date()).valueOf();
	var clusterName = $("#kafka_clustername").val();
	var clusterEnv = $("#env_select option:selected").attr("value");
	
	data = {"clusterId":clusterId,"clusterName":clusterName,"clusterEnv":clusterEnv};
	$.ajax({
		type: "POST",
		url: "/api/add/kafkaCluster",
		data: JSON.stringify(data),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(){
			save_fafkaCluster_host(clusterId);
			$("#create_kafka_clusters_div").hide();
			$("#kafka_clusters_table_div").show();
			reload_kafka_cluster_html();
		}
	});	
}

function save_fafkaCluster_host(clusterId){
	$(".select2-selection__choice").each(function(){
		var hcId = (new Date()).valueOf();
		var id = $(this).attr("title");
		var option = document.getElementById(id);
		var hostId = $(option).attr("value");
		data = {"hcId":hcId,"hostId":hostId,"clusterId":clusterId},
		$.ajax({
			type: "POST",
			url: "/api/add/hostCluster",
			data: JSON.stringify(data),
			contentType: "application/json",
			async: false,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
			},
			success: function(){
				
			}
		});	
	})
}

function reload_kafka_cluster_html(){
	$("#index_main_content").load("kafka_cluster.html",function(){
		var script = document.createElement("script");
		script.setAttribute("src","js/kafka_cluster.js");
		document.body.appendChild(script);
	});
}

function get_group_not_allocated_hosts(hostGroup,envType){
	var hostGroup = "kafka";
	var envType = $("#env_select option:selected").attr("value"); 
	$.ajax({
		type: "POST",
		url: "/api/get/groupNotAllocatedHosts",
		data: JSON.stringify({"hostGroup":hostGroup,"envType":envType}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			var select = document.getElementById("host_select");
			$(select).empty();
			for(i=0;i<response.length;i++){
				var host = response[i];
				var option = document.createElement("option");
				$(option).text(host.ip);
				$(option).attr("id",host.ip);
				$(option).attr("value",host.hostId);
				select.appendChild(option);
			}
		}
	});	
}

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#notice").html("");
}

function showContent(body) {
	$("#result_pre").text($("#result_pre").text()+body.content);
}
