// Hide other select lists
id_model.setVisible(false);

// search pattern setted by selection
var my_pattern = {};
my_pattern.family = RMPApplication.get("family");
my_pattern.category = RMPApplication.get("category");
my_pattern.brand = RMPApplication.get("brand");
col_equipements_vivarte.listCallback(my_pattern, {}, brand_ok, brand_ko)

function brand_ok(result) 
{
	var vb_model = new Array();
	var vb_model_temp = new Array();

	for(i=0; i<result.length; i++) {
		var res = vb_model_temp.indexOf(result[i].model);
		if (res == -1) {	// item does not exist in the array
			vb_model_temp.push(result[i].model);
			vb_model.push({"label":result[i].model, "value":result[i].model});
		}
	}
	if (vb_model.length>0) {
		var a = new RMP_List();
		a.fromArray(vb_model);
		RMPApplication.setList("vb_model",a);
		id_model.setVisible(true);
	} else {
		// Show request qualification area
		id_requestType.setVisible(true);
		id_quantity.setVisible(true);
		id_referenceClient.setVisible(true);
		id_description.setVisible(true);
	}
}

function brand_ko(result) 
{
	//Error while retrieving brands
	alert("ko " + JSON.stringify(result));
	alertify.error("Erreur dans le traitement de la liste des marques!");
}
