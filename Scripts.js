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
    var stream = userJsonData.stream;
    var channelId = retrieveChannelId(userJsonData._links.channel);
    var channel = stream === null ? null : stream.channel;
    var channelIcon = createChannelIconElement(channel);

    var channelPanel = document.createElement("div");
    channelPanel.className  = "channel-panel";
    channelPanel.append(channelIcon);
    channelPanel.append(createInformationPanelElement(stream, channelId));

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


function createInformationPanelElement(stream, channelId) {
    var isChannelOffline = stream === null;
    var informationPanel = document.createElement("div");
    informationPanel.append(buildChannelIdElement(channelId));
    informationPanel.append(buildStatusElement(isChannelOffline));
    if (stream !== null) {
        var channel = stream.channel;
        informationPanel.append(buildInforationElement("Game: ", channel.game));
        informationPanel.append(buildInforationElement("Status: ", channel.status));
        informationPanel.append(buildInforationElement("Viewers: ", stream.viewers));
    }
    return informationPanel;
}


function buildChannelIdElement(channelId) {
    var goToImage = document.createElement("img");
    goToImage.src = "";
    goToImage.alt = "go to channel"

    var channelLink = document.createElement("a");
    channelLink.href = "https://www.twitch.tv/" + channelId;
    channelLink.title = "go to channel";
    channelLink.append(goToImage);
    channelLink.target = "_blank";

    var channelName = document.createElement("h2");
    channelName.innerText = channelId;
    channelName.append(channelLink);
    return channelName;
}


function buildStatusElement(isChannelOffline) {
    var statusElement = document.createElement("span");
    statusElement.innerText = isChannelOffline ? "Offline" : "Online";
    statusElement.className = isChannelOffline ? "offline-flag" : "online-flag";
    return statusElement;
}


function buildInforationElement(category, information) {
    var dataLine = document.createElement("p");
    dataLine.innerText = category + information;
    return dataLine;
}
