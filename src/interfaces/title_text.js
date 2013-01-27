TitleText = BaseEntity.extend({
	defaults: {
        'frame' : 0,
        'x' : 0
    },
    initialize: function(){
    	var model = this;
    	
		var speed = 3;
		var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Multiway, Keyboard, title_text, SpriteAnimation, Mouse, Collision, MouseHover");
		entity
		.attr({x: ((Crafty.viewport.width) / 2) - 700/2, y: -((Crafty.viewport.height) / 2), z: 301})
		.bind('EnterFrame', function(e){
			// Animate this
			this.y+=speed;
			if(Math.abs(this.y - 10) < 40 && speed >= 0.1) {
				speed-=0.1;
			} else {
				if(speed < 0.1)
					speed = 0;
			}
			model.set('frame', model.get('frame')+1);
			if(model.get('frame') >= 360) {
				model.set('frame', 0);
				
			}
			
			if(speed == 0) {
				this.w = 700 + Math.sin(model.get('frame')/(2*3.14))*20;
				this.x = ((Crafty.viewport.width) / 2) -  this.w /2 ;
				this.rotation = Math.sin(model.get('frame')/10);
			}
			
		})
		.bind('Click', function(){

		})
		.setName('TitleText');
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