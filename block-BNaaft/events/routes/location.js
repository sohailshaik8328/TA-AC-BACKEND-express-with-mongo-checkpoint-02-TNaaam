var express = require('express');
var router = express.Router();
var Events = require('../models/events-model');

router.get('/:location', (req, res, next) => {
    let location = req.params.location;
    Events.find({}).exec((err, events) => {
        if(err) return next(err);
        var locationSome = events.filter(elm => {
            if(elm.location.split(',').includes(location)) {
                return elm;
            }
        })
        res.render('location', {events : locationSome});
    })
})




module.exports = router;