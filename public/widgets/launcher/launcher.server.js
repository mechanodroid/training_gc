exports.getWidget = function(feather, cb) {
  cb(null, {
    name: "training_gc.launcher",
    path: "widgets/launcher/",
  prototype: {

      populateList: feather.Widget.serverMethod(function(_cb) {


        training.api.game.find({
          view : "default"
        }, function (err, result){
          if(err) {
            feather.logger.warn({category:'REST',message:'Could not find any results in games'});
            _cb(null, masterGamesTest);

          } else {
            masterGamesTest = [];
            //debugger;
            result.documents.forEach(function(doc, index, documents) {
              masterGamesTest.push({id:doc._id,name:doc.name});
              feather.logger.debug({category:'REST', message:'Found document w/ id ' + doc._id + 'key ' + doc.name});
            });
            _cb(null, masterGamesTest);
          }   
        });

      })

    }
  });
};




     