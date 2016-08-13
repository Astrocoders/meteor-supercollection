import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export default function(name){
  if(Meteor.isServer)
    return Mongo.MongoInternals.defaultRemoteCollectionDriver().open(name);

  return Meteor.connection._stores[name]._getCollection();
}

