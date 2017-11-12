/*#############################################*/
//     JS depass var init
//     GLOBAL SECTION VARIABLES DECLARATION
/*#############################################*/

// contains all variables information needed

var depass_cw = {
	"desarm" : { 
		"au_chk_id": "id_desarm_chk",
		"au_chk_var": "desarm_chk", 
		"time_id": "id_desarm_start_time", 
		"time_var": "desarm_start_time", 
		"time_registered": false 
	},
	"rearm" : {
		"au_chk_id": "id_rearm_chk",
		"au_chk_var": "rearm_chk", 
		"time_id": "id_rearm_start_time", 
		"time_var": "rearm_start_time", 
		"time_registered": false 
	}
};

var depass = {
	"depass_n1" : {
		"parent_id": "id_my_depass_n1_ctrl_a",
		"parent_var": "my_depass_n1_ctrl_a",
		"depass_cw": depass_cw,
		"cw": "ctrl_a",
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": "",
		"desarm_checked": "",
		"rearm_checked": "",
		"ext_ad_tpi_chk": "",
		"abs_tension_tgbt_chk": "",
		"ret_tension_tgbt_chk": "",
		"key_step_checked": false,
		"face_ad": ""
	},
	"depass_n2" : {
		"parent_id": "id_my_depass_n2_ctrl_a",
		"parent_var": "my_depass_n2_ctrl_a",
		"depass_cw": depass_cw,
		"cw": "ctrl_a",
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": "",
		"desarm_checked": "",
		"rearm_checked": "",
		"ext_ad_tpi_chk": "",
		"abs_tension_tgbt_chk": "",
		"ret_tension_tgbt_chk": "",
		"key_step_checked": false,
		"face_ad": ""
	},
	"depass_n3" : {
		"parent_id": "id_my_depass_n3_ctrl_a",
		"parent_var": "my_depass_n3_ctrl_a",
		"depass_cw": depass_cw,
		"cw": "ctrl_a",
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": "",
		"desarm_checked": "",
		"rearm_checked": "",
		"ext_ad_tpi_chk": "",
		"abs_tension_tgbt_chk": "",
		"ret_tension_tgbt_chk": "",
		"key_step_checked": false,
		"face_ad": ""
	},
	"depass_n4" : {
		"parent_id": "id_my_depass_n4_ctrl_a",
		"parent_var": "my_depass_n4_ctrl_a",
		"depass_cw": depass_cw,
		"cw": "ctrl_a",
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": "",
		"desarm_checked": "",
		"rearm_checked": "",
		"ext_ad_tpi_chk": "",
		"abs_tension_tgbt_chk": "",
		"ret_tension_tgbt_chk": "",
		"key_step_checked": false,
		"face_ad": ""
	},
	"depass_n5" : {
		"parent_id": "id_my_depass_n5_ctrl_a",
		"parent_var": "my_depass_n5_ctrl_a",
		"depass_cw": depass_cw,
		"cw": "ctrl_a",
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": "",
		"desarm_checked": "",
		"rearm_checked": "",
		"ext_ad_tpi_chk": "",
		"abs_tension_tgbt_chk": "",
		"ret_tension_tgbt_chk": "",
		"key_step_checked": false,
		"face_ad": ""
	},
	"depass_n6" : {
		"parent_id": "id_my_depass_n6_ctrl_a",
		"parent_var": "my_depass_n6_ctrl_a",
		"depass_cw": depass_cw,
		"cw": "ctrl_a",
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": "",
		"desarm_checked": "",
		"rearm_checked": "",
		"ext_ad_tpi_chk": "",
		"abs_tension_tgbt_chk": "",
		"ret_tension_tgbt_chk": "",
		"key_step_checked": false,
		"face_ad": ""
	},
	"depass_n7" : {
		"parent_id": "id_my_depass_n7_ctrl_a",
		"parent_var": "my_depass_n7_ctrl_a",
		"depass_cw": depass_cw,
		"cw": "ctrl_a",
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": "",
		"desarm_checked": "",
		"rearm_checked": "",
		"ext_ad_tpi_chk": "",
		"abs_tension_tgbt_chk": "",
		"ret_tension_tgbt_chk": "",
		"key_step_checked": false,
		"face_ad": ""
	},
	"depass_n8" : {
		"parent_id": "id_my_depass_n8_ctrl_a",
		"parent_var": "my_depass_n8_ctrl_a",
		"depass_cw": depass_cw,
		"cw": "ctrl_a",
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": "",
		"desarm_checked": "",
		"rearm_checked": "",
		"ext_ad_tpi_chk": "",
		"abs_tension_tgbt_chk": "",
		"ret_tension_tgbt_chk": "",
		"key_step_checked": false,
		"face_ad": ""
	},
	"depass_n9" : {
		"parent_id": "id_my_depass_n9_ctrl_a",
		"parent_var": "my_depass_n9_ctrl_a",
		"depass_cw": depass_cw,
		"cw": "ctrl_a",
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": "",
		"desarm_checked": "",
		"rearm_checked": "",
		"ext_ad_tpi_chk": "",
		"abs_tension_tgbt_chk": "",
		"ret_tension_tgbt_chk": "",
		"key_step_checked": false,
		"face_ad": ""
	},
	"depass_n10" : {
		"parent_id": "id_my_depass_n10_ctrl_a",
		"parent_var": "my_depass_n10_ctrl_a",
		"depass_cw": depass_cw,
		"cw": "ctrl_a",
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": "",
		"desarm_checked": "",
		"rearm_checked": "",
		"ext_ad_tpi_chk": "",
		"abs_tension_tgbt_chk": "",
		"ret_tension_tgbt_chk": "",
		"key_step_checked": false,
		"face_ad": ""
	}
};

// For each au, clone the related cw-object
for (key in depass) {
	var copy_obj = JSON.parse(JSON.stringify(depass_cw));
	depass[key].depass_cw = copy_obj;
}

// in case "debug" is not already initialized in JS Main script
if (debug == null) {
	var debug = {};
	debug.depass = false;
}