var express = require('express');
var app = express();
var mongoose = require('mongoose');
var IdeaController = require('./ideas/IdeaController');

mongoose.connect("mongodb://admin:14768925@127.0.0.1:27017/itrac?authSource=admin", { autoIndex: false })

app.use('/idea', IdeaController);

module.exports = app;