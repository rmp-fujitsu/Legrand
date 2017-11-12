// ====================================
//   id_js_test_simple_var_init
// ====================================

var test_simple_var = {				// contains "Test" widget fields
	"debut_chk": "id_debut_chk",
	"fin_chk": "id_fin_chk"
};

var test_simple_cw = {
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

// in case "debug" is not already initialized in JS Main script
if (debug == null) {
	var debug = {};
	debug.test_simple = false;
}

