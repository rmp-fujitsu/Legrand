// ==============================================
//   id_js_test_simple_set_inactive_if_ordered
// ==============================================

var test_simple_var = {				// contains "Test" widget fields
	"debut_chk": "id_debut_chk",
	"fin_chk": "id_fin_chk"
};

// if parent btn is clicked, all present widget fields will be set "inactive"
var ina_val = RMP_this.id_set_inactive.getValue();
var set_ina = ((ina_val == true) || (ina_val == "true")) ? false : true;
c_debug(debug.test_simple, "=> Widget : désactivation tous les champs de:", RMP_this.getParent());
var this_widget = "RMP_this.";
for (key in test_simple_var) {
	var field = test_simple_var[key];
	eval(this_widget + field).setActive(set_ina);
}

