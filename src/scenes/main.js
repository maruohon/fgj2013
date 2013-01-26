Crafty.scene("main", function() {

	var elements = [
        "src/entities/ufo.js",
        "src/entities/worm.js",
        "src/entities/tile.js",
        "src/interfaces/info.js"
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {	   
		sc['worm'] = new Worm();
		sc['ufo'] = new Ufo();
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
		
		
		console.log('Moi');
//		infc['info'] = new Info();
	});

});
