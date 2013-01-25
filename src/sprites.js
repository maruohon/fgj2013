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
