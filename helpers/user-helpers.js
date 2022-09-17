var db=require('../config/connection')
const collections=require('../config/collections');
const bcrypt=require('bcrypt');
const async = require('hbs/lib/async');
const { resolve, reject } = require('promise');
const objectId= require('mongodb').ObjectId

module.exports={
    userSignup:(userdata)=>{
        console.log(userdata);
        return new Promise(async (resolve,reject)=>{
            userdata.Password= await bcrypt.hash(userdata.Password,10)
            db.get().collection(collections.USER_COLLECTION).insertOne(userdata).then(async(data)=>{
                data=await db.get().collection(collections.USER_COLLECTION).findOne({_id:data.insertedId})
                resolve(data)
            })
                

        })
        
    },
    doLogin:(loginData)=>{
        console.log(loginData);
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let responseData={}
            let admin=await db.get().collection(collections.ADMIN_COLLECTION).findOne({Email:loginData.Email})
            let user= await db.get().collection(collections.USER_COLLECTION).findOne({Email:loginData.Email})
            if (admin){
                bcrypt.compare(loginData.Password,admin.Password).then((status)=>{
                    if(status){
                        console.log('admin login succes');
                        responseData.admindata=admin
                        responseData.status=true
                        responseData.adminStatus=true
                        resolve(responseData)
                    }else{
                        console.log('admin login failed');
                        resolve({status:false})
                    }
                })
            }
            
            else if(user){
                bcrypt.compare(loginData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log('login success');
                        responseData.user=user
                        responseData.status=true
                        resolve(responseData)
                    }else{
                        console.log('login failed');
                        resolve({status:false})
                    }
                })
            }
            else{
                console.log('login failed');
                resolve({status:false})
            }

        })
    }
}