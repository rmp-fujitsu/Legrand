/*#############################################*/
//     JS ctrl_initiaux var init
//     GLOBAL SECTION VARIABLES DECLARATION
/*#############################################*/

// contains all variables information needed
var ctrl_init = {
	"cinit_ppj" : { 
		"parent_id": "",
		"parent_var": "",
		"ctrl_init_cw": "",
		"cw": "",
		"vartime": "cinit_ppj_start",
		"next_vartime": "cinit_ferm_com_start",
		"time_registered": false,
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": ""
	},
	"cinit_ferm_com" : { 
		"parent_id": "",
		"parent_var": "",
		"ctrl_init_cw": "",
		"cw": "",
		"vartime": "cinit_ferm_com_start",
		"next_vartime": "cinit_rep_au_start",
		"time_registered": false,
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": ""
	},
	"cinit_rep_au" : { 
		"parent_id": "",
		"parent_var": "",
		"ctrl_init_cw": "",
		"cw": "",
		"vartime": "cinit_rep_au_start",
		"next_vartime": "cinit_rep_depass_start",
		"time_registered": false,
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": ""
	},
	"cinit_rep_depass" : { 
		"parent_id": "",
		"parent_var": "",
		"ctrl_init_cw": "",
		"cw": "",
		"vartime": "cinit_rep_depass_start",
		"next_vartime": "cinit_rep_tgbt_jn_start",
		"time_registered": false,
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": ""
	},
	"cinit_rep_tgbt_jn" : { 
		"parent_id": "id_my_cinit_rep_tgbt_jn_ano",
		"parent_var": "my_cinit_rep_tgbt_jn_ano",
		"ctrl_init_cw": "",
		"cw": "anomalie",
		"vartime": "cinit_rep_tgbt_jn_start",
		"next_vartime": "cinit_rep_tgbt_tls_start",
		"time_registered": false,
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": ""
	},
	"cinit_rep_tgbt_tls" : { 
		"parent_id": "id_my_cinit_rep_tgbt_tls_ano",
		"parent_var": "my_cinit_rep_tgbt_tls_ano",
		"ctrl_init_cw": "",
		"cw": "anomalie",
		"vartime": "cinit_rep_tgbt_tls_start",
		"next_vartime": "cinit_appel_cntls_start",
		"time_registered": false,
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": ""
	},
	"cinit_appel_cntls" : { 
		"parent_id": "",
		"parent_var": "",
		"ctrl_init_cw": "",
		"cw": "",
		"vartime": "cinit_appel_cntls_start",
		"next_vartime": "cinit_fin_phase",
		"time_registered": false,
		"start_time": "",
		"start_time_str": "",
		"end_time": "",
		"end_time_str": "",
		"delay": "",
		"delay_str": ""
	}
};

// common variables
var ano_cw = {				// contains "Anomalie" widget fields
	"anomalie": "id_anomalie",
	"description": "id_description",
	"photo": "id_photo",
	"repare": "id_repare",
	"renvoi_ordre": "id_renvoi_ordre"
};

// For each au, clone the related cw-object
for (key in ctrl_init) {
	if (!(isEmpty(ctrl_init[key].cw))) {
		switch (ctrl_init[key].cw) {
			case "anomalie":
				var copy_obj = JSON.parse(JSON.stringify(ano_cw));
				break;
			case "ctrl_s":
				var copy_obj = JSON.parse(JSON.stringify(ctrl_s_cw));
				break;
			case "ctrl_a":
				var copy_obj = JSON.parse(JSON.stringify(ctrl_a_cw));
				break;
			default:
				var copy_obj = {};
				break;
		}
		ctrl_init[key].ctrl_init_cw = copy_obj;
	}
}


// in case "debug" is not already initialized in JS Main script
if (debug == null) {
	var debug = {};
	debug.ctrl_init = false;
}
