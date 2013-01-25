Tile = BaseEntity.extend({
	defaults: {
	},
	initialize: function(tiletype, x, y) {
		var model = this;
		var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Multiway, Keyboard, "+tiletype+", SpriteAnimation, Mouse, Collision, MouseHover");

		entity
		    .attr({x: x, y: y, z: 201})
		    .bind('EnterFrame', function(e){
		    	//stub
		    })
		    .bind('Click', function(){
		    	//stub
		    })
		    .setName('Tile');

		    entity.origin(entity.w/2, entity.h/2);

		model.set({'entity' : entity });
	}
});
