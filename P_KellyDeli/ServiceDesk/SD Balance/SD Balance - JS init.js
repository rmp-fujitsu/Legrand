function ok(P_computed){
    	RMPApplication.set("location_name",P_computed.location_name);
		RMPApplication.set("kiosk_reference",P_computed.kiosk_reference);
}
function ko(P_error){
    alert(JSON.stringify(P_error));
}
var input = {"location_code":RMPApplication.get("location_code")};
var options = {};
id_get_location_by_code.trigger(input,options,ok,ko);
