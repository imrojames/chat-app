module.exports = {
    sendMessage: async function (req, res) {
      const { message, username } = req.body;
  
      if (!message || !username) {
        return res.badRequest({ error: 'Message and username are required' });
      }
  
      // Broadcast the message to all connected clients
      sails.sockets.broadcast('chat', 'message', { username, message });
  
      return res.ok();
    },
  
    // Subscribe users to the 'chat' room when they connect
    connect: function (req, res) {
      if (!req.isSocket) {
        return res.badRequest('Only socket requests are allowed.');
      }
  
      sails.sockets.join(req, 'chat');
      return res.ok();
    }
  };