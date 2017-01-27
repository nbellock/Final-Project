import { Meteor } from 'meteor/meteor';
import { BrowserPolicy } from 'meteor/browser-policy-common';
import { HTTP } from 'meteor/http'

Meteor.startup(() => {
  BrowserPolicy.content.allowOriginForAll('*');
  // code to run on server at startup

  // create admin from settings
  if (Meteor.users.findOne(Meteor.settings.adminId)){
    Roles.addUsersToRoles(Meteor.settings.adminId, ['admin']);
  }

  Meteor.publish("locations", function () {
    return Locations.find({});
  });

  Meteor.publish("messages", function () {
    return Messages.find();
  });

  Meteor.publish('allEmails', function (){ 
  return Meteor.users.find({},{fields: { emails: 1 }});
});
});

