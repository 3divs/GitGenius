/*<template name="file_listing">
  <a href="{{url}}">{{filePath}}</a>
</template>*/
if (Meteor.isClient) {

  Template.repo.helpers({
    repos : function(){
//      return Files.find({}, {fields: {'repo': Session.get('repo')}});
      return Repos.find({});
    }
  });

  Template.files.helpers({
    files : function(){
//      return Files.find({}, {fields: {'repo': Session.get('repo')}});
      return Files.find({'repo': Session.get('repo')});
    }
  });

  Template.sourcecode.helpers({
    contents : function(){
//      return Files.find({}, {fields: {'repo': Session.get('repo')}});
      return Session.get('contents');
    }
  });

  Template.repo.events({
    'click .repoLinks' : function(event){
      event.preventDefault();
      var file_contents;
      var filename = this.filePath;
      var repositoryOwner = this.repositoryOwner;
      Session.set('repo', this.repo);

      var route = '/repo/' + this.repo;
      Meteor.Router.to(route);
    }
  });

  Template.files.events({
    'click .fileLinks' : function(event){
      event.preventDefault();
      var file_contents;
//      var dir_contents;
      var repositoryOwner = this.repositoryOwner;
      console.log("file: ", this.fileURL);
      Meteor.getFileContents(this.fileURL);
      var route = '/repo/' + this.repo + '/' + this.filePath;
      Meteor.Router.to(route);
    }
  });

}