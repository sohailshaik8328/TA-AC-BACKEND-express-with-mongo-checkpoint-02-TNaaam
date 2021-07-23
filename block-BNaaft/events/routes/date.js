var express = require('express');
var router = express.Router();
var Events = require('../models/events-model');

router.get('/ascend', (req, res, next) => {
    Events.find({}).exec((err, events) => {
        if(err) return next(err);
        events.sort((a, b) => {
            function date(arg){
                var some = String(arg.start_date).split(" ").splice(1,3)
            if(some[0]=='Jan'){
                some.unshift("1");
            }
            if(some[0]=='Feb'){
                some.unshift("2");
            }
            if(some[0]=='Mar'){
                some.unshift("3");
            }
            if(some[0]=='Apr'){
                some.unshift("4");
            }
            if(some[0]=='May'){
                some.unshift("5");
            }
            if(some[0]=='Jun'){
                some.unshift("6");
            }
            if(some[0]=='Jul'){
                some.unshift("7");
            }
            if(some[0]=='Aug'){
                some.unshift("8");
            }
            if(some[0]=='Sep'){
                some.unshift("9");
            }
            if(some[0]=='Oct'){
                some.unshift("10");
            }
            if(some[0]=='Nov'){
                some.unshift("11");
            }
            if(some[0]=='Dec'){
                some.unshift("12");
            }
            return(some[3]+some[0]+some[2]);
            }
            return (date(a)-date(b));
            // var a= a.start_date.;
            // console.log(typeof a,b.start_date);
        })
        res.render('ascend', {events});
    })
})

router.get('/descend', (req, res, next) => {
    Events.find({}).exec((err, events) => {
        console.log(events);

        if(err) return next(err);
        events.sort((a, b) => {
            return (a.start_date.split("-").map(Number).join("") - b.start_date.split("-").map(Number).join(""));
        })
        res.render('descend', {events});
    })
})



module.exports = router;