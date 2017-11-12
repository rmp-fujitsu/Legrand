RMPApplication.debug ("Application started");

// ==========================================
// Initialization PART (generic variable)
// according to the context
// ==========================================

// ==========================================
// INFORMATION
// "itemid" => "Item ID" widget variable
// ==========================================

var itemName = "Produit";      // what kind of item ?
var collectionid = "col_catalogue_vivarte";

var var_list = 
{   
    "affiliates" : "affiliates",
    "class": "class",
    "family" : "family",
    "category" : "category",
    "short_cat" : "short_cat",
    "brand" : "brand",
    "model": "model",
    "sn_category": "sn_category",
    "sn_u_product_type": "sn_u_product_type",
    "problem_type": "problem_type",
    "media_name" : "media_name",
    "media_id" : "media_id",
    "media_url" : "media_url",
    "file_name" : "file_name",
    "product_img" : "product_img"
    
};


// ==============================
// clean custom widget (CW) area
// variable: my_item
// ==============================
function clean_item() {
    //
    // clean widget area before any add-action
    //
    RMPApplication.debug ("begin Item cleaned");
    /*var img_product_data = JSON.parse(RMPApplication.get("product_img"));
    if (img_product_data.length != 0) {
        var start_index = img_product_data.length - 1;
        for (f=start_index; f>-1; f--) {
            id_product_img.selectFileId(img_product_data[f].id);
            id_product_img.deleteSelected();
        }
    }*/
    var img_product_data = JSON.parse(RMPApplication.get("product_img"));
    if (img_product_data.length != 0) {
        id_product_img.remove();
        var conf = {"id" : "id_product_img", "label" : {"text":"Sélectionner une image"}, "variable" : [{"name":"product_img", "value" : ""}], "js-type" : "RMP_FileUpload", "tooltip":"", "action" : "file_upload", "submit" : "Télécharger", "file-exts" : [{"ext":"png"}, {"ext":"jpg"}], "url" : "live/1/entity/0f8406f0-3cb7-11e4-804d-f0bf97e1b068/upload?appli=[[appli_id]]&context=[[context]]&P_mode=TEST&P_version="};
        var id_product_img = new RMP_FileUpload(conf);
        id_files_preview.insertAbove(id_product_img);
    }
    // RMPApplication.set("product_img", null);
    // id_product_img.refresh();
    id_details_item.setVisible(true);
    id_details_item.open();
    RMPApplication.set("my_item", "{}");
    RMPApplication.set("action", "add");
    RMPApplication.debug("end " + itemName + " Widget Area cleaned");
}

// ======================
// add_item
// ======================
function add_ok(result) {
    RMPApplication.debug("begin add_ok");
    alertify.success("Success: " + itemName.toUpperCase() + " added"); 
    clean_item();
    id_report.refresh();
    RMPApplication.debug("end add_ok");    
}

function add_ko(result) {
    //Error while adding item in the collection
    RMPApplication.debug("begin add_ko");
    alertify.error("Error while adding new " + itemName.toUpperCase() + " ! " ); 
    RMPApplication.debug("end add_ko");
}

function add_item() {
    RMPApplication.debug ("begin add_item","blue");
    var my_object = JSON.parse(RMPApplication.get("my_item"));
    RMPApplication.set("my_object.product_img", "");

    if ( isEmpty(my_object.family) && isEmpty(my_object.category) && isEmpty(my_object.brand) ) {
        alertify.error("Error: at least, family or category or brand must be set !");
        RMPApplication.debug ("Error: at least, family or category or brand must be set !");
        return;
    }
    
    if(!item_already_exists(my_object)) {
        my_object.itemid = RMPApplication.uuid();
        console.log('add_item: my_object', my_object);
        eval(collectionid).saveCallback(my_object, add_ok, add_ko);
        RMPApplication.debug (my_object);
        RMPApplication.debug ("New" + itemName.toUpperCase() + " added");
    } else {
        alertify.error("Error: " + itemName.toUpperCase() + " already exists !")
        RMPApplication.debug (itemName.toUpperCase() + " already exists!");
    }
    RMPApplication.debug ("end add_item");
}

