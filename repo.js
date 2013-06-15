/*<template name="file_listing">
  <a href="{{url}}">{{filePath}}</a>
</template>*/

if (Meteor.isClient) {

  Template.repo.helpers({
    files : function(){
      return Files.find();
    }
  });

  Template.repo.events({
    'click .fileLinks' : function(event){
      event.preventDefault();
      var url = this.fileURL;
      if (this.fileType === 'file') {
        Meteor.getFileContents(url);
      }
      if (this.fileType === 'dir') {
        Meteor.getDirTree(url);
      }
    }


  });

}