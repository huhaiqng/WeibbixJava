var stompClient = null;

$(function(){
	$("#show_create_kafka_cluster_div_btn").click(function(){
		$("#kafka_clusters_table_div").hide();
		$("#create_kafka_clusters_div").show();
		select2Object = $(".select2_demo_2").select2();
		
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
		connect();
	});
	
	create_kafkaCluster_table();
})

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
	command_btn.innerText = "任务";
	$(command_btn).click(function(){
		change_cluster(kafkaCluster,command_btn,clusterMember);
	});
	td.appendChild(command_btn);
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

function connect() {
	var socket = new SockJS('/api/endpoint-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/server_info', function (result) {
        	showContent(JSON.parse(result.body));
        });
    });
	
	$.ajax({
		type: "GET",
		url: "/api/shellCommand/createCluster",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(){
			
		}
	})
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/v4/schedule/push", {}, JSON.stringify({'content': $("#content").val(), 'to':$("#to").val(), 'from':$("#from").val()}));
}

function showContent(body) {
    console.log(body.content);
    // $("#notice").prepend("<tr><td>" + body.content + "</td> <td>"+new Date(body.time).toLocaleString()+"</td></tr>");
	
    // $("#result_pre").append("<p>"+body.content+"</p>");
	$("#result_pre").text($("#result_pre").text()+body.content);
}

// $(function () {
//     $("form").on('submit', function (e) {
//         e.preventDefault();
//     });
//     $( "#connect" ).click(function() { connect(); });
//     $( "#disconnect" ).click(function() { disconnect(); });
//     $( "#send" ).click(function() { sendName(); });
// });