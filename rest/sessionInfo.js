var feather = require('../lib/feather').getFeather();

module.exports = {

  "get": {

    "/": function(req, res, cb) {

      feather.logger.warn({category: 'rest', message: 'someone is getting session info'});

      cb(null, req.session.user);
    }
  }
};