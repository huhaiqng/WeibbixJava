$(function(){
	//获取账号类型
	get_account_type();
	
	$("#create_account_btn").click(function(){
		$("#account_table_div").hide();
		$("#create_account_div").show();
	});
	
	$("#save_account_btn").click(function(){
		save_account();
	});
	
	$("#create_account_back_btn").click(function(){
		$("#account_a").click();
	});
	
	$("#search_account_btn").click(function(){
		get_account();
	});
	
	get_account();
	
})

//保存账号
function save_account(){
	var id = (new Date()).valueOf().toString();
	var type = $("#create_account_type_select option:selected").attr("value");
	var name = $("#name").val();
	var user = $("#user").val();
	var password = $("#password").val();
	var addr = $("#addr").val();
	var notice = $("#notice").val();
	
	data = {"id":id,"type":type,"name":name,"user":user,"password":password,"addr":addr,"notice":notice};
	$.ajax({
		type: "POST",
		url: "/api/saveAccount",
		data: JSON.stringify(data),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			$("#account_a").click();
		}
	});
}
//获取账号类型
function get_account_type(){
	$.ajax({
		type: "GET",
		url: "/api/getAccountType",
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		async: false,
		success: function(types){
			for(i=0;i<types.length;i++){
				var type = types[i];
				var option = document.createElement("option");
				$(option).text(type);
				$(option).attr("value",type);
				$("#account_type_select").append(option);
			}
			for(i=0;i<types.length;i++){
				var type = types[i];
				var option = document.createElement("option");
				$(option).text(type);
				$(option).attr("value",type);
				$("#create_account_type_select").append(option);
			}
		}
	});
}

//获取一页账号
function get_account(){
	var type=$("#account_type_select option:selected").attr("value");
	var count = $("#one_page_count_select option:selected").val();
	var user = $("#search_account").val();
	var data = {"currentPage":1,"count":count,"user":user,"type":type};
	$.ajax({
		type: "POST",
		url: "/api/getOnePageAccount",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function(response){
			var pages = response.pages;
			var accounts = response.pageList;
			var account_type = type;
			
			if(pages == 0){
				$.jqPaginator("#pagination", {
					totalPages: 1,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						if(type == "change"){
							get_pages_account_change(num,count,account_type,user);
						}
					}
				});
				$("#account_table_tbody").empty();
			}else{
				$.jqPaginator("#pagination", {
					totalPages: pages,
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(num, type) {
						if(type == "change"){
							get_pages_account_change(num,count,account_type,user);
						}
					}
				});
				
				$("#account_table_tbody").empty();
				for(i=0;i<accounts.length;i++){
					create_account_table_line(accounts[i]);
				}
			}
			
			autoRowSpan(DataTables_Table_0,0,0);
			
		}
	});
}

function get_pages_account_change(num,count,account_type,user){
	var data = {"currentPage":num,"count":count,"user":user,"type":account_type};
	
	$.ajax({
		type: "POST",
		url: "/api/getOnePageAccount",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		contentType: "application/json",
		data: JSON.stringify(data),
		success: function(response){
		
			var pages = response.pages;
			var accounts = response.pageList;
			
			$.jqPaginator("#pagination", {
				totalPages: pages,
				visiblePages: 10,
				currentPage: num,
				onPageChange: function(num, type) {
					// $("#p1").text(type + "：" + num)
					if(type == "change"){
						get_pages_account_change(num,count,account_type,user);
					}
				}
			});
			
			$("#account_table_tbody").empty();
			for(i=0;i<accounts.length;i++){
				create_account_table_line(accounts[i]);
			}
			
			autoRowSpan(DataTables_Table_0,0,0);
		}
	});
}

//生成表格记录
function create_account_table_line(account){
	var tbody = document.getElementById("account_table_tbody");
	
	var tr = document.createElement("tr");
	
	var td = document.createElement("td");
	td.textContent = account.name;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = account.user;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = account.addr;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = account.notice;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	$(td).attr("align","center");
	var info_btn = document.createElement("a");
	info_btn.className = "label label-success";
	info_btn.innerText = "详情";
	$(info_btn).click(function(){
		account_info(account);
	});
	td.appendChild(info_btn);
	var blank = document.createElement("span");
	blank.innerHTML = "&nbsp;";
	td.appendChild(blank);
	
	var delete_btn = document.createElement("a");
	delete_btn.innerText = "删除";
	delete_btn.className = "label label-danger";
	$(delete_btn).click(function(){
		$.MsgBox.Confirm("温馨提示", "执行删除后将无法恢复，确定继续吗？", function ()
		{ 
			delete_account(account.id);
		});
	});
	td.appendChild(delete_btn);
	tr.appendChild(td);
	
	tbody.appendChild(tr);
}

//删除实例
function delete_account(id){
	$.ajax({
		type: "POST",
		url: "/api/deleteAccount",
		data: JSON.stringify({"id":id}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			$("#account_a").click();
		}
	});
}

//显示账号详情
function account_info(account){
	$("#a_name").text(account.name);
	$("#a_type").text(account.type);
	$("#a_user").text(account.user);
	$("#a_password").text(account.password);
	$("#a_addr").text(account.addr);
	$("#a_notice").text(account.notice);
	$("#account_info_div").show();
	var account_info = new mSlider({dom: "#account_info_div",direction: "right",distance:"40%"});
	account_info.open();
}