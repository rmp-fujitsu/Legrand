$(function () {

	// Tooltip functionnality
	$('[data-toggle="tooltip"]').mouseenter(function(){
	    var that = $(this);
	    that.tooltip('show');
	    setTimeout(function(){
	        that.tooltip('hide');
	    }, 2500);
	});
	
	$('[data-toggle="tooltip"]').mouseleave(function(){
	    $(this).tooltip('hide');
	});

	$("#id_heartRating").rating({
    	language: 'fr',
	    stars:5 ,
	    min: 0, 
	    max: 5, 
	    step: 1, 
	    size: 'sm',
	    theme: 'rating-rms-fa',
	    filledStar: '<i class="fa fa-lg fa-heart"></i>',
	    emptyStar: '<i class="fa fa-lg fa-heart-o"></i>'
	});

})