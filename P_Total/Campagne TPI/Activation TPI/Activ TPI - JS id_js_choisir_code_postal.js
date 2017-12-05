// id_js_choisir_code_postal
// => Var. listened: code_postal_search

var code_postal = RMPApplication.get("code_postal_search");
RMPApplication.set("code_implant_search", "");

var options = {};
var my_pattern = {};
my_pattern.code_postal = code_postal;
col_stations_total.listCallback(my_pattern, options, stations_list_cp_ok, stations_list_cp_ko);

function stations_list_cp_ok(result) 
{
    console.log("stations_list_cp_ok: result = ", result);
	RMPApplication.set("code_postal", code_postal);
}
		
function stations_list_cp_ko(error) 
{
    alert("stations_list_cp_ko: error = " + JSON.stringify(error));
}
