// id_js_on_level_1_change
// Variables listened: level_1

var vb_projects = new Array();
if (RMPApplication.get("level_1") == "geit") {
	vb_projects = [
        {"label": "Support", "value": "l3_support"},
        {"label": "CTS", "value": "capacity_management"},
        {"label": "Innovation", "value": "techno_watch"},
        {"label": "Architecture", "value": "architecture_review"}
    ];
	var a = new RMP_List();
	a.fromArray(vb_projects); 
    RMPApplication.setList("vb_level_2", a);
    
} else if (RMPApplication.get("level_1") == "build") {
	vb_projects = [ {"label": "Project", "value": "project"} ];
	var a = new RMP_List();
	a.fromArray(vb_projects); 
	RMPApplication.setList("vb_level_2", a);
} else if (RMPApplication.get("level_1") == "other") {
	vb_projects = [
        {"label": "Transition", "value": "transition"},
        {"label": "Prometheus", "value": "non_working_time"}];
	var a = new RMP_List();
	a.fromArray(vb_projects); 
	RMPApplication.setList("vb_level_2", a);
}