var _client;
exports.init = function(client) {
  _client = client;
};
exports.getClient = function() {
  return _client;
};