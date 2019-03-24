const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require("../middleware/chack-auth");
const ProductController = require("../controllers/products");

// 파일 업로드 패키지
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


// MongoDB 모델 스키마 추가
const Product = require('../models/product')


router.get('/', ProductController.products_get_all);



router.post('/',checkAuth, upload.single('productImage'), ProductController.products_create_products );


router.get('/:productId',ProductController.products_get_product );





router.patch('/:productId',checkAuth,ProductController.products_update_product );




router.delete('/:productId', checkAuth, ProductController.products_delete );



module.exports = router;