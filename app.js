// require - 모듈 import 
const express = require('express');

// express 기능 사용 설정
const app = express();
// logger 추가
const morgan = require('morgan');

// req 바디 파서 추가
const bodyParser = require('body-parser');


// mongoose 추가
const mongoose = require('mongoose');

// router 모듈 추가
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

const db = require('./config/key').mongoURI;
// routes로 처리하므로 root는 주석처리
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected ..."))
    .catch(err => console.log(err));

mongoose.Promise = global.Promise;


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

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