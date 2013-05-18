Files = new Meteor.Collection("files");

if (Meteor.isClient) {

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


  Template.underscoreDir.files = function() {
    return Files.find({});
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
