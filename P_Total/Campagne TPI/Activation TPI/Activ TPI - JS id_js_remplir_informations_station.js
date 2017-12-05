// id_js_remplir_informations_station
// => Var. listened: station_search

var nom_station = RMPApplication.get("station_search");
var options = {};
var my_pattern = {};
my_pattern.nom_station = nom_station;
col_stations_total.listCallback(my_pattern, options , get_station_ok, get_station_ko);

function get_station_ok(result) 
{
	RMPApplication.set("code_implant", result[0].code_implant);
	RMPApplication.set("nom_station", result[0].nom_station);
	RMPApplication.set("adresse", result[0].adresse);
    RMPApplication.set("code_postal", result[0].code_postal);
	RMPApplication.set("ville", result[0].ville);
	RMPApplication.set("tel_station", result[0].tel_station);
	RMPApplication.set("email_station", result[0].email_station);
	RMPApplication.set("code_implant_bis", result[0].code_implant);
	RMPApplication.set("nom_station_bis", result[0].nom_station);
}

function get_station_ko(error) 
{
    alert("get_station_ko: error = " + JSON.stringify(error));
}