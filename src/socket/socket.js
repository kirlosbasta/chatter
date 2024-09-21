import { authenticateUser } from '../utils/token.auth.js';
/**
 * @param {import('socket.io').Server} io - socket.io server instance
 *
 * @description setup a socket event listener for the chat application
 */

export default function initSocket(io) {
  return io.on('connection', async (socket) => {
    const user = await authenticateUser(socket.handshake.auth.token);
    if (!user) {
      socket.emit('authentication error', 'Invalid Token');
      socket.disconnect(true);
      return;
    }
    console.log(user);
    // create a room for the user so that he can recieve other events
    // for future features like friend request, typing etc...
    socket.emit('connected');
    console.log('user', user?.username, 'is connected');
    socket.join(user?._id?.toString());

    socket.on('disconnect', () => {
      console.log('user disconnected');
      socket.leave(user?._id?.toString());
    });

    socket.on('join chat', (chatId) => {
      console.log('user', user?.username, 'joined the chat 🤝. chatId: ', chatId);
      socket.join(chatId);
    });

    socket.on('leave chat', (chatId) => {
      console.log('user left the chat 🚪. chatId: ', chatId);
      socket.leave(chatId);
    });
  });
}

/**
 *
 * @param {import("express").Request} req - Request object to access the `io`
 * instance set at the entry point
 * @param {string} roomId - Room where the event should be emitted
 * @param {string} event - Event that should be emitted
 * @param {any} payload - Data that should be sent when emitting the event
 * @description Utility function responsible to abstract the logic of socket emission
 * via the io instance
 */
const emitSocketEvent = (req, roomId, event, payload) => {
  console.log('emitting event', event, 'to room', roomId);
  req.app.get('io').in(roomId).emit(event, payload);
};

export { emitSocketEvent, initSocket };
