var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
var adminHelper=require('../helpers/admin-helper');
const async = require('hbs/lib/async');
const userHelpers = require('../helpers/user-helpers');
const sharp = require('sharp')





const findAdminStatus=(req,callback,redirect)=>{
  let admin=req.session.admin
  if (admin){
    callback(admin)
  }else{
    redirect()
  }

  
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  let admin=req.session.admin
  if(admin){
    productHelper.getAllProducts().then((product)=>{
      ///console.log(product) 
    res.render('admin/view-products', { admin: true, product, admin})})
  }
  else{
    res.redirect('/login')
  }
  
});
router.get('/add-admin',(req,res)=>{
  //var admin=findAdminStatus(req)
  //res.render('admin/add-admin',{admin:true,admin})
  findAdminStatus(req,(admin)=>{res.render('admin/add-admin',{admin:true,admin})},()=>res.redirect('/login'))
  
})
router.post('/add-admin',(req,res)=>{
  console.log(req.body);
  adminHelper.adminSignup(req.body)
  res.redirect('/admin')
  
})
router.get('/addproduct', function (req, res,) {
  res.render('admin/add-product', { admin: true})
})

router.post('/addproduct', function (req, res) {
  //console.log(req.body)
  //console.log(req.files.Image);

  
  productHelper.addProduct(req.body,(id)=>{
    //console.log(req.body);
    let image=req.files.Image;
    image.mv('./public/productImages/productimages-original/'+id+'.png',(err,done)=>{
      if(!err){
        sharp('./public/productImages/productimages-original/'+id+'.png').resize(300).png({quality:50}).toFile('./public/productImages/w300/'+id+'.png')
        sharp('./public/productImages/productimages-original/'+id+'.png').resize(500).png({quality:50}).toFile('./public/productImages/w500/'+id+'.png')
        res.redirect('/admin');
      }else console.log(err);
    })



  })
})
router.get('/deleteproduct/:id',(req,res)=>{
     let id=req.params.id
     console.log(id);
     productHelper.deleteProducts(id).then((response)=>{
      res.redirect('/admin')
    
     })
   })
router.get('/editproduct/:id',async (req,res)=>{
  let product=await productHelper.findProducts(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{product})
})
router.post('/edit-product',(req,res)=>{
  
})
router.get('/users',(req,res)=>{
  userHelpers.fetchUsers().then((users)=>{
    findAdminStatus(req,(admin)=>{res.render('admin/users',{admin:true,users})},()=>res.redirect('/login'))
    
  })
  
})
router.get('/users/delete-user/:id',(req,res)=>{
  let id=req.params.id
  if (req.session.admin) {
    adminHelper.deleteUser(id).then((response)=>{
      res.redirect('admin/users')
    })
  }else res.redirect('/login')
})
module.exports = router;
