if (Meteor.isClient) {
  Meteor.loginWithGithub({
  requestPermissions: ['user', 'repo']
  }, function (err) {
  if (err)
    Session.set('errorMessage', err.reason || 'Unknown error');
  });

  Meteor.Router.add({
    '/': 'home',
    '/addarepo': 'addarepo',
    '/about': 'about',
    '/contact': 'contact'
  });

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

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
