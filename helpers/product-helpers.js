const { resolve } = require('promise');
var db=require('../config/connection')
const collections=require('../config/collections');
const async = require('hbs/lib/async');
module.exports={
    addProduct:(product,callback)=>{
        console.log(product)
        db.get().collection('products').insertOne(product).then((data)=>{
            console.log(data.insertedId);
            //console.log(id);
            callback(data.insertedId)
            
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collections.PRODUCTS_COLLECTION).find().toArray()
            //console.log(products)
            resolve(products)
        })
    }
}