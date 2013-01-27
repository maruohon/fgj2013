
Crafty.scene("title", function() {

	var elements = [
        "src/interfaces/info.js",
        "src/entities/tile.js",
        "src/interfaces/title_text.js",
        "src/interfaces/title_bird.js",
        "src/interfaces/new_game.js"
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {	   
		var title_text = new TitleText();
		var title_bird = new TitleBird();
		var start_game = new StartGame();

		start_game.getEntity().bind('Click', function() {
			Crafty.scene('main');
		});
		$("#cr-stage").click(function(e) {
			console.log("Click registered");
		});
		for (var i = 0; i < 26; i++) {
			for (var j = 0; j < 16; j++) {
				//place grass on all tiles
				//grassType = Crafty.math.randomInt(1, 4);
				//console.log(gameContainer.conf.get('renderType'));
				//Crafty.e("2D, Canvas, grass_01")
				//.attr({ x: i * 63, y: j * 63, z: 1 });
				sc['tile'+ i +'x'+ j] = new Tile('grass1', i*64, j*64);
			}
		}

	});

});
