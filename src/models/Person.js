let mongoose = require('mongoose')
let validator = require('validator')
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  age: Number,
  favoriteFoods: [{type:String}]
})
module.exports = mongoose.model('Email', personSchema)