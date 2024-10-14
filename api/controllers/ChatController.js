// api/controllers/ChatController.js
module.exports = {
  // Render chat view
  index: function(req, res) {
    return res.view('pages/chat');
  },

  // Send message and broadcast to all connected sockets
  sendMessage: async function(req, res) {
    const { username, message } = req.body;

    if (!username || !message) {
      return res.badRequest('Username and message are required');
    }

    // Broadcast message to all connected sockets in the "chat" room
    sails.sockets.broadcast('chat', 'newMessage', {
      username: username,
      message: message,
    });

    return res.ok();
  },

  // Join chat room
  join: async function(req, res) {
    if (!req.isSocket) {
      return res.badRequest('This action is only available over WebSocket.');
    }

    // Subscribe the requesting socket to the "chat" room
    sails.sockets.join(req, 'chat');
    return res.ok();
  },
};
