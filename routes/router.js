const express = require('express')
const userController = require('../controller/userController')
const recipeController = require('../controller/recipeController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const bookmarkController = require('../controller/bookmarkController')

const router = new express.Router()

// register : http://localhost:3000/register
router.post('/register',userController.registerController)

// login : http://localhost:3000/login
router.post('/login',userController.loginController)

// add-recipe : http://localhost:3000/add-recipe
router.post('/add-recipe',jwtMiddleware,multerMiddleware.single('recipeImg'),recipeController.addRecipeController)


// all-recipes : http://localhost:3000/all-recipes
router.get('/all-recipes',jwtMiddleware,recipeController.allRecipeController)

// user-recipes : http://localhost:3000/user-recipes
router.get('/user-recipes',jwtMiddleware,recipeController.userRecipeController)

// recipes/5/edit : http://localhost:3000/recipes/id/edit
router.put('/recipes/:id/edit',jwtMiddleware,multerMiddleware.single('recipeImg'),recipeController.editRecipeController)

// recipes/id/remove : http://localhost:3000/recipes/id/remove
router.delete('/recipes/:id/remove',jwtMiddleware,recipeController.removeRecipeController)

// edit-user :  http://localhost:3000/edit-user
router.put('/edit-user',jwtMiddleware,userController.editUserController)

// Add to bookmarks: http://localhost:3000/add-bookmark
router.post('/add-bookmark', jwtMiddleware, bookmarkController.addBookmarkController);

// Get user bookmarks: http://localhost:3000/user-bookmarks
router.get('/user-bookmarks', jwtMiddleware, bookmarkController.getBookmarksController);

// Remove bookmark: http://localhost:3000/bookmark/:id/remove
router.delete('/bookmark/:id/remove', jwtMiddleware, bookmarkController.removeBookmarkController);

// get all recipe for admin
router.get('/admin-recipe',jwtMiddleware,recipeController.getAllRecipeController)

// update recipe status
router.get("/recipe/:id/update",jwtMiddleware,recipeController.updateRecipeStatusController)


module.exports = router;