Files = new Meteor.Collection("files");
var cred = 'client_id=eb9827e7a7daab7678ce&client_secret=b596b7ca0af0f554fe396e81cd647ebe4b0ebb4e';


if (Meteor.isClient) {


  Meteor.Router.add({
    '/': 'home',
    '/addarepo': 'addarepo',
    '/underscoreDir': 'underscoreDir',
    '/jekyllDir': 'jekyllDir',
    '/bootstrapDir': 'bootstrapDir',
    '/about': 'about',
    '/contact': 'contact',
    '/repopage': 'repopage',

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
    },
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
    },
    'submit .form-signin': function(e){
      e.preventDefault();
      var url = $('.input-block-level').val();
      getFilesForRepo(url);
      $('.input-block-level').val('');
      Meteor.Router.to('/repopage')
    }
  }

  // Template.repo_files.events = {
  //   'click .underscoreDir': function() {
  //       Meteor.Router.to('/underscorejs');
  //   }
  // };


  // we call this method upon github repo URL submission to get the repo tree
  var getFilesForRepo = function (url){
    var link = url.split('/'),
    repo = link[link.length - 1],
    user = link[link.length - 2];

    Meteor.http.get('https://api.github.com/repos/' + user + '/' + repo + '/contents?' + cred, {
      contentType: 'application/json',
      dataType: 'jsonp'
      }, function (err, res) {
        if (err) throw 'failed callback';
        for (var i = 0; i < res.data.length; i++) {
          var temp = Files.findOne({sha: res.data[i].sha});
          console.log('temp', temp);
          if (temp) {
            Files.update({
              '_id': res.data[i]._id             
            },
            {
              'fileURL': res.data[i].git_url,
              'sha': res.data[i].sha,
              'updates': new Date()
            });
          } else {
            Files.insert({
              'repoLink' : 'http://github.com/' + user + '/' + repo,
              'repositoryOwner' : user,
              'fileName' : res.data[i].name,
              'sha' : res.data[i].sha,
              'fileType' : res.data[i].type,
              'fileURL' : res.data[i].git_url,
              'filePath': res.data[i].path,
              'updates' : new Date()
            }); 
          };
        };
      }
    );
  };


  // call this function any time a user clicks a link to view one of our files
  var getFileContents = function (fileURL){ // make sure the 'fileURL' is stored as data in the file link
    var bitContent;
    Meteor.http.get(fileURL + "?" + cred, {
      contentType: 'application/json',
      dataType: 'jsonp'
    }, function (err, res) {
      if (err) throw 'failed callback';
      bitContent = res.data.content;
      var plainContent = decode64(bitContent);
      console.log('content', plainContent);
      return plainContent; // this is the plain text content that we need to render...      
    });
  };

  var getDirTree = function(fileURL) {
    Meteor.http.get(fileURL + '?' + cred, {
      contentType: 'application/json',
      dataType: 'jsonp'
    }, function (err, res) {
      if (err) throw 'failed callback';
      console.log(res.data.tree); // TODO: MODIFY THIS FUNCTION, MAGEE!!!
    })
  }

  var _utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }

    }
    
    return string;
  };

  var decode64 = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }

    }

    output = _utf8_decode(output);

    return output;

  };
}


if (Meteor.isServer) {
  Meteor.startup(function () {


  
  });
}

