// id_js_def

if (navigator.appName == "Microsoft Internet Explorer") {
	alert("You are not using Chrome. Please switch to Chrome for an optimal use of the application");
	window.close();
}

function set_last_comments() {
	var comments = $(".Buttons .gwt-TextArea").val();
	if (comments == "Ajouter un commentaire" || comments == "" || comments == "Add a comment") {
		RMPApplication.set("history_comment", "--");
	} else {	
		RMPApplication.set("history_comment", comments);
	}
}

/*********************always call To Top Button***************************/
$(document).ready(function() {
    var offset = 220;
    var duration = 1500;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(duration);
        } else {
            $('.back-to-top').fadeOut(duration);
        }
    });
    
    $('.back-to-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration);
        return false;
    })
});
