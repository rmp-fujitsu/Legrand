$('#card-magasin').bind({
    click: function() {
        $('#card-magasin .card').toggleClass('flipped');
    },
    mouseleave: function() {
	    	if ($('#card-magasin .card').hasClass('flipped')) {
	    	    $('.card').removeClass('flipped');
	      }
	  }
});
