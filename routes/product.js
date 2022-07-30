const router = require('express').Router();
const productCtrl = require('../controllers/product');

router.get('/getproducts', productCtrl.getProducts);
router.post('/createproduct', productCtrl.createProduct);
router.post('/buy', productCtrl.userbuy);

module.exports = router;