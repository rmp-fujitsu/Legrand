RMPApplication.debug ("Application started");

// ==========================================
// Initialization PART (generic variable)
// according to the context
// ==========================================

// ==========================================
// INFORMATION
// "itemid" => "Affiliate ID" widget variable
// ==========================================

var itemName = "Enseigne";      // what kind of item ?
var collectionid = "col_enseignes_vivarte";

var var_list = 
{
    "affiliate" : "affiliate",
    "abbreviation" : "abbreviation",
    "company" : "company",
    "affiliate_img" : "affiliate_img"
};

// The following fields will be transformed in uppercase
var upper_fields = ["affiliate", "abbreviation", "company"];


// ==============================
// clean custom widget (CW) area
// variable: my_item
// ==============================
function clean_item() {
    //
    // clean widget area before any add-action
    //
    RMPApplication.debug ("begin Item cleaned");
    // var img_product_data = eval('(' + RMPApplication.get("my_item.affiliate_img") + ')')[0].id;
    var img_product_data = eval('(' + RMPApplication.get("my_item.affiliate_img") + ')');
    if (!isEmpty(img_product_data) && img_product_data.length != 0) {
        id_my_item.id_affiliate_img.selectFileId(img_product_data[0].id);
        id_my_item.id_affiliate_img.deleteSelected();
    }
    id_my_item.id_files_preview.setHtml("");
    id_my_item.id_files_preview.setVisible(false);
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
    // id_html_msg.setHtml("<div class='alert alert-success' role='alert'><i class='fa fa-check-circle-o'></i> <strong>" + itemName.toUpperCase() + " added</strong></div>");
    alertify.success("Success: New " + itemName.toUpperCase() + " added"); 
    clean_item();
    id_report.refresh();
    RMPApplication.debug("end add_ok");    
}

function add_ko(result) {
    //Error while adding item in the collection
    RMPApplication.debug("begin add_ko");
    // id_html_msg.setHtml("<div class='alert alert-danger' role='alert'><i class='fa fa-times-circle-o'></i> <strong>Error</strong> while adding new " + itemName.toUpperCase() + " !</div>");
    alertify.error("Error while adding new " + itemName.toUpperCase() + " ! " ); 
    RMPApplication.debug("end add_ko");
}

function add_item() {
    RMPApplication.debug ("begin add_item","blue");
    
    var my_object = eval('(' + RMPApplication.get("my_item") + ')');
    // console.log('my_object: ', my_object);

    for (key in var_list)  {
        if ( (var_list[key] !== "" || RMPApplication.validate() == false ) && RMPApplication.get("my_item." + key) == undefined ) {
        // id_html_msg.setHtml("<div class='alert alert-danger' role='alert'><i class='fa fa-times-circle-o'></i> <strong>Error:</strong> " + key + "(" + var_list[key] + ")"+ " must be set !</div>");
        alertify.error("Error: " + key + "(" + var_list[key] + ") must be set !");
        RMPApplication.debug (key + " must be set!");
        return;
        } 
        if (!isEmpty(upper_fields)) {
            if (upper_fields.indexOf(key) > -1) {
                RMPApplication.set("my_item." + key, my_object[key].toUpperCase());
            }
        }
    }
    my_object = eval('(' + RMPApplication.get("my_item") + ')');
    // console.log('my_object: ', my_object);

    if(!item_already_exists(my_object)) {
        my_object.itemid = RMPApplication.uuid();
        if (my_object.affiliate_img.length == 0) {
            my_object.affiliate_img = null;
        }
        console.log('add_item: my_object', my_object);
        eval(collectionid).saveCallback(my_object, add_ok, add_ko);
        RMPApplication.debug (my_object);
        RMPApplication.debug ("New" + itemName.toUpperCase() + " added");

        // id_affiliate_img = my_object.affiliate_img.id;
        // var input = {};
        // var option ={};
        // // Update image url with real path on server
        // JSON.parse(RMPApplication.get("my_object.affiliate_img"))[f].url


    } else {
        // id_html_msg.setHtml("<div class='alert alert-danger' role='alert'><i class='fa fa-times-circle-o'></i> <strong>Error</strong>: " + itemName.toUpperCase() + " already exists !</div>");
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
    // id_html_msg.setHtml("<div class='alert alert-success' role='alert'><i class='fa fa-check-circle-o'> <strong> " + itemName.toUpperCase() + " saved</strong></div>");
    console.log("update_ok: result", result);    
    alertify.success("Success: " + itemName.toUpperCase() + " saved"); 
    clean_item();
    id_report.refresh();
    RMPApplication.debug ("end update_ok");    
}

function update_ko(result) {
    //Error while updating item in the collection
    RMPApplication.debug ("begin update_ko");    
    // id_html_msg.setHtml("<div class='alert alert-danger' role='alert'><i class='fa fa-times-circle-o'></i> <strong>Error</strong> while saving " + itemName.toUpperCase() + " !</div>");
    alertify.error("Error while saving " + itemName.toUpperCase() + " !");
    RMPApplication.debug ("end update_ko");    
}

function update_item(itemid) {
    RMPApplication.debug ("begin update_item");
    var my_pattern = {};
    my_pattern.itemid = RMPApplication.get("my_item.itemid");
    var my_object = eval('(' + RMPApplication.get("my_item") + ')');
    if (my_object.affiliate_img.length == 0) {
        my_object.affiliate_img = null;
    }
    for (key in var_list)  {
        if (!isEmpty(upper_fields)) {
            if (upper_fields.indexOf(key) > -1) {
                RMPApplication.set("my_item." + key, my_object[key].toUpperCase());
            }
        }
    }
    var my_object = eval('(' + RMPApplication.get("my_item") + ')');

    eval(collectionid).updateCallback(my_pattern, my_object, update_ok, update_ko);
    RMPApplication.debug ("end update_item");    
}

// ======================
// load_item
// ======================
function load_ok(result) {
    RMPApplication.debug ("begin load_ok");
    // id_html_msg.setHtml("<div class='alert alert-success' role='alert'><i class='fa fa-check-circle-o'> <strong> " + itemName.toUpperCase() + " loaded</strong></div>");
    alertify.success("Success: " + itemName.toUpperCase() + " loaded");
    console.log("load_ok: result", result);
    id_details_item.setVisible(true);
    id_details_item.open();
    RMPApplication.set("my_item", result[0]);
    // id_my_item.id_image_preview.setUrl(result[0].affiliate_img[0].url);
    RMPApplication.set("action", "update");
    RMPApplication.debug ("end load_ok");    
}

function load_ko(result) {
    RMPApplication.debug ("begin load_ko");    
    // id_html_msg.setHtml("<div class='alert alert-danger' role='alert'><i class='fa fa-times-circle-o'></i> <strong>Error</strong> while loading " + itemName.toUpperCase() + " !</div>");
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
    // id_html_msg.setHtml("<div class='alert alert-success' role='alert'><i class='fa fa-check-circle-o'> <strong> " + itemName.toUpperCase() + " deleted</strong></div>");
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
    // id_html_msg.setHtml("<div class='alert alert-danger' role='alert'><i class='fa fa-times-circle-o'></i> <strong>Error</strong> while deleting " + itemName.toUpperCase() + " !</div>");
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
