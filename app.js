// require - 모듈 import 
const express = require('express');

// express 기능 사용 설정
const app = express();

// routes로 처리하므로 root는 주석처리
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// module화 하여 export하기 
module.exports = app;