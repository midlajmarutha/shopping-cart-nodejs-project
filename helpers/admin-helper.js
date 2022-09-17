var db=require('../config/connection')
const collections=require('../config/collections');
const bcrypt=require('bcrypt');
const { resolve, reject } = require('promise');
const async = require('hbs/lib/async');
const { response } = require('express');


module.exports={
    adminSignup:(data)=>{
        return new Promise(async(resolve,reject)=>{
            data.Password= await bcrypt.hash(data.Password,10)
            console.log(data);
            db.get().collection(collections.ADMIN_COLLECTION).insertOne(data).then(async(res)=>{
                let insertedData=await db.get().collection(collections.ADMIN_COLLECTION).findOne({_id:res.insertedId})
                resolve(insertedData)

            })
        })


    }
}