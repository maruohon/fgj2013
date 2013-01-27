
Crafty.scene("gameover", function() {

	var elements = [
        /*"src/interfaces/info.js",
        "src/entities/tile.js",
        "src/interfaces/title_text.js",
        "src/interfaces/title_bird.js",
        "src/interfaces/new_game.js",
        "src/interfaces/heart_icon.js",
        "src/interfaces/score_text.js",*/
        //"src/interfaces/back_to_menu.js",
        //"src/interfaces/restart_game.js",
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {	   
		
		var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Multiway, Keyboard, button_bg, SpriteAnimation, Mouse, Collision, MouseHover");
		entity
		.attr({x: ((Crafty.viewport.width) / 2) - 600/2, y: ((Crafty.viewport.height))/2 - 700/2, z: 301, w: 400, h: 500})
		.bind('EnterFrame', function(e){
			// Animate this
			/*this.y-=speed;
			if(Math.abs(this.y - 520) < 60 && speed >= 0.2) {
				speed-=0.2;
			} else {
				if(speed < 0.2)
					speed = 0;
			}
			model.set('frame', model.get('frame')+1);
			if(model.get('frame') >= 360) {
				model.set('frame', 0);
				
			}
			
			if(speed == 0) {
				this.w = 150 + Math.sin(model.get('frame')/(2*3.14))*10;
				this.x = ((Crafty.viewport.width) / 2) -  this.w /2 ;
				
				this.h = 66 + Math.sin(model.get('frame')/(2*3.14))*5;
				this.y = 540 -  this.h /2 ;
				
				this.rotation = Math.sin(-model.get('frame')/10);
			}*/
			
		})
		.bind('Click', function(){
			
			
		})
		.setName('Gameover');
		entity.origin(entity.w/2, entity.h/2);
		

	});

});
