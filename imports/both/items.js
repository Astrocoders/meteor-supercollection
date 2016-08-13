import { Mongo } from 'meteor/mongo'
import Clients from './clients';

const Items = new Mongo.Collection('items');

Items.attachSchema({
  name: {
    type: String,
  },
  clientId: {
    type: String,
  },
})

Items.supercollection();

export default Items;
