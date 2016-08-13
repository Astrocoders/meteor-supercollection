import { Meteor } from 'meteor/meteor';
import { MongoInternals } from 'meteor/mongo';

export default function(name){
  if(Meteor.isServer)
    return MongoInternals.defaultRemoteCollectionDriver().open(name);

  return Meteor.connection._stores[name]._getCollection();
}

