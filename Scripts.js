function displayChannelsInformation() {
    var channelIdArray = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb",
            "noobs2ninjas"];
    var channelPanelsHolder = document.getElementById("channels-holder");
    channelIdArray.forEach(function(channeId, index, array) {
        channelPanelsHolder.append(buildChannelPanelElement(channeId));
        requestChannelInformation(channeId);
    });
}


function buildChannelPanelElement(channelId) {
    var channelIconElement = createChannelIconElement();
    var channelPanel = document.createElement("div");
    channelPanel.id = channelId;
    channelPanel.className  = "channel-panel";
    channelPanel.append(channelIconElement);
    channelPanel.append(createInformationPanelElement(channelId));
    return channelPanel;
}


function createChannelIconElement() {
    var userIcon = document.createElement("img");
    userIcon.src = "https://cdn3.iconfinder.com/data/icons/cat-force/256/cat_sleep.png";
    userIcon.height = 150;
    userIcon.width = 150;
    return userIcon;
}


function createInformationPanelElement(channelId) {
    var informationPanel = document.createElement("div");
    var statusElement = document.createElement("strong");
    statusElement.innerText = "Offline";
    statusElement.className = "offline-flag";

    informationPanel.className = "information-panel";
    informationPanel.append(buildChannelIdElement(channelId));
    informationPanel.append(statusElement);
    return informationPanel;
}


function buildChannelIdElement(channelId) {
    var goToImage = document.createElement("img");
    goToImage.src = "https://cdn3.iconfinder.com/data/icons/snowish/24x24/actions/go-jump.png";
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
    if(stream !== null) {
        var channelId = retrieveChannelId(userJsonData._links.channel);
        var channel = stream.channel;
        fillOnlineStatusInformation(channelId);
        setOnlineChannelIcon(channelId, channel);
        fillOnlineChannelInformation(channelId, stream);
    }
}


function retrieveChannelId(channelLink) {
    var pattern = /[^\/]*$/;
    var match = pattern.exec(channelLink);
    var channelId = match[0];
    return channelId;
}


function fillOnlineStatusInformation(channelId) {
    var statusElement = document.querySelector("#" + channelId + " strong");
    statusElement.innerText = "Online";
    statusElement.className = "online-flag";
}


function setOnlineChannelIcon(channelId, channel) {
    var imageAddress = channel.logo;
    var userIconElement = document.querySelector("#" + channelId + " img");
    userIconElement.src = imageAddress;
}


function fillOnlineChannelInformation(channelId, stream) {
    var informationPanel = document.querySelector("#" + channelId + " .information-panel");
    var channel = stream.channel;
    informationPanel.append(buildInforationElement("Game: ", channel.game));
    informationPanel.append(buildInforationElement("Status: ", channel.status));
    informationPanel.append(buildInforationElement("Viewers: ", stream.viewers));
}


function buildInforationElement(category, information) {
    var categoryName = document.createElement("span");
    categoryName.className = "category-name";
    categoryName.innerText = category;
    var dataLine = document.createElement("p");
    dataLine.append(categoryName);
    dataLine.append(information);
    return dataLine;
}
