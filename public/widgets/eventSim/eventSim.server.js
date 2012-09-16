var _ = require('underscore');
var achievements = training.api.data.achievements;

exports.getWidget = function(feather, cb) {
  cb(null, {
    name: "training_gc.eventSim",
    path: "widgets/eventSim/",
    prototype: {
    	populateAchievementsList: feather.Widget.serverMethod(function(_cb) {
        achievements.getEvents(_cb);
      }),
      eventLogAdd: feather.Widget.serverMethod(function(data,_cb) {
        achievements.addToEventLog(data,_cb);
      }),
      eventFindAt: feather.Widget.serverMethod(function(index,_cb){
        achievements.getEventAt(index,_cb);
      })
    }
  });
};