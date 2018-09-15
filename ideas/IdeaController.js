var express = require('express');
var bp = require('body-parser');
var router = express.Router();

var Idea = require('./Idea');

router.use(bp.json());

router.post('/',function(req, res){
    Idea.create({
        title: req.body.title,
        author: req.body.author, // TODO: Change this with the loggedin user
        problem_statement: req.body.problem,
        solution: req.body.solution,
        comments: [],
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        meta: {votes: 0}
    }, function(err, idea){
        if (err) return res.status(500).send("problem inserting the idea!");
        console.log(idea);
        return res.send({message: "Successfully added the idea", id: idea._id})
    });
});

router.put('/',(req, res) => {
    var data = req.body.data;
    // console.log(req.body);
    if ("author" in data) return res.status(401).send({message: "can't change the author!!!"});
    Idea.findByIdAndUpdate(req.body.id, req.body.data,{new: true}, (err, idea)=>{
        if (err) return res.status(500).send("problem getting the idea!");
        if(!idea) return res.status(404).send("Idea not found!");
        res.send(idea);
    });
});

router.delete('/:id',(req, res)=>{
    Idea.findByIdAndRemove(req.params.id, (err, idea)=>{
        if (err) return res.status(500).send("problem getting the idea!");
        if(!idea) return res.status(404).send("Idea not found!");
        res.send("Idea removed!");
    });
});

router.get('/:id', (req, res)=>{
    Idea.findById(req.params.id, (err, idea)=>{
        if (err) return res.status(500).send("problem getting the idea!");
        if(!idea) return res.status(404).send("Idea not found!");
        res.send(idea);
    });
});

router.get('/', (req, res)=>{
    Idea.find({}, (err, idea)=>{
        if (err) return res.status(500).send("problem getting the idea!");
        if(!idea) return res.status(404).send("Idea not found!");
        res.send(idea);
    });
});

router.post('/comment', (req, res) => {
    var comment = {
        user: "barshan", // TODO: change to the currently loggedin user
        body: req.body.comment,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now())
    };
    Idea.findByIdAndUpdate(req.body.id, {$push: {comments: comment}}, (err, idea) =>{
        if (err) return res.status(500).send("problem getting the idea!");
        if(!idea) return res.status(404).send("Idea not found!");
        return res.send({message: "Succes", data: comment});
    });
});

module.exports = router;