const { resolve, reject } = require('promise');
var db=require('../config/connection')
var objectId=require('mongodb').ObjectId
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
    },
    deleteProducts:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCTS_COLLECTION).deleteOne({_id:objectId(proId)}).then((res)=>{
                console.log(res);
                resolve(res)

            })
        })
    },
    findProducts:(productId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCTS_COLLECTION).findOne({_id:objectId(productId)}).then((res)=>{
                console.log(res);
                resolve(res)
               

      
           })
        })
        
    },
    addNewComment:(commentData)=>{
        return new Promise (async (resolve,reject)=>{
            let product= await db.get().collection(collections.PRODUCTS_COLLECTION).findOne({_id:objectId(commentData.id)})
            //console.log(product)
            if (!product.Comments){

                db.get().collection(collections.PRODUCTS_COLLECTION).updateOne({_id:objectId(commentData.id)},{$set:{Comments:[commentData]}})
            }else{
                db.get().collection(collections.PRODUCTS_COLLECTION).updateOne({_id:objectId(commentData.id)},{$push:{Comments:commentData}})
            }


                
        })
    },
   ///getComments:(proid)=>{
   ///    return new Promise(async(resolve,reject)=>{

   ///        let comments=await db.get().collections(collections.COMMENT_COLLECTIONS).findMany({id:proid}).toArray()

   ///        resolve(comments)
   ///    })
   ///}
    ///updateProduct:(product)=>{
    ///    return new Promise((resolve,reject)=>{
    ///        db.get().collection(collections.PRODUCTS_COLLECTION).updateOne()
    ///    })
        
    //}
}