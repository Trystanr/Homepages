//core element vars
var twitchList = $('#twitchCheck');
var hhhList = $('#hhhCheck');
var bmList = $('#bmCheck');

var bitRate = $('#rate')

function init() {
    buildTwitch();
    buildReddit();
    buildBookmarks();
    getIndicators();
}

function buildBookmarks() {
  var bmTemp = "";
  var bookmarks = [[
    "google",
    "reddit",
    "hotmail",
    "netflix",
    "youtube",
    "soundcloud",
    "pirate bay",
    "facebook",
    "tuks",
    "clickup",
    "whatsapp",
    "twitch",
  ],[
    "https://www.google.com/",
    "http://www.reddit.com/",
    "https://dub112.mail.live.com/default.aspx?id=64855",
    "http://www.netflix.com/browse",
    "https://www.youtube.com/",
    "https://soundcloud.com/",
    "http://thepiratebay.se/",
    "http://www.facebook.com/",
    "https://www1.up.ac.za/",
    "https://clickup.up.ac.za/webapps/login/",
    "https://web.whatsapp.com/",
    "http://www.twitch.tv/"
  ]];

  bookmarks[0].forEach(function(item){

    iCount = bookmarks[0].indexOf(item);

    // console.log(bookmarks[0][iCount]);
    // console.log(bookmarks[1][iCount]);

    bmTemp += "<li>";

    bmTemp += "<a href='";
    bmTemp += bookmarks[1][iCount];
    bmTemp += "'>";
    
    bmTemp += bookmarks[0][iCount];

    bmTemp += "</a>";
    bmTemp += "</li>";

  });

  bmList.html(bmTemp);
}

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
                        "drdisrespectlive"
                        ];

    for (var i = channelNames.length - 1; i >= 0; i--) {
      $.getJSON('https://api.twitch.tv/kraken/streams/' + channelNames[i] + '?client_id=i13gboueps0q51i7hxcglvx7j4ewgf', function(channel) {
          
          if (channel["stream"] == null) {
              // console.log("Offline");
          } else {
              //console.log("Online");

              twitchTemp += "<li>";

              twitchTemp += "<a href='";
              twitchTemp += channel["stream"]["channel"]["url"];

              twitchTemp += "' title='";
              twitchTemp += "Playing "+channel["stream"]["game"];
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

  $.getJSON('https://www.reddit.com/r/HipHopHeads/hot/.json?count=1', function(channel) {
    // console.log(channel.data.children[0].data.title);

    channel.data.children.forEach(function(post) {
      // console.log(post.data.title);
      
      if (post.data.title.substring(0,7).toUpperCase() == "[FRESH]") {
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
          hhhTemp += post.data.title.substring(8,40);
          hhhTemp += "...";
        }


        
        hhhTemp += "</a>";
        hhhTemp += "</li>";

        //console.log(post.data.title);
      } else if (post.data.title.substring(0,6).toUpperCase() == "[FRESH") {
        // console.log(post.data.title);
      }

    });

    hhhList.html(hhhTemp);
  });
}

function getIndicators() {
  var bitTemp = '';
  var bitHold = 0.0821;
  var n = 0.0;
  var x = 0.0;

  $.getJSON('https://api.coindesk.com/v1/bpi/currentprice.json', function(current) {
    n = parseFloat(current.bpi.USD.rate_float);

    bitTemp += (Math.floor((n * 0.0821)*100) / 100).toFixed(2);
    bitRate.html(bitTemp);
    console.log(n*bitHold);
  });
  
  
  $.getJSON('http://api.bitcoincharts.com/v1/markets.json', function(past) {
      console.log(past);
      // console.log(past[Object.keys(past)[0].name]);
      //x = parseFloat(past);
      
    });
  
}

function addClass(elementID, className) {
    $(elementID).classList.add(className);
}

function removeClass(elementID, className) {
    $(elementID).classList.remove(className);
}
