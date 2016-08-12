// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by supercollection.js.
import { name as packageName } from "meteor/astrocoders:supercollection";

// Write your tests here!
// Here is an example.
Tinytest.add('supercollection - example', function (test) {
  test.equal(packageName, "supercollection");
});
