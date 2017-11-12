/*#############################################*/
//     id_js_activ_eclairage_var_init
//     GLOBAL SECTION VARIABLES DECLARATION
/*#############################################*/

// contains all variables information needed

var activ_eclair_cw = {
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

var activ_eclair = {
	"aecl_simu_intrus" : {
		"parent_id": "id_my_aecl_simu_intrus_ctrl_s",
		"parent_var": "my_aecl_simu_intrus_ctrl_s",
		"activ_eclair_cw": activ_eclair_cw,
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
	"aecl_ctrl_tempo_eclair" : {
		"parent_id": "id_my_aecl_ctrl_tempo_eclair_ctrl_s",
		"parent_var": "my_aecl_ctrl_tempo_eclair_ctrl_s",
		"activ_eclair_cw": activ_eclair_cw,
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
for (key in activ_eclair) {
	var copy_obj = JSON.parse(JSON.stringify(activ_eclair_cw));
	activ_eclair[key].activ_eclair_cw = copy_obj;
}

// in case "debug" is not already initialized in JS Main script
if (debug == null) {
	var debug = {};
	debug.activ_eclair = false;
}