// server.js
const express  = require('express');
const ws       = require('ws');
const uuid     = require('uuid/v4')
const PORT     = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

  
// Create the WebSockets server
const wss = new ws.Server({ server });

function broadcast (data) {
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    } 
  });
};

function randomColour() {
  const randomC = Math.floor(Math.random() * 4);
  switch(randomC) {
    case 0:
      return 'colour0';
    case 1:
      return 'colour1';
    case 2:
      return 'colour2';
    case 3:
      return 'colour3';
    default:
      return 'colour0';
  }
}

wss.on('connection', (ws) => {
  console.log('Client server has connected');
  ws.colour = randomColour();
  console.log("server col:", ws.colour);
  let userSize = wss.clients.size;
  const userCount = {
    id      : uuid(), 
    type    : 'Notification',  
    content : 'A new user has joined ChattyBratty.', 
    userSize
  };
    broadcast(JSON.stringify(userCount));
    console.log("THIS IS THE USERCOUNT ON USER JOINING: ", userCount);

  ws.on('message', (data) => {
    const dataParse    = JSON.parse(data);
    dataParse.id       = uuid();
    dataParse.userSize = userSize;
    dataParse.colour   = ws.colour;
    console.log("Changing colour with user: ", dataParse.colour);
    broadcast(JSON.stringify(dataParse));
  });
  
  ws.send('Server saying heyo!');

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    userSize = wss.clients.size;
    const userLeft = {
      id      : uuid(), 
      type    : 'Notification', 
      content : 'A user has left ChattyBratty.', 
      userSize
    }
    broadcast(JSON.stringify(userLeft))
  });
});