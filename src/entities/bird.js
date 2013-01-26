Bird = BaseEntity.extend({
	defaults: {
        'speed' : 2,
				'acc' : 1,
        'frame' : 0,
        'width': 0,   // width
        'height': 0,  // height
        'x': 100,       // x
        'y': 100,       // y
        'r': 0,       // rotation (not used yet)
				'distcalcticks': 30,
				'newpath' : false,
				'followpath' : false,
				'pathdist' : 0,
				'origpathdist' : 0
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
							
							if(model.get('newpath')){
								model.set({'followpath' : true});
							
								var wx = model.get('entity').x;
								var wy = model.get('entity').y;
								var angle = Math.atan2(model.get('targety')-wy,model.get('targetx')-wx);
								console.log(angle+" "+wx+" "+wy+" "+model.get('targety')+" "+model.get('targetx'));
								var vect = new Crafty.math.Vector2D(Math.cos(angle),Math.sin(angle));
								model.set({'vec2' : vect.normalize()});
								model.set({'origvec2' : model.get('vec2')});
								model.set({'pathdist' : Crafty.math.distance(wx,wy,model.get('targetx'),model.get('targety'))});
								model.set({'origpathdist' : Crafty.math.distance(wx,wy,model.get('targetx'),model.get('targety'))});
								
								// Compute the distance required to accelerate and decelerate to desired speed
								var v = 0;
								var v_array = [];
								while(v <= model.get('speed')) {
									v_array.push(v);
									v = v + model.get('acc'); // Add acceleration
									
								}
								var totalDist = _.reduce(v_array,function (memo,num) { return memo+num }, 0);
								
								model.set('accdist',totalDist);
								console.log(model.get('accdist'));
								model.set('newpath', false);
							}
							if(model.get('followpath')) {
								
								var ovec = model.get('origvec2');
								// Acceleration phase
								if(model.get('origpathdist') - model.get('pathdist') < model.get('accdist')) {
									
									model.set('vec2',model.get('vec2').add(ovec.scale(model.get('acc'))));
								// Normal phase
								} else if(model.get('origpathdist') - model.get('pathdist') >= model.get('accdist') && model.get('pathdist') > model.get('accdist')) {
								
								// Deceleration phase
								} else {
									
									model.set('vec2',model.get('vec2').add(ovec.scale(model.get('acc')).negate()));
								}
								var vec = model.get('vec2');
								model.set('pathdist',model.get('pathdist')-vec.magnitude());
								model.get('entity').x += vec.x;
								model.get('entity').y += vec.y;
								
								if(model.get('pathdist') <= 1) {
									model.set('followpath',false);
								}
									
								if(Math.abs(model.get('targetx')-model.get('entity').x) <= 1 && Math.abs(model.get('targety')-model.get('entity').y) <= 1 ) {
									model.set('followpath',false);
								}
							
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
				model.set({'targetx' : x});
				model.set({'targety' : y});
				model.set({'newpath' : true});
			}});
			model.set({'mouseHandler' : function (e) {
			
				model.attributes.moveTo(e.clientX-entity.w/2,e.clientY-entity.h/2);
			}});
    }
});
