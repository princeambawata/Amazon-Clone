var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var secret = require('../config/secret');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category'},
  name: String,
  price: Number,
  image: String
});

ProductSchema.plugin(mongoosastic, {
  hosts: [
    'secret.port:9200'
  ]
});

module.exports = mongoose.model('Product', ProductSchema);
