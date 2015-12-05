var shortid = require('shortid');
var Waterline = require('waterline');


var Project = Waterline.Collection.extend({
  identity: 'project',
  connection: 'myLocalDisk',
  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      unique: true,
      defaultsTo: function() {
        return shortid.generate();
      }
    },
    name: {
      type : 'string',
      required : true,
      defaultsTo: 'Empty project'
    },
    price: {
      type: 'float',
      required:true
    },
    description: {
      type: 'string',
    },
    purchased: {
      type: 'boolean',
    },
    image: {
      type: 'string',
      required:true
    },
  }
});


module.exports = Project;
