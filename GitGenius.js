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
    '/underscoreDir': 'underscoreDir',
    '/jekyllDir': 'jekyllDir',
    '/bootstrapDir': 'bootstrapDir',
    '/about': 'about',
    '/contact': 'contact',
    '/underscorejs': 'underscorejs'
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

    'click .underscoreDir': function() {
        Meteor.Router.to('/underscoreDir');
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

  Template.home.events = {
    'click .underscoreDir': function() {
        Meteor.Router.to('/underscoreDir');
    },
    'click .jekyllDir': function() {
        Meteor.Router.to('/jekyllDir');
    },
    'click .bootstrapDir': function() {
        Meteor.Router.to('/bootstrapDir');
    }
  }

  Template.repo_files.events = {
    'click .underscoreDir': function() {
        Meteor.Router.to('/underscorejs');
    }
  };


  Files = new Meteor.Collection("files");

  Template.underscoreDir.files = function() {
    return Files.find({});
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
