// id_js_choisir_code_postal
// => Var. listened: station_search

var code_postal = RMPApplication.get("departement_search");
// var station = RMPApplication.get("station_search");
RMPApplication.set("code_implant_search", "");
var my_pattern = {};
my_pattern.departement = code_postal;
// my_pattern.nom_station = station;
var options = {};
col_stations.listCallback(my_pattern, options, stations_list_cp_ok, stations_list_cp_ko);

function stations_list_cp_ok(result) 
{
    console.log("stations_list_cp_ok: result = ", result);
	RMPApplication.set("departement", code_postal);
}
		
function stations_list_cp_ko(error) 
{
    alert("ko " + JSON.stringify(error));
}
