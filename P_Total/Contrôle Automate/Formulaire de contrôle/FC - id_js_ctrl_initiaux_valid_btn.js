// =====================================
//     id_ctrl_initiaux_valid_btn
// =====================================

var object_cw = {
	"widget_title": "Contrôles initiaux",
	"widget_name": "ctrl_init",
	"widget_obj": ctrl_init,
	"previous_widget": "id_ctrl_initiaux",
	"next_widget": "id_arrets_urgence",
	"val_debug": debug.ctrl_init
}


/////////////////////////////
// Specific to this widget //
/////////////////////////////
prepare_data_cinit();


// common action for all widgets
set_inactive(object_cw);
true;
