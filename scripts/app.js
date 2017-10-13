var requestParams = {
  
  url: "https://api.twitch.tv/kraken/users",
  
  headers: {
    "Accept" : "  application/vnd.twitchtv.v5+json",
    "Client-ID": "q8w9el0loiq8vlrqfowbxirlxqowgt"
  },
  
  data: {
    login: "freecodecamp"
  },
  
  type: 'GET',
  
  success: function(data) {
    console.log(data);
    
    var displayName = '';
    var userId = 0;
    var logo = '';
    var users = data.users;
    
    users.forEach(function(user) {
      // console.log(user);
      
      userId = user._id;
      logo = user.logo;
      displayName = user['display_name'];
     
    });
    
    if (isStreaming(userId)) {
       console.log("Free Code Camp is currently streaming on Twitch");
    } else {
      console.log("Currently not streaming!");
    }
    
    addToList(displayName, isStreaming(userId), logo);
  },
  
  fail: function(xhr, error) {
    console.log(error);
  }
}

$(function() {
  $.ajax(requestParams);
});

function isStreaming(channelID) {
  $.ajax({
    url: "https://api.twitch.tv/kraken/streams/" + channelID,
    
    headers: {
    "Accept" : "  application/vnd.twitchtv.v5+json",
    "Client-ID": "q8w9el0loiq8vlrqfowbxirlxqowgt"
  },
    
    type: 'GET',
    
    success: function(data) {
      // console.log(data);
      
      if (!data.stream) {
        return false;
      } else {
        return true;
      }
    },
    
    fail: function(xhr, error) {
      console.log(error);
    }
    
  })
}

function addToList(displayName, streamingStatus, logo) {
  var $img = $("<img>");
  var $imgDiv = $("<div>").addClass("image-container");
  $img.attr("src", logo);
  $img.addClass("rounded");
  // $imgDiv.append($img).appendTo(".streamers-list");
  $imgDiv.append($img);
  
  var $heading = $("<h3>").text(displayName);
  var status = '';
  if (streamingStatus) {
    status = 'online';
  } else {
    status = 'offline';
  }
  
  var $span = $("<span>");
  var $onlineDiv = $("<div>");
  var $offLineDiv = $("<div>");
  if (status == "online") {
    // $onlineDiv.append($img);
    $span.text(status);
    $heading.append($span);
    $onlineDiv.addClass("is-online");
    // $onlineDiv.append($imgDiv);
    $onlineDiv.append($heading);
    // $onlineDiv.append($span);
   
    $(".streamers-list").append($onlineDiv);
  }
  
  else {
    // $offLineDiv.append($img);
    $span.text(status);
    $heading.append($span);
    $offLineDiv.addClass("is-offline");
    // $img.append($heading);
    // $offLineDiv.append($imgDiv);
    $offLineDiv.append($heading);
    // $offLineDiv.append($span);
    $(".streamers-list").append($offLineDiv);
  }
}
