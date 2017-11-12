var input = {"login": RMPApplication.get("email")};
var options = {};

id_get_user_info_as_admin.trigger(input, options, user_info_ok, user_info_ko);

function include_string(str, sub_str) 
{
	var present = (str.indexOf(sub_str) !== -1) ? true : false;
	return present;
}

function user_info_ok(P_computed) 
{
	RMPApplication.set("country",P_computed.pays);
	RMPApplication.set("timezone",P_computed.timezone);
	var dispatch_group;

	if (include_string(RMPApplication.get("email"), "bizerba")) {
		RMPApplication.set("dispatch_group","Bizerba");
	
	} else if (RMPApplication.get("country") == "SPAIN") {
		RMPApplication.set("dispatch_group","Fujitsu Espagne");
	
	} else if (RMPApplication.get("country") == "BELGIUM") {
		RMPApplication.set("dispatch_group","Fujitsu Belgique");
	
	} else if (include_string(RMPApplication.get("email"), "kellydeli")) {
		RMPApplication.set("dispatch_group", "IT KellyDeli");
	
	} else {
		RMPApplication.set("dispatch_group","Fujitsu Belgique");
	}

	if (include_string(RMPApplication.get("dispatch_group"), "Fujitsu")) {
		var my_pattern = {"dispatch_group" : "Fujitsu"};
	}
	else {
		var my_pattern = {"dispatch_group" : RMPApplication.get("dispatch_group")};
	}

	col_cloture_codes.listCallback(my_pattern, {}, list_ok, list_ko);
}

function user_info_ko(P_error)
{
    alert(JSON.stringify(P_error));
}


function list_ok(result) 
{
	var vb_codes = new Array();
	for(i=0;i<result.length;i++) {
		vb_codes.push({"label":result[i].closure_code,"value":result[i].closure_code});
	}	
	var a = new RMP_List();
	a.fromArray(vb_codes);
	RMPApplication.setList("vb_codes",a);
}

function list_ko(result) 
{
    alert("ko=" + JSON.stringify(result));
}