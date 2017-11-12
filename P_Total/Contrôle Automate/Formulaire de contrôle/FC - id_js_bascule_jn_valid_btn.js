// =====================================
//     id_bascule_jn_valid_btn
// =====================================

var object_cw = {
	"widget_title": "Bascule JOUR/NUIT",
	"widget_name": "bascule_jn",
	"widget_obj": bascule_jn,
	"previous_widget": "id_bascule_jn",
	"next_widget": "id_activ_eclairage",
	"val_debug": debug.bascule_jn
}


/////////////////////////////
// Specific to this widget //
/////////////////////////////
prepare_data_bjn();


// common action for all widgets
set_inactive(object_cw);
true;

