RMPApplication.debug ("Application started");

// ==========================================
// Initialization PART (generic variable)
// according to the context
// ==========================================

// if "true", logs will be showed on the browser console
var dbug = {
    "item": true
};

var itemName = [
	{ 
		"class": "paper",
		"var_name": "my_paper",
		"var_list": {
			"class": "paper",
			"reference": "reference",
			"product_code": "product_code",
			"packaging": "packaging",
			"format": "format",
			"quality": "quality",
			"weight": "weight",
			"delivery_delay": "delivery_delay",
			"delay_unit": "delay_unit"
		}
	}, {
		"class": "toner",
		"var_name": "my_toner",
		"var_list": {
			"class": "toner",
			"reference": "reference",
			"product_code": "product_code"
		}
	}, {
		"class": "drum",
		"var_name": "my_drum",
		"var_list": {
			"class": "toner",
			"reference": "reference",
			"product_code": "product_code"
		}
		}, {
		"class": "collector",
		"var_name": "my_collector",
		"var_list": {
			"class": "toner",
			"reference": "reference",
			"product_code": "product_code"
		}
	}
];

var file_upload_conf = {									// File Upload Widget configuration
	"id": "id_file_upload",
	"label": {"text": "Une SEULE image par produit"},
	"variable": [{
		"name": "file_upload_var",
		"value": ""
	}],
	"js-type": "RMP_FileUpload",
	"tooltip": "",
	"action": "file_upload",
	"submit": "Upload",
	"url": "live/1/entity/0f8406f0-3cb7-11e4-804d-f0bf97e1b068/upload?appli=[[appli_id]]&context=[[context]]&P_mode=TEST&P_version="
};

var collectionid = "col_training_consommables";
var selected_type_var = "";

var success_title_notify = ${P_quoted(i18n("success_title_notify", "Succès"))};
var error_title_notify = ${P_quoted(i18n("error_title_notify", "Erreur"))};
var error_thanks_notify = ${P_quoted(i18n("error_thanks_notify", "Merci de signaler cette erreur !"))};


// initialize main program
init();

// ===============================
//   Initialization part
// ===============================
function init() 
{
	RMPApplication.debug("begin init");
	RMPApplication.set("action", "add");
	RMPApplication.debug("end init");
}

// ==============================
// clean custom widget (CW) area
// variable: my_item
// ==============================
function clean_item(item_type)
{
    // clean widget area before any add-action
    RMPApplication.debug ("begin Item cleaned");
    c_debug(dbug.item, "=> begin clean_item");
    /*var img_product_data = JSON.parse(RMPApplication.get("product_img"));
    if (img_product_data.length != 0) {
        var start_index = img_product_data.length - 1;
        for (f=start_index; f>-1; f--) {
            id_product_img.selectFileId(img_product_data[f].id);
            id_product_img.deleteSelected();
        }
    }*/
    /*var img_product_data = JSON.parse(RMPApplication.get("product_img"));
    if (img_product_data.length != 0) {
        id_product_img.remove();
        var conf = {"id" : "id_product_img", "label" : {"text":"Sélectionner une image"}, "variable" : [{"name":"product_img", "value" : ""}], "js-type" : "RMP_FileUpload", "tooltip":"", "action" : "file_upload", "submit" : "Télécharger", "file-exts" : [{"ext":"png"}, {"ext":"jpg"}], "url" : "live/1/entity/0f8406f0-3cb7-11e4-804d-f0bf97e1b068/upload?appli=[[appli_id]]&context=[[context]]&P_mode=TEST&P_version="};
        var id_product_img = new RMP_FileUpload(conf);
        id_files_preview.insertAbove(id_product_img);
    }*/
    // RMPApplication.set("product_img", null);
    // id_product_img.refresh();

    show_sections(true);
    RMPApplication.set(selected_type_var.var_name, "{}");
    RMPApplication.set("action", "add");
    refresh_report();
    RMPApplication.debug("end => " + selected_type_var.class.toUpperCase() + " Widget Area cleaned");
}

// ==================================================================
//  show or hide both details and image sections
// ==================================================================
function show_sections(bool) {
    var id_details_item = "id_" + selected_type_var.var_name;
    var id_details_item_details = id_details_item + ".details_section";
    var id_details_item_image = id_details_item + "_image" + ".image_section";
    eval(id_details_item_details).setVisible(bool);
    eval(id_details_item_details).open();
    eval(id_details_item_image).setVisible(bool);
    eval(id_details_item_image).open();
}

// ==================================================================
//  Refresh collection report for actual type of product
// ==================================================================
function refresh_report()
{
	c_debug(dbug.item, "=> refresh_report");
	var id_report = "id_report_" + selected_type_var.class;
    eval(id_report).refresh();
}
// ==================================================================
// for a given type of product, return all related caracteristics
// ==================================================================
function product_var(item_type) 
{
	for (i=0; i<itemName.length; i++) {
    	if (itemName[i].class == item_type) {
    		var prod_var = itemName[i];
    		i = itemName.length + 1;				// break before end of loop
    	}
    }
    c_debug(dbug.item, "=> product_var: prod_var = ", prod_var);
    return prod_var;
}

