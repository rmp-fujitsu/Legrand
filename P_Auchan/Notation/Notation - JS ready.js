$(function () {

    // Tooltip functionnality
    $('[data-toggle="tooltip"]').mouseenter(function(){
        var that = $(this);
        that.tooltip('show');
        setTimeout(function() {
            that.tooltip('hide');
        }, 2500);
    });
    $('[data-toggle="tooltip"]').mouseleave(function(){
        $(this).tooltip('hide');
    });

    // Evaluation functionnality
    var heartRating_options = {
        language: 'fr',
        stars:5 ,
        min: 0, 
        max: 5, 
        step: 1, 
        size: 'sm',
        theme: 'rating-rms-fa',
        filledStar: '<i class="fa fa-lg fa-heart"></i>',
        emptyStar: '<i class="fa fa-lg fa-heart-o"></i>'
    };
    $("#id_heartRating").rating(heartRating_options);
    $("#id_evaluation").rating(heartRating_options);

    $("#id_heartRating").on('change', function () {
        var selectedNote = $(this).val(); 
        // console.log('selectedNote: ' + selectedNote);
        setNotationValue(selectedNote);
    });
    
})