// id_js_remplir_informations_station
// => Var. listened: station_search

var nom_station = RMPApplication.get("station_search");
var my_pattern = {};
my_pattern.nom_station = nom_station;
col_stations.listCallback(my_pattern, {} , get_station_ok, get_station_ko);

function get_station_ok(result) 
{
	RMPApplication.set("code_implant", result[0].code_implant);
    RMPApplication.set("nom_station", result[0].nom_station);
	RMPApplication.set("ville", result[0].ville);
    RMPApplication.set("departement", result[0].departement);
	RMPApplication.set("coordonnees_phone", result[0].tel);
	RMPApplication.set("code_implant_bis", result[0].code_implant);
	RMPApplication.set("nom_station_bis", result[0].nom_station);
	// RMPApplication.set("e_mail", result[0].email);
}

function get_station_ko(error) 
{
    alert("get_station_ko = " + JSON.stringify(error));
}