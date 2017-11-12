// ========================
//   Register start times
// ========================

// Variables list
// cinit_rep_tgbt_tls_chk,cinit_rep_tgbt_jn_chk,cinit_ppj_chk,cinit_rep_au_chk,cinit_rep_depass_chk,cinit_ferm_com_chk,cinit_appel_cntls_chk

c_debug(debug.ctrl_init,"###################################################");
for (key in ctrl_init) {
	c_debug(debug.ctrl_init, "=> Deal with START time : key = ", key);
	var main_type = (isEmpty(cw_infos["ctrl_init"].type)) ? "" : "_" + cw_infos["ctrl_init"].type;
	c_debug(debug.ctrl_init, "=> register start time: main_type = ", main_type);
	var varvalue = eval("id_" + key + main_type).getValue();
	c_debug(debug.ctrl_init, "=> register start time: Status [time_registered] = ", ctrl_init[key].time_registered);
	c_debug(debug.ctrl_init, "=> register start time: varvalue = ", varvalue);

	if ( (varvalue == true || varvalue == "true" ) && (ctrl_init[key].time_registered == false) ) {
		// if checkbox is checked and time is not already registered
		var actual_time = new Date();  
		var currentTime = Math.round(actual_time.getTime()/ 1000);  
		eval("id_" + ctrl_init[key].vartime).setDate(currentTime, "dd/MM/yyyy HH:mm");
		ctrl_init[key].time_registered = true;
		c_debug(debug.ctrl_init, "=> register START time: ACTUAL time = ", RMPApplication.get(eval(ctrl_init[key].vartime + "_str")));
	} else {
		c_debug(debug.ctrl_init, "=> register START time: ***  Already registed  ***");
	}
	c_debug(debug.ctrl_init,"====================================");
}
