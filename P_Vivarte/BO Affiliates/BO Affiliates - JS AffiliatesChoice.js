var aucun = "AUCUNE";		// Propose a label for NO SELECTION
var tous = "TOUTES";		// Propose a label for ALL SELECTED
var my_pattern = {};
my_pattern = JSON.parse(RMPApplication.get("vb_affiliates_list"));
col_affiliates.listCallback(my_pattern, {}, affiliate_choice_ok, affiliate_choice_ko);

function affiliate_choice_ok(result, aucun, tous) 
{
	for (i=0; i<result.length; i++) {
		vb_aff.push({
			"label" : result[i].label,
			"value" : result[i].value
		});
	}

	var vb_aff = new Array();
	if (tous != "") {
		vb_aff.unshift({
			"label" : tous,
			"value" : tous
		});
	}
	if (aucun != "") {
		vb_aff.unshift({
			"label" : aucun,
			"value" : aucun
		});
	}
	var a = new RMP_List();
	a.fromArray(vb_aff);
	RMPApplication.setList("vb_aff",a);
}

function affiliate_choice_ko(result) 
{
	//Error while retrieving cars from brand_id
	alert("ko " + JSON.stringify(result));
}
