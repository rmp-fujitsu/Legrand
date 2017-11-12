// =====================================
//     id_depass_valid_btn
// =====================================

var object_cw = {
	"widget_title": "DEPASS",
	"widget_name": "depass",
	"widget_obj": depass,
	"previous_widget": "id_depass",
	"next_widget": "id_coup_electrique",
	"val_debug": debug.depass
};


/////////////////////////////
// Specific to this widget //
/////////////////////////////
prepare_data_depass();
id_nb_depass_site.setActive(false);
id_depass_capots_out.setActive(false);
id_depass_capots_in.setActive(false);
for (key in object_cw.widget_obj) {
		eval(object_cw.previous_widget + "_face_ad_" + key).setActive(false);
}

// common action for all widgets
set_inactive(object_cw);
true;

