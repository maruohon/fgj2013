Worm = BaseEntity.extend({
	defaults: {
        'speed' : 20,
        'timer' : Math.floor(Math.random() * 100)
    },
    initialize: function(){
    	var model = this;
    	var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Multiway, Keyboard, worm, SpriteAnimation, Mouse, Collision, MouseHover");

    	entity
		.attr({x: ((Crafty.viewport.width/2) - (entity.w/2)), y: (Crafty.viewport.height/2), z: 301})
		.bind('EnterFrame', function(e){
		var tmp = model.get('timer') - 1;
		if(tmp <= 0) {
			entity.x = entity.x + (Math.round(Math.random() * 2) - 1) * 10;
			entity.y = entity.y + (Math.round(Math.random() * 2) - 1) * 10;
			model.set('timer', Math.floor(Math.random() * 100));
		}
		else {
			model.set('timer', tmp);
		}
		})
		.animate('worm', 0, 0, 1)
		.animate('worm', 20, -1)
		.onHit('ufo', function() {
			Crafty.audio.play('testsound', 1, 0.1);
			console.log('Apua!');
			this.destroy();
		})
		.bind('Click', function(){

		})
		.setName('Worm');

		entity.origin(entity.w/2, entity.h/2);

    	model.set({'entity' : entity });
    }
});
