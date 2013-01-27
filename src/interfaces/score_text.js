ScoreText = BaseEntity.extend({
	defaults: {
        'text' : "SCORE ",
        'score' : 0
    },
    initialize: function(){
    	var model = this;
    	var entity = Crafty.e("2D, DOM, Text");

    	entity
            .attr({x: 10, y: 10, z: 9000, w: 200})
            .text(model.get('text'))
            .textColor('#FFF')
            .textFont({'size' : '32px', 'family': 'Verdana'})
            .bind('Click', function(){
            })
            .bind('EnterFrame', function(e){
            	this.text(model.get('text') + " " + model.get('score'));
            	//console.log(model.get('text'));
            	entity.x = -sc['bird'].get('scroll')[0] + 30;
            	entity.y = -sc['bird'].get('scroll')[1] + 50;
            	
            });
        model.set({'setScore' : function (score) {
        	//model.set('text',"SCORE " + score);
        	model.set('score', score);
        }});
    	model.set({'entity' : entity });
    }
});