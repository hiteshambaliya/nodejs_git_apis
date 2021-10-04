/**
 * Module dependencies.
 */

var express = require('express');
var hash = require('pbkdf2-password')()
var path = require('path');
var session = require('express-session');
var request = require('request');
const { default: axios } = require('axios');

var app = module.exports = express();

// config

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware

app.use(express.urlencoded({ extended: false }))

function getRepoCommit(){
  const requestOptions = {
    url: 'https://api.github.com/repos/nodejs/node/commits',
    method: 'GET',
    json: {},
    qs: {
      per_page: 25
    },
    // headers: {
    //   'accept': 'application/vnd.github.v3+json',
    // }
  };
  // request(requestOptions, (err, response, body) => {
  //   if (err) {
  //     console.log("Error of api github", err);
  //   } else if (response.statusCode === 200) {
  //     console.log(body);
  //   } else {
  //     console.log("Error of api github",response.statusCode);
  //   }
  // });
  return axios.get('https://api.github.com/repos/nodejs/node/commits').catch((err)=>{
    console.log(err);
  })
}

app.get('/', function(req, res){
  getRepoCommit().then((commits)=>{
    console.log(commits.data[0]);
    res.render('main', {commits:commits.data});
  });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
