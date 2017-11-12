// id_hyperlink_template_ci

setTimeout( function() { 

	var str = "Edit Configuration Items (CIs) form - Get the template here";
	var links = RMPApplication.get("file_url");
	var result = str.link(links);
	document.getElementById("id_html").innerHTML = result;

}, 1000);
