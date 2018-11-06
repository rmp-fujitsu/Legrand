RMPApplication.debug ("Application started");

// ==========================================
// Initialization PART (generic variable)
// according to the context
// ==========================================

// if "true", logs will be showed on the browser console
var dbug = {
    "item": false
};

var itemName = "Location";      // what kind of item ?
var collectionid = "col_legrand_locations";

var var_list = 
{
    "site_name" : "site_name",
    "site_code" : "site_code",
    "company" : "company",
    "address" : "address",
    "town" : "town",
    "postal_code" : "postal_code",
    "country" : "country",
    "phone_number" : "phone_number",
    "site_contact" : "site_contact"
};

var upper_var = ["site_code", "company"];
var capitalize_var = ["site_code", "country"];

var selected_item = "rmpoption0_1"; // Retrieve the id of the tab to assign it a color / background color

var success_title_notify = ${P_quoted(i18n("success_title_notify", "Success"))};
var error_title_notify = ${P_quoted(i18n("error_title_notify", "Error"))};
var error_thanks_notify = ${P_quoted(i18n("error_thanks_notify", "Thanks for sharing this error!"))};

// execute main program
init();


// ===============================
//   Initialization part
// ===============================
function init() 
{
    RMPApplication.debug("begin init");
    id_details_item.setVisible(false);
    RMPApplication.debug("end init");
}

// ==============================
// clean custom widget (CW) area
// variable: my_item
// ==============================
function clean_item()
{
    // clean widget area before any add-action
    RMPApplication.debug ("begin " + itemName + " Widget Area cleaned");
    c_debug(dbug.item, "=> begin clean_item");
    id_details_item.setVisible(true);
    id_details_item.open();
    RMPApplication.set("my_item", "{}");
    RMPApplication.set("action", "add");
    RMPApplication.debug("end " + itemName + " Widget Area cleaned");
}

// ======================
// add_item
// ======================
function add_item()
{
    RMPApplication.debug ("begin add_item");
    var my_pattern = {};
    my_pattern.site_name = {
        "$regex": RMPApplication.get("my_item.site_name"),
        "$options": "i"
    };
    my_pattern.country = {
        "$regex": RMPApplication.get("my_item.country"),
        "$options": "i"
    };
    c_debug(dbug.item, "=> add_item: my_pattern = ", my_pattern);

    var my_object = eval('(' + RMPApplication.get("my_item") + ')');

    for (key in var_list)  {
        if ( RMPApplication.validate() == false ) {
            var error_msg1 = ${P_quoted(i18n("add_item_msg1", "All fields must be set!"))};
            notify_error(error_title_notify, error_msg1);
            RMPApplication.debug ("All fields must be set!");
            return;
        }
    }
    
    if (!item_already_exists(my_object, my_pattern)) {

        c_debug(dbug.item, "=> add_item: my_object", my_object);
        eval(collectionid).saveCallback(my_object, add_ok, add_ko);
        RMPApplication.debug (my_object);
        RMPApplication.debug ("New" + itemName.toUpperCase() + " added");
    } else {
        var error_msg2 = ${P_quoted(i18n("add_item_msg2", "The site already exists!"))};
        notify_error(error_title_notify, error_msg2 + ' ' + error_thanks_notify);
        RMPApplication.debug (itemName.toUpperCase() + " already exists!");
    }
    RMPApplication.debug ("end add_item");
}

function add_ok(result)
{
    RMPApplication.debug("begin add_ok");
    c_debug(dbug.item, "=> add_ok: result = ", result);
    var success_msg = ${P_quoted(i18n("add_ok_msg", "New site added!"))};
    notify_success(success_title_notify, success_msg);
    clean_item();
    id_report.refresh();
    RMPApplication.debug("end add_ok");
}

