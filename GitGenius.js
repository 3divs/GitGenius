/*var cred = 'client_id=eb9827e7a7daab7678ce&client_secret=b596b7ca0af0f554fe396e81cd647ebe4b0ebb4e';*/
// ''+'?'+cred

var requestHeader = {
  "accept": "application/vnd.github.raw",
  "content-type": "application/JSONP",
  "authorization": 'token b596b7ca0af0f554fe396e81cd647ebe4b0ebb4e',  
  "host": 'api.github.com'
};

if (Meteor.isClient) {
/*Meteor.loginWithGithub({
  requestPermissions: ['user', 'public_repo', 'repo']
}, function (err) {

  if (err)
    Session.set('errorMessage', err.reason || 'Unknown error');
  });*/

  Meteor.Router.add({
    '/': 'home',
    '/addarepo': 'addarepo',
    '/listfiles': 'listfiles'
    '/about': 'about',
    '/contact': 'contact'
  });

/*
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
*/

  Template.menu_bar.events = {

    'click .addarepo': function() {
        Meteor.Router.to('/addarepo');
    },

    'click .about': function() {
    Meteor.Router.to('/about');
    },

    'click .contact': function() {
    Meteor.Router.to('/contact');
    },

    'click .home': function() {
    Meteor.Router.to('/home');
    }
  };

  Repos = new Meteor.Collection("repos");
  Commits = new Meteor.Collection("commits");
  Files = new Meteor.Collection("files");
  Owners = new Meteor.Collection("owners");

  Template.underscoreDir.files = function() {
    return Files.find({}, {sort: {score: -1, name: 1}});
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

