Bird = BaseEntity.extend({
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
        'ytarget': 100,  // target y (will overwrite speed)
				'distcalcticks': 30
    },
    initialize: function(){
    	var model = this;
    	
    	var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Keyboard, bird, SpriteAnimation");
    	model.set('width', entity.w);
    	model.set('height', entity.h);
    	entity
            .attr({x: model.get('x'), y: model.get('y'), z: 300})
            //.collision(new Crafty.polygon([21,63],[40,55],[59,52],[71,52],[74,39],[83,24],[102,13],[117,13],[119,13],[136,24],[147,37],[151,51],[174,54],[190,58],[195,62],[200,68],[196,78],[180,85],[148,91],[102,92],[70,91],[46,86],[24,80],[17,68],[18,64]))
            .bind('EnterFrame', function(e){
							
            	if (model.get('distcalcticks') <= 0) {
								
									var dist = [];
								_.each(wormList,function(item,i) {
									var wx = item.attributes.entity.x;
									var wy = item.attributes.entity.y;
									dist[i] = Crafty.math.squaredDistance(wx,wy,model.get('x'),model.get('y'));
								});
								
								model.set('distcalcticks', 30);
							} else {
								model.set('distcalcticks',model.get('distcalcticks')-1);
							}
							
            })
            .bind('KeyDown', function () {
            	
            })       
            .bind('Click', function(e) {
            	//console.log(e);

            })
            .setName('Bird');

            entity.origin(entity.w/2, entity.h/2);

    	model.set({'entity' : entity });
			model.set({'moveTo' : function (x,y) {
				console.log(x+" "+y);
				model.set({'targetx' : x-model.get('x')});
				model.set({'targety' : y-model.get('y')});
				model.attributes.entity.x = x;
				model.attributes.entity.y = y;
			}});
			model.set({'mouseHandler' : function (e) {
			
				model.attributes.moveTo(e.clientX-entity.w/2,e.clientY-entity.h/2);
			}});
    }
});
