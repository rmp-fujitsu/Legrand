// ====================================
//   id_js_test_register_start_times
// ====================================

// Variables list
// desarm_chk,rearm_chk
c_debug(debug.test,"###################################################");
for (key in test_cw) {
	var cw_name = RMP_this.id_desarm_chk.getParent().getName();
	c_debug(debug.test, "=> register START time: widget = ", cw_name + " / " + test_cw[key].au_chk_id );

	var au_chk_id = test_cw[key].au_chk_id;
	c_debug(debug.test, "   * au_chk_id = ", au_chk_id);
	var au_chk_var = test_cw[key].au_chk_var;
	c_debug(debug.test, "   * au_chk_var = ", au_chk_var);

	var x_arm_field = "RMP_this.variable." + au_chk_var;
	c_debug(debug.test, "   * x_arm_field = ", x_arm_field);
	var x_arm_field_val = RMPApplication.get(x_arm_field);
	c_debug(debug.test, "   * x_arm_field_val = ", x_arm_field_val);

	var x_arm_checked = ((x_arm_field_val == "true") || (x_arm_field_val == true)) ? true : false;
	c_debug(debug.test, "   * x_arm_checked = ", x_arm_checked);

	var time_registered_id = "RMP_this." + test_cw[key].time_id;
	var time_registered_var = "RMP_this.variable." + test_cw[key].time_var;
	var time_registered_val = RMPApplication.get(time_registered_var);
	c_debug(debug.test, "   * time_registered_val = ", time_registered_val);
	var no_time_registered = (isEmpty(time_registered_val)) ? true : false;
	c_debug(debug.test, "   * no_time_registered = ", no_time_registered);

	if ( (x_arm_checked) && (no_time_registered) ) {
	// if checkbox is checked and time is not already registered
		var actual_time = new Date();  
		var currentTime = Math.round(actual_time.getTime()/ 1000);
		var time_id = test_cw[key].time_id;
		eval("RMP_this." + time_id).setDate(currentTime, "dd/MM/yyyy HH:mm");
		c_debug(debug.test, "   ******* Mise à TRUE du champ *******");
		RMPApplication.set("[[RMP_this.variable.time_registered]]", true);
	}
	c_debug(debug.test,"==============================================");
}
