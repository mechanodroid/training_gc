

feather.ns("training_gc");
(function() {
  training_gc.eventSim = feather.Widget.create({
    name: "training_gc.eventSim",
    path: "widgets/eventSim/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;
        var myUsername = feather.util.qs.user || "joeschmoe";
        
        function findGameIndexByID(games, id ) {
          for(var i = 0; i<games.length; i++) {
             if(games[i].id==id){
                return i;
              } 
          }
          return 0;
        }
      
        me.server_populateAchievementsList(function(args) {
             var gameSelect = me.get("#eventSelect");
             for (var i = 0, len = args.result.length; i < len; ++i) {
                 var item = args.result[i];
                 gameSelect.append("<option value=\""+item.id+"\">"+item.name+"</option>");
             }
            }
        );

                //when one of my buttons is clicked
        me.domEvents.bind(me.get("#eventButton"), "click", function() {
          //TODO: above in populate, put this all in a big array
          //then go through the array and at the position marked by: me.get("#eventSelect").val();, use this to populate eventToAdd
          var eventToAdd = {
            name : "000",
            user_id : "000",
            src : "000"
          };   

          var valSel = me.get("#eventSelect").val();
          feather.alert('achievement js calling eventFindAt with id ' +  valSel);

          me.server_eventFindAt([valSel], function(args){
            feather.alert('hi I am a squid');
            eventToAdd.name = args.result.name;
            eventToAdd.user_id = "111";
            eventToAdd.src = "111";
            me.server_eventLogAdd([eventToAdd],null);
          });      
        

        });
      }   
    }  
  });
})();