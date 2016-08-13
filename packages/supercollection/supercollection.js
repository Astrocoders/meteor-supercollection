import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import getCollection from './get_collection'
import pluralize from 'pluralize'

function findFieldAPI({fieldName, collection, isFindOne = false}){
  return fieldValue => {
    const query = {
      [fieldName]: fieldValue,
    }
    const options = {
      fields: {},
      sort: {},
    };

    return {
      fields(...fields){
        options.fields = {
          ...options.fields,
          ...fields.reduce((acc, field) => ({...acc, [field]: 1}), {}),
        }

        return this
      },

      limit(limit){
        options.limit = limit
        return this
      },

      skip(skip){
        options.skip = skip
        return this
      },

      sortWith(sort){
        options.sort = {...sort};

        return this;
      },

      sortBy(field, direction){
        options.sort = {
          ...options.sort,
          [ field ]: direction,
        }
        return this;
      },

      sortAscendingBy(field){
        this.sortBy(field, 1);
        return this;
      },

      sortDescendingBy(field){
        this.sortBy(field, -1);
        return this;
      },

      fetch(){
        if(isFindOne){
          return collection.findOne(query) || {}
        }

        return collection.find(query).fetch()
      },

      fetchRelated(relatedName){
        const collection = getCollection(pluralize(relatedName))
        const idValueField = `${relatedName}Id`

        if(isFindOne){
          const doc = this.fetch() || {}
          return collection.findOne({_id: doc[idValueField]})
        } else {
          return this.fetch().map(doc => {
            return collection
              .findOne({
                _id: doc[idValueField],
              })
          })
        }
      },
    }
  }
}

Mongo.Collection.prototype.supercollection = function(options){
  if(!this.simpleSchema) {
    console.warn('[Supercollection]', `Collection ${this._name} doesn't have a SimpleSchema`);
    return false
  }

  const schema = this.simpleSchema()

  schema.objectKeys().forEach(field => {
    this[`findBy${capitalize(field)}`] = findFieldAPI({
      fieldName: field,
      collection: this,
      options,
    })
  });

  schema.objectKeys().forEach(field => {
    this[`findOneBy${capitalize(field)}`] = findFieldAPI({
      fieldName: field,
      collection: this,
      isFindOne: true,
      options,
    })
  });

  function capitalize(str){
    return str[0].toUpperCase() + str.slice(1, str.length)
  }
}
