// 애플리케이션에서 사용할 mongoDB 모델 생성

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type:String, required: true},
    price: { type:String, required: true }
});

module.exports = mongoose.model("Product", productSchema);