# meteor-supercollection
Enforce readability and simplify your mongo queries in Meteor

This repo is also a demo, clone it to test.


## Usage
Supercollection reads your collection schema, so be sure to define it in the first place:

```js
import { Mongo } from 'meteor/mongo';

const Items = new Mongo.Collection('items');

Items.attachSchema({
  name: {
    type: String,
  },
  code: {
    type: Number,
  },
  createdAt: {
    type: Date,
  },
});

export default Items;
```

Now call supercollection to enable it for that collection:

```js
Items.supercollection();
```

That's it! Now let's unleash its power:

### findByField and findOneByField
Supercollection will map all your schema fields and create a method for them:
```js
Items.findByName('something').fields('name').fetch(); => [{name: ...}, ...]
```

or 
```js
Items
  .findByCode(123)
  .fields('name', 'code')
  .sortAscendingBy('createdAt')
  .fetch(); => [{name: ...}]
```

And as you are guessing, findOneByField will return only one document.

# limit(number)
# skip(number)
# sortBy(field, direction)
# sortAscendingBy(field)
# sortDescendingBy(field)
# sortWith(object)
# fetchRelated(name)
Supercollection also pays attention to the `collectionId` field convention for relationships on the schema.
So if you follow the convention `collection name` + `id` for naming those fields your are covered.

```js
Items.findOneByName('foo').fetchRelated('client') => {}
Items.findByName('foo').fetchRelated('client') => [{}, ...]
```

### Why?
Readability is everything for a good code base, and that is something that lacks sometimes
in the collection queries we do in Meteor. Also it makes easier to enforces good practices like
filtering the fields the query will fetch in the client-side which helps to avoid unnecessary 
computation re-runs.

