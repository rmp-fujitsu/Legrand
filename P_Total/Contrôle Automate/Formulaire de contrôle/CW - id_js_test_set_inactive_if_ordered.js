// ==========================================
//   id_js_test_set_inactive_if_ordered
// ==========================================

// if parent btn is clicked, all present widget fields will be set "inactive"
var ina_val = RMP_this.id_set_inactive.getValue();
var set_ina = ((ina_val == true) || (ina_val == "true")) ? false : true;
c_debug(debug.test, "=> AU Widget : désactivation tous les champs de:", RMP_this.getParent());
var this_widget = "RMP_this.";
for (key in test_var) {
	var field = test_var[key];
	eval(this_widget + field).setActive(set_ina);
}

