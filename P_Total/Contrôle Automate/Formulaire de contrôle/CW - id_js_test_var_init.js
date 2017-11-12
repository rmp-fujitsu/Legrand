// ====================================
//   id_js_test_var_init
// ====================================

var test_var = {				// contains "Test" widget fields
	"desarm_chk": "id_desarm_chk",
	"ext_ad_tpi_chk": "id_ext_ad_tpi_chk",
	"abs_tension_tgbt_chk": "id_abs_tension_tgbt_chk",
	"rearm_chk": "id_rearm_chk",
	"ret_tension_tgbt_chk": "id_ret_tension_tgbt_chk"
};

var test_cw = {
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

// in case "debug" is not already initialized in JS Main script
if (debug == null) {
	var debug = {};
	debug.test = false;
}

