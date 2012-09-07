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
				  result.documents.forEach(function(key, id, documents) {
				    masterGamesTest.push({id:id,name:key.name});
				    feather.logger.debug({category:'REST', message:'Found document w/ id ' + id + 'key ' + key.name});
				  });
				  _cb(null, masterGamesTest);
				}   
			});

        })

      }
  });
};




     