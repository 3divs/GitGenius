
var cred = 'client_id=eb9827e7a7daab7678ce&client_secret=b596b7ca0af0f554fe396e81cd647ebe4b0ebb4e';

  var getFilesForRepo = function(url) {
    var link = url.split('/');
    var repo = link[link.length - 1];
    var user = link[link.length - 2];
    $.ajax('https://api.github.com/repos/' + user + '/' + repo + '/contents?' + cred, {
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(results){
        var somedata = results.data;
        console.log('some data', somedata);
        for(var i = 0; i < somedata.length; i++) {
          var tempURL = somedata[i].git_url;
          console.log('url', tempURL);
            Files.findAndModify({
              query : {
                'url' : tempURL
              },
              update : {
                'repository' : repo,
                'repositoryOwner' : user,
                'fileName' : somedata[i].name,
                'filePath' : somedata[i].path,
                'url' : tempURL,
                'content' : getFileContents(tempURL),
                'dateUploaded' : new Date()
              },
              upsert: true
            })
        };
      },
      error: function() {
        console.log('error getting reposlist')
      }
    });
  };

  getFilesForRepo('https://github.com/documentcloud/underscore');

  var getFileContents = function(fileURL){
    var bitContent;
    $.ajax(fileURL + "?" + cred, {
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(results){
        bitContent = results.data.content;
        // console.log('bitContent', bitContent);
        var plainContent = decode64(bitContent);
        // console.log(plainContent);
        console.log('results', results);
        return plainContent;
      },
      error: function() {
        console.log('error getting file')
      }
    });
  };


//credit : http://www.webtoolkit.info/javascript-base64.html

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