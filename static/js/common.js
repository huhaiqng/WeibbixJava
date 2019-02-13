function ws_connect(api_uri,recall) {
	
	var topic_uri = '/topic/' + Math.random().toString(36).substr(2);
	var socket = new SockJS('/api/endpoint-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        // stompClient.subscribe('/topic/server_info', function (result) {
		stompClient.subscribe(topic_uri, function (result) {
        	showContent(JSON.parse(result.body));
        });
    });
	
	$.ajax({
		type: "POST",
		// url: "/api/shellCommand/createCluster",
		url: api_uri,
		data: JSON.stringify({'topic_uri':topic_uri}),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("ls.token")).access_token)
		},
		success: function(response){
			ws_disconnect();
			recall();
		}
	});
}
//合并表格
function autoRowSpan(tb, row, col) {
    //上一个cell的值
    var lastValue = "";
    //本cell的值
    var value = "";
    var pos = 1;
    //tb.rows.lenght是一共有多少行
    for (var i = row; i < tb.rows.length; i++) {
        //从[0][0]开始读数据
        value = tb.rows[i].cells[col].innerText;
        //lastValue是上一个value的值
        if (lastValue == value) {
            //如果相等，删除本cell
            tb.rows[i].deleteCell(col);
            //rowSpan函数是js合并单元格的函数tb.rows[0].cells[0].rowSpan = 2
            tb.rows[i - pos].cells[col].rowSpan = tb.rows[i - pos].cells[col].rowSpan + 1;
            pos++;
        } else {
            //如果不相等，就将得到的cell的值赋值给lastValue
            lastValue = value;
            //pos
            pos = 1;
        }
    }
}
function ws_disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}