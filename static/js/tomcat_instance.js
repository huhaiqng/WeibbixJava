$(function(){
	$("#create_tomcat_instance_btn").click(function(){
		$("#tomcat_instance_table_div").hide();
		$("#create_tomcat_instance_div").show();
		select2Object = $("#tomcat_instance_template_select").select2();
		
		//获取主机
		var hosts = get_host_for_create_instance("tomcat");
		
		var select = document.getElementById("tomcat_instance_host_select");
		$(select).empty();
		for(i=0;i<hosts.length;i++){
			var host = hosts[i];
			var option = document.createElement("option");
			$(option).text(host.ip + " " + host.ins_num);
			$(option).attr("id",host.ip);
			select.appendChild(option);
		}
		select2Object = $("#tomcat_instance_host_select").select2();
		
	});
	
	$("#save_create_tomcat_instance_btn").click(function(){
		save_create_tomcat_instance();
	});
})

//保存实例
function save_create_tomcat_instance(){
	var env = $("#tomcat_instance_env_select option:selected").attr("value"); 
	$("#tomcat_instance_template_select_div .select2-selection__choice").each(function(){
		console.log($(this).attr("title"));
	});
}

//获取要创建实例的主机
function get_host_for_create_instance(hostGroup){
	var hosts = [];
	var hostGroup = hostGroup;
	var envType = $("#tomcat_instance_env_select option:selected").attr("value"); 
	
	$.ajax({
		type: "POST",
		url: "/api/getHostForCreateInstance",
		data: JSON.stringify({"hostGroup":hostGroup,"envType":envType}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(response){
			hosts = response;
		}
	});
	return hosts;
}