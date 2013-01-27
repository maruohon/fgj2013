Bird = BaseEntity.extend({
	defaults: {
		'speed' : 2,
		'acc' : 0.1,
		'frame' : 0,
		'animFrame' : 0,
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
		'scroll': [0,0],
		'goingRight': true,
		'soundPlaying': "",
		'tweetCount': 400
	},
	initialize: function(){
		var model = this;

		var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Keyboard, bird, Mouse, SpriteAnimation");
		model.set('width', entity.w);
		model.set('height', entity.h);
		entity
		.attr({x: model.get('x'), y: model.get('y'), z: 500})
		//.collision(new Crafty.polygon([21,63],[40,55],[59,52],[71,52],[74,39],[83,24],[102,13],[117,13],[119,13],[136,24],[147,37],[151,51],[174,54],[190,58],[195,62],[200,68],[196,78],[180,85],[148,91],[102,92],[70,91],[46,86],[24,80],[17,68],[18,64]))
		.bind('EnterFrame', function(e){
			// Random bird tweets, bird_1, bird_2, bird_3
			if(model.get('tweetCount') <= 0) {
				console.log(model.get('tweetCount'));
				var soundnum = Math.round(Math.random()*2)+1;
				Crafty.audio.play("bird_"+soundnum,1,0.4);
				model.set('tweetCount',Math.random()*300+200);
			} else {
				model.set('tweetCount',model.get('tweetCount')-1);
			}
			
			
			if (model.get('distcalcticks') <= 0) {

				var dist = [];
				_.each(wormList,function(item,i) {
					var wx = item.attributes.entity.x;
					var wy = item.attributes.entity.y;
				
					dist[i] = Crafty.math.squaredDistance(wx,wy,model.get('entity').x,model.get('entity').y);
				});
				dist.sort(function(a,b) { return a-b;});
				
				var sDist = dist.shift();
	
				if(sDist <= 8200) {
					if(model.get('soundPlaying') !== "hb_very_fast") {
						Crafty.audio.stop(model.get('soundPlaying'));
						Crafty.audio.play("hb_very_fast",-1,0.5);
						model.set('soundPlaying',"hb_very_fast");
					}
				} else if(sDist > 8200 && sDist <= 65536) {
					if(model.get('soundPlaying') !== "hb_normal") {
						Crafty.audio.stop(model.get('soundPlaying'));
						Crafty.audio.play("hb_normal",-1,0.4);
						model.set('soundPlaying',"hb_normal");
					}
				} else if(sDist > 65536 && sDist <= 147456) {
					if(model.get('soundPlaying') !== "hb_slow") {
						Crafty.audio.stop(model.get('soundPlaying'));
						Crafty.audio.play("hb_slow",-1,0.3);
						model.set('soundPlaying',"hb_slow");
					}
				} else if(sDist > 147456 && sDist <= 250000) {
					if(model.get('soundPlaying') !== "hb_very_slow") {
						Crafty.audio.stop(model.get('soundPlaying'));
						Crafty.audio.play("hb_very_slow",-1,0.3);
						model.set('soundPlaying',"hb_very_slow");
					}
				} else {
						if(model.get('soundPlaying') !== "stopped") {
							Crafty.audio.stop(model.get('soundPlaying'));
							model.set('soundPlaying',"stopped");
						}
				}
				
				model.set('distcalcticks', 30);
			} else {
				model.set('distcalcticks',model.get('distcalcticks')-1);
			}
			if(model.get('newpath')){
				model.set({'followpath' : true});

				var wx = model.get('entity').x;
				var wy = model.get('entity').y;
				
				var angle = Math.atan2(model.get('targety')-wy,model.get('targetx')-wx);

				if(angle >= -Math.PI/4 && angle < Math.PI/4) {
					entity.__coord[1] = 64;
				}
				if(angle >= Math.PI/4 && angle < Math.PI*(3/4)) {
					entity.__coord[1] = 128;
				}

				if(angle >= Math.PI*(3/4) && angle < Math.PI+0.001) {
					entity.__coord[1] = 0;
					model.set('goingRight',false);
				}
				if(angle >= -Math.PI && angle < -Math.PI*(3/4)) {
					entity.__coord[1] = 0;
					model.set('goingRight',false);
				}

				if(angle >= -Math.PI*(3/4) && angle < -Math.PI/4) {
					entity.__coord[1] = 192;
				}

				//console.log(angle+" "+wx+" "+wy+" "+model.get('targety')+" "+model.get('targetx'));
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
				//console.log(model.get('accdist'));
				model.set('newpath', false);
			}

			if(model.get('followpath')) {
				if(model.get('frame') < 8) {
					model.set('frame', model.get('frame')+1);
				} else {
					model.set('frame', 0);
					model.set('animFrame', model.get('animFrame') + 1);
					if(model.get('animFrame') > 3) {
						model.set('animFrame', 0);
					}
				}
			
				
				
				var ovec = model.get('origvec2').clone();
				// Acceleration phase
				if(model.get('origpathdist') - model.get('pathdist') < model.get('accdist')) {
					//console.log("Acc:"+model.get('vec2'));
					model.set('vec2',model.get('vec2').add(ovec.scale(model.get('acc'))));
					// Normal phase
				} else if(model.get('origpathdist') - model.get('pathdist') >= model.get('accdist') && model.get('pathdist') > model.get('accdist')) {
					//console.log("Norm "+model.get('pathdist')+":"+model.get('vec2'));
					// Deceleration phase
				} else if (model.get('pathdist') < model.get('accdist') && model.get('pathdist') >= 0){
					//console.log("Dec:"+model.get('vec2'));
					model.set('vec2',model.get('vec2').subtract(ovec.scale(model.get('acc'))));
				} else {
					//console.log("Ab");
					model.set('vec2', new Crafty.math.Vector2D(0,0));
					model.set('followpath',false);
					model.get('entity').x = model.get('targetx');
					model.get('entity').y = model.get('targety');
					// stub
				}
				var vec = model.get('vec2');
				model.set('pathdist',model.get('pathdist')-vec.magnitude());
				model.get('entity').x += vec.x;
				model.get('entity').y += vec.y;
				
				Crafty.viewport.scroll('_x', -model.get('entity').x+Crafty.viewport.width/2);
				Crafty.viewport.scroll('_y', -model.get('entity').y+Crafty.viewport.height/2);

				model.get('scroll')[0] = -model.get('entity').x+Crafty.viewport.width/2;
				model.get('scroll')[1] = -model.get('entity').y+Crafty.viewport.height/2;
				
				if(model.get('vec2').magnitude() < 0.001 ||(Math.abs(model.get('targetx')-model.get('entity').x) <= 2 && Math.abs(model.get('targety')-model.get('entity').y) <= 2) ) {
					model.set('followpath',false);
					model.set('animFrame', 0);
					/*if(model.get('goingRight'))
						entity.__coord[1] = 64;
					else
						entity.__coord[1] = 0;*/
					model.get('entity').x = model.get('targetx');
					model.get('entity').y = model.get('targety');
				}

			} else {
				//model.get('entity').sprite(1, 1, 1, 1);
				// idle pose
				
				if(model.get('frame') < (80+Math.random()*100)) {
					model.set('frame', model.get('frame')+1);
				} else {
					model.set('frame', 0);
					if(model.get('animFrame') == 0) {
					
						model.set('animFrame', 2);
						console.log('a');
						entity.__coord[1] = Math.floor(Math.random()*2)*64;
					} else {
						
						model.set('animFrame', 0);
						console.log('b');
						entity.__coord[1] = 0;
						console.log(entity);
					}
					model.get('entity').x = model.get('targetx');
					model.get('entity').y = model.get('targety');
				}
				
			}
			model.get('entity').__coord[0] = model.get('animFrame')*64;

		})
		.bind('KeyDown', function () {

		})       
		.bind('Click', function(e) {
			
			// Try to eat
			// Check tile
			var tilex = Math.round(model.get('entity').x/64);
			var tiley = Math.round(model.get('entity').y/64);
			
			$.each(wormList, function(i,worm) {
				if(worm.get('tilex') === tilex && worm.get('tiley') === tiley) {
					console.log("Got a worm!");
					model.set('animFrame', 0);
					model.get('entity').sprite(1, 4, 1, 1);
					//model.get('entity').animate('bird',20);
					Crafty.audio.play("peck",1,0.5);
					model.get('entity').x = model.get('targetx');
					model.get('entity').y = model.get('targety');
					worm.get('entity').destroy();
					wormList.splice(i,1);
					return false;
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
			if(tilex != model.get('targetx') || tiley != model.get('targety')) {
				model.set({'targetx' : tilex});
				model.set({'targety' : tiley});
				model.set({'newpath' : true});
			}

		}});
		model.set({'mouseHandler' : function (e) {

			model.attributes.moveTo(e.offsetX/*-entity.w/2*/,e.offsetY/*-entity.h/2*/);
		}});
	}
});
