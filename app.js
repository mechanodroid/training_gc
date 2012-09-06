

// if you implement onInit, you must call cb() when done, so the framework knows when to continue start-up
exports.onInit = function(feather, cb) {
  var airborneConfig = feather.config('airborne');

  if (airborneConfig && airborneConfig.enabled) {
    var airborne = require('airborne_client');
    airborne.createClient(airborneConfig, function(err, client) {
      try {

        if (err) {
          feather.logger.error({message: 'error creating airborne client', category: 'airborne', exception: err});
          cb();
        } else {
          
          //init our local airborne module with the generated client and move on...
          require('./lib/airborne').init(client);

          //now, build a global api object for convenient use across the app
          var api = require('./lib/api');
          feather.ns('training');
          training.api = api;

          cb();      
        }

      } catch (ex) {
        feather.logger.error({message: 'error creating airborne client', category: 'airborne', exception: ex});
      }
    });
  } else {
    feather.logger.info({message: 'configured environment does not have an airborne section defined', category: 'airborne'});
    cb();
  }  
  debugger;
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