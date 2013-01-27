HeartIcon = BaseEntity.extend({
	defaults: {
        'frame' : 0,
        'origY' : 0,
        'origX' : 0,
        'hp' : 100
    },
    initialize: function(){
    	var model = this;
		var speed = 4;
		var frameentity = Crafty.e("2D, Canvas, heart_open");

		frameentity
		.attr({x: 60-50, y: ((Crafty.viewport.height))-100, z: 350})
		.bind('EnterFrame', function(e){
			// Animate this
			//this.y+=speed;
			/*
			if(Math.abs(this.y - 50) < 90 && speed >= 0.1) {
				speed-=0.1;
			} else {
				if(speed < 0.1)
					speed = 0;
			}
				*/
			//entity.x = -sc['bird'].get('scroll')[0] + 30;
        	//entity.y = -sc['bird'].get('scroll')[1] + 50;
        	
			if(frameentity.w > 100) {
				frameentity.w--;

			}
			console.log(sc['bird'].get('soundPlaying'));
			if(sc['bird'].get('soundPlaying') === undefined )
			{
				model.set('frame', 0);
			} else {
				model.set('frame', model.get('frame')+1);
			}
			if(sc['bird'].get('soundPlaying') == 'hb_very_slow' && model.get('frame') >= 200)
			{
					frameentity.w = 120;
					model.set('frame', 0);
			}
			if(sc['bird'].get('soundPlaying') == 'hb_slow' && model.get('frame') >= 120)
			{
					frameentity.w = 120;
					model.set('frame', 0);
			}
			if(sc['bird'].get('soundPlaying') == 'hb_normal' && model.get('frame') >= 60)
			{
					frameentity.w = 120;
					model.set('frame', 0);
			}
			if(sc['bird'].get('soundPlaying') == 'hb_very_fast' && model.get('frame') >= 10)
			{
					frameentity.w = 120;
					model.set('frame', 0);
			}
			/*
			
			if(model.get('frame') >= 60) {
				model.set('frame', 0);
				frameentity.w = 120;
				//frameentity.x = -sc['bird'].get('scroll')[0] + 60-frameentity.w/2;
				//frameentity.y = -sc['bird'].get('scroll')[1] + ((Crafty.viewport.height))-100;
			}
			*/
			frameentity.x = -sc['bird'].get('scroll')[0] + 60-frameentity.w/2;
			frameentity.y = -sc['bird'].get('scroll')[1] + ((Crafty.viewport.height))-100;
			
		})
		.bind('Click', function(){
			// Play sound!!
			frameentity.w = 120;
			
		})
		.setName('HeartFrame');
		
		var entity = Crafty.e("2D, Canvas, heart_fill");
		entity
		.attr({x: 60-45, y: ((Crafty.viewport.height))-100+5, z: 340})
		.bind('EnterFrame', function(e){
			// Edit
			//model.set('hp', model.get('hp') -1);
			//model.set('hp', model.get('hp') + Math.random()*2);
			
			if(model.get('hp') <= 0) {
				Crafty.scene('gameover');
				//model.set('hp', 100);
			}
			var height = (76/100) * model.get('hp');
			
			entity.h = height;
			
			entity.sprite(0,0,1,model.get('hp')/100);
			
			entity.x = -sc['bird'].get('scroll')[0] + 60-entity.w/2;
			entity.y = -sc['bird'].get('scroll')[1] + ((Crafty.viewport.height))-100;
			/*if(entity.w > 90) {
				entity.w--;
				entity.x = 60-frameentity.w/2;
			}
			model.set('frame', model.get('frame')+1);
			if(model.get('frame') >= 60) {
				model.set('frame', 0);
				entity.w = 130;
				entity.x = 60-entity.w/2;
			}*/
			//entity.__coord[1] = 70;
			//entity.crop(0, 0, 50, 50);
			
			// Animate this
			/*this.y+=speed;
			if(Math.abs(this.y - 50) < 90 && speed >= 0.1) {
				speed-=0.1;
			} else {
				if(speed < 0.1)
					speed = 0;
			}
						
			model.set('frame', model.get('frame')+1);
			if(model.get('frame') > 350) {
				model.get('entity').sprite(0, 0, 1, 1);
			} else {
				model.get('entity').sprite(1, 0, 1, 1);
			}
			if(model.get('frame') >= 360) {
				model.set('frame', 0);
				
			}
			
			if(speed == 0) {
				this.y = 40+Math.sin(model.get('frame')/(2*3.14))*3;
			}*/
			
			
		})
		.bind('Click', function(){
			// Play sound!!
			frameentity.w = 120;
		})
		.setName('Heart');
		entity.origin(entity.w/2, entity.h/2);
	/*	
    	entity
            .attr({x: 50, y: 50, z: 1000, w: 400})
            .text(model.get('text'))
            .textColor('#000')
            .textFont({'size' : '24px', 'family': 'Arial'})
            .bind('Click', function(){
                                
            })
*/
    	model.set({'entity' : entity });
    }
});