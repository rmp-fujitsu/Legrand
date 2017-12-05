// id_js_remplir_liste_stations
// => Var. listened: code_postal

var code_postal = RMPApplication.get("code_postal");

if (code_postal != null || code_postal != "") {
	var options = {};
	var my_pattern = {};
	my_pattern.code_postal = code_postal;
	col_stations_total.listCallback(my_pattern, options, fill_stations_list_ok, fill_stations_list_ko);
}
else {
	id_station_search.setVisible(false);
}


function fill_stations_list_ok(result) 
{
	var vb_nom_station = new Array();
	if (result.length < 1) {
		alert("Aucune station trouvée avec ce code postal!");
		id_station_search.setVisible(false);
	} else {
		for (i=0; i<result.length; i++) {
			vb_nom_station.push({"label": result[i].nom_station, "value": result[i].nom_station});
		}
		var a = new RMP_List();
		a.fromArray(vb_nom_station);
		RMPApplication.setList("vb_nom_station", a);
		id_station_search.setVisible(true);
	}		
}

function fill_stations_list_ko(error) 
{
    alert("fill_stations_list_ko: error = " + JSON.stringify(error));
}
