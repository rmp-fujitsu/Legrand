// id_js_geolocaliser_station
// => Var. listened: localiser

var pi = parseFloat(3.141592653);
var distance_tolerance_km = 0.3;
var latitude = parseFloat(RMPApplication.get("localiser.coordinates.latitude"));
var latitude_rad = (parseFloat(latitude) * pi) / 180;
var longitude = parseFloat(RMPApplication.get("localiser.coordinates.longitude"));

var latitude_lower_bound = latitude - parseFloat(distance_tolerance_km/111);
var latitude_upper_bound = latitude + parseFloat(distance_tolerance_km/111);

var longitude_lower_bound = longitude - Math.abs(parseFloat(distance_tolerance_km/(Math.cos(latitude_rad)*111)));
var longitude_upper_bound = longitude + Math.abs(parseFloat(distance_tolerance_km/(Math.cos(latitude_rad)*111)));

var input = {"latitude_lower_bound": latitude_lower_bound, "latitude_upper_bound": latitude_upper_bound, "longitude_lower_bound": longitude_lower_bound, "longitude_upper_bound": longitude_upper_bound};
var options = {};
id_localiser_station.trigger(input, options, localiser_station_ok, localiser_station_ko);

function localiser_station_ok(P_computed)
{
    if (P_computed.station_localisee == "") {

    } else { 
		
		RMPApplication.set("code_implant", P_computed.code_implant);
		RMPApplication.set("nom_station", P_computed.nom_station);
		RMPApplication.set("departement", P_computed.departement);
		RMPApplication.set("ville", P_computed.ville);
		RMPApplication.set("tel", P_computed.tel);
		// RMPApplication.set("adresse", P_computed.adresse);
    }
}

function localiser_station_ko(P_error)
{
    alert("Le module de géolocalisation est indisponible." + <br/> + "Veuillez entrer directement le code implant ou le nom de la station.");
   // alert(JSON.stringify(P_error));
}
