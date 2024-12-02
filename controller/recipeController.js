const recipes = require('../models/recipeModel')

// add recipe
exports.addRecipeController = async (req,res)=>{
    console.log("Inside addRecipeController");
    const userId = req.userId
    console.log(userId);
    // console.log(req.body);
    const {title, description, ingredients, instructions} = req.body
    const recipeImg = req.file.filename
    console.log(title, description, ingredients, instructions, recipeImg);
    try{
        const newRecipe = new recipes({
            title,description,ingredients,instructions,recipeImg,userId
        })
        await newRecipe.save()
        res.status(200).json(newRecipe)
    }catch(err){
        res.status(401).json(err)
    }
}

// get all recipes - needs authorisation..
exports.allRecipeController = async (req,res)=>{
    console.log("inside allProjectController");
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        title:{
            $regex:searchKey,$options:'i'
        }
    }
    try {
        const allRecipes = await recipes.find(query)
        res.status(200).json(allRecipes)
    } catch (err) {
        res.status(401).json(err)
    }
}


// get user recipes - needs authorisation..
exports.userRecipeController = async (req,res)=>{
    console.log("inside userRecipeController");
    const userId = req.userId
    try {
        const alluserRecipes = await recipes.find({userId})
        res.status(200).json(alluserRecipes)
    } catch (err) {
        res.status(401).json(err)
    }
}

// editRecipe - needs authorisation...
exports.editRecipeController = async (req,res)=>{
    console.log("Inside editRecipeController");
    const id = req.params.id
    const userId = req.userId
    const {title,description,ingredients,instructions,recipeImg} = req.body
    const reUploadImg = req.file?req.file.filename:recipeImg
    try {
        const updateRecipe = await recipes.findByIdAndUpdate({_id:id},{
            title,description,ingredients,instructions,recipeImg:reUploadImg,userId
        },{new:true})
        await updateRecipe.save()
        res.status(200).json(updateRecipe)
    } catch (err) {
        res.status(401).json(err)
    }
}

// removeRecipe - 
exports.removeRecipeController = async (req,res)=>{
    console.log("removeRecipeController");
    const {id} = req.params 
    try {
        const deleteRecipe = await recipes.findByIdAndDelete({_id:id})
    } catch (err) {
        res.status(401).json(err)
    }
    
}

