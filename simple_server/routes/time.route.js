const express = require('express');
const app = express();
const timeRoutes = express.Router();

let Time = require('../model/Time');

// api to add time
timeRoutes.route('/add').post(function (req, res) {
  console.log("aqui")
  let time = new Time(req.body);
  time.save()
  .then(time => {
    res.status(200).json({'status': 'success','mssg': 'time added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get times
timeRoutes.route('/').get(function (req, res) {
  Time.find(function (err, times){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','times': times});
      console.log(times)
    }
  });
});

// api to get time
timeRoutes.route('/time/:id').get(function (req, res) {
  let id = req.params.id;
  Time.findById(id, function (err, time){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','time': time});
    }
  });
});

// api to update route
timeRoutes.route('/update/:id').put(function (req, res) {
    Time.findById(req.params.id, function(err, time) {
    if (!time){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        time.name = req.body.name;
        time.year = req.body.year;
        time.historia = req.body.historia;

        time.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
timeRoutes.route('/delete/:id').delete(function (req, res) {
  Time.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = timeRoutes;