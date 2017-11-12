// ====================================
//   id_js_test_simple_register_start_times
// ====================================

// Variables list
// debut_chk,fin_chk
debug.test_simple = true;

if (!(isEmpty(RMPApplication.get("code_implant")))) {
	fc_test_simple_register_start_times();
}

function fc_test_simple_register_start_times() 
{
	c_debug(debug.test_simple,"###################################################");
	var sortie = false;
	for (key in test_simple_cw) {
		if (sortie) {
			return;
		}
		var cw_name = RMP_this.id_debut_chk.getParent().getName();
		c_debug(debug.test_simple, "=> register START time: widget = ", cw_name + " / " + test_simple_cw[key].au_chk_id );

		var debut_already_checked = RMP_this.id_debut_chk.isChecked();
		c_debug(debug.test_simple, "   * debut_already_checked = ", debut_already_checked);
		var au_chk_id = test_simple_cw[key].au_chk_id;
		c_debug(debug.test_simple, "   * au_chk_id = ", au_chk_id);
		var x_arm_field_id = "RMP_this." + au_chk_id;
		c_debug(debug.test_simple, "   * x_arm_field_id = ", x_arm_field_id);

		var au_chk_var = test_simple_cw[key].au_chk_var;
		c_debug(debug.test_simple, "   * au_chk_var = ", au_chk_var);
		var x_arm_field = "RMP_this.variable." + au_chk_var;
		c_debug(debug.test_simple, "   * x_arm_field = ", x_arm_field);
		var x_arm_field_val = RMPApplication.get(x_arm_field);
		c_debug(debug.test_simple, "   * x_arm_field_val = ", x_arm_field_val);

		var x_arm_checked = ((x_arm_field_val == "true") || (x_arm_field_val == true)) ? true : false;
		c_debug(debug.test_simple, "   * x_arm_checked = ", x_arm_checked);

		var time_registered_id = "RMP_this." + test_simple_cw[key].time_id;
		var time_registered_var = "RMP_this.variable." + test_simple_cw[key].time_var;
		var time_registered_val = RMPApplication.get(time_registered_var);
		c_debug(debug.test_simple, "   * time_registered_val = ", time_registered_val);
		var no_time_registered = (isEmpty(time_registered_val)) ? true : false;
		c_debug(debug.test_simple, "   * no_time_registered = ", no_time_registered);

		if (((!no_time_registered) && ((au_chk_var == "debut_chk") && (!debut_already_checked))) || ((!no_time_registered) && ((au_chk_var == "fin_chk") && (debut_already_checked)))) {
			if (!(sortie)) {
				sortie = true;
				var error_msg = ${P_quoted(i18n("valid_test_simple_ko_msg", "Vous ne pouvez changer l'horodatage existant!"))};
				notify_error(error_title_notify, error_msg);
			}
		} else if ( (au_chk_var == "fin_chk") && (debut_already_checked == false) ) {	
			// start'action should registered before end'action
			eval(x_arm_field_id).setChecked(false);
			var error_msg = ${P_quoted(i18n("valid_test_simple_ko_msg2", "Le début de l'action n'a pas été déclenché!"))};
			notify_error(error_title_notify, error_msg);

		} else if ((no_time_registered) && (x_arm_checked)) {
			var actual_time = new Date();  
			var currentTime = Math.round(actual_time.getTime()/ 1000);
			var time_id = test_simple_cw[key].time_id;
			c_debug(debug.test_simple, "   * time_id = ", time_id);
			eval("RMP_this." + time_id).setDate(currentTime, "dd/MM/yyyy HH:mm");
			c_debug(debug.test_simple, "   ******* Mise à TRUE du champ *******");
			RMPApplication.set("[[RMP_this.variable.time_registered]]", true);
			eval(x_arm_field_id).setActive(false);
			if (au_chk_var == "debut_chk") {
				eval("RMP_this.id_fin_chk").setActive(true);
			}
		}
		c_debug(debug.test_simple,"==============================================");
	}
}
