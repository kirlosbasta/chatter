/**
 * @param {import('socket.io').Server} io - socket.io server instance
 *
 * @description create a socket event listener for the chat application
 */

export default function createSocket(io) {
  return io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });
}
