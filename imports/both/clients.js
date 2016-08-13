import { Mongo } from 'meteor/mongo'

const Clients = new Mongo.Collection('clients');

Clients.attachSchema({
  name: {
    type: String,
  },
  favoriteColor: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
})

Clients.supercollection();

export default Clients;
