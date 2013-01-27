$("document").ready( function () {
	

});

Crafty.scene("main", function() {

	var elements = [
        "src/entities/ufo.js",
        "src/entities/worm.js",
        "src/entities/tile.js",
		"src/entities/bird.js",
		"src/components/world.js",
        "src/entities/popup_worm.js",
        "src/interfaces/heart_icon.js",
		"src/interfaces/score_text.js"
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {	   
		/* Create a set of worms */
		for(var i = 0; i < 50; i++) {
			wormList[i+''] = new Worm();
			wormList[i+''].set('tilex',Math.round(Math.random() * 31));
			wormList[i+''].set('tiley',Math.round(Math.random() * 31));
			
		}

		sc['world'] = new World();
		sc['world'].attributes.setSeed('foo12');

		sc['heart'] = new HeartIcon();	
		
		sc['bird'] = new Bird();	
		
		sc['worm_text'] = Crafty.e("2D, DOM, Text");

		sc['worm_text']
            .attr({x: 70, y: 300, z: 9000, w:600})
            .text('Worms: 0 / 50')
            .textColor('#000')
            .textFont({'size' : '32px', 'family': 'Verdana'})
            .bind('Click', function(){
            })
            .bind('EnterFrame', function(e){
            	//console.log(wormList);
            	sc['worm_text'].x = -sc['bird'].get('scroll')[0] - 125;
            	sc['worm_text'].y = -sc['bird'].get('scroll')[1] + 90;
            	var worms = wormList.length;
            	sc['worm_text'].text("Worms: "+(50-worms)+" / 50");
            });

//		sc['grass'] = new Tile('grass01');
		//Crafty.viewport.follow(sc['bird'].get('entity'), 0, 0);

		sc['world'].attributes.loadAroundXZwithR(0, 0, 32);

		for (var i = 0; i < 32; i++) {
			for (var j = 0; j < 32; j++) {
				//place grass on all tiles
				//grassType = Crafty.math.randomInt(1, 4);
				//console.log(gameContainer.conf.get('renderType'));
				//Crafty.e("2D, Canvas, grass_01")
				//.attr({ x: i * 63, y: j * 63, z: 1 });
				var tiletexture = sc['world'].attributes.getTileTexture(i, j);
				sc['tile_x' + i + '_z'+ j + '_0'] = new Tile(tiletexture[0], i * 64, j * 64);

				// If the tile has a texture on the upper layer...
				if(tiletexture[1] !== undefined) {
					sc['tile_x' + i + '_z'+ j + '_1'] = new Tile(tiletexture[1], i * 64, j * 64, 205); // Set z higher than the default of 200
				}
			}
		}

		$("#cr-stage").click(function(e) {
			console.log("Click registered");
			sc['bird'].attributes.mouseHandler(e);
		});
		sc['score_text'] =  new ScoreText();
		console.log('Moi');
	});

});
