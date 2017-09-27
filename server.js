"use strict";
let messages = [];

class Message {
  constructor(message) {
    //not a good id generator.
    //does not protect against collisions and is not truly random
    //but this is just a toy project
    this.id = Math.random() * message.length; 
    this.message = message;
     
  }
}

const http         = require('http');
const finalhandler = require('finalhandler');
const Router       = require('router');
const bodyParser = require('body-parser');

const router = new Router({ mergeParams: true});
router.use(bodyParser.json());

router.get('/', (request, response) => {
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  const body = 'Hello, World!';
  response.end(body);
});

router.post('/message', (request, response) => {
  let newMessage = new Message(request.body.message);
  messages.push(newMessage);
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(newMessage.id));
});

const server = http.createServer((request, response) => {
  router(request, response, finalhandler(request, response));
});

exports.listen = function(port, callback) {
  server.listen(port, callback);
};

exports.close = function(callback) {
  server.close(callback);
};
