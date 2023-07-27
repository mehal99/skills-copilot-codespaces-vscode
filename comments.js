// Create web server
// Run: node comments.js
// Open browser and go to http://localhost:3000
// Enter a comment in the box and click Submit
// Open a new browser tab and go to http://localhost:3000/comments
// You should see the comment you entered on the other tab
// Press Ctrl-C in the terminal to stop the server

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');

var comments = [];

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    var parsedUrl = url.parse(request.url, true);
    var path = parsedUrl.pathname;
    if (path === '/comments') {
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(comments));
    } else {
      fs.readFile('index.html', function (err, data) {
        response.setHeader('Content-Type', 'text/html');
        response.end(data);
      });
    }
  } else if (request.method === 'POST') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var comment = JSON.parse(body);
      comments.push(comment);
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(comment));
    });
  }
});

// Listen on port 3000, IP defaults to
