var _ = require("underscore");
var feather = require("./feather").getFeather();

var channels = {};
var chatoptions = {
  messages: ["message"],
  allowDirectMessaging: true,
  hooks: {
    subscribe: function(args, cb){
      feather.logger.info("SUBSCRIBE: " + args.client.session.user.username);
      var userData = args.data || {};
      userData.username =  args.client.session.user.username;
      cb(null, userData);
    },
    connect: function(args, cb){
      feather.logger.info("CONNECT: " + args.client.session.user.username);
      var userData = args.data || {};
      userData.username =  args.client.session.user.username;
      cb(null, userData);
    },
    disconnect: function(args, cb){
      feather.logger.info("DISCONNECT: " + args.client.session.user.username);
      var userData = args.data || {};
      userData.username =  args.client.session.user.username;
      cb(null, userData);
    },
    message: function(args, cb){
      debugger;
      feather.logger.info("MESSAGE from '" + args.client.session.user.username + "': " + args.data.message);
      var userData = args.data || {};
      userData.username =  args.client.session.user.username;
      cb(null, userData);
    }
  }
}

var gamesChannelOptions = {
  messages: ["stats"],
  allowDirectMessaging: true
}

channels.addChatChannel = function(id){
  debugger;
  var options = _.extend(_.clone(chatoptions), {id: id});
  return feather.socket.addChannel(options);
};

channels.addStatsChannel = function(id){
  var options = _.extend(_.clone(gamesChannelOptions), {id: id});
  return feather.socket.addChannel(options);
}

module.exports = channels;