feather.ns("training_gc");
(function() {
  training_gc.gameLine = feather.Widget.create({
    name: "training_gc.gameLine",
    path: "widgets/gameLine/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;
        
        if (me.options && me.options.game) {
          me.updateData(me.options.game)
        }
      },
      updateData: function(g) {
        var me = this;
        me.options.game = g;
        me.container.empty();
        $.tmpl(me.templates.lineItem, me).appendTo(me.container);
        
        me.domEvents.bind(me.get("#join"), "click", function() {
            me.fire("join", me.options.game.name);
        });  
      }
    }
  });
})();
