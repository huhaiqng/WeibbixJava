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
})

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
		
		}
	});	
}