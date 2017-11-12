// =======================================
//   id_show_or_not_desarm_rearm_block
// =======================================

c_debug(debug.test,"###################################################");
for (key in test_cw) {
	var cw_name = RMP_this.id_desarm_chk.getParent().getName();

	// show or not some fields => main trends
	RMP_this.id_ext_ad_tpi_chk.setVisible(false);


	// Don't show some fields [phase Désarmement]
	switch (cw_name) {
		case "id_my_celec_tpi_ctrl_a":
			c_debug(debug.test, "=> Don't show DESARM block for: ", cw_name);
			RMP_this.id_desarm_chk.setVisible(false);
			RMP_this.id_abs_tension_tgbt_chk.setVisible(false);
			// Change label
			var new_label = "Vérification retour tension sur chaque TPI";
			RMP_this.id_ret_tension_tgbt_chk.setLabel(new_label);
			break;
		case "id_my_au_caisse_princ_ctrl_a":
			RMP_this.id_ext_ad_tpi_chk.setVisible(true);
			break;
		default:
			break;
	}

	// Don't show some fields [phase Réarmement]
	switch (cw_name) {
		case "fill_____id_cw_parent":
			RMP_this.id_rearm_chk.setVisible(false);
			RMP_this.id_ret_tension_tgbt_chk.setVisible(false);
			c_debug(debug.test, "=> Don't show REARM block for: ", cw_name);
			break;
		default:
			break;
	}
	c_debug(debug.test,"==============================================");
}
