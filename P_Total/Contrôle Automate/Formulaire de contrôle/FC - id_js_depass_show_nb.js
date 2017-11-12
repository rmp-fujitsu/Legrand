// =====================================
// id_js_depass_show_nb
// =====================================

c_debug(debug.depass, "=> Traitement Bloc DEPASS");

var nb_depass_max = 10;
var nb_depass_site = RMPApplication.get("nb_depass_site");

var depass_present = (nb_depass_site >= 1) ? true : false;
id_depass_capots_out.setVisible(depass_present);
id_depass_capots_in.setVisible(depass_present);

// Show x DEPASS blocks according "nb_depass_site" variable
for (i=1; i <= nb_depass_max; i++) {
	var x_visible = (i <= nb_depass_site) ? true : false;
	var x_depass = "id_depass_n" + i.toString() + "_chk";
	eval(x_depass).setVisible(x_visible);

	var x_face = "id_depass_face_ad_depass_n" + i.toString();
	eval(x_face).setVisible(x_visible);
}