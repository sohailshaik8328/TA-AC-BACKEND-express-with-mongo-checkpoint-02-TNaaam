var express = require('express');
var router = express.Router();
var Events = require('../models/events-model');
var Remark = require('../models/remark-model');



router.get('/', (req, res, next) => {
    Events.find({}, (err, events) => {
        if(err) return next(err);
        var allCategories = [];
        events.filter((event) => {
            let splittedCategory = event.category.split(',');
            for(var i = 0 ; i < splittedCategory.length ; i++) {
                if(!allCategories.includes(splittedCategory[i])) {
                    allCategories.push(splittedCategory[i]);
                }
            }
        })

        var location = [];
        events.filter((event) => {
            let splittedLocation = event.location.split(',');
            for(var i = 0 ; i < splittedLocation.length ; i++) {
                if(!location.includes(splittedLocation[i])) {
                    location.push(splittedLocation[i]);
                }
            }
        })
        res.render('events', {events, allCategories, location});
    })
})

router.get('/new', (req, res) => {
    res.render('events-form');
})

router.post('/', (req, res, next) => {
    Events.create(req.body, (err, events) => {
        if(err) return next(err);
        res.redirect('events');
    })
})

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    Events.findById(id, (err, event) => {
        if(err) return next(err);
        Remark.find({eventId : id}, (err, remark) => {
            if(err) return next(err);
            res.render('single-event', {event, remark});
        })
    })

})

router.get('/:id/edit', (req, res, next) => {
    let id = req.params.id;
    Events.findById(id, (err, event) => {
        if(err) return next(err);
        res.render('edit-event-form', {event})
    })
})

router.post('/:id', (req, res, next) => {
    let id = req.params.id;
    Events.findByIdAndUpdate(id, req.body, (err, event) => {
        if(err) return next(err);
        res.redirect('/events/' + id);
    })
})

router.get('/:id/delete', (req, res, next) => {
    let id = req.params.id;
    Events.findByIdAndRemove(id, (err, event) => {
        if(err) return next(err);
        res.redirect('/events')
    })
})

router.get('/:id/increment', (req, res, next) => {
    let id = req.params.id;
    Events.findByIdAndUpdate(id, {$inc : {likes : 1}}, (err, event) => {
        if(err) return next(err);
        res.redirect('/events/' + id);
    })
})

router.get('/:id/decrement', (req, res, next) => {
    let id = req.params.id;
    Events.findByIdAndUpdate(id, {$inc : {dislikes : 1}}, (err, event) => {
        if(err) return next(err);
        res.redirect('/events/' + id);
    })
})

router.post('/:id/remarks', (req, res, next) => {
    let id = req.params.id;
    req.body.eventId = id;
    Remark.create(req.body, (err, remark) => {
        if(err) return next(err);
        res.redirect('/events/' + id);
    })
})



module.exports = router;
