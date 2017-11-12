RMPApplication.debug ("Application started");

// ==========================================
// Initialization PART (generic variable)
// according to the context
// ==========================================

var itemName = "Location";      // what kind of item ?
var collectionid = "col_locations_vivarte";

var var_list = 
{
    "company" : "company",
    "affiliate" : "affiliate",
    "country" : "country",
    "region" : "region",
    "location_code" : "location_code",
    "pos_type" : "pos_type",
    "location" : "location",
    "location_name" : "location_name",
    "email" : "email",
    "phone" : "phone",
    "address1" : "address1",
    "address2" : "address2",
    "address_title" : "address_title",
    "postal_code" : "postal_code",
    "city" : "city",
    "latitude_coord" : "latitude_coord",
    "longitude_coord" : "longitude_coord"
};


// ==============================
// clean custom widget (CW) area
// variable: my_item
// ==============================
function clean_item() {
    //
    // clean widget area before any add-action
    //
    RMPApplication.debug ("begin " + itemName + " Widget Area cleaned");
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
    alertify.success("Success: " + itemName.toUpperCase() + " added"); 
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

    for (key in var_list)  {
        if ( RMPApplication.validate() == false ) {
            // id_html_msg.setHtml("<div class='alert alert-danger' role='alert'><i class='fa fa-times-circle-o'></i> <strong>Error:</strong> " + key + "(" + var_list[key] + ")"+ " must be set !</div>");
            alertify.error("Error: all required fields must be set !");
            RMPApplication.debug (key + " must be set!");
            return;
        }
    }
    
    if (!item_already_exists(my_object)) {
        // my_object.locationid = RMPApplication.uuid();
        eval(collectionid).saveCallback(my_object, add_ok, add_ko);
        RMPApplication.debug (my_object);
        // id_html_msg.setHtml("<div class='alert alert-success' role='alert'><i class='fa fa-check-circle-o'></i> <strong>" + itemName.toUpperCase() + " added</strong></div>");
        // alertify.success("Success: New" + itemName.toUpperCase() + " added"); 
        RMPApplication.debug ("New" + itemName.toUpperCase() + " added");
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
    alertify.success("Success: " + itemName.toUpperCase() + " updated"); 
    clean_item();
    id_report.refresh();
    RMPApplication.debug ("end update_ok");    
}

function update_ko(result) {
    //Error while updating item in the collection
    RMPApplication.debug ("begin update_ko");    
    // id_html_msg.setHtml("<div class='alert alert-danger' role='alert'><i class='fa fa-times-circle-o'></i> <strong>Error</strong> while saving " + itemName.toUpperCase() + " !</div>");
    alertify.error("Error while updating " + itemName.toUpperCase() + " !");
    RMPApplication.debug ("end update_ko");    
}

function update_item(locationcode) {
    RMPApplication.debug ("begin update_item");
    var my_pattern = {};
    my_pattern.location_code = RMPApplication.get("my_item.location_code");
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
    id_details_item.setVisible(true);
    id_details_item.open();
    RMPApplication.set("my_item", result[0]);
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

function load_item(locationcode) {
    RMPApplication.debug ("begin load_item");    
    var my_pattern = {};
    my_pattern.location_code = locationcode;
    RMPApplication.debug ("my_pattern." + locationcode + " = " + my_pattern.location_code);    
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

function delete_item(locationcode) {
    RMPApplication.debug ("begin delete_item");    
    var my_pattern = {};
    my_pattern.location_code = locationcode;
    RMPApplication.debug ("my_pattern." + locationcode + " = " + my_pattern.location_code);    
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
