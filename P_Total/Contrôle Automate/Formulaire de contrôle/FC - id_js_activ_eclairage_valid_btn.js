// =====================================
//     id_activ_eclairage_valid_btn
// =====================================

var object_cw = {
	"widget_title": "Activation éclairage",
	"widget_name": "activ_eclair",
	"widget_obj": activ_eclair,
	"previous_widget": "id_activ_eclairage",
	"next_widget": "id_ctrl_finaux",
	"val_debug": debug.activ_eclair
}


/////////////////////////////
// Specific to this widget //
/////////////////////////////
prepare_data_aecl();


// common action for all widgets
set_inactive(object_cw);
true;