// ======================
// add_item
// ======================
function add_item(item_type)
{
    RMPApplication.debug ("begin add_item");
    c_debug(dbug.item, "=> add_item: item_type = ", item_type);
    
    selected_type_var = product_var(item_type);
    c_debug(dbug.item, "=> add_item: selected_type_var = ", selected_type_var);

    var details_item = selected_type_var.var_name + ".class";
    RMPApplication.set(details_item, item_type);

    // Retrieve details properties for the product from details section
	var my_object = JSON.parse(RMPApplication.get(selected_type_var.var_name));
	// include url properties for image section if at least one image is uploaded
    var id_details_item_image = "id_" + selected_type_var.var_name + "_image" + ".id_file_upload";
	var nb_uploaded_files = eval(id_details_item_image).getUploadedCount();
	if (nb_uploaded_files > 0) {
		my_object.url = JSON.parse(eval(id_details_item_image).getValue())[0].url;
	}
    c_debug(dbug.item, "=> add_item: my_object = ", my_object);

	if(!item_already_exists(my_object)) {    	
        
        eval(collectionid).saveCallback(my_object, add_ok, add_ko);
        RMPApplication.debug ("New" + selected_type_var.class.toUpperCase() + " added");
    } else {
        var error_msg2 = ${P_quoted(i18n("add_item_msg2", "Cet enregistrement existe déjà !"))};
        warning_error(error_title_notify, error_msg2);
        RMPApplication.debug (selected_type_var.class.toUpperCase() + " already exists!");
    }
    RMPApplication.debug ("end add_item");
}

function add_ok(result)
{
    RMPApplication.debug("begin add_ok");
    c_debug(dbug.item, "=> add_ok: result = ", result);
    var success_msg = ${P_quoted(i18n("add_ok_msg", "Nouvelle entrée ajoutée !"))};
    notify_success(success_title_notify, success_msg);
    clean_item();
    RMPApplication.debug("end add_ok");
}

