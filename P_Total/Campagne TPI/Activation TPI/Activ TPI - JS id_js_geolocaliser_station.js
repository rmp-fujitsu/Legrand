// id_js_geolocaliser_station
// => Var. listened: localiser

var pi = parseFloat(3.141592653);
var distance_tolerance_km = 0.3;
var latitude = parseFloat(RMPApplication.get("localiser.coordinates.latitude"));
var latitude_rad = (parseFloat(latitude) * pi) / 180;
var longitude = parseFloat(RMPApplication.get("localiser.coordinates.longitude"));
c_debug(debug.geolocalisation, "Géolocalisation: Latitude  = ", latitude);
c_debug(debug.geolocalisation, "Géolocalisation: Longitude = ", longitude);

var latitude_lower_bound = latitude - parseFloat(distance_tolerance_km/111);
var latitude_upper_bound = latitude + parseFloat(distance_tolerance_km/111);

var longitude_lower_bound = longitude - Math.abs(parseFloat(distance_tolerance_km/(Math.cos(latitude_rad)*111)));
var longitude_upper_bound = longitude + Math.abs(parseFloat(distance_tolerance_km/(Math.cos(latitude_rad)*111)));

var input = {"latitude_lower_bound": latitude_lower_bound, "latitude_upper_bound": latitude_upper_bound, "longitude_lower_bound": longitude_lower_bound, "longitude_upper_bound": longitude_upper_bound};
var options = {};
id_localiser_station.trigger(input, options, localiser_station_ok, localiser_station_ko);

function localiser_station_ok(result)
{
    if (result.station_localisee == "") {

    } else { 
		
		RMPApplication.set("code_implant", result.code_implant);
		RMPApplication.set("nom_station", result.nom_station);
		RMPApplication.set("adresse", result.adresse);
		RMPApplication.set("code_postal", result.code_postal);
		RMPApplication.set("ville", result.ville);
		RMPApplication.set("email_station", result.email_station);
		RMPApplication.set("tel_station", result.tel_station);
    }
}

function localiser_station_ko(P_error)
{
    // alert("Le module de géolocalisation est indisponible." + <br/> + "Veuillez entrer directement le code implant ou le nom de la station.");
    // alert(JSON.stringify(P_error));
}
