$("document").ready( function () {
	

});

Crafty.scene("main", function() {

	var elements = [
        "src/entities/ufo.js",
        "src/entities/worm.js",
        "src/entities/tile.js",
				"src/entities/bird.js",
		"src/components/world.js",
        "src/interfaces/info.js"
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {	   
		/* Create a set of worms */
		for(var i = 0; i < 10; i++) {
			wormList[i+''] = new Worm();
		}
			
		sc['bird'] = new Bird();
//		sc['grass'] = new Tile('grass01');

		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				//place grass on all tiles
				//grassType = Crafty.math.randomInt(1, 4);
				//console.log(gameContainer.conf.get('renderType'));
				//Crafty.e("2D, Canvas, grass_01")
				//.attr({ x: i * 63, y: j * 63, z: 1 });
				sc['tile'+ i +'x'+ j] = new Tile('grass01', i*64, j*64);
			}
		}

		sc['world'] = new World();
		console.log('Exists 0, 0: ' + sc['world'].attributes.chunkExists(0, 0));
		console.log('Generating chunk at 0, 0 ...' + sc['world'].attributes.generateChunk(0, 0, 'grass'));
		console.log('Generating features at 0, 0 ...' + sc['world'].attributes.generateFeatures(0, 0));
		console.log(sc['world'].defaults);
		
		$("#cr-stage").click(function(e) {
			console.log("Click registered");
			sc['bird'].attributes.mouseHandler(e);
		});
		console.log('Moi');
//		infc['info'] = new Info();
	});

});
