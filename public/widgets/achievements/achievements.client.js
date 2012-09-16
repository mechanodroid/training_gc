//temp for mockup
var achievement1 = {
  name : "loggedIn5Times",
  events : [ 
    { name : "loggedIn",
    src : "PenThePenquin",
    occurences : 5 }
  ],
  date : "060212",
  maxAwarded: 5,
  rewards : [
    { type : "trophy",
      value : 10 }
  ],
  prerequisites : []
}

var event1 = {
  name : "loggedIn",
  user_id : "123",
  src : "PenThePenquin",
  date : "0612012"
}

feather.ns("training_gc");
(function() {
  training_gc.achievements = feather.Widget.create({
    name: "training_gc.achievements",
    path: "widgets/achievements/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;


        //when one of my buttons is clicked
          me.domEvents.bind(me.get("#getAchievementsButton"), "click", function() {
            var i = 5;
          });
      }
    }
  });
})();