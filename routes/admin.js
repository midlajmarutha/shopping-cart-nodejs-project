var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
var adminHelper = require('../helpers/admin-helper');
const async = require('hbs/lib/async');
const userHelpers = require('../helpers/user-helpers');
const sharp = require('sharp')


const findAdminStatus = (req, res, next) => {
  let adminStatus = req.session.adminLoggedIn
  if (adminStatus) {

    next()
    return admin = req.session.admin
  } else {
    res.redirect('/login')
  }
  
}

/* GET users listing. */
router.get('/', findAdminStatus, function (req, res) {
  let admin = req.session.admin
  productHelper.getAllProducts().then((product) => {
    ///console.log(product) 
    res.render('admin/view-products', { admin: true, product, admin})
  })


});
router.get('/add-admin', findAdminStatus, (req, res) => {
  let admin=req.session.admin
  res.render('admin/add-admin', {admin})


})
router.post('/add-admin', (req, res) => {
  console.log(req.body);
  adminHelper.adminSignup(req.body)
  res.redirect('/admin')

})
router.get('/addproduct', findAdminStatus, function (req, res) {
  res.render('admin/add-product', { admin })
})

router.post('/addproduct', function (req, res) {
  //console.log(req.body)
  //console.log(req.files.Image);
  //Image Naming-saving image names in database



  productHelper.addProduct(req.body,req.files.Image.length, (id) => {
    //console.log(req.body);
    if (req.files.Image) {
      for (let i = 0; i < req.files.Image.length; i++) {
        let image = req.files.Image[i];
        image.mv('./public/productImages/productimages-original/' + id + '_'+i+'.png', (err, done) => {
          if (!err) {
            sharp('./public/productImages/productimages-original/' + id + '_'+i+'.png').resize(200).png({ quality: 50 }).toFile('./public/productImages/w200/' + id + '_'+i+'.png')
            sharp('./public/productImages/productimages-original/' + id + '_'+i+'.png').resize(300).png({ quality: 50 }).toFile('./public/productImages/w300/' + id + '_'+i+'.png')
            sharp('./public/productImages/productimages-original/' + id + '_'+i+'.png').resize(500).png({ quality: 50 }).toFile('./public/productImages/w500/' + id + '_'+i+'.png')
            res.redirect('/admin');
          } else console.log(err);
        })
      }  
    } else {
      res.send('No Images')
    }
})
})
router.get('/deleteproduct/:id', findAdminStatus, (req, res) => {
  let id = req.params.id
  console.log(id);
  productHelper.deleteProducts(id).then((response) => {
    res.redirect('/admin')

  })
})
router.get('/editproduct/:id', async (req, res) => {
  let product = await productHelper.findProducts(req.params.id)
  console.log(product);
  res.render('admin/edit-product', { product })
})
router.post('/edit-product', (req, res) => {

})
router.get('/users', findAdminStatus, (req, res) => {
  userHelpers.fetchUsers().then((users) => {
    res.render('admin/users', { admin: true, users })

  })

})
router.get('/users/delete-user/:id', findAdminStatus, (req, res) => {

    adminHelper.deleteUser(id).then((response) => {
      res.redirect('admin/users')
    })
})
router.get('/add-banner',findAdminStatus,(req,res)=>{
  res.render('admin/add-new-banner')
})

module.exports = router;
