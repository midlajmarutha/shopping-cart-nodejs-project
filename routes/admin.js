var express = require('express');
var router = express.Router();

/* GET users listing. */

let products=[
  {
    name:'GeForce RTX 3060',
    catogary:'Graphics card',
    Image:'https://m.media-amazon.com/images/I/91g6nUHsCLL._SL1500_.jpg',
    price:'125999'

  }, 
  {
    name:'GeForce GTX 1070',
    catogary:'Graphics card',
    Image:'https://5.imimg.com/data5/IV/PC/MY-35935661/amd-and-nvidia-graphic-card-for-gaming-and-workstation-500x500.png',
    price:'125999'

  },
  {
    name:'GeForce RTX 3060Ti',
    catogary:'Graphics card',
    Image:'https://dxbgamers.com/wp-content/uploads/2021/11/DUAL-RTX-3060-TI-LHR-1.jpg',
    price:'125999'

  },
  {
    name:'GeForce GTX 1050Ti',
    catogary:'Graphics card',
    Image:'https://egs.co.ke/wp-content/uploads/2017/12/nvidia-geforce-4gb-graphics-card.jpg',
    price:'125999'

  }
]


router.get('/', function(req, res, next) {
  res.render('admin/view-products',{admin:true,products})

});

router.get('/addproduct',function(req,res,next){
  res.render('admin/add-product')
})

module.exports = router;
