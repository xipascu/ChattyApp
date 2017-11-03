// server.js
const express = require('express');
const ws = require('ws');
const uuid = require('uuid/v4')

// Set the port to 3001
const PORT = 3001;

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
}


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  const userSize = wss.clients.size;
  const userCount = {id: uuid(), type:'Notification', userNum: userSize, content:`Number of users currently online: ${userSize}`};
    broadcast(JSON.stringify(userCount));
    // console.log(userCount);

  console.log('Client connected');
  ws.on('message', (data) => {
    const dataParse = JSON.parse(data);
    dataParse.id = uuid();
    console.log('Received msg from client...', dataParse);
    broadcast(JSON.stringify(dataParse));
    // console.log('coming from server, data:', data);
  });

  ws.send('Server saying heyo!');

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});