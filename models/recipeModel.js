const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    ingredients: {
        type: String,
        required:true
    },
    instructions: {
        type: String,
        required:true
    },
    recipeImg: {
        type: String,
        required:true
    },
    userId: {
        type: String,
        required:true 
    },
    status:{
        type:String,
        required:true,
        default:"Pending"
    }
})

const recipes = mongoose.model("recipes",recipeSchema)
module.exports = recipes