// =====================================
// JS ANO set inactive if ordered
// =====================================

// if parent btn is clicked, all present widget fields will be set "inactive"
var set_ina = RMP_this.id_set_inactive.getValue();
if ( (set_ina == true) || (set_ina == "true") ) {
	c_debug(debug.ano, "=> Anomalie Widget : désactivation tous les champs de:", RMP_this.getParent());
	for (key2 in anomalie_var) {
		var this_widget = "RMP_this.";
		var field = anomalie_var[key2];
		eval(this_widget + field).setActive(false);
	}
}