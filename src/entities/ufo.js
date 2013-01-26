Ufo = BaseEntity.extend({
	defaults: {
        'speed' : 2,
        'frame' : 0,
        'width': 0,   // width
        'height': 0,  // height
        'x': 100,       // x
        'y': 100,       // y
        'r': 0,       // rotation (not used yet)
        'xspeed': 0,  // x speed
        'yspeed': 0,  // y speed
        'xtarget': 100, // target x (will overwrite speed)
        'ytarget': 100  // target y (will overwrite speed)
    },
    initialize: function(){
    	var model = this;
    	
    	var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Multiway, Keyboard, ufo, SpriteAnimation, Mouse, Collision, MouseHover");
    	model.set('width', entity.w);
    	model.set('height', entity.h);
    	entity
            .attr({x: model.get('x'), y: model.get('y'), z: 300})
            .collision(new Crafty.polygon([21,63],[40,55],[59,52],[71,52],[74,39],[83,24],[102,13],[117,13],[119,13],[136,24],[147,37],[151,51],[174,54],[190,58],[195,62],[200,68],[196,78],[180,85],[148,91],[102,92],[70,91],[46,86],[24,80],[17,68],[18,64]))
            .bind('EnterFrame', function(e){
            	// Handle input
            	
            	if (this.isDown('UP_ARROW')) {
            		//model.set('yspeed', -2);
            			model.set('ytarget', model.get('ytarget') - 40);
            	}
            	if (this.isDown('DOWN_ARROW')) {
            			model.set('ytarget', model.get('ytarget') + 40);
            	}          	
            	if (this.isDown('LEFT_ARROW')) {
            		model.set('xspeed', -2);
            	}
            	if (this.isDown('RIGHT_ARROW')) {
            		model.set('xspeed', 2);
            	}          	
            	
            	//console.log(Crafty.mouseButton);
            	/*if (Crafty.Click()) {
                   	model.set('xtarget', Crafty.mousePos.x);
                	model.set('ytarget', Crafty.mousePos.y);
                	console.log(Crafty.mousePos.x);
                	        		
            	}*/
 
            	// Update Model
            	model.set('frame', model.get('frame')+0.1);
            	
            	/*
            	var diff;
            	diff = Math.abs(model.get('ytarget') - model.get('y'));
            	if(diff >= 20 ) {
            		// max speed
            		if (model.get('ytarget') < model.get('y')) {
            			model.set('yspeed', -2);
            		} else {
            			model.set('yspeed', 2);
            		}
            	} else if(diff > 2 && diff < 20) {
            		if (model.get('ytarget') < model.get('y')) {
            			model.set('yspeed', -2*(diff/20));
            		} else {
            			model.set('yspeed', 2*(diff/20));
            		}
            	} else {
            		model.set('yspeed', 0);
            		//console.log(model.get('ytarget'));
            		model.set('y', model.get('ytarget'));
            	}
                  */
            	
            	// Update the model position
            	model.set('x', model.get('x') + model.get('xspeed'));
            	model.set('y', model.get('y') + model.get('yspeed'));

            	// Smooth slowdown :) v.0.1
            	/*diff = Math.abs(model.get('xspeed'));
            	if (diff > 0.1) {
            		if(model.get('xspeed') > 0) {
            			model.set('xspeed', model.get('xspeed') - 0.1);
            		} else {
            			model.set('xspeed', model.get('xspeed') + 0.1);
            		}            			
            	} else {
            		model.set('xspeed', 0);
            	}
            	
            	diff = Math.abs(model.get('yspeed'));
            	if (diff > 0.2) {
            		if(model.get('yspeed') > 0) {
            			model.set('yspeed', model.get('yspeed') - 0.2);
            		} else {
            			model.set('yspeed', model.get('yspeed') + 0.2);
            		}            			
            	} else {
            		model.set('yspeed', 0);
            	}     
            	*/
            	
            	// Update Entity
            	entity.w = model.get('width') + Math.cos(model.get('frame'))*10;
            	entity.x = model.get('x') - entity.w/2;
            	entity.y = model.get('y') - entity.h/2;
            	entity.rotation = 0 + Math.sin(model.get('frame'))*3;

            	
            })
            .bind('KeyDown', function () {
            	
            })       
            .bind('Click', function(e) {
            	//console.log(e);

            })
            .setName('Ufo');

            entity.origin(entity.w/2, entity.h/2);

    	model.set({'entity' : entity });
    }
});
