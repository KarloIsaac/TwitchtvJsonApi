function retrieveChannelsResponse() {
    var channelIdArray = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb",
            "noobs2ninjas"];
    channelIdArray.forEach(function(channeId, index, array) {
        requestChannelInformation(channeId);
    });

}


function requestChannelInformation(channeId) {
    var body = document.getElementsByTagName("body")[0];
    var scriptElement = document.createElement("script");
    scriptElement.src = "https://wind-bow.glitch.me/twitch-api/streams/" + channeId +
            "?callback=processChannelInformation";
    body.append(scriptElement);
    body.removeChild(scriptElement);
}


function processChannelInformation(userJsonData) {
console.log(userJsonData);
    var stream = userJsonData.stream;
    var channelId = retrieveChannelId(userJsonData._links.channel);
    var channel = stream === null ? null : stream.channel;
    var channelIcon = createChannelIconElement(channel);

    var channelPanel = document.createElement("div");
    channelPanel.className  = "channel-panel";
    channelPanel.append(channelIcon);
    channelPanel.append(createInformationPanelElement(channel, channelId));

    var channelsPanel = document.getElementById("channels-holder");
    channelsPanel.append(channelPanel);
}


function retrieveChannelId(channelLink) {
    var pattern = /[^\/]*$/;
    var match = pattern.exec(channelLink);
    var channelId = match[0];
    return channelId;
}


function createChannelIconElement(channel) {
    var imageAddress = channel === null
            ? "https://cdn3.iconfinder.com/data/icons/cat-force/256/cat_sleep.png"
            : channel.logo;
    var userIcon = document.createElement("img");
    userIcon.src = imageAddress;
    userIcon.height = 150;
    userIcon.width = 150;
    return userIcon;
}


function createInformationPanelElement(channel, channelId) {
    var channelName = document.createElement("h2");
    channelName.innerText = channelId;
    var informationPanel = document.createElement("div");
    informationPanel.append(channelName);
    return informationPanel;
}
