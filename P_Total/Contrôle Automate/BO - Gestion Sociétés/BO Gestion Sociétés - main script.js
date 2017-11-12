RMPApplication.debug ("Application started");

// ==========================================
// Initialization PART (generic variable)
// according to the context
// ==========================================

// ========================
// Variables declaration
// ========================

// if "true", logs will be showed on the browser console
var debug = {
    "init" : true,
    "add" : true,
    "update" : true,
    "load" : true,
    "delete" : true,
    "exists" : true
};

// ==========================================
// INFORMATION
// "itemid" => "Societe ID" widget variable
// ==========================================

var itemName = "Société";      // what kind of item ?
var collectionid = "col_societes_controle_automate";

var var_list = 
{
    "societe" : "societe",
    "email_resp" : ""           // field not mandatory
};

// The following fields will be transformed in uppercase
var upper_fields = ["societe"];

var success_title_notify = ${P_quoted(i18n("success_title_notify", "Succès"))};
var error_title_notify = ${P_quoted(i18n("error_title_notify", "Erreur"))};
var error_thanks_notify = ${P_quoted(i18n("error_thanks_notify", "Merci de signaler cette erreur!"))};

// ==============================
// clean custom widget (CW) area
// variable: my_item
// ==============================
function clean_item()
{
    // clean widget area before any add-action
    RMPApplication.debug ("begin Item cleaned");
    c_debug(debug.init, "=> clean_item");
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
    c_debug(debug.add, "=> add_item");
    var my_object = eval('(' + RMPApplication.get("my_item") + ')');
    c_debug(debug.add, "=> add_item: my_object (initial) = ", my_object);


    for (key in var_list)  {
        if ( (var_list[key] !== "" || RMPApplication.validate() == false ) && RMPApplication.get("my_item." + key) == undefined ) {

        var error_msg1 = ${P_quoted(i18n("add_item_msg1", "doit être défini(e)!"))};
        notify_error(error_title_notify, key + "(" + var_list[key] + ")" + error_msg1);
        return;
        } 
        if (!isEmpty(upper_fields)) {
            if (upper_fields.indexOf(key) > -1) {
                RMPApplication.set("my_item." + key, my_object[key].toUpperCase());
            }
        }
    }
    my_object = eval('(' + RMPApplication.get("my_item") + ')');
    c_debug(debug.add, "=> add_item: my_object (fullfilled) = ", my_object);

    if(!item_already_exists(my_object)) {
        my_object.itemid = RMPApplication.uuid();
        eval(collectionid).saveCallback(my_object, add_ok, add_ko);
        c_debug(debug.add, "=> add_item: New item added = ", itemName.toUpperCase());

    } else {
        var error_msg2 = ${P_quoted(i18n("add_item_msg2", "La société existe déjà!"))};
        notify_error(error_title_notify, error_msg2 + ' ' + error_thanks_notify);
    }
    RMPApplication.debug ("end add_item");
}

function add_ok(result)
{
    RMPApplication.debug("begin add_ok");
    c_debug(debug.add, "=> add_ok: result = ", result);
    var success_msg = ${P_quoted(i18n("add_ok_msg", "Nouvelle société ajoutée!"))};
    notify_success(success_title_notify, success_msg);
    clean_item();
    id_report.refresh();
    RMPApplication.debug("end add_ok");    
}

