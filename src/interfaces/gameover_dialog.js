GameOverDialog = BaseEntity.extend({
	defaults: {
        'frame': 0
    },
    initialize: function(){
    	var model = this;
    	var entity_bg = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Multiway, Keyboard, button_bg, SpriteAnimation, Mouse, Collision, MouseHover");
    	var entity_back_to_menu = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Multiway, Keyboard, to_mainmenu, SpriteAnimation, Mouse, Collision, MouseHover");
    	var entity_new_game = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Multiway, Keyboard,restart_game , SpriteAnimation, Mouse, Collision, MouseHover");
       	var entity_score_text = Crafty.e("2D, DOM, Text");
       	var entity_score_number = Crafty.e("2D, DOM, Text");
       	
       	entity_score_text
            .attr({x: -sc['bird'].get('scroll')[0] + ((Crafty.viewport.width) / 2)-160, y: -sc['bird'].get('scroll')[1] + ((Crafty.viewport.height))/2 - 230, z: 9000})
            .text('SCORE')
            .textColor('#000')
            .textFont({'size' : '48px', 'family': 'Verdana'})
            .bind('Click', function(){
            })
            .bind('EnterFrame', function(e){
            	//this.text(model.get('text') + " " + model.get('score'));
            	//console.log(model.get('text'));
            	
            });
       	
       	entity_score_number
        .attr({x: -sc['bird'].get('scroll')[0] + ((Crafty.viewport.width) / 2)-160, y: -sc['bird'].get('scroll')[1] + ((Crafty.viewport.height))/2 - 100, z: 9000})
        .text(sc['score_text'].get('score'))
        .textColor('#FFFFFF')
        .textFont({'size' : '52px', 'family': 'Verdana'})
        .bind('Click', function(){
        })
        .bind('EnterFrame', function(e){
        	//this.text(model.get('text') + " " + model.get('score'));
        	//console.log(model.get('text'));
        	
        });
       	
		entity_bg
		.attr({x: -sc['bird'].get('scroll')[0] +((Crafty.viewport.width) / 2) - 400/2, y: -sc['bird'].get('scroll')[1] + ((Crafty.viewport.height))/2 - 500/2, z: 601, w: 400, h: 500})
		.bind('EnterFrame', function(e){
			
		})
		.bind('Click', function(){
			
			
		})
		.setName('Gameover_bg');
		
		entity_bg.origin(entity_bg.w/2, entity_bg.h/2);

		entity_new_game
		.attr({x: -sc['bird'].get('scroll')[0] +((Crafty.viewport.width) / 2) - 200/2, y:  -sc['bird'].get('scroll')[1] +((Crafty.viewport.height))/2 - 80/2 + 200, z: 601, w: 200, h: 80})
		.bind('EnterFrame', function(e){
			
		})
		.bind('Click', function(){
			Crafty.scene('main');
			console.log('fsd');
			
		})
		.setName('Gameover_btm');
		entity_bg.origin(entity_back_to_menu.w/2, entity_back_to_menu.h/2);
		
		
		entity_back_to_menu
		.attr({x: -sc['bird'].get('scroll')[0] +((Crafty.viewport.width) / 2) - 300/2, y: -sc['bird'].get('scroll')[1] +((Crafty.viewport.height))/2 - 60/2+100, z: 601, w: 300, h: 80})
		.bind('EnterFrame', function(e){
			
		})
		.bind('Click', function(){

			Crafty.viewport.scroll('_x', 0);
			Crafty.viewport.scroll('_y', 0);
			Crafty.scene('title');
		})
		.setName('Gameover_ng');
		
		entity_new_game.origin(entity_new_game.w/2, entity_new_game.h/2);
		
		sc['score_text'].getEntity().destroy();
		sc['worm_text'].destroy();
		sc['bird'].getEntity().destroy();
		sc['heart'].getEntity().destroy();
    }
});