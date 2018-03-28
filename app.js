const express = require('express');
var bodyParser = require('body-parser');
var payloadChecker = require('payload-validator');
const app = express();
var router = express.Router();
var expectedPayload = {
    "image" :"",
    "slug" : "",
    "title": ""
};

app.use(bodyParser.json());


// app.use(function(req,res,next){
//   res.setHeader("Content-Type", "application/json");
//   next();
// });



router.route('/')

    .get(function(req,res) {
      // res.setHeader('Content-Type', 'application/json');
       res.json();
    })
    .post(function(req,res,err){
        // res.setHeader('Content-Type', 'application/json');

        if(req.body) {
          var result = payloadChecker.validator(req.body,expectedPayload,["image","slug","title"],false);
          if(result.success){
            res.json(req.body);
         } 
         else {
           res.json({ error: 'Could not decode request: JSON parsing failed' });
         }
       }
     });

    app.use('/',router);
    app.set('port', (process.env.PORT || 3000));
    app.listen(app.get('port'), function() {
      console.log('Node app is running on port', app.get('port'));
  });