function add_ko(error)
{
    //Error while adding item in the collection
    RMPApplication.debug("begin add_ko");
    c_debug(dbug.item, "=> update_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("add_ko_msg", "Unable to save the site!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end add_ko");
}

// ======================
// udpate_item
// ======================
function update_item()
{
    RMPApplication.debug ("begin update_item");
    var my_old_pattern = {};
    my_old_pattern.site_name = RMPApplication.get("loaded_site_name");
    my_old_pattern.country = RMPApplication.get("loaded_country");
    c_debug(dbug.item, "=> update_item: my_old_pattern = ", my_old_pattern);
    var my_new_pattern = {};
    my_new_pattern.site_name = {
        "$regex": RMPApplication.get("my_item.site_name"),
        "$options": "i"
    };
    my_new_pattern.country = {
        "$regex": RMPApplication.get("my_item.country"),
        "$options": "i"
    };
    c_debug(dbug.item, "=> update_item: my_new_pattern = ", my_new_pattern);

    var my_object = eval('(' + RMPApplication.get("my_item") + ')');

    if (!item_already_exists(my_object, my_new_pattern)) {

        c_debug(dbug.item, "=> update_item: my_object", my_object);
        eval(collectionid).updateCallback(my_old_pattern, my_object, update_ok, update_ko); 
        RMPApplication.debug ( itemName.toUpperCase() + " updated");

    } else {

        var site_name_pattern_equal = (my_old_pattern.site_name == my_new_pattern.site_name.$regex) ? true : false;
        var country_pattern_equal = (my_old_pattern.country == my_new_pattern.country.$regex) ? true : false;
        c_debug(dbug.item, "=> update_item: site_name_pattern_equal", site_name_pattern_equal);
        c_debug(dbug.item, "=> update_item: country_pattern_equal", country_pattern_equal);
        if (site_name_pattern_equal && country_pattern_equal) {
            c_debug(dbug.item, "=> update_item: my_object", my_object);
            eval(collectionid).updateCallback(my_old_pattern, my_object, update_ok, update_ko); 
            RMPApplication.debug ( itemName.toUpperCase() + " updated");
        } else {
            var error_msg2 = ${P_quoted(i18n("add_item_msg2", "A site already exists with same site_name & country values. The update is aborted!"))};
            notify_error(error_title_notify, error_msg2 + ' ' + error_thanks_notify);
            RMPApplication.debug (itemName.toUpperCase() + " already exists!");
        }
    }
    RMPApplication.debug ("end update_item"); 
}

function update_ok(result)
{
    RMPApplication.debug ("begin update_ok");
    c_debug(dbug.item, "=> update_ok: result = ", result);
    var success_msg = ${P_quoted(i18n("update_ok_msg", "Information correctly updated!"))};
    notify_success(success_title_notify, success_msg);
    clean_item();
    id_report.refresh();
    RMPApplication.debug ("end update_ok");
}

function update_ko(error)
{
    //Error while updating item in the collection
    RMPApplication.debug ("begin update_ko");
    c_debug(dbug.item, "=> update_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("update_ko_msg", "Unable to update the site!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end update_ko");
}

// ======================
// load_item
// ======================
function load_item(locationcode, countrycode)
{
    RMPApplication.debug ("begin load_item");
    var my_pattern = {};
    my_pattern.site_name = locationcode;
    my_pattern.country = countrycode;
    c_debug(dbug.item, "=> load_item: my_pattern = ", my_pattern);
    eval(collectionid).listCallback(my_pattern, {}, load_ok, load_ko);
    RMPApplication.debug ("end load_item");
}

function load_ok(result)
{
    RMPApplication.debug ("begin load_ok");
    c_debug(dbug.item, "=> load_ok: result = ", result);
    var success_msg = ${P_quoted(i18n("load_ok_msg", "Site information loaded!"))};
    notify_success(success_title_notify, success_msg);
    id_details_item.setVisible(true);
    id_details_item.open();
    RMPApplication.set("my_item", result[0]);
    RMPApplication.set("action", "update");
    // Keep hidden "site_name" and "country" values before any new change
    RMPApplication.set("loaded_site_name", result[0].site_name);
    RMPApplication.set("loaded_country", result[0].country);
    RMPApplication.debug ("end load_ok");
}

function load_ko(error)
{
    //Error while loading item from the collection
    RMPApplication.debug ("begin load_ko");
    c_debug(dbug.item, "=> load_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("load_ko_msg", "Unable to retrieve site's information!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    id_report.refresh();
    RMPApplication.debug ("end load_ko");
}

// ======================
// delete_item
// ======================
function delete_item(locationcode, countrycode)
{
    RMPApplication.debug ("begin delete_item");
    // var my_pattern = eval('(' + RMPApplication.get("my_item") + ')');
    var my_pattern = {};
    my_pattern.site_name = locationcode;
    my_pattern.country = countrycode;
    c_debug(dbug.item, "=> delete_item: my_pattern = ", my_pattern);
    eval(collectionid).removeCallback(my_pattern, delete_ok, delete_ko);
    RMPApplication.debug ("end delete_item");
}

function delete_ok(result)
{
    RMPApplication.debug ("begin delete_ok");
    c_debug(dbug.item, "=> delete_ok: result = ", result);
    var success_msg = ${P_quoted(i18n("delete_ok_msg", "Site deleted!"))};
    notify_success(success_title_notify, success_msg);
    id_report.refresh();
    //empty custom widget
    RMPApplication.set("my_item", "{}");
    RMPApplication.set("action", "add");
    RMPApplication.debug ("end delete_ok");
}

function delete_ko(error)
{
    //Error while deleting item from the collection
    RMPApplication.debug ("begin delete_ko");
    c_debug(dbug.item, "=> delete_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("delete_ko_msg", "Unable to delete site !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end delete_ko");
}

// ======================
// Other functions
// ======================
function item_already_exists(my_object, my_pattern) 
{
    RMPApplication.debug ("begin function item_already_exists");
    c_debug(dbug.item, "=> item_already_exists: my_object = ", my_object);
    c_debug(dbug.item, "=> item_already_exists: my_pattern = ", my_pattern);
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
    c_debug(dbug.item, "=> exists_ok: res = ", res);
    RMPApplication.debug ("end exists_ok");
}

function exists_ko(error) 
{
    RMPApplication.debug ("begin exists_ko");
    c_debug(dbug.item, "=> exists_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("exists_ko_msg", "Check site existence can't be done!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end exists_ko");
}
