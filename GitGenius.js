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
    },

    'submit .form-signin': function(){
      var url = $('.input-block-level').val()
      Meteor.getFilesForRepo(url);
      Meteor.Router.to('/')
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
    var cred = 'client_id=eb9827e7a7daab7678ce&client_secret=b596b7ca0af0f554fe396e81cd647ebe4b0ebb4e';

    // call this method upon github repo URL submission to get all 
    Meteor.getFilesForRepo = function (url){
      var link = url.split('/'),
      repo = link[link.length - 1],
      user = link[link.length - 2],
      fut = new Future();

      Meteor.http.get('https://api.github.com/repos/' + user + '/' + repo + '/contents?recursive=1?' + cred, {
        contentType: 'application/json',
        dataType: 'jsonp'
        }, function (err, res) {
          if (err) throw 'failed callback';
          console.log(res.data);
      });
        var result = fut.wait();
        if (result.statusCode === 200) {
          var somedata = result.data;
          console.log('some data', somedata);
          for (var i = 0; i < somedata.length; i++) {
            var tempURL = somedata[i].git_url;
            // console.log('url', tempURL);
            Files.findAndModify({
              query : {
                'url' : tempURL
              },
              update : {
                'repository' : 'http://github.com/' + user + '/' + repo,
                'repositoryOwner' : user,
                'fileName' : somedata[i].name,
                'filePath' : somedata[i].path,
                'fileType' : somedata[i].type,
                'url' : tempURL,
                'sha' : somedata[i].sha,
                'dateUploaded' : new Date()
              },
              upsert: true
            });
          };
        } else {
          console.log('trouble getting repo list');
        };
    };

    // call this function any time a user clicks a link to view one of our files
    Meteor.getFileContents = function (url){
      var bitContent,
      fut = new Future();

      Meteor.http.get(fileURL + "?" + cred, {
          contentType: 'application/json',
          dataType: 'jsonp'
        }, function (err, res) {
          if (err) throw 'failed callback';
      });

      var result = fut.wait();
      if (result.statusCode === 200) {
        bitContent = results.data.content;
        // console.log('bitContent', bitContent);
        var plainContent = decode64(bitContent);
        // console.log(plainContent);
        console.log('results', results);
        return plainContent;          
      } else {
        console.log('error getting file');
      }
    };

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
  });
}

