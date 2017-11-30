function retrieveChannelsResponse() {
    var targetUsersArray = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb",
            "noobs2ninjas"];
    targetUsersArray.forEach(function(user, index, array) {
        requestUserInformation(user);
    });

}


function requestUserInformation(userName) {
    body = document.getElementsByTagName("body")[0];
    scriptElement = document.createElement("script");
    scriptElement.src = "https://wind-bow.glitch.me/twitch-api/streams/" + userName +"?callback=processUserInformation";
    body.append(scriptElement);
    body.removeChild(scriptElement);
}


function processUserInformation(userJsonData) {

    userPanel = document.createElement("div");
    userPanel.class = "user-icon";

    userIcon = document.createElement("img");
    userIcon.src = "https://cdn3.iconfinder.com/data/icons/cat-force/256/cat_sleep.png";
    userIcon.height = 150;
    userIcon.width = 150;

    body = document.getElementsByTagName("body")[0];
    body.append(userIcon);
    console.log(userJsonData);
}
