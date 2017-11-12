function prepare_data_cinit(save_image)
{
	// if "save_image" is not given ("undefined") or true, we don't push images ID in images_list array.
	// That will be done only when form is finally submitted
	if ((typeof(save_image) == 'undefined') || (save_image != true)) {
		save_image = false;
	}
	var last_time_registered = "";			// in milliseconds
	for (key in ctrl_init) {


		// Times and delays calculation
		if (ctrl_init[key].time_registered) {
			c_debug(debug.prepare_data, "====================================");

			var var_str = "";

			// collect start time of action
			last_time_registered = ((isEmpty(RMPApplication.get(ctrl_init[key].vartime))) && (isEmpty(last_time_registered))) ? RMPApplication.get("date_realisation") * 1000 : RMPApplication.get(ctrl_init[key].vartime) * 1000;
			c_debug(debug.prepare_data, "=> prepare_data " + key + ": last_time_registered(ms) = ", last_time_registered);
			ctrl_init[key].start_time = last_time_registered;					// timestamp in ms
			var_str = ctrl_init[key].vartime + "_str";
			ctrl_init[key].start_time_str = extract_time(RMPApplication.get(var_str));
			c_debug(debug.prepare_data, "=> prepare_data " + key + ": start = " + ctrl_init[key].start_time + " | start_str = " + ctrl_init[key].start_time_str);

			// collect end time of action
			var next_valtime = (isEmpty(RMPApplication.get(ctrl_init[key].next_vartime))) ? "" : RMPApplication.get(ctrl_init[key].next_vartime) * 1000;
			ctrl_init[key].end_time = (isEmpty(next_valtime)) ? last_time_registered : next_valtime;		// timestamp in ms
			last_time_registered = ctrl_init[key].end_time;													// timestamp in ms
			RMPApplication.set("date_temp", ctrl_init[key].end_time / 1000);
			c_debug(debug.prepare_data, "=> prepare_data " + key + ": date_temp_str = " + RMPApplication.get("date_temp_str"));
			ctrl_init[key].end_time_str = extract_time(RMPApplication.get("date_temp_str"));
			c_debug(debug.prepare_data, "=> prepare_data " + key + ": end = " + ctrl_init[key].end_time + " | end_str = " + ctrl_init[key].end_time_str);

			// calculate delay of action
			ctrl_init[key].delay = get_delay(ctrl_init[key].end_time, ctrl_init[key].start_time);
			ctrl_init[key].delay_str = timestamp_to_delay(ctrl_init[key].delay);
			c_debug(debug.prepare_data, "=> prepare_data " + key + ": delay = " + ctrl_init[key].delay + " | delay_str = " + ctrl_init[key].delay_str);
		}

		// Register information for all reported "anomalies" 
		var child_cw = ctrl_init[key].cw;
		c_debug(debug.prepare_data, "=> prepare_data " + key + ": child_cw = ", child_cw);
		switch (child_cw) {
			case "anomalie":
				var path_ano_cw_id = ctrl_init[key].parent_id;
				var path_ano_cw = ctrl_init[key].parent_var;
				var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";
				c_debug(debug.prepare_data, "=> prepare_data: ctrl_init[key].parent_var.anomalie = ", ano_var);
				var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

				ctrl_init[key].ano_checked = ano_checked;
				if (ano_checked == "OUI") {
					var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
					ctrl_init[key].ano_description = RMPApplication.get(eval(ano_description));
					// c_debug(debug.prepare_data, "=> prepare_data: description = ", ctrl_init[key].ano_description);
					var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
					var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
					ctrl_init[key].ano_repare =  ano_repare_val;
					if (ano_repare_val == "non") {
						other_var.statut_global = "KO";		// global status of intervention will be "KO"
					}
					// c_debug(debug.prepare_data, "=> prepare_data: repare = ", ctrl_init[key].ano_repare);
					var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
					var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
					ctrl_init[key].ano_renvoi_ordre =  ano_renvoi_ordre_val;
					if (ano_renvoi_ordre_val == "OUI") {
						other_var.envoyer_vers_do = "OUI";
						RMPApplication.set("envoyer_vers_do", "OUI");
					}
					// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", ctrl_init[key].ano_renvoi_ordre);

					// var ano_photo_id = "\"" + ctrl_init[key].parent_id + "." + "id_photo" + "\"";
					var ano_photo_id = path_ano_cw_id + "." + "id_photo";
					c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
					var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
					// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
					var ano_photo_count = eval(ano_photo_id).getUploadedCount();
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
					ctrl_init[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", ctrl_init[key].ano_photo_joined);
					if (ctrl_init[key].ano_photo_joined == "OUI") {
						ctrl_init[key].ano_photo_id = ano_photo_val[0].id;
						if (save_image) {
							images_list.push(ano_photo_val[0].id);
						}
						ctrl_init[key].ano_photo_name = ano_photo_val[0].name;
						ctrl_init[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + ctrl_init[key].ano_photo_id + "/" + ctrl_init[key].ano_photo_name + "?method=GET";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", ctrl_init[key].ano_photo_url);
					}
				}
				break;
			case "ctrl_a":

				break;
			case "ctrl_s":

				break;
			default:
				break;			
		}   // FIN cond: switch (child_cw)

	}   // FIN loop: for (key in ctrl_init)

	// Sauvegarde dans le statut global toute anomalie non réparée
	RMPApplication.set("statut_global", other_var.statut_global);

	// stocke cinit dans le widget var_cinit
	RMPApplication.set("var_cinit", JSON.stringify(ctrl_init));
	c_debug(debug.prepare_data, "====================================");
	c_debug(debug.prepare_data, "=> prepare_data: VAR GLOBALE ctrl_init = ", ctrl_init);

	// ********************************************************
	// Traiter le cas où le technicien n'effectue pas les vérificatiosn dans l'ordre proposé à l'écran
	// TO DO:
	// Chaque case cochée déclenche l'action suivante:
	//  => on pousse dans un tableau un objet, contenant l'étape, l'horodatage
	// On réexploite ce tableau pour le traitement et calculs sur les horaires / délais
	// ********************************************************

}

function prepare_data_au(save_image)
{
	// if "save_image" is not given ("undefined") or true, we don't push images ID in images_list array.
	// That will be done only when form is finally submitted
	if ((typeof(save_image) == 'undefined') || (save_image != true)) {
		save_image = false;
	}	
	var last_time_registered = "";			// in milliseconds
	for (key in arret_urg) {

		var key_step = "\"" + key + "_chk" + "\"";
		var key_step_checked = (RMPApplication.get(eval(key_step)) == "true") ? "OUI" : "non";
		c_debug(debug.prepare_data, "=> prepare_data: key_step_checked = ", key_step_checked);
		arret_urg[key].key_step_checked = key_step_checked;

		// Register information for all reported "anomalies" 
		var child_cw = arret_urg[key].cw;
		c_debug(debug.prepare_data, "=> prepare_data " + key + ": child_cw = ", child_cw);

		switch (child_cw) {
			case "anomalie":

				var path_ano_cw_id = arret_urg[key].parent_id;
				var path_ano_cw = arret_urg[key].parent_var;
				var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";
				c_debug(debug.prepare_data, "=> prepare_data: arret_urg[key].parent_var.anomalie = ", ano_var);
				var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

				arret_urg[key].ano_checked = ano_checked;
				if (ano_checked == "OUI") {
					var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
					arret_urg[key].ano_description = RMPApplication.get(eval(ano_description));
					// c_debug(debug.prepare_data, "=> prepare_data: description = ", arret_urg[key].ano_description);
					var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
					var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
					arret_urg[key].ano_repare =  ano_repare_val;
					if (ano_repare_val == "non") {
						other_var.statut_global = "KO";		// global status of intervention will be "KO"
					}
					// c_debug(debug.prepare_data, "=> prepare_data: repare = ", arret_urg[key].ano_repare);
					var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
					var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
					arret_urg[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
					if (ano_renvoi_ordre_val == "OUI") {
						other_var.envoyer_vers_do = "OUI";
						RMPApplication.set("envoyer_vers_do", "OUI");
					}
					// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", arret_urg[key].ano_renvoi_ordre);

					var ano_photo_id = path_ano_cw_id + "." + "id_photo";
					c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
					var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
					// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
					var ano_photo_count = eval(ano_photo_id).getUploadedCount();
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
					arret_urg[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", arret_urg[key].ano_photo_joined);
					if (arret_urg[key].ano_photo_joined == "OUI") {
						arret_urg[key].ano_photo_id = ano_photo_val[0].id;
						if (save_image) {
							images_list.push(ano_photo_val[0].id);
						}
						arret_urg[key].ano_photo_name = ano_photo_val[0].name;
						arret_urg[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + arret_urg[key].ano_photo_id + "/" + arret_urg[key].ano_photo_name + "?method=GET";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", arret_urg[key].ano_photo_url);
					}
				}
				break;

			case "ctrl_a":

				var path_ano_cw_id = arret_urg[key].parent_id + ".id_test_ano";
				var path_ano_cw = arret_urg[key].parent_var + ".test_ano";
				var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";

				// Register DESARMEMENT time
				var desarm_var = "\"" + arret_urg[key].parent_var + "." + arret_urg[key].arret_urg_cw.desarm.au_chk_var + "\"";
				// c_debug(debug.prepare_data, "=> prepare_data: desarm_var = ", desarm_var);
				var desarm_val = RMPApplication.get(eval(desarm_var));
				// c_debug(debug.prepare_data, "=> prepare_data: desarm_val = ", desarm_val);
				arret_urg[key].desarm_checked = ((desarm_val == "true") || (desarm_val == true)) ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: arret_urg[key].desarm_checked = ", arret_urg[key].desarm_checked);
				if (arret_urg[key].desarm_checked == "OUI") {

					var start_time_var = arret_urg[key].parent_var + "." + arret_urg[key].arret_urg_cw.desarm.time_var;
					// c_debug(debug.prepare_data, "=> prepare_data: start_time_var = ", start_time_var);
					arret_urg[key].start_time = RMPApplication.get(start_time_var) * 1000;				// Keep time in milliseconds
					// c_debug(debug.prepare_data, "=> prepare_data: arret_urg[key].start_time = ", arret_urg[key].start_time);
					var start_time_str = "\"" + arret_urg[key].parent_var + "." + arret_urg[key].arret_urg_cw.desarm.time_var + "_str" + "\"";
					var start_time_str_val = extract_time(RMPApplication.get(eval(start_time_str)));
					// c_debug(debug.prepare_data, "=> prepare_data: arret_urg[key].start_time_str = ", start_time_str_val);
					arret_urg[key].start_time_str = start_time_str_val;

					last_time_registered = arret_urg[key].start_time;			// in milliseconds
				} else {
					arret_urg[key].start_time = last_time_registered;
				}

				// Register REARMEMENT time
				var rearm_var = "\"" + arret_urg[key].parent_var + "." + arret_urg[key].arret_urg_cw.rearm.au_chk_var + "\"";
				// c_debug(debug.prepare_data, "=> prepare_data: rearm_var = ", rearm_var);
				var rearm_val = RMPApplication.get(eval(rearm_var));
				// c_debug(debug.prepare_data, "=> prepare_data: rearm_val = ", rearm_val);
				arret_urg[key].rearm_checked = ((rearm_val == "true") || (rearm_val == true)) ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: arret_urg[key].rearm_checked = ", arret_urg[key].rearm_checked);
				if (arret_urg[key].rearm_checked == "OUI") {

					var end_time_var = arret_urg[key].parent_var + "." + arret_urg[key].arret_urg_cw.rearm.time_var;
					// c_debug(debug.prepare_data, "=> prepare_data: end_time_var = ", end_time_var);
					arret_urg[key].end_time = RMPApplication.get(end_time_var) * 1000;				// Keep time in milliseconds
					// c_debug(debug.prepare_data, "=> prepare_data: arret_urg[key].end_time = ", arret_urg[key].end_time);
					var end_time_str = "\"" + arret_urg[key].parent_var + "." + arret_urg[key].arret_urg_cw.rearm.time_var + "_str" + "\"";
					var end_time_str_val = extract_time(RMPApplication.get(eval(end_time_str)));
					// c_debug(debug.prepare_data, "=> prepare_data: arret_urg[key].end_time_str = ", end_time_str_val);
					arret_urg[key].end_time_str = end_time_str_val;

					last_time_registered = arret_urg[key].end_time;			// in milliseconds
				} else {
					arret_urg[key].end_time = last_time_registered;
				}

				// calculate delay of action
				arret_urg[key].delay = get_delay(arret_urg[key].end_time, arret_urg[key].start_time);
				arret_urg[key].delay_str = timestamp_to_delay(arret_urg[key].delay);
				c_debug(debug.prepare_data, "=> prepare_data " + key + ": delay = " + arret_urg[key].delay + " | delay_str = " + arret_urg[key].delay_str);

				// Other details
				arret_urg[key].ext_ad_tpi_chk = RMPApplication.get(arret_urg[key].parent_var + "." + "ext_ad_tpi_chk");
				arret_urg[key].abs_tension_tgbt_chk = RMPApplication.get(arret_urg[key].parent_var + "." + "abs_tension_tgbt_chk");
				arret_urg[key].ret_tension_tgbt_chk = RMPApplication.get(arret_urg[key].parent_var + "." + "ret_tension_tgbt_chk");

				// if a "anomalie" is reported
				c_debug(debug.prepare_data, "=> prepare_data: ano_var = ", ano_var);
				var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

				arret_urg[key].ano_checked = ano_checked;
				if (ano_checked == "OUI") {
					var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
					arret_urg[key].ano_description = RMPApplication.get(eval(ano_description));
					// c_debug(debug.prepare_data, "=> prepare_data: description = ", arret_urg[key].ano_description);
					var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
					var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
					arret_urg[key].ano_repare =  ano_repare_val;
					if (ano_repare_val == "non") {
						other_var.statut_global = "KO";		// global status of intervention will be "KO"
					}
					// c_debug(debug.prepare_data, "=> prepare_data: repare = ", arret_urg[key].ano_repare);
					var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
					var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
					arret_urg[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
					if (ano_renvoi_ordre_val == "OUI") {
						other_var.envoyer_vers_do = "OUI";
						RMPApplication.set("envoyer_vers_do", "OUI");
					}
					// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", arret_urg[key].ano_renvoi_ordre);

					var ano_photo_id = path_ano_cw_id + "." + "id_photo";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
					var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
					// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
					var ano_photo_count = eval(ano_photo_id).getUploadedCount();
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
					arret_urg[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", arret_urg[key].ano_photo_joined);
					if (arret_urg[key].ano_photo_joined == "OUI") {
						arret_urg[key].ano_photo_id = ano_photo_val[0].id;
						if (save_image) {
							images_list.push(ano_photo_val[0].id);
						}
						arret_urg[key].ano_photo_name = ano_photo_val[0].name;
						arret_urg[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + arret_urg[key].ano_photo_id + "/" + arret_urg[key].ano_photo_name + "?method=GET";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", arret_urg[key].ano_photo_url);
					}
				}

				break;
			case "ctrl_s":

				break;
			default:
				break;			
		}   // FIN cond: switch (child_cw)

	}   // FIN loop: for (key in arret_urg)

	// Sauvegarde dans le statut global toute anomalie non réparée
	RMPApplication.set("statut_global", other_var.statut_global);

	// stocke au dans le widget var_au
	RMPApplication.set("var_au", JSON.stringify(arret_urg));
	c_debug(debug.prepare_data, "====================================");
	c_debug(debug.prepare_data, "=> prepare_data: VAR GLOBALE arret_urg = ", arret_urg);

}

function prepare_data_depass(save_image)
{
	// if "save_image" is not given ("undefined") or true, we don't push images ID in images_list array.
	// That will be done only when form is finally submitted
	if ((typeof(save_image) == 'undefined') || (save_image != true)) {
		save_image = false;
	}
	// register times for Capots Out & IN in other_var
	other_var.depass = {};
	var nb_depass_site = RMPApplication.get("nb_depass_site");
	other_var.depass.nb_depass_site = nb_depass_site;
	if (nb_depass_site > 0) {
		other_var.depass.depass_capots_out = {};
		other_var.depass.depass_capots_out.checked = (RMPApplication.get("depass_capots_out") == "true") ? "OUI" : "non";
		other_var.depass.depass_capots_out.start_time = RMPApplication.get("depass_capots_out_start") * 1000;	// in milliseconds
		other_var.depass.depass_capots_out.start_time_str = extract_time(RMPApplication.get("depass_capots_out_start_str"));
		other_var.depass.depass_capots_in = {};
		other_var.depass.depass_capots_in.checked = (RMPApplication.get("depass_capots_in") == "true") ? "OUI" : "non";
		other_var.depass.depass_capots_in.start_time = RMPApplication.get("depass_capots_in_start") * 1000;	// in milliseconds
		other_var.depass.depass_capots_in.start_time_str = extract_time(RMPApplication.get("depass_capots_in_start_str"));

		var last_time_registered = "";			// in milliseconds
		for (key in depass) {


			var key_step = "\"" + key + "_chk" + "\"";
			var key_step_checked = (RMPApplication.get(eval(key_step)) == "true") ? "OUI" : "non";
			c_debug(debug.prepare_data, "=> prepare_data: key_step_checked = ", key_step_checked);
			depass[key].key_step_checked = key_step_checked;

			if (key_step_checked == "OUI") {

				var face_ad_var = "\"" + "depass_face_ad_" + key + "\"";
				depass[key].face_ad = RMPApplication.get(eval(face_ad_var));

				// Register information for all reported "anomalies" 
				var child_cw = depass[key].cw;
				c_debug(debug.prepare_data, "=> prepare_data " + key + ": child_cw = ", child_cw);

				switch (child_cw) {
					case "anomalie":

						var path_ano_cw_id = depass[key].parent_id;
						var path_ano_cw = depass[key].parent_var;
						var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";
						c_debug(debug.prepare_data, "=> prepare_data: depass[key].parent_var.anomalie = ", ano_var);
						var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

						depass[key].ano_checked = ano_checked;
						if (ano_checked == "OUI") {
							var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
							depass[key].ano_description = RMPApplication.get(eval(ano_description));
							// c_debug(debug.prepare_data, "=> prepare_data: description = ", depass[key].ano_description);
							var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
							var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
							depass[key].ano_repare =  ano_repare_val;
							if (ano_repare_val == "non") {
								other_var.statut_global = "KO";		// global status of intervention will be "KO"
							}
							// c_debug(debug.prepare_data, "=> prepare_data: repare = ", depass[key].ano_repare);
							var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
							var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
							depass[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
							if (ano_renvoi_ordre_val == "OUI") {
								other_var.envoyer_vers_do = "OUI";
								RMPApplication.set("envoyer_vers_do", "OUI");
							}
							// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", depass[key].ano_renvoi_ordre);

							var ano_photo_id = path_ano_cw_id + "." + "id_photo";
							c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
							var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
							// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
							var ano_photo_count = eval(ano_photo_id).getUploadedCount();
							// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
							depass[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
							// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", depass[key].ano_photo_joined);
							if (depass[key].ano_photo_joined == "OUI") {
								depass[key].ano_photo_id = ano_photo_val[0].id;
								if (save_image) {
									images_list.push(ano_photo_val[0].id);
								}
								depass[key].ano_photo_name = ano_photo_val[0].name;
								depass[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + depass[key].ano_photo_id + "/" + depass[key].ano_photo_name + "?method=GET";
								// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", depass[key].ano_photo_url);
							}
						}
						break;

					case "ctrl_a":

						var path_ano_cw_id = depass[key].parent_id + ".id_test_ano";
						var path_ano_cw = depass[key].parent_var + ".test_ano";
						var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";

						// Register DESARMEMENT time
						var desarm_var = "\"" + depass[key].parent_var + "." + depass[key].depass_cw.desarm.au_chk_var + "\"";
						// c_debug(debug.prepare_data, "=> prepare_data: desarm_var = ", desarm_var);
						var desarm_val = RMPApplication.get(eval(desarm_var));
						// c_debug(debug.prepare_data, "=> prepare_data: desarm_val = ", desarm_val);
						depass[key].desarm_checked = ((desarm_val == "true") || (desarm_val == true)) ? "OUI" : "non";
						// c_debug(debug.prepare_data, "=> prepare_data: depass[key].desarm_checked = ", depass[key].desarm_checked);
						if (depass[key].desarm_checked == "OUI") {

							var start_time_var = depass[key].parent_var + "." + depass[key].depass_cw.desarm.time_var;
							// c_debug(debug.prepare_data, "=> prepare_data: start_time_var = ", start_time_var);
							depass[key].start_time = RMPApplication.get(start_time_var) * 1000;				// Keep time in milliseconds
							// c_debug(debug.prepare_data, "=> prepare_data: depass[key].start_time = ", depass[key].start_time);
							var start_time_str = "\"" + depass[key].parent_var + "." + depass[key].depass_cw.desarm.time_var + "_str" + "\"";
							var start_time_str_val = extract_time(RMPApplication.get(eval(start_time_str)));
							// c_debug(debug.prepare_data, "=> prepare_data: depass[key].start_time_str = ", start_time_str_val);
							depass[key].start_time_str = start_time_str_val;

							last_time_registered = depass[key].start_time;			// in milliseconds
						} else {
							depass[key].start_time = last_time_registered;
						}

						// Register REARMEMENT time
						var rearm_var = "\"" + depass[key].parent_var + "." + depass[key].depass_cw.rearm.au_chk_var + "\"";
						// c_debug(debug.prepare_data, "=> prepare_data: rearm_var = ", rearm_var);
						var rearm_val = RMPApplication.get(eval(rearm_var));
						// c_debug(debug.prepare_data, "=> prepare_data: rearm_val = ", rearm_val);
						depass[key].rearm_checked = ((rearm_val == "true") || (rearm_val == true)) ? "OUI" : "non";
						// c_debug(debug.prepare_data, "=> prepare_data: depass[key].rearm_checked = ", depass[key].rearm_checked);
						if (depass[key].rearm_checked == "OUI") {

							var end_time_var = depass[key].parent_var + "." + depass[key].depass_cw.rearm.time_var;
							// c_debug(debug.prepare_data, "=> prepare_data: end_time_var = ", end_time_var);
							depass[key].end_time = RMPApplication.get(end_time_var) * 1000;				// Keep time in milliseconds
							// c_debug(debug.prepare_data, "=> prepare_data: depass[key].end_time = ", depass[key].end_time);
							var end_time_str = "\"" + depass[key].parent_var + "." + depass[key].depass_cw.rearm.time_var + "_str" + "\"";
							var end_time_str_val = extract_time(RMPApplication.get(eval(end_time_str)));
							// c_debug(debug.prepare_data, "=> prepare_data: depass[key].end_time_str = ", end_time_str_val);
							depass[key].end_time_str = end_time_str_val;

							last_time_registered = depass[key].end_time;			// in milliseconds
						} else {
							depass[key].end_time = last_time_registered;
						}

						// calculate delay of action
						depass[key].delay = get_delay(depass[key].end_time, depass[key].start_time);
						depass[key].delay_str = timestamp_to_delay(depass[key].delay);
						c_debug(debug.prepare_data, "=> prepare_data " + key + ": delay = " + depass[key].delay + " | delay_str = " + depass[key].delay_str);

						// Other details
						depass[key].ext_ad_tpi_chk = RMPApplication.get(depass[key].parent_var + "." + "ext_ad_tpi_chk");
						depass[key].abs_tension_tgbt_chk = RMPApplication.get(depass[key].parent_var + "." + "abs_tension_tgbt_chk");
						depass[key].ret_tension_tgbt_chk = RMPApplication.get(depass[key].parent_var + "." + "ret_tension_tgbt_chk");

						// if a "anomalie" is reported
						c_debug(debug.prepare_data, "=> prepare_data: ano_var = ", ano_var);
						var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

						depass[key].ano_checked = ano_checked;
						if (ano_checked == "OUI") {
							var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
							depass[key].ano_description = RMPApplication.get(eval(ano_description));
							// c_debug(debug.prepare_data, "=> prepare_data: description = ", depass[key].ano_description);
							var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
							var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
							depass[key].ano_repare =  ano_repare_val;
							if (ano_repare_val == "non") {
								other_var.statut_global = "KO";		// global status of intervention will be "KO"
							}
							// c_debug(debug.prepare_data, "=> prepare_data: repare = ", depass[key].ano_repare);
							var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
							var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
							depass[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
							if (ano_renvoi_ordre_val == "OUI") {
								other_var.envoyer_vers_do = "OUI";
								RMPApplication.set("envoyer_vers_do", "OUI");
							}
							// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", depass[key].ano_renvoi_ordre);

							var ano_photo_id = path_ano_cw_id + "." + "id_photo";
							// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
							var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
							// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
							var ano_photo_count = eval(ano_photo_id).getUploadedCount();
							// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
							depass[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
							// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", depass[key].ano_photo_joined);
							if (depass[key].ano_photo_joined == "OUI") {
								depass[key].ano_photo_id = ano_photo_val[0].id;
								if (save_image) {
									images_list.push(ano_photo_val[0].id);
								}
								depass[key].ano_photo_name = ano_photo_val[0].name;
								depass[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + depass[key].ano_photo_id + "/" + depass[key].ano_photo_name + "?method=GET";
								// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", depass[key].ano_photo_url);
							}
						}

						break;
					case "ctrl_s":

						break;
					default:
						break;			
				}   // FIN cond: switch (child_cw)
				
			}   // FIN cond: if (key_step_checked)

		}   // FIN loop: for (key in depass)

		// Sauvegarde dans le statut global toute anomalie non réparée
		RMPApplication.set("statut_global", other_var.statut_global);
	}
	
	// stocke depass dans le widget var_depass
	RMPApplication.set("var_depass", JSON.stringify(depass));
	c_debug(debug.prepare_data, "====================================");
	c_debug(debug.prepare_data, "=> prepare_data: VAR GLOBALE depass = ", depass);

	// stocke les compléments de variables en vue d'une récupération ultérieure
	RMPApplication.set("other_var", JSON.stringify(other_var));

}

function prepare_data_celec(save_image)
{
	// if "save_image" is not given ("undefined") or true, we don't push images ID in images_list array.
	// That will be done only when form is finally submitted
	if ((typeof(save_image) == 'undefined') || (save_image != true)) {
		save_image = false;
	}
	var last_time_registered = "";			// in milliseconds
	for (key in coup_elec) {

		c_debug(debug.prepare_data, "====================================");

		var key_step = "\"" + key + "_chk" + "\"";
		var key_step_checked = (RMPApplication.get(eval(key_step)) == "true") ? "OUI" : "non";
		c_debug(debug.prepare_data, "=> prepare_data: key_step_checked = ", key_step_checked);
		coup_elec[key].key_step_checked = key_step_checked;

		if (key_step_checked == "OUI") {

			// Register information for all reported "anomalies" 
			var child_cw = coup_elec[key].cw;
			c_debug(debug.prepare_data, "=> prepare_data " + key + ": child_cw = ", child_cw);

			switch (child_cw) {
				case "anomalie":

					var path_ano_cw_id = coup_elec[key].parent_id;
					var path_ano_cw = coup_elec[key].parent_var;
					var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";
					c_debug(debug.prepare_data, "=> prepare_data: coup_elec[key].parent_var.anomalie = ", ano_var);
					var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

					coup_elec[key].ano_checked = ano_checked;
					if (ano_checked == "OUI") {
						var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
						coup_elec[key].ano_description = RMPApplication.get(eval(ano_description));
						// c_debug(debug.prepare_data, "=> prepare_data: description = ", coup_elec[key].ano_description);
						var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
						var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
						coup_elec[key].ano_repare =  ano_repare_val;
						if (ano_repare_val == "non") {
							other_var.statut_global = "KO";		// global status of intervention will be "KO"
						}
						// c_debug(debug.prepare_data, "=> prepare_data: repare = ", coup_elec[key].ano_repare);
						var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
						var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
						coup_elec[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
						if (ano_renvoi_ordre_val == "OUI") {
							other_var.envoyer_vers_do = "OUI";
							RMPApplication.set("envoyer_vers_do", "OUI");
						}
						// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", coup_elec[key].ano_renvoi_ordre);

						var ano_photo_id = path_ano_cw_id + "." + "id_photo";
						c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
						var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
						// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
						var ano_photo_count = eval(ano_photo_id).getUploadedCount();
						// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
						coup_elec[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", coup_elec[key].ano_photo_joined);
						if (coup_elec[key].ano_photo_joined == "OUI") {
							coup_elec[key].ano_photo_id = ano_photo_val[0].id;
							if (save_image) {
								images_list.push(ano_photo_val[0].id);
							}
							coup_elec[key].ano_photo_name = ano_photo_val[0].name;
							coup_elec[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + coup_elec[key].ano_photo_id + "/" + coup_elec[key].ano_photo_name + "?method=GET";
							// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", coup_elec[key].ano_photo_url);
						}
					}
					break;

				case "ctrl_a":

					var path_ano_cw_id = coup_elec[key].parent_id + ".id_test_ano";
					var path_ano_cw = coup_elec[key].parent_var + ".test_ano";
					var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";

					// Register DESARMEMENT time
					var desarm_var = "\"" + coup_elec[key].parent_var + "." + coup_elec[key].coup_elec_cw.desarm.au_chk_var + "\"";
					c_debug(debug.prepare_data, "=> prepare_data: desarm_var = ", desarm_var);
					var desarm_val = RMPApplication.get(eval(desarm_var));
					c_debug(debug.prepare_data, "=> prepare_data: desarm_val = ", desarm_val);
					coup_elec[key].desarm_checked = ((desarm_val == "true") || (desarm_val == true)) ? "OUI" : "non";
					c_debug(debug.prepare_data, "=> prepare_data: coup_elec[key].desarm_checked = ", coup_elec[key].desarm_checked);
					if (coup_elec[key].desarm_checked == "OUI") {

						var start_time_var = coup_elec[key].parent_var + "." + coup_elec[key].coup_elec_cw.desarm.time_var;
						c_debug(debug.prepare_data, "=> prepare_data: start_time_var = ", start_time_var);
						coup_elec[key].start_time = RMPApplication.get(start_time_var) * 1000;				// Keep time in milliseconds
						c_debug(debug.prepare_data, "=> prepare_data: coup_elec[key].start_time = ", coup_elec[key].start_time);
						var start_time_str = "\"" + coup_elec[key].parent_var + "." + coup_elec[key].coup_elec_cw.desarm.time_var + "_str" + "\"";
						var start_time_str_val = extract_time(RMPApplication.get(eval(start_time_str)));
						c_debug(debug.prepare_data, "=> prepare_data: coup_elec[key].start_time_str = ", start_time_str_val);
						coup_elec[key].start_time_str = start_time_str_val;

						last_time_registered = coup_elec[key].start_time;			// in milliseconds
					} else {
						coup_elec[key].start_time = last_time_registered;
					}

					// Register REARMEMENT time
					var rearm_var = "\"" + coup_elec[key].parent_var + "." + coup_elec[key].coup_elec_cw.rearm.au_chk_var + "\"";
					c_debug(debug.prepare_data, "=> prepare_data: rearm_var = ", rearm_var);
					var rearm_val = RMPApplication.get(eval(rearm_var));
					c_debug(debug.prepare_data, "=> prepare_data: rearm_val = ", rearm_val);
					coup_elec[key].rearm_checked = ((rearm_val == "true") || (rearm_val == true)) ? "OUI" : "non";
					c_debug(debug.prepare_data, "=> prepare_data: coup_elec[key].rearm_checked = ", coup_elec[key].rearm_checked);
					if (coup_elec[key].rearm_checked == "OUI") {

						var end_time_var = coup_elec[key].parent_var + "." + coup_elec[key].coup_elec_cw.rearm.time_var;
						c_debug(debug.prepare_data, "=> prepare_data: end_time_var = ", end_time_var);
						coup_elec[key].end_time = RMPApplication.get(end_time_var) * 1000;				// Keep time in milliseconds
						c_debug(debug.prepare_data, "=> prepare_data: coup_elec[key].end_time = ", coup_elec[key].end_time);
						var end_time_str = "\"" + coup_elec[key].parent_var + "." + coup_elec[key].coup_elec_cw.rearm.time_var + "_str" + "\"";
						var end_time_str_val = extract_time(RMPApplication.get(eval(end_time_str)));
						c_debug(debug.prepare_data, "=> prepare_data: coup_elec[key].end_time_str = ", end_time_str_val);
						coup_elec[key].end_time_str = end_time_str_val;

						last_time_registered = coup_elec[key].end_time;			// in milliseconds
					} else {
						coup_elec[key].end_time = last_time_registered;
					}

					// calculate delay of action
					coup_elec[key].delay = get_delay(coup_elec[key].end_time, coup_elec[key].start_time);
					coup_elec[key].delay_str = timestamp_to_delay(coup_elec[key].delay);
					c_debug(debug.prepare_data, "=> prepare_data " + key + ": delay = " + coup_elec[key].delay + " | delay_str = " + coup_elec[key].delay_str);

					// Other details
					coup_elec[key].ext_ad_tpi_chk = RMPApplication.get(coup_elec[key].parent_var + "." + "ext_ad_tpi_chk");
					coup_elec[key].abs_tension_tgbt_chk = RMPApplication.get(coup_elec[key].parent_var + "." + "abs_tension_tgbt_chk");
					coup_elec[key].ret_tension_tgbt_chk = RMPApplication.get(coup_elec[key].parent_var + "." + "ret_tension_tgbt_chk");

					// if a "anomalie" is reported
					c_debug(debug.prepare_data, "=> prepare_data: ano_var = ", ano_var);
					var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
					c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

					coup_elec[key].ano_checked = ano_checked;
					if (ano_checked == "OUI") {
						var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
						coup_elec[key].ano_description = RMPApplication.get(eval(ano_description));
						c_debug(debug.prepare_data, "=> prepare_data: description = ", coup_elec[key].ano_description);
						var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
						var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
						coup_elec[key].ano_repare =  ano_repare_val;
						if (ano_repare_val == "non") {
							other_var.statut_global = "KO";		// global status of intervention will be "KO"
						}
						c_debug(debug.prepare_data, "=> prepare_data: repare = ", coup_elec[key].ano_repare);
						var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
						var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
						coup_elec[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
						if (ano_renvoi_ordre_val == "OUI") {
							other_var.envoyer_vers_do = "OUI";
							RMPApplication.set("envoyer_vers_do", "OUI");
						}
						c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", coup_elec[key].ano_renvoi_ordre);

						var ano_photo_id = path_ano_cw_id + "." + "id_photo";
						c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
						var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
						c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
						var ano_photo_count = eval(ano_photo_id).getUploadedCount();
						c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
						coup_elec[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
						c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", coup_elec[key].ano_photo_joined);
						if (coup_elec[key].ano_photo_joined == "OUI") {
							coup_elec[key].ano_photo_id = ano_photo_val[0].id;
							if (save_image) {
								images_list.push(ano_photo_val[0].id);
							}
							coup_elec[key].ano_photo_name = ano_photo_val[0].name;
							coup_elec[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + coup_elec[key].ano_photo_id + "/" + coup_elec[key].ano_photo_name + "?method=GET";
							c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", coup_elec[key].ano_photo_url);
						}
					}

					break;
				case "ctrl_s":

					break;
				default:
					break;			
			}   // FIN cond: switch (child_cw)
			
		}   // FIN cond: if (key_step_checked)

	}   // FIN loop: for (key in coup_elec)

	// Sauvegarde dans le statut global toute anomalie non réparée
	RMPApplication.set("statut_global", other_var.statut_global);

	// stocke coup_elec dans le widget var_celec
	RMPApplication.set("var_celec", JSON.stringify(coup_elec));
	c_debug(debug.prepare_data, "====================================");
	c_debug(debug.prepare_data, "=> prepare_data: VAR GLOBALE coup_elec = ", coup_elec);

}

function prepare_data_bjn(save_image)
{
	// if "save_image" is not given ("undefined") or true, we don't push images ID in images_list array.
	// That will be done only when form is finally submitted
	if ((typeof(save_image) == 'undefined') || (save_image != true)) {
		save_image = false;
	}
	var last_time_registered = "";			// in milliseconds
	for (key in bascule_jn) {

		// Register information for all reported "anomalies" 
		var child_cw = bascule_jn[key].cw;
		c_debug(debug.prepare_data, "=> prepare_data " + key + ": child_cw = ", child_cw);

		switch (child_cw) {
			case "anomalie":

				var path_ano_cw_id = bascule_jn[key].parent_id;
				var path_ano_cw = bascule_jn[key].parent_var;
				var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";
				c_debug(debug.prepare_data, "=> prepare_data: bascule_jn[key].parent_var.anomalie = ", ano_var);
				var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

				bascule_jn[key].ano_checked = ano_checked;
				if (ano_checked == "OUI") {
					var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
					bascule_jn[key].ano_description = RMPApplication.get(eval(ano_description));
					// c_debug(debug.prepare_data, "=> prepare_data: description = ", bascule_jn[key].ano_description);
					var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
					var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
					bascule_jn[key].ano_repare =  ano_repare_val;
					if (ano_repare_val == "non") {
						other_var.statut_global = "KO";		// global status of intervention will be "KO"
					}
					// c_debug(debug.prepare_data, "=> prepare_data: repare = ", bascule_jn[key].ano_repare);
					var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
					var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
					bascule_jn[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
					if (ano_renvoi_ordre_val == "OUI") {
						other_var.envoyer_vers_do = "OUI";
						RMPApplication.set("envoyer_vers_do", "OUI");
					}
					// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", bascule_jn[key].ano_renvoi_ordre);

					var ano_photo_id = path_ano_cw_id + "." + "id_photo";
					c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
					var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
					// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
					var ano_photo_count = eval(ano_photo_id).getUploadedCount();
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
					bascule_jn[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", bascule_jn[key].ano_photo_joined);
					if (bascule_jn[key].ano_photo_joined == "OUI") {
						bascule_jn[key].ano_photo_id = ano_photo_val[0].id;
						if (save_image) {
							images_list.push(ano_photo_val[0].id);
						}
						bascule_jn[key].ano_photo_name = ano_photo_val[0].name;
						bascule_jn[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + bascule_jn[key].ano_photo_id + "/" + bascule_jn[key].ano_photo_name + "?method=GET";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", bascule_jn[key].ano_photo_url);
					}
				}
				break;

			case "ctrl_a":

				var path_ano_cw_id = bascule_jn[key].parent_id + ".id_test_ano";
				var path_ano_cw = bascule_jn[key].parent_var + ".test_ano";
				var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";

				// Register DESARMEMENT time
				var desarm_var = "\"" + bascule_jn[key].parent_var + "." + bascule_jn[key].bascule_jn_cw.desarm.au_chk_var + "\"";
				// c_debug(debug.prepare_data, "=> prepare_data: desarm_var = ", desarm_var);
				var desarm_val = RMPApplication.get(eval(desarm_var));
				// c_debug(debug.prepare_data, "=> prepare_data: desarm_val = ", desarm_val);
				bascule_jn[key].desarm_checked = ((desarm_val == "true") || (desarm_val == true)) ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: bascule_jn[key].desarm_checked = ", bascule_jn[key].desarm_checked);
				if (bascule_jn[key].desarm_checked == "OUI") {

					var start_time_var = bascule_jn[key].parent_var + "." + bascule_jn[key].bascule_jn_cw.desarm.time_var;
					// c_debug(debug.prepare_data, "=> prepare_data: start_time_var = ", start_time_var);
					bascule_jn[key].start_time = RMPApplication.get(start_time_var) * 1000;				// Keep time in milliseconds
					// c_debug(debug.prepare_data, "=> prepare_data: bascule_jn[key].start_time = ", bascule_jn[key].start_time);
					var start_time_str = "\"" + bascule_jn[key].parent_var + "." + bascule_jn[key].bascule_jn_cw.desarm.time_var + "_str" + "\"";
					var start_time_str_val = extract_time(RMPApplication.get(eval(start_time_str)));
					// c_debug(debug.prepare_data, "=> prepare_data: bascule_jn[key].start_time_str = ", start_time_str_val);
					bascule_jn[key].start_time_str = start_time_str_val;

					last_time_registered = bascule_jn[key].start_time;			// in milliseconds
				} else {
					bascule_jn[key].start_time = last_time_registered;
				}

				// Register REARMEMENT time
				var rearm_var = "\"" + bascule_jn[key].parent_var + "." + bascule_jn[key].bascule_jn_cw.rearm.au_chk_var + "\"";
				// c_debug(debug.prepare_data, "=> prepare_data: rearm_var = ", rearm_var);
				var rearm_val = RMPApplication.get(eval(rearm_var));
				// c_debug(debug.prepare_data, "=> prepare_data: rearm_val = ", rearm_val);
				bascule_jn[key].rearm_checked = ((rearm_val == "true") || (rearm_val == true)) ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: bascule_jn[key].rearm_checked = ", bascule_jn[key].rearm_checked);
				if (bascule_jn[key].rearm_checked == "OUI") {

					var end_time_var = bascule_jn[key].parent_var + "." + bascule_jn[key].bascule_jn_cw.rearm.time_var;
					// c_debug(debug.prepare_data, "=> prepare_data: end_time_var = ", end_time_var);
					bascule_jn[key].end_time = RMPApplication.get(end_time_var) * 1000;				// Keep time in milliseconds
					// c_debug(debug.prepare_data, "=> prepare_data: bascule_jn[key].end_time = ", bascule_jn[key].end_time);
					var end_time_str = "\"" + bascule_jn[key].parent_var + "." + bascule_jn[key].bascule_jn_cw.rearm.time_var + "_str" + "\"";
					var end_time_str_val = extract_time(RMPApplication.get(eval(end_time_str)));
					// c_debug(debug.prepare_data, "=> prepare_data: bascule_jn[key].end_time_str = ", end_time_str_val);
					bascule_jn[key].end_time_str = end_time_str_val;

					last_time_registered = bascule_jn[key].end_time;			// in milliseconds
				} else {
					bascule_jn[key].end_time = last_time_registered;
				}

				// calculate delay of action
				bascule_jn[key].delay = get_delay(bascule_jn[key].end_time, bascule_jn[key].start_time);
				bascule_jn[key].delay_str = timestamp_to_delay(bascule_jn[key].delay);
				c_debug(debug.prepare_data, "=> prepare_data " + key + ": delay = " + bascule_jn[key].delay + " | delay_str = " + bascule_jn[key].delay_str);

				// Other details
				bascule_jn[key].ext_ad_tpi_chk = RMPApplication.get(bascule_jn[key].parent_var + "." + "ext_ad_tpi_chk");
				bascule_jn[key].abs_tension_tgbt_chk = RMPApplication.get(bascule_jn[key].parent_var + "." + "abs_tension_tgbt_chk");
				bascule_jn[key].ret_tension_tgbt_chk = RMPApplication.get(bascule_jn[key].parent_var + "." + "ret_tension_tgbt_chk");

				// if a "anomalie" is reported
				c_debug(debug.prepare_data, "=> prepare_data: ano_var = ", ano_var);
				var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

				bascule_jn[key].ano_checked = ano_checked;
				if (ano_checked == "OUI") {
					var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
					bascule_jn[key].ano_description = RMPApplication.get(eval(ano_description));
					// c_debug(debug.prepare_data, "=> prepare_data: description = ", bascule_jn[key].ano_description);
					var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
					var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
					bascule_jn[key].ano_repare =  ano_repare_val;
					if (ano_repare_val == "non") {
						other_var.statut_global = "KO";		// global status of intervention will be "KO"
					}
					// c_debug(debug.prepare_data, "=> prepare_data: repare = ", bascule_jn[key].ano_repare);
					var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
					var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
					bascule_jn[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
					if (ano_renvoi_ordre_val == "OUI") {
						other_var.envoyer_vers_do = "OUI";
						RMPApplication.set("envoyer_vers_do", "OUI");
					}
					// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", bascule_jn[key].ano_renvoi_ordre);

					var ano_photo_id = path_ano_cw_id + "." + "id_photo";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
					var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
					// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
					var ano_photo_count = eval(ano_photo_id).getUploadedCount();
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
					bascule_jn[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", bascule_jn[key].ano_photo_joined);
					if (bascule_jn[key].ano_photo_joined == "OUI") {
						bascule_jn[key].ano_photo_id = ano_photo_val[0].id;
						if (save_image) {
							images_list.push(ano_photo_val[0].id);
						}
						bascule_jn[key].ano_photo_name = ano_photo_val[0].name;
						bascule_jn[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + bascule_jn[key].ano_photo_id + "/" + bascule_jn[key].ano_photo_name + "?method=GET";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", bascule_jn[key].ano_photo_url);
					}
				}

				break;
			case "ctrl_s":

				var path_ano_cw_id = bascule_jn[key].parent_id + ".id_test_ano";
				var path_ano_cw = bascule_jn[key].parent_var + ".test_ano";
				var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";

				// Register DEBUT time
				var debut_var = "\"" + bascule_jn[key].parent_var + "." + bascule_jn[key].bascule_jn_cw.debut.au_chk_var + "\"";
				// c_debug(debug.prepare_data, "=> prepare_data: debut_var = ", debut_var);
				var debut_val = RMPApplication.get(eval(debut_var));
				// c_debug(debug.prepare_data, "=> prepare_data: debut_val = ", debut_val);
				bascule_jn[key].debut_checked = ((debut_val == "true") || (debut_val == true)) ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: bascule_jn[key].debut_checked = ", bascule_jn[key].debut_checked);
				if (bascule_jn[key].debut_checked == "OUI") {

					var start_time_var = bascule_jn[key].parent_var + "." + bascule_jn[key].bascule_jn_cw.debut.time_var;
					// c_debug(debug.prepare_data, "=> prepare_data: start_time_var = ", start_time_var);
					bascule_jn[key].start_time = RMPApplication.get(start_time_var) * 1000;				// Keep time in milliseconds
					// c_debug(debug.prepare_data, "=> prepare_data: bascule_jn[key].start_time = ", bascule_jn[key].start_time);
					var start_time_str = "\"" + bascule_jn[key].parent_var + "." + bascule_jn[key].bascule_jn_cw.debut.time_var + "_str" + "\"";
					var start_time_str_val = extract_time(RMPApplication.get(eval(start_time_str)));
					// c_debug(debug.prepare_data, "=> prepare_data: bascule_jn[key].start_time_str = ", start_time_str_val);
					bascule_jn[key].start_time_str = start_time_str_val;

					last_time_registered = bascule_jn[key].start_time;			// in milliseconds
				} else {
					bascule_jn[key].start_time = last_time_registered;
				}

				// Register FIN time
				var fin_var = "\"" + bascule_jn[key].parent_var + "." + bascule_jn[key].bascule_jn_cw.fin.au_chk_var + "\"";
				// c_debug(debug.prepare_data, "=> prepare_data: fin_var = ", fin_var);
				var fin_val = RMPApplication.get(eval(fin_var));
				// c_debug(debug.prepare_data, "=> prepare_data: fin_val = ", fin_val);
				bascule_jn[key].fin_checked = ((fin_val == "true") || (fin_val == true)) ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: bascule_jn[key].fin_checked = ", bascule_jn[key].fin_checked);
				if (bascule_jn[key].fin_checked == "OUI") {

					var end_time_var = bascule_jn[key].parent_var + "." + bascule_jn[key].bascule_jn_cw.fin.time_var;
					// c_debug(debug.prepare_data, "=> prepare_data: end_time_var = ", end_time_var);
					bascule_jn[key].end_time = RMPApplication.get(end_time_var) * 1000;				// Keep time in milliseconds
					// c_debug(debug.prepare_data, "=> prepare_data: bascule_jn[key].end_time = ", bascule_jn[key].end_time);
					var end_time_str = "\"" + bascule_jn[key].parent_var + "." + bascule_jn[key].bascule_jn_cw.fin.time_var + "_str" + "\"";
					var end_time_str_val = extract_time(RMPApplication.get(eval(end_time_str)));
					// c_debug(debug.prepare_data, "=> prepare_data: bascule_jn[key].end_time_str = ", end_time_str_val);
					bascule_jn[key].end_time_str = end_time_str_val;

					last_time_registered = bascule_jn[key].end_time;			// in milliseconds
				} else {
					bascule_jn[key].end_time = last_time_registered;
				}

				// calculate delay of action
				bascule_jn[key].delay = get_delay(bascule_jn[key].end_time, bascule_jn[key].start_time);
				bascule_jn[key].delay_str = timestamp_to_delay(bascule_jn[key].delay);
				c_debug(debug.prepare_data, "=> prepare_data " + key + ": delay = " + bascule_jn[key].delay + " | delay_str = " + bascule_jn[key].delay_str);

				// if a "anomalie" is reported
				c_debug(debug.prepare_data, "=> prepare_data: ano_var = ", ano_var);
				var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

				// Initial state without any error
				bascule_jn[key].statut_step = "OK";

				bascule_jn[key].ano_checked = ano_checked;
				if (ano_checked == "OUI") {
					var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
					bascule_jn[key].ano_description = RMPApplication.get(eval(ano_description));
					// c_debug(debug.prepare_data, "=> prepare_data: description = ", bascule_jn[key].ano_description);
					var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
					var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
					bascule_jn[key].ano_repare =  ano_repare_val;
					if (ano_repare_val == "non") {
						bascule_jn[key].statut_step = "KO";
						other_var.statut_global = "KO";		// global status of intervention will be "KO"
					} /*else {
						bascule_jn[key].statut_step = "OK";
					}*/

					// c_debug(debug.prepare_data, "=> prepare_data: repare = ", bascule_jn[key].ano_repare);
					var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
					var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
					bascule_jn[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
					if (ano_renvoi_ordre_val == "OUI") {
						other_var.envoyer_vers_do = "OUI";
						RMPApplication.set("envoyer_vers_do", "OUI");
					}
					// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", bascule_jn[key].ano_renvoi_ordre);

					var ano_photo_id = path_ano_cw_id + "." + "id_photo";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
					var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
					// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
					var ano_photo_count = eval(ano_photo_id).getUploadedCount();
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
					bascule_jn[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", bascule_jn[key].ano_photo_joined);
					if (bascule_jn[key].ano_photo_joined == "OUI") {
						bascule_jn[key].ano_photo_id = ano_photo_val[0].id;
						if (save_image) {
							images_list.push(ano_photo_val[0].id);
						}
						bascule_jn[key].ano_photo_name = ano_photo_val[0].name;
						bascule_jn[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + bascule_jn[key].ano_photo_id + "/" + bascule_jn[key].ano_photo_name + "?method=GET";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", bascule_jn[key].ano_photo_url);
					}
				}
				break;
			default:
				break;			
		}   // FIN cond: switch (child_cw)
			
	}   // FIN loop: for (key in bascule_jn)

	// Sauvegarde dans le statut global toute anomalie non réparée
	RMPApplication.set("statut_global", other_var.statut_global);

	// stocke bascule_jn dans le widget var_bjn
	RMPApplication.set("var_bjn", JSON.stringify(bascule_jn));
	c_debug(debug.prepare_data, "====================================");
	c_debug(debug.prepare_data, "=> prepare_data: VAR GLOBALE bascule_jn = ", bascule_jn);

}

function prepare_data_aecl(save_image)
{
	// if "save_image" is not given ("undefined") or true, we don't push images ID in images_list array.
	// That will be done only when form is finally submitted
	if ((typeof(save_image) == 'undefined') || (save_image != true)) {
		save_image = false;
	}
	var last_time_registered = "";			// in milliseconds
	for (key in activ_eclair) {

		// Register information for all reported "anomalies" 
		var child_cw = activ_eclair[key].cw;
		c_debug(debug.prepare_data, "=> prepare_data " + key + ": child_cw = ", child_cw);

		switch (child_cw) {
			case "anomalie":

				var path_ano_cw_id = activ_eclair[key].parent_id;
				var path_ano_cw = activ_eclair[key].parent_var;
				var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";
				c_debug(debug.prepare_data, "=> prepare_data: activ_eclair[key].parent_var.anomalie = ", ano_var);
				var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

				activ_eclair[key].ano_checked = ano_checked;
				if (ano_checked == "OUI") {
					var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
					activ_eclair[key].ano_description = RMPApplication.get(eval(ano_description));
					// c_debug(debug.prepare_data, "=> prepare_data: description = ", activ_eclair[key].ano_description);
					var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
					var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
					activ_eclair[key].ano_repare =  ano_repare_val;
					if (ano_repare_val == "non") {
						other_var.statut_global = "KO";		// global status of intervention will be "KO"
					}
					// c_debug(debug.prepare_data, "=> prepare_data: repare = ", activ_eclair[key].ano_repare);
					var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
					var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
					activ_eclair[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
					if (ano_renvoi_ordre_val == "OUI") {
						other_var.envoyer_vers_do = "OUI";
						RMPApplication.set("envoyer_vers_do", "OUI");
					}
					// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", activ_eclair[key].ano_renvoi_ordre);

					var ano_photo_id = path_ano_cw_id + "." + "id_photo";
					c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
					var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
					// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
					var ano_photo_count = eval(ano_photo_id).getUploadedCount();
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
					activ_eclair[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", activ_eclair[key].ano_photo_joined);
					if (activ_eclair[key].ano_photo_joined == "OUI") {
						activ_eclair[key].ano_photo_id = ano_photo_val[0].id;
						if (save_image) {
							images_list.push(ano_photo_val[0].id);
						}
						activ_eclair[key].ano_photo_name = ano_photo_val[0].name;
						activ_eclair[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + activ_eclair[key].ano_photo_id + "/" + activ_eclair[key].ano_photo_name + "?method=GET";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", activ_eclair[key].ano_photo_url);
					}
				}
				break;

			case "ctrl_a":

				var path_ano_cw_id = activ_eclair[key].parent_id + ".id_test_ano";
				var path_ano_cw = activ_eclair[key].parent_var + ".test_ano";
				var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";

				// Register DESARMEMENT time
				var desarm_var = "\"" + activ_eclair[key].parent_var + "." + activ_eclair[key].activ_eclair_cw.desarm.au_chk_var + "\"";
				// c_debug(debug.prepare_data, "=> prepare_data: desarm_var = ", desarm_var);
				var desarm_val = RMPApplication.get(eval(desarm_var));
				// c_debug(debug.prepare_data, "=> prepare_data: desarm_val = ", desarm_val);
				activ_eclair[key].desarm_checked = ((desarm_val == "true") || (desarm_val == true)) ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: activ_eclair[key].desarm_checked = ", activ_eclair[key].desarm_checked);
				if (activ_eclair[key].desarm_checked == "OUI") {

					var start_time_var = activ_eclair[key].parent_var + "." + activ_eclair[key].activ_eclair_cw.desarm.time_var;
					// c_debug(debug.prepare_data, "=> prepare_data: start_time_var = ", start_time_var);
					activ_eclair[key].start_time = RMPApplication.get(start_time_var) * 1000;				// Keep time in milliseconds
					// c_debug(debug.prepare_data, "=> prepare_data: activ_eclair[key].start_time = ", activ_eclair[key].start_time);
					var start_time_str = "\"" + activ_eclair[key].parent_var + "." + activ_eclair[key].activ_eclair_cw.desarm.time_var + "_str" + "\"";
					var start_time_str_val = extract_time(RMPApplication.get(eval(start_time_str)));
					// c_debug(debug.prepare_data, "=> prepare_data: activ_eclair[key].start_time_str = ", start_time_str_val);
					activ_eclair[key].start_time_str = start_time_str_val;

					last_time_registered = activ_eclair[key].start_time;			// in milliseconds
				} else {
					activ_eclair[key].start_time = last_time_registered;
				}

				// Register REARMEMENT time
				var rearm_var = "\"" + activ_eclair[key].parent_var + "." + activ_eclair[key].activ_eclair_cw.rearm.au_chk_var + "\"";
				// c_debug(debug.prepare_data, "=> prepare_data: rearm_var = ", rearm_var);
				var rearm_val = RMPApplication.get(eval(rearm_var));
				// c_debug(debug.prepare_data, "=> prepare_data: rearm_val = ", rearm_val);
				activ_eclair[key].rearm_checked = ((rearm_val == "true") || (rearm_val == true)) ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: activ_eclair[key].rearm_checked = ", activ_eclair[key].rearm_checked);
				if (activ_eclair[key].rearm_checked == "OUI") {

					var end_time_var = activ_eclair[key].parent_var + "." + activ_eclair[key].activ_eclair_cw.rearm.time_var;
					// c_debug(debug.prepare_data, "=> prepare_data: end_time_var = ", end_time_var);
					activ_eclair[key].end_time = RMPApplication.get(end_time_var) * 1000;				// Keep time in milliseconds
					// c_debug(debug.prepare_data, "=> prepare_data: activ_eclair[key].end_time = ", activ_eclair[key].end_time);
					var end_time_str = "\"" + activ_eclair[key].parent_var + "." + activ_eclair[key].activ_eclair_cw.rearm.time_var + "_str" + "\"";
					var end_time_str_val = extract_time(RMPApplication.get(eval(end_time_str)));
					// c_debug(debug.prepare_data, "=> prepare_data: activ_eclair[key].end_time_str = ", end_time_str_val);
					activ_eclair[key].end_time_str = end_time_str_val;

					last_time_registered = activ_eclair[key].end_time;			// in milliseconds
				} else {
					activ_eclair[key].end_time = last_time_registered;
				}

				// calculate delay of action
				activ_eclair[key].delay = get_delay(activ_eclair[key].end_time, activ_eclair[key].start_time);
				activ_eclair[key].delay_str = timestamp_to_delay(activ_eclair[key].delay);
				c_debug(debug.prepare_data, "=> prepare_data " + key + ": delay = " + activ_eclair[key].delay + " | delay_str = " + activ_eclair[key].delay_str);

				// Other details
				activ_eclair[key].ext_ad_tpi_chk = RMPApplication.get(activ_eclair[key].parent_var + "." + "ext_ad_tpi_chk");
				activ_eclair[key].abs_tension_tgbt_chk = RMPApplication.get(activ_eclair[key].parent_var + "." + "abs_tension_tgbt_chk");
				activ_eclair[key].ret_tension_tgbt_chk = RMPApplication.get(activ_eclair[key].parent_var + "." + "ret_tension_tgbt_chk");

				// if a "anomalie" is reported
				c_debug(debug.prepare_data, "=> prepare_data: ano_var = ", ano_var);
				var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

				activ_eclair[key].ano_checked = ano_checked;
				if (ano_checked == "OUI") {
					var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
					activ_eclair[key].ano_description = RMPApplication.get(eval(ano_description));
					// c_debug(debug.prepare_data, "=> prepare_data: description = ", activ_eclair[key].ano_description);
					var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
					var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
					activ_eclair[key].ano_repare =  ano_repare_val;
					if (ano_repare_val == "non") {
						other_var.statut_global = "KO";		// global status of intervention will be "KO"
					}
					// c_debug(debug.prepare_data, "=> prepare_data: repare = ", activ_eclair[key].ano_repare);
					var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
					var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
					activ_eclair[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
					if (ano_renvoi_ordre_val == "OUI") {
						other_var.envoyer_vers_do = "OUI";
						RMPApplication.set("envoyer_vers_do", "OUI");
					}
					// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", activ_eclair[key].ano_renvoi_ordre);

					var ano_photo_id = path_ano_cw_id + "." + "id_photo";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
					var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
					// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
					var ano_photo_count = eval(ano_photo_id).getUploadedCount();
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
					activ_eclair[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", activ_eclair[key].ano_photo_joined);
					if (activ_eclair[key].ano_photo_joined == "OUI") {
						activ_eclair[key].ano_photo_id = ano_photo_val[0].id;
						if (save_image) {
							images_list.push(ano_photo_val[0].id);
						}
						activ_eclair[key].ano_photo_name = ano_photo_val[0].name;
						activ_eclair[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + activ_eclair[key].ano_photo_id + "/" + activ_eclair[key].ano_photo_name + "?method=GET";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", activ_eclair[key].ano_photo_url);
					}
				}

				break;
			case "ctrl_s":

				var path_ano_cw_id = activ_eclair[key].parent_id + ".id_test_ano";
				var path_ano_cw = activ_eclair[key].parent_var + ".test_ano";
				var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";

				// Register DEBUT time
				var debut_var = "\"" + activ_eclair[key].parent_var + "." + activ_eclair[key].activ_eclair_cw.debut.au_chk_var + "\"";
				// c_debug(debug.prepare_data, "=> prepare_data: debut_var = ", debut_var);
				var debut_val = RMPApplication.get(eval(debut_var));
				// c_debug(debug.prepare_data, "=> prepare_data: debut_val = ", debut_val);
				activ_eclair[key].debut_checked = ((debut_val == "true") || (debut_val == true)) ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: activ_eclair[key].debut_checked = ", activ_eclair[key].debut_checked);
				if (activ_eclair[key].debut_checked == "OUI") {

					var start_time_var = activ_eclair[key].parent_var + "." + activ_eclair[key].activ_eclair_cw.debut.time_var;
					// c_debug(debug.prepare_data, "=> prepare_data: start_time_var = ", start_time_var);
					activ_eclair[key].start_time = RMPApplication.get(start_time_var) * 1000;				// Keep time in milliseconds
					// c_debug(debug.prepare_data, "=> prepare_data: activ_eclair[key].start_time = ", activ_eclair[key].start_time);
					var start_time_str = "\"" + activ_eclair[key].parent_var + "." + activ_eclair[key].activ_eclair_cw.debut.time_var + "_str" + "\"";
					var start_time_str_val = extract_time(RMPApplication.get(eval(start_time_str)));
					// c_debug(debug.prepare_data, "=> prepare_data: activ_eclair[key].start_time_str = ", start_time_str_val);
					activ_eclair[key].start_time_str = start_time_str_val;

					last_time_registered = activ_eclair[key].start_time;			// in milliseconds
				} else {
					activ_eclair[key].start_time = last_time_registered;
				}

				// Register FIN time
				var fin_var = "\"" + activ_eclair[key].parent_var + "." + activ_eclair[key].activ_eclair_cw.fin.au_chk_var + "\"";
				// c_debug(debug.prepare_data, "=> prepare_data: fin_var = ", fin_var);
				var fin_val = RMPApplication.get(eval(fin_var));
				// c_debug(debug.prepare_data, "=> prepare_data: fin_val = ", fin_val);
				activ_eclair[key].fin_checked = ((fin_val == "true") || (fin_val == true)) ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: activ_eclair[key].fin_checked = ", activ_eclair[key].fin_checked);
				if (activ_eclair[key].fin_checked == "OUI") {

					var end_time_var = activ_eclair[key].parent_var + "." + activ_eclair[key].activ_eclair_cw.fin.time_var;
					// c_debug(debug.prepare_data, "=> prepare_data: end_time_var = ", end_time_var);
					activ_eclair[key].end_time = RMPApplication.get(end_time_var) * 1000;				// Keep time in milliseconds
					// c_debug(debug.prepare_data, "=> prepare_data: activ_eclair[key].end_time = ", activ_eclair[key].end_time);
					var end_time_str = "\"" + activ_eclair[key].parent_var + "." + activ_eclair[key].activ_eclair_cw.fin.time_var + "_str" + "\"";
					var end_time_str_val = extract_time(RMPApplication.get(eval(end_time_str)));
					// c_debug(debug.prepare_data, "=> prepare_data: activ_eclair[key].end_time_str = ", end_time_str_val);
					activ_eclair[key].end_time_str = end_time_str_val;

					last_time_registered = activ_eclair[key].end_time;			// in milliseconds
				} else {
					activ_eclair[key].end_time = last_time_registered;
				}

				// calculate delay of action
				activ_eclair[key].delay = get_delay(activ_eclair[key].end_time, activ_eclair[key].start_time);
				activ_eclair[key].delay_str = timestamp_to_delay(activ_eclair[key].delay);
				c_debug(debug.prepare_data, "=> prepare_data " + key + ": delay = " + activ_eclair[key].delay + " | delay_str = " + activ_eclair[key].delay_str);

				// if a "anomalie" is reported
				c_debug(debug.prepare_data, "=> prepare_data: ano_var = ", ano_var);
				var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

				// Initial state without any error
				activ_eclair[key].statut_step = "OK";

				activ_eclair[key].ano_checked = ano_checked;
				if (ano_checked == "OUI") {
					var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
					activ_eclair[key].ano_description = RMPApplication.get(eval(ano_description));
					// c_debug(debug.prepare_data, "=> prepare_data: description = ", activ_eclair[key].ano_description);
					var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
					var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
					activ_eclair[key].ano_repare =  ano_repare_val;
					if (ano_repare_val == "non") {
						activ_eclair[key].statut_step = "KO";
						other_var.statut_global = "KO";		// global status of intervention will be "KO"
					} /*else {
						activ_eclair[key].statut_step = "OK";
					}*/
					
					// c_debug(debug.prepare_data, "=> prepare_data: repare = ", activ_eclair[key].ano_repare);
					var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
					var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
					activ_eclair[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
					if (ano_renvoi_ordre_val == "OUI") {
						other_var.envoyer_vers_do = "OUI";
						RMPApplication.set("envoyer_vers_do", "OUI");
					}
					// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", activ_eclair[key].ano_renvoi_ordre);

					var ano_photo_id = path_ano_cw_id + "." + "id_photo";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
					var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
					// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
					var ano_photo_count = eval(ano_photo_id).getUploadedCount();
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
					activ_eclair[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", activ_eclair[key].ano_photo_joined);
					if (activ_eclair[key].ano_photo_joined == "OUI") {
						activ_eclair[key].ano_photo_id = ano_photo_val[0].id;
						if (save_image) {
							images_list.push(ano_photo_val[0].id);
						}
						activ_eclair[key].ano_photo_name = ano_photo_val[0].name;
						activ_eclair[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + activ_eclair[key].ano_photo_id + "/" + activ_eclair[key].ano_photo_name + "?method=GET";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", activ_eclair[key].ano_photo_url);
					}
				}
				break;
			default:
				break;			
		}   // FIN cond: switch (child_cw)
			
	}   // FIN loop: for (key in activ_eclair)

	// Sauvegarde dans le statut global toute anomalie non réparée
	RMPApplication.set("statut_global", other_var.statut_global);

	// stocke activ_eclair dans le widget var_aecl
	RMPApplication.set("var_aecl", JSON.stringify(activ_eclair));
	c_debug(debug.prepare_data, "====================================");
	c_debug(debug.prepare_data, "=> prepare_data: VAR GLOBALE activ_eclair = ", activ_eclair);

}

function prepare_data_cfin(save_image)
{
	// if "save_image" is not given ("undefined") or true, we don't push images ID in images_list array.
	// That will be done only when form is finally submitted
	if ((typeof(save_image) == 'undefined') || (save_image != true)) {
		save_image = false;
	}
	var last_time_registered = "";			// in milliseconds
	for (key in ctrl_fin) {

		// Register information for all reported "anomalies" 
		var child_cw = ctrl_fin[key].cw;
		c_debug(debug.prepare_data, "=> prepare_data " + key + ": child_cw = ", child_cw);

		switch (child_cw) {
			case "anomalie":

				var path_ano_cw_id = ctrl_fin[key].parent_id;
				var path_ano_cw = ctrl_fin[key].parent_var;
				var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";
				c_debug(debug.prepare_data, "=> prepare_data: ctrl_fin[key].parent_var.anomalie = ", ano_var);
				var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

				ctrl_fin[key].ano_checked = ano_checked;
				if (ano_checked == "OUI") {
					var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
					ctrl_fin[key].ano_description = RMPApplication.get(eval(ano_description));
					// c_debug(debug.prepare_data, "=> prepare_data: description = ", ctrl_fin[key].ano_description);
					var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
					var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
					ctrl_fin[key].ano_repare =  ano_repare_val;
					if (ano_repare_val == "non") {
						other_var.statut_global = "KO";		// global status of intervention will be "KO"
					}
					// c_debug(debug.prepare_data, "=> prepare_data: repare = ", ctrl_fin[key].ano_repare);
					var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
					var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
					ctrl_fin[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
					if (ano_renvoi_ordre_val == "OUI") {
						other_var.envoyer_vers_do = "OUI";
						RMPApplication.set("envoyer_vers_do", "OUI");
					}
					// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", ctrl_fin[key].ano_renvoi_ordre);

					var ano_photo_id = path_ano_cw_id + "." + "id_photo";
					c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
					var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
					// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
					var ano_photo_count = eval(ano_photo_id).getUploadedCount();
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
					ctrl_fin[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", ctrl_fin[key].ano_photo_joined);
					if (ctrl_fin[key].ano_photo_joined == "OUI") {
						ctrl_fin[key].ano_photo_id = ano_photo_val[0].id;
						if (save_image) {
							images_list.push(ano_photo_val[0].id);
						}
						ctrl_fin[key].ano_photo_name = ano_photo_val[0].name;
						ctrl_fin[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + ctrl_fin[key].ano_photo_id + "/" + ctrl_fin[key].ano_photo_name + "?method=GET";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", ctrl_fin[key].ano_photo_url);
					}
				}
				break;

			case "ctrl_a":

				var path_ano_cw_id = ctrl_fin[key].parent_id + ".id_test_ano";
				var path_ano_cw = ctrl_fin[key].parent_var + ".test_ano";
				var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";

				// Register DESARMEMENT time
				var desarm_var = "\"" + ctrl_fin[key].parent_var + "." + ctrl_fin[key].ctrl_fin_cw.desarm.au_chk_var + "\"";
				// c_debug(debug.prepare_data, "=> prepare_data: desarm_var = ", desarm_var);
				var desarm_val = RMPApplication.get(eval(desarm_var));
				// c_debug(debug.prepare_data, "=> prepare_data: desarm_val = ", desarm_val);
				ctrl_fin[key].desarm_checked = ((desarm_val == "true") || (desarm_val == true)) ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ctrl_fin[key].desarm_checked = ", ctrl_fin[key].desarm_checked);
				if (ctrl_fin[key].desarm_checked == "OUI") {

					var start_time_var = ctrl_fin[key].parent_var + "." + ctrl_fin[key].ctrl_fin_cw.desarm.time_var;
					// c_debug(debug.prepare_data, "=> prepare_data: start_time_var = ", start_time_var);
					ctrl_fin[key].start_time = RMPApplication.get(start_time_var) * 1000;				// Keep time in milliseconds
					// c_debug(debug.prepare_data, "=> prepare_data: ctrl_fin[key].start_time = ", ctrl_fin[key].start_time);
					var start_time_str = "\"" + ctrl_fin[key].parent_var + "." + ctrl_fin[key].ctrl_fin_cw.desarm.time_var + "_str" + "\"";
					var start_time_str_val = extract_time(RMPApplication.get(eval(start_time_str)));
					// c_debug(debug.prepare_data, "=> prepare_data: ctrl_fin[key].start_time_str = ", start_time_str_val);
					ctrl_fin[key].start_time_str = start_time_str_val;

					last_time_registered = ctrl_fin[key].start_time;			// in milliseconds
				} else {
					ctrl_fin[key].start_time = last_time_registered;
				}

				// Register REARMEMENT time
				var rearm_var = "\"" + ctrl_fin[key].parent_var + "." + ctrl_fin[key].ctrl_fin_cw.rearm.au_chk_var + "\"";
				// c_debug(debug.prepare_data, "=> prepare_data: rearm_var = ", rearm_var);
				var rearm_val = RMPApplication.get(eval(rearm_var));
				// c_debug(debug.prepare_data, "=> prepare_data: rearm_val = ", rearm_val);
				ctrl_fin[key].rearm_checked = ((rearm_val == "true") || (rearm_val == true)) ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ctrl_fin[key].rearm_checked = ", ctrl_fin[key].rearm_checked);
				if (ctrl_fin[key].rearm_checked == "OUI") {

					var end_time_var = ctrl_fin[key].parent_var + "." + ctrl_fin[key].ctrl_fin_cw.rearm.time_var;
					// c_debug(debug.prepare_data, "=> prepare_data: end_time_var = ", end_time_var);
					ctrl_fin[key].end_time = RMPApplication.get(end_time_var) * 1000;				// Keep time in milliseconds
					// c_debug(debug.prepare_data, "=> prepare_data: ctrl_fin[key].end_time = ", ctrl_fin[key].end_time);
					var end_time_str = "\"" + ctrl_fin[key].parent_var + "." + ctrl_fin[key].ctrl_fin_cw.rearm.time_var + "_str" + "\"";
					var end_time_str_val = extract_time(RMPApplication.get(eval(end_time_str)));
					// c_debug(debug.prepare_data, "=> prepare_data: ctrl_fin[key].end_time_str = ", end_time_str_val);
					ctrl_fin[key].end_time_str = end_time_str_val;

					last_time_registered = ctrl_fin[key].end_time;			// in milliseconds
				} else {
					ctrl_fin[key].end_time = last_time_registered;
				}

				// calculate delay of action
				ctrl_fin[key].delay = get_delay(ctrl_fin[key].end_time, ctrl_fin[key].start_time);
				ctrl_fin[key].delay_str = timestamp_to_delay(ctrl_fin[key].delay);
				c_debug(debug.prepare_data, "=> prepare_data " + key + ": delay = " + ctrl_fin[key].delay + " | delay_str = " + ctrl_fin[key].delay_str);

				// Other details
				ctrl_fin[key].ext_ad_tpi_chk = RMPApplication.get(ctrl_fin[key].parent_var + "." + "ext_ad_tpi_chk");
				ctrl_fin[key].abs_tension_tgbt_chk = RMPApplication.get(ctrl_fin[key].parent_var + "." + "abs_tension_tgbt_chk");
				ctrl_fin[key].ret_tension_tgbt_chk = RMPApplication.get(ctrl_fin[key].parent_var + "." + "ret_tension_tgbt_chk");

				// if a "anomalie" is reported
				c_debug(debug.prepare_data, "=> prepare_data: ano_var = ", ano_var);
				var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

				ctrl_fin[key].ano_checked = ano_checked;
				if (ano_checked == "OUI") {
					var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
					ctrl_fin[key].ano_description = RMPApplication.get(eval(ano_description));
					// c_debug(debug.prepare_data, "=> prepare_data: description = ", ctrl_fin[key].ano_description);
					var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
					var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
					ctrl_fin[key].ano_repare =  ano_repare_val;
					if (ano_repare_val == "non") {
						other_var.statut_global = "KO";		// global status of intervention will be "KO"
					}
					// c_debug(debug.prepare_data, "=> prepare_data: repare = ", ctrl_fin[key].ano_repare);
					var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
					var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
					ctrl_fin[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
					if (ano_renvoi_ordre_val == "OUI") {
						other_var.envoyer_vers_do = "OUI";
						RMPApplication.set("envoyer_vers_do", "OUI");
					}
					// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", ctrl_fin[key].ano_renvoi_ordre);

					var ano_photo_id = path_ano_cw_id + "." + "id_photo";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
					var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
					// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
					var ano_photo_count = eval(ano_photo_id).getUploadedCount();
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
					ctrl_fin[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", ctrl_fin[key].ano_photo_joined);
					if (ctrl_fin[key].ano_photo_joined == "OUI") {
						ctrl_fin[key].ano_photo_id = ano_photo_val[0].id;
						if (save_image) {
							images_list.push(ano_photo_val[0].id);
						}
						ctrl_fin[key].ano_photo_name = ano_photo_val[0].name;
						ctrl_fin[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + ctrl_fin[key].ano_photo_id + "/" + ctrl_fin[key].ano_photo_name + "?method=GET";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", ctrl_fin[key].ano_photo_url);
					}
				}

				break;
			case "ctrl_s":

				var path_ano_cw_id = ctrl_fin[key].parent_id + ".id_test_ano";
				var path_ano_cw = ctrl_fin[key].parent_var + ".test_ano";
				var ano_var = "\"" + path_ano_cw + ".anomalie" + "\"";

				// Register DEBUT time
				var debut_var = "\"" + ctrl_fin[key].parent_var + "." + ctrl_fin[key].ctrl_fin_cw.debut.au_chk_var + "\"";
				// c_debug(debug.prepare_data, "=> prepare_data: debut_var = ", debut_var);
				var debut_val = RMPApplication.get(eval(debut_var));
				// c_debug(debug.prepare_data, "=> prepare_data: debut_val = ", debut_val);
				ctrl_fin[key].debut_checked = ((debut_val == "true") || (debut_val == true)) ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ctrl_fin[key].debut_checked = ", ctrl_fin[key].debut_checked);
				if (ctrl_fin[key].debut_checked == "OUI") {

					var start_time_var = ctrl_fin[key].parent_var + "." + ctrl_fin[key].ctrl_fin_cw.debut.time_var;
					// c_debug(debug.prepare_data, "=> prepare_data: start_time_var = ", start_time_var);
					ctrl_fin[key].start_time = RMPApplication.get(start_time_var) * 1000;				// Keep time in milliseconds
					// c_debug(debug.prepare_data, "=> prepare_data: ctrl_fin[key].start_time = ", ctrl_fin[key].start_time);
					var start_time_str = "\"" + ctrl_fin[key].parent_var + "." + ctrl_fin[key].ctrl_fin_cw.debut.time_var + "_str" + "\"";
					var start_time_str_val = extract_time(RMPApplication.get(eval(start_time_str)));
					// c_debug(debug.prepare_data, "=> prepare_data: ctrl_fin[key].start_time_str = ", start_time_str_val);
					ctrl_fin[key].start_time_str = start_time_str_val;

					last_time_registered = ctrl_fin[key].start_time;			// in milliseconds
				} else {
					ctrl_fin[key].start_time = last_time_registered;
				}

				// Register FIN time
				var fin_var = "\"" + ctrl_fin[key].parent_var + "." + ctrl_fin[key].ctrl_fin_cw.fin.au_chk_var + "\"";
				// c_debug(debug.prepare_data, "=> prepare_data: fin_var = ", fin_var);
				var fin_val = RMPApplication.get(eval(fin_var));
				// c_debug(debug.prepare_data, "=> prepare_data: fin_val = ", fin_val);
				ctrl_fin[key].fin_checked = ((fin_val == "true") || (fin_val == true)) ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ctrl_fin[key].fin_checked = ", ctrl_fin[key].fin_checked);
				if (ctrl_fin[key].fin_checked == "OUI") {

					var end_time_var = ctrl_fin[key].parent_var + "." + ctrl_fin[key].ctrl_fin_cw.fin.time_var;
					// c_debug(debug.prepare_data, "=> prepare_data: end_time_var = ", end_time_var);
					ctrl_fin[key].end_time = RMPApplication.get(end_time_var) * 1000;				// Keep time in milliseconds
					// c_debug(debug.prepare_data, "=> prepare_data: ctrl_fin[key].end_time = ", ctrl_fin[key].end_time);
					var end_time_str = "\"" + ctrl_fin[key].parent_var + "." + ctrl_fin[key].ctrl_fin_cw.fin.time_var + "_str" + "\"";
					var end_time_str_val = extract_time(RMPApplication.get(eval(end_time_str)));
					// c_debug(debug.prepare_data, "=> prepare_data: ctrl_fin[key].end_time_str = ", end_time_str_val);
					ctrl_fin[key].end_time_str = end_time_str_val;

					last_time_registered = ctrl_fin[key].end_time;			// in milliseconds
				} else {
					ctrl_fin[key].end_time = last_time_registered;
				}

				// calculate delay of action
				ctrl_fin[key].delay = get_delay(ctrl_fin[key].end_time, ctrl_fin[key].start_time);
				ctrl_fin[key].delay_str = timestamp_to_delay(ctrl_fin[key].delay);
				c_debug(debug.prepare_data, "=> prepare_data " + key + ": delay = " + ctrl_fin[key].delay + " | delay_str = " + ctrl_fin[key].delay_str);

				// if a "anomalie" is reported
				c_debug(debug.prepare_data, "=> prepare_data: ano_var = ", ano_var);
				var ano_checked = (RMPApplication.get(eval(ano_var)) == "oui") ? "OUI" : "non";
				// c_debug(debug.prepare_data, "=> prepare_data: ano_checked = ", ano_checked);

				ctrl_fin[key].ano_checked = ano_checked;
				if (ano_checked == "OUI") {
					var ano_description = "\"" + path_ano_cw + "." + "description" + "\"";
					ctrl_fin[key].ano_description = RMPApplication.get(eval(ano_description));
					// c_debug(debug.prepare_data, "=> prepare_data: description = ", ctrl_fin[key].ano_description);
					var ano_repare =  "\"" + path_ano_cw + "." + "repare" + "\"";
					var ano_repare_val = (RMPApplication.get(eval(ano_repare)) == "oui") ? "OUI" : "non";
					ctrl_fin[key].ano_repare =  ano_repare_val;
					if (ano_repare_val == "non") {
						ctrl_fin[key].statut_step = "KO";
						other_var.statut_global = "KO";		// global status of intervention will be "KO"
					} else {
						ctrl_fin[key].statut_step = "OK";
					}
					// c_debug(debug.prepare_data, "=> prepare_data: repare = ", ctrl_fin[key].ano_repare);
					var ano_renvoi_ordre =  "\"" + path_ano_cw + "." + "renvoi_ordre" + "\"";
					var ano_renvoi_ordre_val = (RMPApplication.get(eval(ano_renvoi_ordre)) == "oui") ? "OUI" : "non";
					ctrl_fin[key].ano_renvoi_ordre = ano_renvoi_ordre_val;
					if (ano_renvoi_ordre_val == "OUI") {
						other_var.envoyer_vers_do = "OUI";
						RMPApplication.set("envoyer_vers_do", "OUI");
					}
					// c_debug(debug.prepare_data, "=> prepare_data: renvoi_ordre = ", ctrl_fin[key].ano_renvoi_ordre);

					var ano_photo_id = path_ano_cw_id + "." + "id_photo";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_id = ", ano_photo_id);
					var ano_photo_val =  JSON.parse(eval(ano_photo_id).getValue());
					// c_debug(debug.prepare_data, "=> prepare_data: OBJ ano_photo_val = ", ano_photo_val);
					var ano_photo_count = eval(ano_photo_id).getUploadedCount();
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_count = ", ano_photo_count);
					ctrl_fin[key].ano_photo_joined = (ano_photo_count > 0) ? "OUI" : "non";
					// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_joined = ", ctrl_fin[key].ano_photo_joined);
					if (ctrl_fin[key].ano_photo_joined == "OUI") {
						ctrl_fin[key].ano_photo_id = ano_photo_val[0].id;
						if (save_image) {
							images_list.push(ano_photo_val[0].id);
						}
						ctrl_fin[key].ano_photo_name = ano_photo_val[0].name;
						ctrl_fin[key].ano_photo_url = "https://live.runmyprocess.com/pub/112501487582701289/upload/" + ctrl_fin[key].ano_photo_id + "/" + ctrl_fin[key].ano_photo_name + "?method=GET";
						// c_debug(debug.prepare_data, "=> prepare_data: ano_photo_url = ", ctrl_fin[key].ano_photo_url);
					}
				}
				break;
			default:
				break;			
		}   // FIN cond: switch (child_cw)
			
	}   // FIN loop: for (key in ctrl_fin)

	// Sauvegarde dans le statut global toute anomalie non réparée
	RMPApplication.set("statut_global", other_var.statut_global);

	// stocke ctrl_fin dans le widget var_cfin
	RMPApplication.set("var_cfin", JSON.stringify(ctrl_fin));
	c_debug(debug.prepare_data, "====================================");
	c_debug(debug.prepare_data, "=> prepare_data: VAR GLOBALE ctrl_fin = ", ctrl_fin);

}