// ======================
// udpate_item
// ======================
function update_ok(result) {
    RMPApplication.debug ("begin update_ok");    
    alertify.success("Success: " + itemName.toUpperCase() + " saved"); 
    id_report.refresh();
    clean_item();
    RMPApplication.debug ("end update_ok");    
}

function update_ko(result) {
    //Error while updating item in the collection
    RMPApplication.debug ("begin update_ko");    
    alertify.error("Error while saving " + itemName.toUpperCase() + " !");
    RMPApplication.debug ("end update_ko");    
}

function update_item() {
    RMPApplication.debug ("begin update_item");
    var my_pattern = {};
    my_pattern.itemid = RMPApplication.get("my_item.itemid");
    var my_object = JSON.parse(RMPApplication.get("my_item"));
    // RMPApplication.set("my_object.product_img", "");
    console.log('update_item: my object = ', my_object);
    eval(collectionid).updateCallback(my_pattern, my_object, update_ok, update_ko);
    RMPApplication.debug ("end update_item");    
}

// ======================
// load_item
// ======================
function load_ok(result) {
    RMPApplication.debug ("begin load_ok");
    alertify.success("Success: " + itemName.toUpperCase() + " loaded");
    console.log("result", result);
    id_details_item.setVisible(true);
    id_details_item.open();
    // RMPApplication.set("product_img", null);
    // id_product_img.refresh();
    RMPApplication.set("my_item", result[0]);
    RMPApplication.set("action", "update");
    RMPApplication.debug ("end load_ok");    
}

function load_ko(result) {
    RMPApplication.debug ("begin load_ko");    
    alertify.error("Error while loading " + itemName.toUpperCase() + " !");
    id_report.refresh();
    RMPApplication.debug ("end load_ko");    
}

function load_item(itemid) {
    RMPApplication.debug ("begin load_item");    
    var my_pattern = {};
    my_pattern.itemid = itemid;
    RMPApplication.debug ("my_pattern." + itemid + " = " + my_pattern.itemid);    
    eval(collectionid).listCallback(my_pattern, {}, load_ok, load_ko);
    RMPApplication.debug ("end load_item"); 
}

// ======================
// delete_item
// ======================
function delete_ok(result) {
    RMPApplication.debug ("begin delete_ok");    
    alertify.success(itemName.toUpperCase() + " deleted");
    id_report.refresh();
    //empty custom widget
    RMPApplication.set("my_item", "{}");
    RMPApplication.set("action", "add");
    RMPApplication.debug ("end delete_ok");    
}

function delete_ko(result) {
    //Error while deleting item from the collection
    RMPApplication.debug ("begin delete_ko");    
    alertify.error("Error while deleting " + itemName.toUpperCase() + " !");
    RMPApplication.debug ("end delete_ko");    
}

function delete_item(itemid) {
    RMPApplication.debug ("begin delete_item");    
    var my_pattern = {};
    my_pattern.itemid = itemid;
    RMPApplication.debug ("my_pattern." + itemid + " = " + my_pattern.itemid);    
    eval(collectionid).removeCallback(my_pattern, delete_ok, delete_ko);
    RMPApplication.debug ("end delete_item");    
}

// ======================
// Other functions
// ======================
function exists_ok(result) {
    if(result[0]) {
        res = true;
    } else {
        res = false;
    }
}

function exists_ko(result) { }

function item_already_exists(my_object) {
    RMPApplication.debug ("begin function item_already_exists");
    var my_pattern = {};
    for (key in my_object)  {
        my_pattern[key] = ( my_object[key] !== "" ) ? my_object[key] : "";
    }
    var options = {};
    options.asynchronous = false;
    res = false;
    eval(collectionid).listCallback(my_pattern, options, exists_ok, exists_ko);
    RMPApplication.debug ("end function item_already_exists");
    return res;
}
