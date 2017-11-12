RMPApplication.debug ("Fill companies list");

// ========================
// Variables declaration
// ========================
var collectionid = "col_societes_controle_automate";

function load_cie_list()
{
    RMPApplication.debug ("begin load_cie_list");
    c_debug(debug.load_cie, "=> load_cie_list");
    var my_pattern = {};
	var options = {};
    c_debug(debug.load, "=> load_cie_list: my_pattern = ", my_pattern);
    eval(collectionid).listCallback(my_pattern, options, load_cie_list_ok, load_cie_list_ko);
    RMPApplication.debug ("end load_cie_list");
}

function load_cie_list_ok(result) 
{
	RMPApplication.debug ("begin load_cie_list_ok");
    c_debug(debug.load_cie, "=> load_cie_list_ok: result", result);
	var vb_cie_arr = new Array();
	for(i=0; i<result.length; i++) {
		vb_cie_arr.push({"label":result[i].societe,"value":result[i].societe.toLowerCase()});
	}

	var vb_cie_list = new RMP_List();
	vb_cie_list.fromArray(vb_cie_arr);
	RMPApplication.setList("vb_cie_list", vb_cie_list);
	RMPApplication.debug ("end load_cie_list_ok");
}

function load_cie_list_ko(error)
{
	RMPApplication.debug ("begin load_cie_list_ko");
    c_debug(debug.load_cie, "=> load_cie_list_ko: error", error);
	var error_msg = ${P_quoted(i18n("load_cie_list_ko_msg", "Génération impossible de la liste des sociétés intervenantes!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end load_cie_list_ko");
}

