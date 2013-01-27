/**
    examples:             
    'sprites_name' : {
         'file' : 'path/to/file',
         'tile' : width,
         'tileh' : height,
         'elements': {
             'sprite_name' : [0, 0]
         }
    },
 */

Sprites = Backbone.Model.extend({
	defaults: {
		images:{
			'ufo' : {
				'file' : 'web/images/ufo.png',
				'tile' : 211,
				'tileh' : 117,
				'elements': {
					'ufo' : [0, 0]
				}
			},
			'bird' : {
				'file' : 'web/images/bird.png',
				'tile' : 64,
				'tileh' : 64,
				'elements': {
					'bird' : [0, 0]
				}
			},
			'worm' : {
				'file' : 'web/images/worm_anim.png',
				'tile' : 64,
				'tileh' : 64,
				'elements': {
					'worm' : [0, 0]
				}
			},
			'grass' : {
				'file' : 'web/images/grass_01.png',
				'tile' : 64,
				'tileh' : 64,
				'elements': {
					'grass01' : [0, 0]
				}
			},
			'tilemap' : {
				'file' : 'web/images/tilemap.png',
				'tile' : 64,
				'tileh' : 64,
				'elements': {
					'grass1' : [0, 0],
					'water1' : [1, 0],
					'stone1' : [2, 3],
					'waterborder_ic_tl' : [2, 0],
					'waterborder_ic_tc' : [3, 0],
					'waterborder_ic_tr' : [4, 0],
					'waterborder_ic_ml' : [2, 1],
					'waterborder_ic_mr' : [4, 1],
					'waterborder_ic_bl' : [2, 2],
					'waterborder_ic_bc' : [3, 2],
					'waterborder_ic_br' : [4, 2],
					'waterborder_oc_tl' : [1, 2],
					'waterborder_oc_tr' : [0, 2],
					'waterborder_oc_bl' : [0, 3],
					'waterborder_oc_br' : [1, 3],
					'tree1' : [0, 1],
					'tree2' : [1, 1]
				}
			}
		}
	},
	initialize: function(){

	},
	/**
	 * Create Crafty sprites from images object
	 * Pass key if You want create only one choosen sprite.
	 * 
	 * @param  string key - sprite definition key
	 */
	create: function(key){
		if(key != undefined){
			element = this.get('images')[key];
			if(element['tileh'] == undefined)
				Crafty.sprite(element['tile'], element['file'], element['elements']);
			else
				Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);

			return true;
		};

		_.each(this.get('images'), function(element, k){ 
			console.log(element);
			if(element['tileh'] == undefined)
				Crafty.sprite(element['tile'], element['file'], element['elements']);
			else
				Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
		});

	},
	/**
	 * Get path for sprites files - for loading
	 * 
	 * @return array array of files paths
	 */
	getPaths: function(){
		var array = [], i=0;
		_.each(this.get('images'), function(element, key){ 
			array[i] = element['file']
			i++;
		});

		return array;
	}
});
