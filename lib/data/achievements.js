
var feather = require("../feather").getFeather(),
  inherits = require("inherits"),
  uuid = require("node-uuid"),
  _ = require('underscore');

var Achievements = function(options) {
  Achievements.super.call(this, options);
};

masterEvents = [];

Achievements.prototype = {
  getEvents: function(cb) {
    //return a list of all events
    var me = this;
    try {
      training.api.event.find({
        view : "default"
      }, function (err, result){
        if(err) {
          feather.logger.warn({category:'EVENTS',message:'Could not find any events'});
          cb(err);

        } else {
          result.documents.forEach(function(doc, index, documents) {
            masterEvents.push({id:doc._id,name:doc.name});
            feather.logger.debug({category:'EVENTS', message:'Found event w/ id ' + doc._id + 'key ' + doc.name});
          });
          cb(null, masterEvents);
        }   
      });
    } catch (err) {
      cb(err.message, null);
    }
  },
  getEventAt: function(location, cb){
    var me = this;
    var i = 0;
                feather.logger.debug({category:'EVENTS', message:'getEvent at called with location ' + location});

    var foundEvent = {id:"0",name:"null"};
    try {
      training.api.event.find({
        view : "default"
      }, function (err, result){
        if(err) {
          cb(err);
        } else {
                       feather.logger.debug({category:'EVENTS', message:'bevore for loop location' + location + "master events length" + masterEvents.length});

          for(var i = 0; i<masterEvents.length; i++) {
             feather.logger.debug({category:'EVENTS', message:'for loop location' + location + "master events i" + masterEvents[i].id + "index "+ i});

             if(masterEvents[i].id==location){
             feather.logger.debug({category:'EVENTS', message:'in for loop MATCH' + location + "master events i" + masterEvents[i].id + "index "+ i + "master events i "+masterEvents[i].name});
                foundEvent.name = masterEvents[i].name;
              } 
          }
          cb(null, foundEvent);
        }   
      });
    } catch (err) {
      cb(err.message, null);
    }    
  },
  addToEventLog : function(data,cb){


    /*var game = {
      name: "Fake Game1000",
      categories: ["rpg"],
      maxPlayers: 4,
      minPlayers: 1
    };

    training.api.game.save({doc: game}, function(err, result) {
    });*/

    var eventStub = {
      name:data.name,
      src:data.src,
      user_id:data.user_id
    };

    training.api.eventLog.save({doc: eventStub}, function(err, result) {
    });
  }

};

inherits(Achievements, Registry);

var achievements = new Achievements();

module.exports = achievements;
