// require - 모듈 import 
const express = require('express');

// express 기능 사용 설정
const app = express();
// logger 추가
const morgan = require('morgan');

// routes로 처리하므로 root는 주석처리
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

app.use(morgan('dev'));

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// module화 하여 export하기 
module.exports = app;