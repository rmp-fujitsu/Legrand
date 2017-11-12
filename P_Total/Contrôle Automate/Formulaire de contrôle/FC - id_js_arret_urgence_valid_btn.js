// =====================================
//     id_arret_urgence_valid_btn
// =====================================

var object_cw = {
	"widget_title": "Arrêt Urgence",
	"widget_name": "arret_urg",
	"widget_obj": arret_urg,
	"previous_widget": "id_arrets_urgence",
	"next_widget": "id_depass",
	"val_debug": debug.arret_urg
}


/////////////////////////////
// Specific to this widget //
/////////////////////////////
prepare_data_au();


// common action for all widgets
set_inactive(object_cw);
true;
