// =====================================
//     id_coup_electrique_valid_btn
// =====================================

// According to the user's choice (AVCEC ou SANS TPI)
var next_widget_sans_tpi = "id_bascule_jn";
var next_widget_avec_tpi = "id_ctrl_finaux";
var next_widget = (RMPApplication.get("site_tpi_24h_24") == "sans") ? next_widget_sans_tpi : next_widget_avec_tpi;

var object_cw = {
	"widget_title": "Coupure électrique",
	"widget_name": "coup_elec",
	"widget_obj": coup_elec,
	"previous_widget": "id_coup_electrique",
	"next_widget": next_widget,
	"val_debug": debug.coup_elec
}


/////////////////////////////
// Specific to this widget //
/////////////////////////////
prepare_data_celec();


// common action for all widgets
set_inactive(object_cw);
true;