function add_ko(error)
{
    //Error while adding item in the collection
    RMPApplication.debug("begin add_ko");
    c_debug(dbug.item, "=> update_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("add_ko_msg", "Ajout impossible !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end add_ko");
}

// ======================
// udpate_item
// ======================
function update_item(item_type)
{
    RMPApplication.debug ("begin update_item");
    c_debug(dbug.item, "=> update_item: item_type = ", item_type);
    selected_type_var = product_var(item_type);
    c_debug(dbug.item, "=> update_item: selected_type_var = ", selected_type_var);
    var my_pattern = {};
    my_pattern.product_code = eval('(' + RMPApplication.get(selected_type_var.var_name) + ".product_code" + ')');
    c_debug(dbug.item, "=> update_item: my_pattern = ", my_pattern);
    var my_object = eval('(' + RMPApplication.get(selected_type_var.var_name) + ')');
    // include url properties for image section if at least one image is uploaded
    var id_details_item_image = "id_" + selected_type_var.var_name + "_image" + ".id_file_upload";
	var nb_uploaded_files = eval(id_details_item_image).getUploadedCount();
	if (nb_uploaded_files > 0) {
		my_object.url = JSON.parse(eval(id_details_item_image).getValue())[0].url;
	}
    c_debug(dbug.item, "=> update_item: my_object = ", my_object);
    eval(collectionid).updateCallback(my_pattern, my_object, update_ok, update_ko);
    RMPApplication.debug ("end update_item");
}

function update_ok(result)
{
    RMPApplication.debug ("begin update_ok");
    c_debug(dbug.item, "=> update_ok: result = ", result);
    var success_msg = ${P_quoted(i18n("update_ok_msg", "Informations correctement mises à jour !"))};
    notify_success(success_title_notify, success_msg);
    clean_item();
    RMPApplication.debug ("end update_ok");
}

function update_ko(error)
{
    //Error while updating item in the collection
    RMPApplication.debug ("begin update_ko");
    c_debug(dbug.item, "=> update_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("update_ko_msg", "Mise à jour impossible de la référence !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end update_ko");
}

// ======================
// load_item
// ======================
function load_item(prod_code)
{
    RMPApplication.debug ("begin load_item");
    c_debug(dbug.item, "=> load_item: prod_code = ", prod_code);
    var my_pattern = {};
    my_pattern.product_code = prod_code;
    c_debug(dbug.item, "=> load_item: my_pattern = ", my_pattern); 
    eval(collectionid).listCallback(my_pattern, {}, load_ok, load_ko);
    RMPApplication.debug ("end load_item");
}

function load_ok(result)
{
    RMPApplication.debug ("begin load_ok");
    c_debug(dbug.item, "=> load_ok: result = ", result);
    selected_type_var = product_var(result[0].class);
    c_debug(dbug.item, "=> load_ok: selected_type_var = ", selected_type_var);
    var success_msg = ${P_quoted(i18n("load_ok_msg", "Informations du produit chargées !"))};
    notify_success(success_title_notify, success_msg);
    show_sections(true);
    RMPApplication.set(selected_type_var.var_name, result[0]);

    var id_details_item = "id_" + selected_type_var.var_name;
    var id_item_image = id_details_item  + "_image";
	var id_image_upload = id_item_image + ".id_file_upload";
	var id_files_preview = id_item_image + ".id_files_preview";
    var id_collection_image = id_item_image + ".id_collection_image";
    
	// reset of variable names for File Upload Widget
    file_upload_conf.id = "id_image_upload";
    file_upload_conf.variable.name = selected_type_var.var_name + ".file_upload_var";

    c_debug(dbug.item, "=> load_ok: before REMOVE - id_image_upload = ", id_image_upload);
 	eval(id_image_upload).remove();									// remove old File Upload widget to clear previous uploaded images
	var id_file_upload = new RMP_FileUpload(file_upload_conf);
	c_debug(dbug.item, "=> load_ok: before INSERTION - id_files_preview = ", id_files_preview);
	eval(id_files_preview).insertBefore(id_file_upload);

    if (!isEmpty(result[0].url)) {

    	var collection_image_html = "<img class=\"homeIcon img-thumbnail\" src=" + result[0].url + " alt='File preview' title='File preview' onClick='window.open(\"" + result[0].url + "\",\"_blank\");'><br>";
    	c_debug(dbug.item, "=> load_ok: id_collection_image = ", eval(id_collection_image));
     	eval(id_collection_image).setHtml(collection_image_html);		// Set Image preview from collectioon
     	eval(id_collection_image).setVisible(true);

    } else {
    	var collection_image_html = "";
    	c_debug(dbug.item, "=> load_ok: id_collection_image = ", "[empty]");
    	eval(id_files_preview).setHtml(collection_image_html);
     	eval(id_collection_image).setHtml(collection_image_html);
     	eval(id_collection_image).setVisible(false);
    }
    RMPApplication.set("action", "update");
    RMPApplication.debug ("end load_ok");
}

function load_ko(error)
{
    RMPApplication.debug ("begin load_ko");
    c_debug(dbug.item, "=> load_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("load_ko_msg", "Récupération impossible du produit !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    refresh_report();
    RMPApplication.debug ("end load_ko");
}

// ======================
// delete_item
// ======================
function delete_item(prod_code)
{
    RMPApplication.debug ("begin delete_item");
    c_debug(dbug.item, "=> delete_item: prod_code = ", prod_code);
    var my_pattern = {};
    my_pattern.product_code = prod_code;
    c_debug(dbug.item, "=> delete_item: my_pattern = ", my_pattern);  
    eval(collectionid).removeCallback(my_pattern, delete_ok, delete_ko);
    RMPApplication.debug ("end delete_item");
}

function delete_ok(result)
{
    RMPApplication.debug ("begin delete_ok");
    c_debug(dbug.item, "=> delete_ok: result = ", result);
    var success_msg = ${P_quoted(i18n("delete_ok_msg", "Référence supprimée !"))};
    notify_success(success_title_notify, success_msg);
    clean_item(selected_type_var.class);
    //empty custom widget
    RMPApplication.set(selected_type_var.var_name, "{}");
    RMPApplication.set("action", "add");
    RMPApplication.debug ("end delete_ok");
}

function delete_ko(error)
{
    //Error while deleting item from the collection
    RMPApplication.debug ("begin delete_ko");
    c_debug(dbug.item, "=> delete_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("delete_ko_msg", "Suppression impossible du site !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end delete_ko");
}

// ======================
// Other functions
// ======================
function item_already_exists(my_obj) 
{
    RMPApplication.debug ("begin function item_already_exists");
    c_debug(dbug.item, "=> item_already_exists: my_obj = ", my_obj);

    var my_pattern = {};
    // If only one caracteristic is tested
    my_pattern.product_code = my_obj.product_code;
    // If all caracteristic should be tested, please activate following loop-block
    /*for (key in my_obj)  {
        my_pattern[key] = ( my_obj[key] !== "" ) ? my_obj[key] : "";
    }*/

    var options = {};
    options.asynchronous = false;
    res = false;
    eval(collectionid).listCallback(my_pattern, options, exists_ok, exists_ko);
    RMPApplication.debug ("end function item_already_exists");
    return res;
}

function exists_ok(result)
{
    RMPApplication.debug ("begin exists_ok");
    c_debug(dbug.item, "=> exists_ok: result = ", result);
    if(result[0]) {
        res = true;
    } else {
        res = false;
    }
    RMPApplication.debug ("end exists_ok");
}

function exists_ko(error) 
{
    RMPApplication.debug ("begin exists_ko");
    c_debug(dbug.item, "=> exists_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("exists_ko_msg", "L'existence de la référence ne peut être vérifiée !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end exists_ko");
}