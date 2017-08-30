function GetClock() {
    var d = new Date();
    var nhour = d.getHours(),
        nmin = d.getMinutes();
    if (nmin <= 9) nmin = "0" + nmin

    document.getElementById('timedude').innerHTML = "" + nhour + ":" + nmin + "";
}

var tday = new Array("sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday");
var tmonth = new Array("jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec");

function GetClocka() {
    var a = new Date();
    var nday = a.getDay(),
        nmonth = a.getMonth(),
        ndate = a.getDate();

    document.getElementById('datedude').innerHTML = "" + tday[nday] + ", " + tmonth[nmonth] + " " + ndate + "";
}

window.onload = function() {
    buildTwitch();
    buildReddit();
    GetClocka();
    GetClock();
    setInterval(GetClock, 1000);
}

//core element vars
var twitchList = $('#twitchList');
var hhhList = $('#hhhList');

function buildTwitch() {
    var twitchTemp = "";
    var channelNames = [
        "gamesdonequick",
        "pokerstars",
        "northernlion",
        "dreamhackcs",
        "yogscast",
        "sips_",
        "sjin",
        "drdisrespectlive",
        "witwix",
        "vinesauce"
    ];

    var tempChan = "";

    twitchTemp += "<li><i class='fa fa-twitch'></i></li>";

    for (var i = channelNames.length - 1; i >= 0; i--) {
        
        $.getJSON('https://api.twitch.tv/kraken/streams/' + channelNames[i] + '?client_id=i13gboueps0q51i7hxcglvx7j4ewgf', function(channel) {

            if (channel["stream"] == null) {
                console.log("Offline");
            } else {
                //console.log("Online");

                twitchTemp += "<li>";

                twitchTemp += "<a href='";
                twitchTemp += channel["stream"]["channel"]["url"];

                twitchTemp += "' title='";
                twitchTemp += "Playing " + channel["stream"]["game"];
                twitchTemp += "'>";

                twitchTemp += channel["stream"]["channel"]["display_name"];

                twitchTemp += "</a>";
                twitchTemp += "</li>";

            }
            twitchList.html(twitchTemp);
        });
    };
}

function buildReddit() {
    var hhhTemp = "";

    hhhTemp += "<li><i class='fa fa-circle-o'></i></li>";

    $.getJSON('https://www.reddit.com/r/HipHopHeads/hot/.json?count=1', function(channel) {
        // console.log(channel.data.children[0].data.title);

        channel.data.children.forEach(function(post) {
            // console.log(post.data.title);

            if (post.data.title.substring(0, 7).toUpperCase() == "[FRESH]") {
                //Fresh song bro
                hhhTemp += "<li>";

                hhhTemp += "<a href='";
                hhhTemp += post.data.url;

                hhhTemp += "' title='";
                hhhTemp += post.data.title.substring(8);
                hhhTemp += "'>";

                if (post.data.title.length < 40) {
                    hhhTemp += post.data.title.substring(8);
                    //console.log(post.data.title.length);
                } else {
                    hhhTemp += post.data.title.substring(8, 40);
                    hhhTemp += "...";
                }



                hhhTemp += "</a>";
                hhhTemp += "</li>";

                //console.log(post.data.title);
            } else if (post.data.title.substring(0, 6).toUpperCase() == "[FRESH") {
                console.log(post.data.title);
            }

        });

        hhhList.html(hhhTemp);
    });
}

function addClass(elementID, className) {
    $(elementID).classList.add(className);
}

function removeClass(elementID, className) {
    $(elementID).classList.remove(className);
}