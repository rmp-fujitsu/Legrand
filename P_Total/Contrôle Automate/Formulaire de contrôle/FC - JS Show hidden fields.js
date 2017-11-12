// set "show" to "true" value if you want to show hidden varaibales
var hidden = {
	"h_section": { "varname": "h_section", "show": false },
	"h_time": { "varname": "h_time", "show": true }
};

var h_section = {
	"login": "login"
};

var h_time = {
	"cinit_ppj_start": "id_cinit_ppj_start",
	"cinit_ferm_com_start": "id_cinit_ferm_com_start",
	"cinit_rep_au_start": "id_cinit_rep_au_start",
	"cinit_rep_depass_start": "id_cinit_rep_depass_start",
	"cinit_rep_tgbt_jn_start": "id_cinit_rep_tgbt_jn_start",
	"cinit_rep_tgbt_tls_start": "id_cinit_rep_tgbt_tls_start",
	"cinit_appel_cntls_start": "id_cinit_appel_cntls_start"
};

// in case "debug" is not already initialized in JS Main script
if (debug == null) {
	var debug = {}
	debug.hidden = false;
}

c_debug(debug.hidden, "####   Show Hidden fields for debugging    ####");
for (key in hidden) {
	if ( hidden[key].show == true ) {
		c_debug(debug.hidden, "=> Show: hidden[" + key + "].show = ", hidden[key].show);

		for ( field in (eval(hidden[key].varname)) ) {
			c_debug(debug.hidden, "   => show: Subkey = " , field);
			var temp = eval(hidden[key].varname);
			eval(temp[field]).setVisible(true);
		}
	}
}
