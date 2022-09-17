var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
var adminHelper=require('../helpers/admin-helper')


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
  res.render('admin/add-admin',{admin:true})
})
router.post('/add-admin',(req,res)=>{
  console.log(req.body);
  adminHelper.adminSignup(req.body)
  res.redirect('/admin')
  
})
router.get('/addproduct', function (req, res,) {
  res.render('admin/add-product', { admin: true})
})

router.post('/addproduct', function (req, res,) {
  //console.log(req.body)
  //console.log(req.files.Image);

  
  productHelper.addProduct(req.body,(id)=>{
    //console.log(req.body);
    let image=req.files.Image;
  
    image.mv('./public/productImages/'+id+'.png',(err,done)=>{
      if(!err){
        res.render('admin/add-product')
      }else console.log(err);
    })
    

  
  })
})

module.exports = router;
