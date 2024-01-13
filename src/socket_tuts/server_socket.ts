import * as net from 'net';

const HOST = ''; // Symbolic name meaning all available interfaces
const PORT = 8888; // Arbitrary non-privileged port

const server = net.createServer((socket) => {
  // Sending message to connected client
  socket.write('Welcome to the server. Type something and hit enter\n');

  // Event listener for receiving data from the client
  socket.on('data', (data) => {
    const reply = 'OK...' + data;
    if (!data) {
      socket.end();
      return;
    }

    socket.write(reply);
  });

  // Event listener for the 'end' event (client disconnected)
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

// Event listener for the 'listening' event
server.listen(PORT, HOST, () => {
  console.log('Server listening on port ' + PORT);
});

// Event listener for the 'error' event
server.on('error', (err) => {
  console.log('Server error: ' + err);
});

// Event listener for the 'close' event
server.on('close', () => {
  console.log('Server closed');
});
