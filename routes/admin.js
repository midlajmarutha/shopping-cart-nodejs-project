var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-hepers')


/* GET users listing. */

let products = [
  {
    name: 'GeForce RTX 3060',
    catogary: 'Graphics card',
    image: 'https://m.media-amazon.com/images/I/91g6nUHsCLL._SL1500_.jpg',
    price: '125999'

  },
  {
    name: 'GeForce GTX 1070',
    catogary: 'Graphics card',
    image: 'https://5.imimg.com/data5/IV/PC/MY-35935661/amd-and-nvidia-graphic-card-for-gaming-and-workstation-500x500.png',
    price: '125999'

  },
  {
    name: 'GeForce RTX 3060Ti',
    catogary: 'Graphics card',
    image: 'https://5.imimg.com/data5/IV/PC/MY-35935661/amd-and-nvidia-graphic-card-for-gaming-and-workstation-500x500.png',
    price: '125999'

  },
  {
    name: 'GeForce GTX 1050Ti',
    catogary: 'Graphics card',
    image: 'https://5.imimg.com/data5/IV/PC/MY-35935661/amd-and-nvidia-graphic-card-for-gaming-and-workstation-500x500.png',
    price: '125999'

  }
]


router.get('/', function (req, res, next) {
  res.render('admin/view-products', { admin: true, products })

});

router.get('/addproduct', function (req, res,) {
  res.render('admin/add-product')
})
router.post('/addproduct', function (req, res,) {
  console.log(req.body)
  console.log(req.files.Image);
  
  productHelper.addProduct(req.body,(result)=>{
    res.render('admin/add-product')

  
  })
})

module.exports = router;
