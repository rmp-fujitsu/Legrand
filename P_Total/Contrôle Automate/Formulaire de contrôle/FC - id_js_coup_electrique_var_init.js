/*#############################################*/
//     id_js_coup_electrique_var_init
//     GLOBAL SECTION VARIABLES DECLARATION
/*#############################################*/

// contains all variables information needed
var coup_elec_cw = {
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

var coup_elec = {
	"celec_vigi" : {
		"parent_id": "id_my_celec_vigi_ctrl_a",
		"parent_var": "my_celec_vigi_ctrl_a",
		"coup_elec_cw": coup_elec_cw,
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
		"key_step_checked": false
	},
	"celec_tpi" : {
		"parent_id": "id_my_celec_tpi_ctrl_a",
		"parent_var": "my_celec_tpi_ctrl_a",
		"coup_elec_cw": coup_elec_cw,
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
		"key_step_checked": false
	}
};

// For each au, clone the related cw-object
for (key in coup_elec) {
	var copy_obj = JSON.parse(JSON.stringify(coup_elec_cw));
	coup_elec[key].coup_elec_cw = copy_obj;
}

// in case "debug" is not already initialized in JS Main script
if (debug == null) {
	var debug = {};
	debug.coup_elec = false;
}