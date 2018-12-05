function checkWin($element, $treasureItem) {
    var winner = false;

    if ($element.attr("id") === $treasureItem) {
        winner = true;
    }

    return winner;
};

function setRandom() {
    var treasure = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var random = Math.floor((Math.random() * 8));

    return treasure[random];
}

function chat($websocket) {
    $websocket.send($.trim($('#chatInput').val()));

    $websocket.onerror = function (error) {
        alert("websocket error:" + error);
    }
}

$(document).ready(function () {

    var WebSocketURI = "ws://echo.websocket.org";
    var webSocket = new WebSocket(WebSocketURI);

    $('#chatSubmit').click(function () {
        chat(webSocket);
    }
    )

    webSocket.onmessage = function (evt) {
        var received = evt.data;
        $("<br><span style='color:blue;'>Reply: " + received + "</span>").appendTo('#chatOutput');
    }

    var treasureItem = setRandom()

    $("td").click(function () {
        if (checkWin($(this), treasureItem)) {
            $(this).removeClass("bg-light").addClass("bg-success");
            alert("Well Done!")
        }
        else {
            $(this).removeClass("bg-light").addClass("bg-danger");
        }
    })
});