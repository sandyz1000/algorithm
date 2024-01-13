import * as net from 'net';

const host = 'www.google.com';
const port = 80;

const socket = new net.Socket();

// Event listener for the 'connect' event
socket.connect(port, host, () => {
  console.log(`Socket Connected to ${host} on ip ${socket.remoteAddress}`);
  
  // Send some data to the remote server
  const message = 'GET / HTTP/1.1\r\n\r\n';
  socket.write(message);
});

// Event listener for the 'data' event (receive data)
socket.on('data', (data) => {
  console.log(data.toString());
  
  // Close the connection after receiving data
  socket.end();
});

// Event listener for the 'error' event
socket.on('error', (err) => {
  console.error(`Socket error: ${err.message}`);
});

// Event listener for the 'end' event (connection closed)
socket.on('end', () => {
  console.log('Socket connection closed');
});
