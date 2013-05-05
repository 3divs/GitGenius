var cred = 'client_id=eb9827e7a7daab7678ce&client_secret=b596b7ca0af0f554fe396e81cd647ebe4b0ebb4e';
// ''+'?'+cred

var requestHeader = {
  "accept": "application/vnd.github.raw",
  "content-type": "application/JSONP",
  "authorization": 'token b596b7ca0af0f554fe396e81cd647ebe4b0ebb4e',  
  "host": 'api.github.com'
};

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to GitGenius.";
  };

Meteor.loginWithGithub({
  requestPermissions: ['user', 'public_repo', 'repo']
}, function (err) {
  if (err)
    Session.set('errorMessage', err.reason || 'Unknown error');
});

$.ajax({
    url: 'https://api.github.com/orgs/3divs' + '?'+ cred,
    dataType: 'JSONP',
    success: function(){
            alert('hooray!');
    },
    error: function(data){
            console.log('sad', data);
    }
});

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

