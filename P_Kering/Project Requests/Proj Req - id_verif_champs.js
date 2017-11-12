// id_verif_champs

var error_msg = "Incorrect or missing value(s) for the following field(s) : " + "\n" + "\n";
var liste = "";

if (RMPApplication.get("request_title") == null) {
	liste += "- Project name" + "\n";
}
if (RMPApplication.get("phone") == null) {
	liste += "- Phone" + "\n";
}

if (RMPApplication.get("position") == null) {
	liste += "- Position" + "\n";
}

if (RMPApplication.get("location") == null) {
	liste += "- Location" + "\n";
}

if (RMPApplication.get("organizational_unit") == null) {
	liste += "- Organizational unit" + "\n";
}
if (RMPApplication.get("expected_delivery_date") == null) {
	liste += "- Expected delivery date" + "\n";
}

if (RMPApplication.get("expected_go_live_date") == null) {
	liste += "- Expected go live date" + "\n";
}

if (RMPApplication.get("project_description") == null) {
	liste += "- Project description" + "\n";
}

if (RMPApplication.get("full_management_and_monitoring_") == "no") {
	id_comment_1.setText("n/a"); 
	console.log("4- full_management_and_monitoring_ = no");
}

if (RMPApplication.get("sla_excuse_") == "no") {
	id_comment_2.setText("n/a");
	console.log("5- sla_excuse_ = no");
}

if (RMPApplication.get("comment_1") == null) {
	liste += "- Description Full management and monitoring" + "\n";
}

if (RMPApplication.get("comment_2") == null) {
	liste += "- Description Sla excuse" + "\n";
}

if (liste != error_msg) {
	alert(liste);
} else {
	true;
} 
