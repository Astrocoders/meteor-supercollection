import { Mongo } from 'meteor/mongo'

const Items = new Mongo.Collection('items');

Items.attachSchema({
  name: {
    type: String,
  },
})

Items.supercollection();

export default Items;
