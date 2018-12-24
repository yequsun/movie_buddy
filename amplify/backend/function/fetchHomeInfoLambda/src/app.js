/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const http = require('http');

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/home/nowPlaying', function(req, res) {
  // Add your code here
  const options = "http://api.themoviedb.org/3/movie/now_playing?api_key=c03761f1d091cd9beaffec31bdc755c0&region=us&page=1";
  http.get(options, (resp) => {
        let data = '';
        // Concatinate each chunk of data
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // Once the response has finished, do something with the result
        resp.on('end', () => {
          //console.log(data);
          //console.log(JSON.parse(data));
          dataObj = JSON.parse(data);
          resultsArray = dataObj.results;
          let results = [];

          for(var i=0;i<5;i++){
            var movie = {
              title: resultsArray[i].title,
              date: resultsArray[i].release_date,
              poster: resultsArray[i].poster_path,
              backdrop: resultsArray[i].backdrop_path
            };
            results.push(movie);

          }


          res.json(results);
        });

        // If an error occured, return the error to the user
      }).on("error", (err) => {
        res.json("Error: " + err.message);
      });
});

app.get('/home/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/home', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/home/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example post method *
****************************/

app.put('/home', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/home/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/home', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/home/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
