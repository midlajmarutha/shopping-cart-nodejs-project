var express = require('express');
const session = require('express-session');
const async = require('hbs/lib/async');
var router = express.Router();
const productHelper = require('../helpers/product-helpers')
const userHelper = require('../helpers/user-helpers')
/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  // sample products info backend
  productHelper.getAllProducts().then((products)=>{
    res.render('index', {products,admin:false,user});   //admin verificartion result dummy backend 
  })
       
});
router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render('user/login',{err:req.session.loginErr})
    req.session.loginErr=false
  }

})
router.get('/signup',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render('user/signup',{err:req.session.err})
    req.session.err=null
  }
  
})

router.post('/signup',(req,res)=>{
  userHelper.userSignup(req.body).then((response)=>{
    console.log(response);
    if(response.status){
    req.session.loggedIn=true
    req.session.user=response.userdata
    res.redirect('/')
  }else{
    req.session.loggedIn=false;
    req.session.err=response.err;
    res.redirect('/signup')
  }
    
  })
})
router.post('/login',(req,res)=>{
  userHelper.doLogin(req.body).then((response)=>{
    if(response.adminStatus){
      req.session.adminLoggedIn=true
      req.session.loggedIn=true
      req.session.admin=response.admindata
      res.redirect('/admin')

    }
    else if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.loginErr=true
      res.redirect('/login')
    }

  })


})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

router.get('/products/:id',async (req,res)=>{
  let Product=await productHelper.findProducts(req.params.id)
  console.log(Product);
  res.render('user/product-full',{Product})
  
  })

router.post('/products/new-comment/',(req,res)=>{
  let id= req.query.id
  let comment=req.body
  comment.id=id
  comment.user=req.session.user.Username
  comment.datetime=new Date()
  console.log(comment);
  productHelper.addNewComment(comment).then((response)=>{
    res.redirect(`/products/`)
  })
  
})



module.exports = router; 