function add_ko(error)
{
    //Error while adding item in the collection
    RMPApplication.debug("begin add_ko");
    c_debug(debug.add, "=> add_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("add_ko_msg", "Sauvegarde impossible de la société!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end add_ko");
}

// ======================
// udpate_item
// ======================
function update_item(itemid)
{
    RMPApplication.debug ("begin update_item");
    c_debug(debug.update, "=> update_item: itemid = ", itemid);
    var my_pattern = {};
    my_pattern.itemid = RMPApplication.get("my_item.itemid");
    var my_object = eval('(' + RMPApplication.get("my_item") + ')');
    c_debug(debug.add, "=> update_item: my_object (initial) = ", my_object);

    for (key in var_list)  {
        if (!isEmpty(upper_fields)) {
            if (upper_fields.indexOf(key) > -1) {
                RMPApplication.set("my_item." + key, my_object[key].toUpperCase());
            }
        }
    }
    var my_object = eval('(' + RMPApplication.get("my_item") + ')');
    c_debug(debug.add, "=> update_item: my_object (fullfilled) = ", my_object);
    eval(collectionid).updateCallback(my_pattern, my_object, update_ok, update_ko);
    RMPApplication.debug ("end update_item");
}

function update_ok(result)
{
    RMPApplication.debug ("begin update_ok");
    c_debug(debug.update, "=> update_ok: result = ", result);
    var success_msg = ${P_quoted(i18n("update_ok_msg", "Informations correctement mises à jour!"))};
    notify_success(success_title_notify, success_msg);
    clean_item();
    id_report.refresh();
    RMPApplication.debug ("end update_ok");
}

function update_ko(error)
{
    //Error while updating item in the collection
    RMPApplication.debug ("begin update_ko");
    c_debug(debug.update, "=> update_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("update_ko_msg", "Mise à jour impossible de la société!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end update_ko");
}

// ======================
// load_item
// ======================
function load_item(itemid)
{
    RMPApplication.debug ("begin load_item");
    c_debug(debug.load, "=> load_item: itemid = ", itemid);
    var my_pattern = {};
    my_pattern.itemid = itemid;
    RMPApplication.debug ("my_pattern." + itemid + " = " + my_pattern.itemid);
    eval(collectionid).listCallback(my_pattern, {}, load_ok, load_ko);
    RMPApplication.debug ("end load_item");
}

function load_ok(result)
{
    RMPApplication.debug ("begin load_ok");
    c_debug(debug.load, "=> load_ok: result", result);
    var success_msg = ${P_quoted(i18n("load_ok_msg", "Informations de la société chargées!"))};
    notify_success(success_title_notify, success_msg); 
    id_details_item.setVisible(true);
    id_details_item.open();
    RMPApplication.set("my_item", result[0]);
    RMPApplication.set("action", "update");
    RMPApplication.debug ("end load_ok");
}

function load_ko(error)
{
    RMPApplication.debug ("begin load_ko");
    c_debug(debug.load, "=> load_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("load_ko_msg", "Récupération impossible de la société!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    id_report.refresh();
    RMPApplication.debug ("end load_ko");
}

// ======================
// delete_item
// ======================
function delete_item(itemid)
{
    RMPApplication.debug ("begin delete_item");
    c_debug(debug.delete, "=> delete_item: itemid = ", itemid);
    var my_pattern = {};
    my_pattern.itemid = itemid;
    RMPApplication.debug ("my_pattern." + itemid + " = " + my_pattern.itemid);
    eval(collectionid).removeCallback(my_pattern, delete_ok, delete_ko);
    RMPApplication.debug ("end delete_item");
}

function delete_ok(result)
{
    RMPApplication.debug ("begin delete_ok");
    c_debug(debug.delete, "=> delete_ok: result", result);
    var success_msg = ${P_quoted(i18n("delete_ok_msg", "Société supprimée!"))};
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
    c_debug(debug.delete, "=> delete_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("delete_ko_msg", "Suppression impossible de la société!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end delete_ko");
}

// ======================
// Other functions
// ======================
function item_already_exists(my_object) 
{
    RMPApplication.debug ("begin function item_already_exists");
    c_debug(debug.exists, "=> item_already_exists: my_object = ", my_object);
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

function exists_ok(result)
{
    RMPApplication.debug ("begin exists_ok");
    c_debug(debug.exists, "=> exists_ok: result", result);
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
    c_debug(debug.exists, "=> exists_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("exists_ko_msg", "L'existence de la société ne peut être vérifiée!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end exists_ko");
}
