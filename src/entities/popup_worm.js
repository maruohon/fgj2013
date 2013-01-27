PopupWorm = BaseEntity.extend({
	defaults: {
        'speed' : 20,
        'timer' : 0,
        'speedx' : 0,
        'speedy' : -5,
        'dx' : 0,
        'dy' : 0
    },
    initialize: function(sx,sy,dx,dy){
    	var model = this;
    	model.set('dx', dx);
    	model.set('dy', dy);
    	var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Multiway, Keyboard, worm_small, SpriteAnimation, Mouse, Collision, MouseHover");

    	console.log(entity);
    	entity
		.attr({x: sx, y: sy, z: 301, w: 48, h: 48})
		.bind('EnterFrame', function(e){
				entity.x += model.get('speedx');
				entity.y += model.get('speedy');
				//console.log(entity.x);
				// modify speed
				var diffx = Math.abs(entity.x - model.get('dx'));
				var diffy = Math.abs(entity.y - model.get('dy'));

				if(entity.x < dx)
					model.set('speedx', model.get('speedx')+1*(diffx/diffy));
				if(entity.x > dx)
					model.set('speedx', model.get('speedx')-1*(diffx/diffy));
				if(entity.y < dy)
					model.set('speedy', model.get('speedy')+1);
				if(entity.y > dy)
					model.set('speedy', model.get('speedy')-1);
				
				if(model.get('speedx') > 10*(diffx/diffy)) {
					model.set('speedx', 10*(diffx/diffy));
				}
				if(model.get('speedx') < -10*(diffx/diffy)) {
					model.set('speedx', -10*(diffx/diffy));
				}
				if(model.get('speedy') > 10) {
					model.set('speedy', 10);
				}
				if(model.get('speedy') < -10) {
					model.set('speedy', -10);
				}
				
				if(entity.x > model.get('dx')-20 && entity.x < model.get('dx')+20 && entity.y > model.get('dy')-20 && entity.y < model.get('dy')+20) {
					entity.destroy();
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
		.setName('PopupWorm');

		entity.origin(entity.w/2, entity.h/2);

    	model.set({'entity' : entity });
    }
});
