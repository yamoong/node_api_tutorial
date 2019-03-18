// require - 모듈 import 
const express = require('express');

// express 기능 사용 설정
const app = express();

app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});

// module화 하여 export하기 
module.exports = app;