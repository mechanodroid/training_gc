var _ = require('underscore');
var activeGames = training.api.data.activeGames;

exports.getWidget = function(feather, cb) {
  cb(null, {
    name: "training_gc.launcher",
    path: "widgets/launcher/",
  prototype: {

      populateList: feather.Widget.serverMethod(function(_cb) {
        activeGames.list(_cb);
      })

    }
  });
};




     