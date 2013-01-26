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
		//Crafty.viewport.follow(sc['bird'].get('entity'), 0, 0);
		
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

		sc['world'] = new World();

		var tmp = "";
/*
		tmp = sc['world'].attributes.chunkIsLoaded(0, 0);
		console.log('chunkIsLoaded 0, 0: ' + tmp);

		if(tmp === false) {
			tmp = sc['world'].attributes.loadChunk(0, 0);
//			console.log('loadChunk(0, 0) ... ' + tmp);
		}
*/
//		tmp = sc['world'].attributes.unloadChunk(0, 0);
//		console.log('unloadChunk(0, 0) ... ' + tmp);
		tmp = sc['world'].attributes.loadAroundXZwithR(3, 3, 2);
		console.log('loadAroundXZwithR(): ' + tmp);

		console.log(sc['world'].defaults);

/*
		var foo = [];
		foo[-6] = -6;
		foo[-5] = -5;
		foo[-4] = -4;
		for(var i = 0; i < foo.length; i++) {
			console.log('for: ' + i + ' : ' + foo[i]);
		}
		console.log('foo.length: ' + foo.length);
		console.log('foo: ' + foo);

		for(var k in foo) {
			console.log('key: ' + k + ' val: ' + foo[k]);
		}
		console.log('foo[-5]: ' + foo[-5]);
*/
		$("#cr-stage").click(function(e) {
			console.log("Click registered");
			sc['bird'].attributes.mouseHandler(e);
		});
		console.log('Moi');
//		infc['info'] = new Info();
	});

});
