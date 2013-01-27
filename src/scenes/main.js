$("document").ready( function () {
	

});

Crafty.scene("main", function() {

	var elements = [
        "src/entities/ufo.js",
        "src/entities/worm.js",
        "src/entities/tile.js",
		"src/entities/bird.js",
        "src/interfaces/info.js"
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {	   
		/* Create a set of worms */
		for(var i = 0; i < 50; i++) {
			wormList[i+''] = new Worm();
			wormList[i+''].set('tilex',Math.round(Math.random() * 31));
			wormList[i+''].set('tiley',Math.round(Math.random() * 31));
			
		}
			
		sc['bird'] = new Bird();
//		sc['grass'] = new Tile('grass01');
		//Crafty.viewport.follow(sc['bird'].get('entity'), 0, 0);
		
		for (var i = 0; i < 32; i++) {
			for (var j = 0; j < 32; j++) {
				//place grass on all tiles
				//grassType = Crafty.math.randomInt(1, 4);
				//console.log(gameContainer.conf.get('renderType'));
				//Crafty.e("2D, Canvas, grass_01")
				//.attr({ x: i * 63, y: j * 63, z: 1 });
				sc['tile'+ i +'x'+ j] = new Tile('grass1', i*64, j*64);
			}
		}
		
		$("#cr-stage").click(function(e) {
			console.log("Click registered");
			sc['bird'].attributes.mouseHandler(e);
		});
		console.log('Moi');
//		infc['info'] = new Info();
	});

});
