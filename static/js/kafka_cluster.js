$(function(){
	$("#show_create_kafka_cluster_div_btn").click(function(){
		$("#kafka_clusters_table_div").hide();
		$("#create_kafka_clusters_div").show();
		select2Object = $(".select2_demo_2").select2();
		
		var hostGroup = "kafka";
		var envType = $("#env_select option:selected").attr("value"); 
		get_group_not_allocated_hosts(hostGroup,envType);
	});
	
	$("#console_create_kafka_cluster_btn").click(function(){
		$("#create_kafka_clusters_div").hide();
		$("#kafka_clusters_table_div").show();
		reload_kafka_cluster_html();
	});
	
	$("#save_kafka_cluster_btn").click(function(){
		save_kafka_cluster();
	});
})

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