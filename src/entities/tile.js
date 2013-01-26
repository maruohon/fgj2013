Tile = BaseEntity.extend({
	defaults: {
	},
	initialize: function(tiletype, x, y, z) {
		var model = this;
		var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Multiway, Keyboard, "+tiletype+", SpriteAnimation, Mouse, Collision, MouseHover");
		if(z === undefined) {
			z = 200;
		}

		entity
		    .attr({x: x, y: y, z: z})
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
