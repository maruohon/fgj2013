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
		'origpathdist' : 0,
		'scroll': [0,0]
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

				if(angle >= -3.14/4 && angle < 3.14/4) {
					entity.__coord[0] = 0;
					entity.__coord[1] = 64;
				}
				if(angle >= 3.14/4 && angle < 3.14*(3/4)) {
					entity.__coord[0] = 0;
					entity.__coord[1] = 128;
				}

				if(angle >= 3.14*(3/4) && angle < 3.14) {
					entity.__coord[0] = 0;
					entity.__coord[1] = 0;
				}
				if(angle >= -3.14 && angle < -3.14*(3/4)) {
					entity.__coord[0] = 0;
					entity.__coord[1] = 0;
				}

				if(angle >= -3.14*(3/4) && angle < -3.14/4) {
					entity.__coord[0] = 0;
					entity.__coord[1] = 192;
				}

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
				var totalDist = _.reduce(v_array,function (memo,num) { return memo+num; }, 0);

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
				} else if (model.get('pathdist') < model.get('accdist') && model.get('pathdist') >= 0){

					model.set('vec2',model.get('vec2').add(ovec.scale(model.get('acc')).negate()));
				} else {
					model.set('vec2', new Crafty.math.Vector2D(0,0));
					// stub
				}
				var vec = model.get('vec2');
				model.set('pathdist',model.get('pathdist')-vec.magnitude());
				model.get('entity').x += vec.x;
				model.get('entity').y += vec.y;
				
				Crafty.viewport.scroll('_x', -model.get('entity').x+Crafty.viewport.width/2);
				Crafty.viewport.scroll('_y', -model.get('entity').y+Crafty.viewport.height/2);
/*				if(model.get('pathdist') <= 1) {
					model.set('followpath',false);
				}
*/
				//Crafty.viewport.centerOn(this, 10);
				
				if(Math.abs(model.get('targetx')-model.get('entity').x) <= 1 && Math.abs(model.get('targety')-model.get('entity').y) <= 1 ) {
					model.set('followpath',false);
				}

			}

		})
		.bind('KeyDown', function () {

		})       
		.bind('Click', function(e) {
			// Try to eat
			// Check tile
			var tilex = Math.round(model.get('entity').x/64);
			var tiley = Math.round(model.get('entity').y/64);
			
			_.each(wormList, function(worm, i) {
				if(worm.get('tilex') === tilex && worm.get('tiley') === tiley) {
					worm.destroy();
				}
			});
			
		})
		.setName('Bird');

		entity.origin(entity.w/2, entity.h/2);

		model.set({'entity' : entity });
		model.set({'moveTo' : function (x,y) {
			
			
			console.log(model.get('scroll'));
			x = x - model.get('scroll')[0];
			y = y - model.get('scroll')[1];
			
			console.log(x+" "+y);
			
			var tilex = Math.floor(x/64)*64;
			var tiley = Math.floor(y/64)*64;
			
			console.log(tilex+" x "+tiley);
			model.set({'targetx' : tilex+32});
			model.set({'targety' : tiley+32});
			model.set({'newpath' : true});
		}});
		model.set({'mouseHandler' : function (e) {

			model.attributes.moveTo(e.clientX/*-entity.w/2*/,e.clientY/*-entity.h/2*/);
		}});
	}
});
