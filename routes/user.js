var express = require('express');
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
  res.render('user/login')
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})

router.post('/signup',(req,res)=>{
  userHelper.userSignup(req.body).then((response)=>{
    console.log(response);
  })
})
router.post('/login',(req,res)=>{
  userHelper.doLogin(req.body).then((response)=>{
    if(response.adminStatus){
      req.session.adminLoggedIn=true
      req.session.admin=response.admindata
      res.redirect('/admin')

    }
    else if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      res.redirect('/login')
    }

  })

})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
