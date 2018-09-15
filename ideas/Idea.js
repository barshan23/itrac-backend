var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IdeaSchema = new Schema({
    title: String,
    author: String,
    problem_statement: String,
    solution: String,
    comments: [{body: String, user: String, created_at: Date, updated_at: Date}],
    created_at: Date,
    updated_at: Date,
    meta: {votes: Number}
});

mongoose.model('Idea', IdeaSchema);

module.exports = mongoose.model('Idea');