/**
 * Task.js
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
    checked:{
      type: 'boolean',
      defaultsTo: false
    },
    list:{
      model: 'list'
    }

  }
};

