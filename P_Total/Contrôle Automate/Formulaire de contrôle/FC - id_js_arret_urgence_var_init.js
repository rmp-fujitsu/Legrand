/*#############################################*/
//     JS ctrl_arret_urgence var init
//     GLOBAL SECTION VARIABLES DECLARATION
/*#############################################*/

// contains all variables information needed

var arret_urg_cw = {
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

var arret_urg = {
	"au_caisse_princ" : {
		"parent_id": "id_my_au_caisse_princ_ctrl_a",
		"parent_var": "my_au_caisse_princ_ctrl_a",
		"arret_urg_cw": arret_urg_cw,
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
		"ret_tension_tgbt_chk": ""
	},
	"au_caisse_sec1" : {
		"parent_id": "id_my_au_caisse_sec1_ctrl_a",
		"parent_var": "my_au_caisse_sec1_ctrl_a",
		"arret_urg_cw": arret_urg_cw,
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
		"ret_tension_tgbt_chk": ""
	},
	"au_caisse_sec2" : {
		"parent_id": "id_my_au_caisse_sec2_ctrl_a",
		"parent_var": "my_au_caisse_sec2_ctrl_a",
		"arret_urg_cw": arret_urg_cw,
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
		"ret_tension_tgbt_chk": ""
	},
	"au_kiosq1" : {
		"parent_id": "id_my_au_kiosq1_ctrl_a",
		"parent_var": "my_au_kiosq1_ctrl_a",
		"arret_urg_cw": arret_urg_cw,
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
		"ret_tension_tgbt_chk": ""
	},
	"au_kiosq2" : {
		"parent_id": "id_my_au_kiosq2_ctrl_a",
		"parent_var": "my_au_kiosq2_ctrl_a",
		"arret_urg_cw": arret_urg_cw,
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
		"ret_tension_tgbt_chk": ""
	},
	"au_piste_vl" : {
		"parent_id": "id_my_au_piste_vl_ctrl_a",
		"parent_var": "my_au_piste_vl_ctrl_a",
		"arret_urg_cw": arret_urg_cw,
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
		"ret_tension_tgbt_chk": ""
	},
	"au_piste_pl" : {
		"parent_id": "id_my_au_piste_pl_ctrl_a",
		"parent_var": "my_au_piste_pl_ctrl_a",
		"arret_urg_cw": arret_urg_cw,
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
		"ret_tension_tgbt_chk": ""
	},
	"au_armoire_lap" : {
		"parent_id": "id_my_au_armoire_lap_ctrl_a",
		"parent_var": "my_au_armoire_lap_ctrl_a",
		"arret_urg_cw": arret_urg_cw,
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
		"ret_tension_tgbt_chk": ""
	},
	"au_gpl" : {
		"parent_id": "id_my_au_gpl_ctrl_a",
		"parent_var": "my_au_gpl_ctrl_a",
		"arret_urg_cw": arret_urg_cw,
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
		"ret_tension_tgbt_chk": ""
	}
};

// For each au, clone the related cw-object
for (key in arret_urg) {
	var copy_obj = JSON.parse(JSON.stringify(arret_urg_cw));
	arret_urg[key].arret_urg_cw = copy_obj;
}

// in case "debug" is not already initialized in JS Main script
if (debug == null) {
	var debug = {};
	debug.arret_urg = false;
}