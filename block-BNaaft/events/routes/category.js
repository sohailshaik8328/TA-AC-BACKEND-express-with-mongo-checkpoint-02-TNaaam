var express = require('express');
var router = express.Router();
var Events = require('../models/events-model');

router.get('/:category', (req, res, next) => {
    let category = req.params.category;
    Events.find({}).exec((err, events) => {
        if(err) return next(err);
       var some = events.filter(elm => {
            if(elm.category.split(",").includes(category)) {
                return elm;
            }
        })
        res.render('category', {events : some});
    })
})


module.exports = router;