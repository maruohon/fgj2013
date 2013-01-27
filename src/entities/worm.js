Worm = BaseEntity.extend({
	defaults: {
        'speed' : 20,
        'timer' : Math.floor(Math.random() * 100),
				// Assume that tiles are 64 pixels x 64 pixels
				'tilex' : Math.round(Math.random() * 10),
				'tiley' : Math.round(Math.random() * 10)
    },
    initialize: function(){
    	var model = this;
    	var entity = Crafty.e(" "+gameContainer.conf.get('renderType')+", Multiway, Keyboard, worm, SpriteAnimation, Mouse, Collision, MouseHover");

    	entity
		.attr({x: model.get('tilex')*64, y: model.get('tiley')*64, z: 301, w: 64, h: 64})
		.bind('EnterFrame', function(e){
		var tmp = model.get('timer') - 1;
		if(tmp <= 0) {
			//model.set('tilex', model.get('tilex')+Math.round(Math.random())*2-1);
			//model.set('tiley', model.get('tiley')+Math.round(Math.random())*2-1);
			//entity.x = model.get('tilex')*64+16;
			//entity.y = model.get('tiley')*64+16;
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
