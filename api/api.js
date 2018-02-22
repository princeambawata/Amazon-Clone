var router = require('express').Router();
var faker = require('faker');
var async = require('async');
var Products = require('../models/product');
var Category = require('../models/category');

router.post('/:name',function(req,res,next){
    async.waterfall([
    	function(callback){
           Category.findOne({name: req.params.name},function(err,category){
                  if(err) return next(err)
                  callback(null,category);
           }); 
    	},
    	function(category,callback){
    		for(var i=0;i<30;i++){
              var product = new Products();
              product.category = category._id;
              product.name = faker.commerce.productName();
              product.price = faker.commerce.price();
              product.image = faker.image.image();
              product.save();
    		}
    		res.json({message: "Success"});
    	}
    ]);
});




module.exports = router;