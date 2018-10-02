RMPApplication.debug ("Application started");

// ==========================================
// Initialization PART (generic variable)
// according to the context
// ==========================================

// if "true", logs will be showed on the browser console
var dbug = {
    "item": false
};

// ==========================================
// INFORMATION
// "itemid" => "Equipment ID" widget variable
// ==========================================

var itemName = "Tutorial";      // what kind of item ?
var collectionid = "col_tutoriels_bluegate";

var var_list = 
{      // Mandatory fields
    // "affiliates" : "affiliates",
    "class": "class",
    "category" : "category",
    // "category_img": "category_img",
    "product" : "product",
    // "product_img": "product_img",
    "type" : "type",
    // "type_img": "type_img",
    "media_name" : "media_name",
    "media_url" : "media_url",
    "intranet_url" : "intranet_url"
};

var success_title_notify = ${P_quoted(i18n("success_title_notify", "Succès"))};
var error_title_notify = ${P_quoted(i18n("error_title_notify", "Erreur"))};
var error_thanks_notify = ${P_quoted(i18n("error_thanks_notify", "Merci de signaler cette erreur !"))};

// ==============================
// clean custom widget (CW) area
// variable: my_item
// ==============================
function clean_item() 
{
    // clean widget area before any add-action
    RMPApplication.debug ("begin Item cleaned");
    c_debug(dbug.item, "=> begin clean_item");
/*    var img_category_data = eval('(' + RMPApplication.get("my_item.category_img") + ')');
    var img_product_data = eval('(' + RMPApplication.get("my_item.product_img") + ')');
    var img_type_data = eval('(' + RMPApplication.get("my_item.type_img") + ')');
    if (img_category_data.length != 0) {
        id_my_item.id_category_img.selectFileId(img_category_data[0].id);
        id_my_item.id_category_img.deleteSelected();
        id_my_item.id_category_preview.setHtml("");
        id_my_item.id_category_preview.setVisible(false);
    }
    if (img_product_data.length != 0) {
        id_my_item.id_product_img.selectFileId(img_product_data[0].id);
        id_my_item.id_product_img.deleteSelected();
        id_my_item.id_product_preview.setHtml("");
        id_my_item.id_product_preview.setVisible(false);
    }
    if (img_type_data.length != 0) {
        id_my_item.id_type_img.selectFileId(img_type_data[0].id);
        id_my_item.id_type_img.deleteSelected();
        id_my_item.id_type_preview.setHtml("");
        id_my_item.id_type_preview.setVisible(false);
    }*/
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
    var my_object = eval('(' + RMPApplication.get("my_item") + ')');
    c_debug(dbug.item, "=> add_item: my_object = ", my_object);

    if ( isEmpty(my_object.category) && isEmpty(my_object.product) && isEmpty(my_object.type) ) {
        var error_msg1 = ${P_quoted(i18n("add_item_msg1", "La catégorie ou le produit doivent être définis !"))};
        notify_error(error_title_notify, error_msg1 + ' ' + error_thanks_notify);
        RMPApplication.debug ("Error: at least, category or product or type must be set!");
        return;
    }
    
    if(!item_already_exists(my_object)) {
        my_object.itemid = RMPApplication.uuid();
        c_debug(dbug.item, "=> add_item: my_object = ", my_object);
        eval(collectionid).saveCallback(my_object, add_ok, add_ko);
        RMPApplication.debug (my_object);
        RMPApplication.debug ("New" + itemName.toUpperCase() + " added");
    } else {
        var error_msg2 = ${P_quoted(i18n("add_item_msg2", "Le tutoriel existe déjà !"))};
        notify_error(error_title_notify, error_msg2 + ' ' + error_thanks_notify);
        RMPApplication.debug (itemName.toUpperCase() + " already exists!");
    }
    RMPApplication.debug ("end add_item");
}

function add_ok(result)
{
    RMPApplication.debug("begin add_ok");
    c_debug(dbug.item, "=> add_ok: result", result);
    var success_msg = ${P_quoted(i18n("add_ok_msg", "Nouveau tutoriel ajouté !"))};
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
    var error_msg = ${P_quoted(i18n("add_ko_msg", "Sauvegarde impossible du tutoriel !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end add_ko");
}

// ======================
// udpate_item
// ======================
function update_item()
{
    RMPApplication.debug ("begin update_item");
    var my_pattern = {};
    my_pattern.itemid = RMPApplication.get("my_item.itemid");
    c_debug(dbug.item, "=> update_item: my_pattern = ", my_pattern);
    var my_object = eval('(' + RMPApplication.get("my_item") + ')');
    c_debug(dbug.item, "=> update_item: my_object = ", my_object);
    eval(collectionid).updateCallback(my_pattern, my_object, update_ok, update_ko);
    RMPApplication.debug ("end update_item");
}

function update_ok(result)
{
    RMPApplication.debug ("begin update_ok");
    c_debug(dbug.item, "=> update_ok: result", result);
    var success_msg = ${P_quoted(i18n("update_ok_msg", "Informations correctement mises à jour !"))};
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
    var error_msg = ${P_quoted(i18n("update_ko_msg", "Mise à jour impossible du tutoriel !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end update_ko");
}

// ======================
// load_item
// ======================
function load_item(itemid)
{
    RMPApplication.debug ("begin load_item");
    c_debug(dbug.item, "=> load_item: itemid = ", itemid);
    var my_pattern = {};
    my_pattern.itemid = itemid;
    RMPApplication.debug ("my_pattern." + itemid + " = " + my_pattern.itemid);
    eval(collectionid).listCallback(my_pattern, {}, load_ok, load_ko);
    RMPApplication.debug ("end load_item");
}

function load_ok(result)
{
    RMPApplication.debug ("begin load_ok");
    c_debug(dbug.item, "=> load_ok: result", result);
    var success_msg = ${P_quoted(i18n("load_ok_msg", "Informations du tutoriel chargées !"))};
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
    c_debug(dbug.item, "=> load_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("load_ko_msg", "Récupération impossible du tutoriel !"))};
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
    c_debug(dbug.item, "=> delete_item: itemid = ", itemid);
    var my_pattern = {};
    my_pattern.itemid = itemid;
    RMPApplication.debug ("my_pattern." + itemid + " = " + my_pattern.itemid);
    eval(collectionid).removeCallback(my_pattern, delete_ok, delete_ko);
    RMPApplication.debug ("end delete_item");
}

function delete_ok(result)
{
    RMPApplication.debug ("begin delete_ok");
    c_debug(dbug.item, "=> delete_ok: result", result);
    var success_msg = ${P_quoted(i18n("delete_ok_msg", "Tutoriel supprimé !"))};
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
    var error_msg = ${P_quoted(i18n("delete_ko_msg", "Suppression impossible du tutoriel !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end delete_ko");
}

// ======================
// Other functions
// ======================
function item_already_exists(my_object)
{
    RMPApplication.debug ("begin function item_already_exists");
    c_debug(dbug.item, "=> item_already_exists: my_object = ", my_object);
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
    c_debug(dbug.item, "=> exists_ok: result", result);
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
    var error_msg = ${P_quoted(i18n("exists_ko_msg", "L'existence du tutoriel ne peut être vérifiée !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end exists_ko");
}