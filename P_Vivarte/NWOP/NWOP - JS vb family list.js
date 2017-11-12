// Hide other select lists
id_category.setVisible(false);
id_brand.setVisible(false);
id_model.setVisible(false);

// search pattern setted by selection
var my_pattern = {};
my_pattern.family = RMPApplication.get("family");
col_equipements_vivarte.listCallback(my_pattern, {}, family_ok, family_ko)

function family_ok(result) 
{
	var vb_category = new Array();
	var vb_category_temp = new Array();

	for(i=0; i<result.length; i++) {
		var res = vb_category_temp.indexOf(result[i].category);
		if (res == -1) {	// item does not exist in the array
			vb_category_temp.push(result[i].category);
			vb_category.push({"label":result[i].category, "value":result[i].category});
		}
	}
	var a = new RMP_List();
	a.fromArray(vb_category);
	RMPApplication.setList("vb_category",a);
	id_category.setVisible(true);
	$("#id_reset").show();
}

function family_ko(result) 
{
	//Error while retrieving families
	alert("ko " + JSON.stringify(result));
	alertify.error("Erreur dans le traitement de la liste des familles!");
}
