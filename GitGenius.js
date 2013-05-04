if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to GitGenius.";
  };

Meteor.loginWithGithub({
  requestPermissions: ['user', 'repo']
}, function (err) {
  if (err)
    Session.set('errorMessage', err.reason || 'Unknown error');
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
