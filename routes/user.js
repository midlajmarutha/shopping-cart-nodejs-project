var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // sample products info backend
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
  res.render('index', {products,admin:false});       //admin verificartion result dummy backend 
});

module.exports = router;