var tileIDs = tileIDs || {};
tileIDs.tileIDair = 0;
tileIDs.tileIDgrass = 1;
tileIDs.tileIDstone = 2;
tileIDs.tileIDtree1 = 3;
tileIDs.tileIDwater = 4;


World = BaseEntity.extend({
	defaults: {
		'type'				: 'grass',	// The main terrain type (grass, stone)
		'terrainFeatures'	: { 'water' : true, 'stone' : true, 'trees' : true },	// Additional terrain features that will be generated (water, stone, grass, trees)
		'chunkSize'			: 4,
		'treePercentage'	: 0.2,	// On average, 10% of (grass) tiles can be covered with trees
		'stoneOnGrassPcnt'	: 0.03,	// Stone on grass percentage
		'waterPercentage'	: 0.05,
		'terrainData'		: []
	},
	initialize: function(){
		var model = this;

		model.set({'getChunkCoords': function(x, z) {
			var tmp = [];
			tmp['x'] = Math.floor(x / model.get('chunkSize'));
			tmp['z'] = Math.floor(z / model.get('chunkSize'));
			return tmp;
		}});

		model.set({'chunkExists': function(chunk_x, chunk_z) {
			if(model.get('terrainData')[chunk_x] !== undefined) {
				if(model.get('terrainData')[chunk_x][chunk_z] !== undefined) {
					return true;
				}
			}
			return false;
		}});

		model.set({'generateChunk': function(chunk_x, chunk_z, type) {
			var size = model.get('chunkSize');
			var chunkData = [];

			if(type === 'grass') {
				chunkData[0] = [];
				chunkData[1] = [];
				for(var i = 0; i < size; i++) {
					chunkData[0][i] = [];
					chunkData[1][i] = [];
					for(var j = 0; j < size; j++) {
						chunkData[0][i][j] = tileIDs.tileIDgrass;
						chunkData[1][i][j] = tileIDs.tileIDair;
					}
				}
				model.get('terrainData')[chunk_x] = [];
				model.get('terrainData')[chunk_x][chunk_z] = chunkData.slice();
			}
			else if(type === 'stone') {
				chunkData[0] = [];
				chunkData[1] = [];
				for(var i = 0; i < size; i++) {
					chunkData[0][i] = [];
					chunkData[1][i] = [];
					for(var j = 0; j < size; j++) {
						chunkData[0][i][j] = tileIDs.tileIDstone;
						chunkData[1][i][j] = tileIDs.tileIDair;
					}
				}
				model.get('terrainData')[chunk_x] = [];
				model.get('terrainData')[chunk_x][chunk_z] = chunkData.slice();
			}
			return true;
		}});

		model.set({'generateFeatures': function(chunk_x, chunk_z, p_features) {
			// Initialize the pseudorandom generator with the chunk coordinates
			var features = [];
			if(p_features !== undefined) {
				features = p_features;
			}
			else {
				features = model.get('terrainFeatures');
			}

			Math.seedrandom('x' + chunk_x + 'z' + chunk_z);

			if(features.hasOwnProperty('trees') && features.trees === true) {
				var size = model.get('chunkSize');
				var numtiles = size * size;
				var chunkData = model.get('terrainData')[chunk_x][chunk_z][0];
				var rnd = 0;

				for(var i = 0; i < size; i++) {
					for(var j = 0; j < size; j++) {
						if(chunkData[i][j] === tileIDs.tileIDgrass) {
							rnd = Math.random();
							console.log('rnd: ' + rnd);
							if(rnd >= (1 - model.get('treePercentage'))) {
								model.get('terrainData')[chunk_x][chunk_z][1][i][j] = tileIDs.tileIDtree1;
							}
						}
					}
				}
			}

			if(features.hasOwnProperty('stone') && features.stone === true) {
				var size = model.get('chunkSize');
				var numtiles = size * size;
				var chunkData = model.get('terrainData')[chunk_x][chunk_z][0];

				for(var i = 0; i < size; i++) {
					for(var j = 0; j < size; j++) {
//						if(chunkData[i][j] === tileIDs.tileIDgrass) {
							if(Math.random() >= (1 - model.get('stoneOnGrassPcnt'))) {
								model.get('terrainData')[chunk_x][chunk_z][0][i][j] = tileIDs.tileIDstone;
							}
//						}
					}
				}
			}

			if(features.hasOwnProperty('water') && features.water === true) {
				// TODO: Water needs to exist in larger quantities
				var size = model.get('chunkSize');
				var numtiles = size * size;
				var chunkData = model.get('terrainData')[chunk_x][chunk_z][0];

				for(var i = 0; i < size; i++) {
					for(var j = 0; j < size; j++) {
//						if(chunkData[i][j] === tileIDs.tileIDgrass) {
							if(Math.random() >= (1 - model.get('waterPercentage'))) {
								model.get('terrainData')[chunk_x][chunk_z][0][i][j] = tileIDs.tileIDwater;
							}
//						}
					}
				}
			}
			return true;
		}});

		model.set({'loadChunk': function(chunk_x, chunk_z) {
			return true;
		}});

		model.set({'unloadChunk': function(chunk_x, chunk_z) {
			return true;
		}});

		model.set({'readChunk': function(chunk_x, chunk_z, saveMethod) {
			return true;
		}});

		model.set({'saveChunk': function(chunk_x, chunk_z, saveMethod) {
			return true;
		}});

	}
});
