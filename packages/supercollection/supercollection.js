import { Mongo } from 'meteor/mongo'; 

function findFieldAPI({fieldName, collection}){
  return fieldValue => {
    const query = {
      [fieldName]: fieldValue,
    }
    const options = {
      fields: { [fieldName]: 1 },
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

      fetch(){
        return collection.find(query).fetch()
      },
    }
  }
}

Mongo.Collection.prototype.supercollection = function(){
  if(!this.simpleSchema) {
    console.warn('[Supercollection]', `Collection ${this._name} doesn't have a SimpleSchema`);
    return false 
  }

  const schema = this.simpleSchema()

  schema.objectKeys().forEach(field => {
    this[`findBy${capitalize(field)}`] = findFieldAPI({
      fieldName: field,
      collection: this,
    })
  });

  function capitalize(str){
    return str[0].toUpperCase() + str.slice(1, str.length)
  }
}
