// ========================
//   id_js_depass_register_start_times
// ========================

if (debug == null) {
	var debug = {}
	debug.test = false;
}

// Variables list
// depass_capots_out,depass_capots_in

// capots variable initialization 
var capots = {
	"out": {
		"checked": false,
		"time_empty": true,
		"varname": "depass_capots_out",
		"vartime": "depass_capots_out_start"
	},
	"in": {
		"checked": false,
		"time_empty": true,
		"varname": "depass_capots_in",
		"vartime": "depass_capots_in_start"
	}
};

for (key in capots) {
	c_debug(debug.test, "=> Deal with START time : capots[key] = ", key);
	capots[key].checked = (RMPApplication.get(capots[key].varname) == "true") ? true : false;
	capots[key].time_empty = (isEmpty(RMPApplication.get(capots[key].vartime))) ? true : false;

	// To register a start time, we need the box checked and time not already registered
	if (capots[key].checked && capots[key].time_empty) {
		var actual_time = new Date();  
		var currentTime = Math.round(actual_time.getTime()/ 1000);
		eval("id_" + capots[key].vartime).setDate(currentTime, "dd/MM/yyyy HH:mm");
		c_debug(debug.test, "   ******* Mise à TRUE du champ *******");
	}
	c_debug(debug.test,"==============================================");
}
