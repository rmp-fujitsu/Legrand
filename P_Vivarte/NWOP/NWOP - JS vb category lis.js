// Hide other select lists
id_brand.setVisible(false);
id_model.setVisible(false);

// search pattern setted by selection
var my_pattern = {};
my_pattern.family = RMPApplication.get("family");
my_pattern.category = RMPApplication.get("category");
col_equipements_vivarte.listCallback(my_pattern, {}, category_ok, category_ko)

function category_ok(result) 
{
	var vb_brand = new Array();
	var vb_brand_temp = new Array();

	for(i=0; i<result.length; i++) {
		var res = vb_brand_temp.indexOf(result[i].brand);
		if (res == -1) {	// item does not exist in the array
			vb_brand_temp.push(result[i].brand);
			vb_brand.push({"label":result[i].brand, "value":result[i].brand});
		}
	}
	var a = new RMP_List();
	a.fromArray(vb_brand);
	RMPApplication.setList("vb_brand",a);
	id_brand.setVisible(true);
}

function category_ko(result) 
{
	//Error while retrieving categories
	alert("ko " + JSON.stringify(result));
	alertify.error("Erreur dans le traitement de la liste des catégories!");
}
