/*#############################################*/
//     JS ctrl_finaux var init
//     GLOBAL SECTION VARIABLES DECLARATION
/*#############################################*/

// contains all variables information needed
var ctrl_fin_cw = {
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
}

var ctrl_fin = {
	"cfin_remise_plastrons" : { 
		"parent_id": "id_my_cfin_remise_plastrons_ctrl_s",
		"parent_var": "my_cfin_remise_plastrons_ctrl_s",
		"ctrl_fin_cw": ctrl_fin_cw,
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
	"cfin_appel_fin_cntls" : { 
		"parent_id": "id_my_cfin_appel_cntls_ctrl_s",
		"parent_var": "my_cfin_appel_cntls_ctrl_s",
		"ctrl_fin_cw": ctrl_fin_cw,
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
	"cfin_reouv_com" : { 
		"parent_id": "id_my_cfin_reouv_com_ctrl_s",
		"parent_var": "my_cfin_reouv_com_ctrl_s",
		"ctrl_fin_cw": ctrl_fin_cw,
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
	"cfin_cloture_ppj" : { 
		"parent_id": "id_my_cfin_cloture_ppj_ctrl_s",
		"parent_var": "my_cfin_cloture_ppj_ctrl_s",
		"ctrl_fin_cw": ctrl_fin_cw,
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
for (key in ctrl_fin) {
	var copy_obj = JSON.parse(JSON.stringify(ctrl_fin_cw));
	ctrl_fin[key].ctrl_fin_cw = copy_obj;
}

// in case "debug" is not already initialized in JS Main script
if (debug == null) {
	var debug = {}
	debug.ctrl_fin = false;
}
