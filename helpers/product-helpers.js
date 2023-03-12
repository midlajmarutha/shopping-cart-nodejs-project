const { resolve, reject } = require('promise');
var db=require('../config/connection')
var objectId=require('mongodb').ObjectId
const collections=require('../config/collections');
const async = require('hbs/lib/async');
const { promise } = require('bcrypt/promises');
module.exports={
    addProduct:(product,image_arr_len,callback)=>{
        console.log(product)
        let images=[]
        
        db.get().collection('products').insertOne(product).then((data)=>{
            let id = data.insertedId
            //console.log(id);

            callback(id)
            
            for (let index = 0; index < image_arr_len; index++) {
                images.push(id + '_'+index+'.png')
                console.log(images)
                
            }
            db.get().collection(collections.PRODUCTS_COLLECTION).updateOne({_id:objectId(id)},{$set:{Images:images}})
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
    getCartProducts:(userid)=>{
       
        return new Promise (async(resolve,reject)=>{
            let cart_products = await db.get().collection(collections.USER_COLLECTION).aggregate([
                {
                    $match:{_id:objectId(userid)}
                },{
                    $lookup:{
                        from:collections.PRODUCTS_COLLECTION,
                        let:{productList:'$Cart'},
                        pipeline:[
                            { 
                                $match:{
                                    $expr:{
                                        $in:['$_id','$$productList']
                                    }
                                }
                            }
                        ],
                        as:'cartItems'
                    }
                }
            ]).toArray()
            resolve(cart_products[0].cartItems)
        })
    }
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