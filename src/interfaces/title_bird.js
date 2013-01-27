TitleBird = BaseEntity.extend({
	defaults: {
        'frame' : 0
    },
    initialize: function(){
    	var model = this;
    	
		var speed = 4;
		var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Multiway, Keyboard, title_bird, SpriteAnimation, Mouse, Collision, MouseHover");
		entity
		.attr({x: ((Crafty.viewport.width) / 2) - 239/2 + 50, y: -((Crafty.viewport.height)), z: 350})
		.bind('EnterFrame', function(e){
			// Animate this
			this.y+=speed;
			if(Math.abs(this.y - 50) < 90 && speed >= 0.1) {
				speed-=0.1;
			} else {
				if(speed < 0.1)
					speed = 0;
			}
						
			model.set('frame', model.get('frame')+1);
			if(model.get('frame') > 350) {
				model.get('entity').sprite(0, 0, 1, 1);
			} else {
				model.get('entity').sprite(1, 0, 1, 1);
			}
			if(model.get('frame') >= 360) {
				model.set('frame', 0);
				
			}
			
			if(speed == 0) {
				this.y = 40+Math.sin(model.get('frame')/(2*3.14))*3;
			}
			
			
		})
		.bind('Click', function(){
			// Play sound!!
			
		})
		.setName('TitleBird');
		entity.origin(entity.w/2, entity.h/2);
	/*	
    	entity
            .attr({x: 50, y: 50, z: 1000, w: 400})
            .text(model.get('text'))
            .textColor('#000')
            .textFont({'size' : '24px', 'family': 'Arial'})
            .bind('Click', function(){
                                
            })
*/
    	model.set({'entity' : entity });
    }
});