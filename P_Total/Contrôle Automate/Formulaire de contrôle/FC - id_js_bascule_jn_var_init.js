/*#############################################*/
//     id_js_bascule_jn_var_init
//     GLOBAL SECTION VARIABLES DECLARATION
/*#############################################*/

// contains all variables information needed

var bascule_jn_cw = {
	"debut" : { 
		"au_chk_id": "id_debut_chk",
		"au_chk_var": "debut_chk", 
		"time_id": "id_start_time", 
		"time_var": "start_time", 
		"time_registered": false 
	},
	"fin" : {
		"au_chk_id": "id_fin_chk",
		"au_chk_var": "fin_chk", 
		"time_id": "id_end_time", 
		"time_var": "end_time", 
		"time_registered": false 
	}
};

var bascule_jn = {
	"bjn_desact_cell_crep" : {
		"parent_id": "id_my_bjn_desact_cell_crep_ctrl_s",
		"parent_var": "my_bjn_desact_cell_crep_ctrl_s",
		"bascule_jn_cw": bascule_jn_cw,
		"cw": "ctrl_s",
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": "",
		"debut_checked": "",
		"fin_checked": ""
	},
	"bjn_action_bascule" : {
		"parent_id": "id_my_bjn_action_bascule_ctrl_s",
		"parent_var": "my_bjn_action_bascule_ctrl_s",
		"bascule_jn_cw": bascule_jn_cw,
		"cw": "ctrl_s",
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": "",
		"debut_checked": "",
		"fin_checked": ""
	},
	"bjn_ctrl_tempo_bascule" : {
		"parent_id": "id_my_bjn_ctrl_tempo_bascule_ctrl_s",
		"parent_var": "my_bjn_ctrl_tempo_bascule_ctrl_s",
		"bascule_jn_cw": bascule_jn_cw,
		"cw": "ctrl_s",
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": "",
		"debut_checked": "",
		"fin_checked": ""
	},
	"bjn_remise_cell_crep" : {
		"parent_id": "id_my_bjn_remise_cell_crep_ctrl_s",
		"parent_var": "my_bjn_remise_cell_crep_ctrl_s",
		"bascule_jn_cw": bascule_jn_cw,
		"cw": "ctrl_s",
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": "",
		"debut_checked": "",
		"fin_checked": ""
	}
};

// For each au, clone the related cw-object
for (key in bascule_jn) {
	var copy_obj = JSON.parse(JSON.stringify(bascule_jn_cw));
	bascule_jn[key].bascule_jn_cw = copy_obj;
}

// in case "debug" is not already initialized in JS Main script
if (debug == null) {
	var debug = {};
	debug.bascule_jn = false;
}