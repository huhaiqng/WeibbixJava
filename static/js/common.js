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

function ws_disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}