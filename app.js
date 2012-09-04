

// if you implement onInit, you must call cb() when done, so the framework knows when to continue start-up
exports.onInit = function(feather, cb) {

  var api = require('./lib/api');
  feather.ns('training');
  training.api = api;
  
  if (typeof cb === "function") cb();
};


exports.onReady = function(feather) {

  if (feather.config('test')) {
    var runTests = require('./lib/runTests');
    runTests();
  }
};

exports.getMiddleware = function(options, cb) {
  var feather = require('./lib/feather').getFeather();

  var middleware = [
    feather.Connect.query(),
    require('./lib/middleware/qsAuth')
  ];

  cb(null, middleware);
};