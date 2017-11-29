function retrieveChannelsResponse() {
    var targetUsersArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb",
            "noobs2ninjas"];
    targetUsersArray.forEach(function(user, index, array) {

    });
    retrieveJsonResponseForUser("RobotCaleb");
}


function retrieveJsonResponseForUser(user) {
    var requestUrl =  "https://wind-bow.gomix.me/twitch-api/streams/" + user + "";
    console.log(requestUrl);
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function() {
        if(xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            jsonResponse = JSON.parse(xmlHttpRequest.responseText);
            console.log(jsonResponse);
        }
    };
    xmlHttpRequest.open("GET", requestUrl, true);
    //xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "inventado-no-nulo");
    xmlHttpRequest.send();
}
