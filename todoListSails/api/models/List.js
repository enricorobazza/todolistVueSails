/**
 * List.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      required: true,
      type: 'string'
    },
    tasks:{
      collection: 'task',
      via: 'list'
    },
    notebook:{
      model: 'notebook'
    }
  },

};

