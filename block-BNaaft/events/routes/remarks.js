var express = require('express');
var router = express.Router();
var Events = require('../models/events-model');
var Remark = require('../models/remark-model');

router.get('/:id/edit', (req, res, next) => {
    let id = req.params.id;
    Remark.findById(id, (err, remark) => {
        if(err) return next(err);
        res.render('remark-edit-form', {remark});   
    })
})

router.post('/:id', (req, res, next) => {
    let id = req.params.id;
    Remark.findByIdAndUpdate(id, req.body, (err, updatedRemark) => {
        if(err) return next(err);
        res.redirect('/events/' + updatedRemark.eventId)
    })
})

router.get('/:id/delete', (req, res, next) => {
    let id = req.params.id;
    Remark.findByIdAndRemove(id, (err, deletedRemark) => {
        if(err) return next(err);
        res.redirect('/events/' + deletedRemark.eventId);
    })
})

router.get('/:id/increment', (req, res, next) => {
    let id = req.params.id;
    Remark.findByIdAndUpdate(id, {$inc : {likes : 1}}, (err, remark) => {
        if(err) return next(err);
        res.redirect('/events/' + remark.eventId);
    })
})

router.get('/:id/decrement', (req, res, next) => {
    let id = req.params.id;
    Remark.findByIdAndUpdate(id, {$inc : {dislikes : 1}}, (err, remark) => {
        if(err) return next(err);
        res.redirect('/events/' + remark.eventId);
    })
})

module.exports = router;