const bookmarks = require('../models/bookmarkModel');

// Add a recipe to bookmarks - needs authorisation..
exports.addBookmarkController = async (req, res) => {
    console.log('Inside addBookmarkController');
    const userId = req.userId
    const { recipeId } = req.body
    
    try {
        const existingBookmark = await bookmarks.findOne({ userId, recipeId })
        if (existingBookmark) {
            return res.status(406).json('Recipe already bookmarked')
        }
        const newBookmark = new bookmarks({ userId, recipeId })
        await newBookmark.save()
        res.status(200).json(newBookmark)
    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
};

// Fetch all bookmarked recipes for a user - needs authorisation..
exports.getBookmarksController = async (req, res) => {
    console.log('Inside getBookmarksController');
    const userId = req.userId
    try {
        const userBookmarks = await bookmarks.find({ userId }).populate('recipeId');
        res.status(200).json(userBookmarks);
    } catch (err) {
        res.status(401).json(err);
    }
};

// Remove a recipe from bookmarks - needs authorisation..
exports.removeBookmarkController = async (req, res) => {
    console.log('Inside removeBookmarkController');
    const { id } = req.params
    try {
        await bookmarks.findByIdAndDelete(id);
        res.status(200).json('Bookmark removed successfully');
    } catch (err) {
        res.status(401).json(err);
    }
};
