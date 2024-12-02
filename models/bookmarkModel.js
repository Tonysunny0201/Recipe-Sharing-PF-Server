const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipes',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const bookmarks = mongoose.model('bookmarks', bookmarkSchema);
module.exports = bookmarks;
