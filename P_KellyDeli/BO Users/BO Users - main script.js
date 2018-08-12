RMPApplication.debug ("Application started");

// ==========================================
// Initialization PART (generic variable)
// according to the context
// ==========================================

// if "true", logs will be showed on the browser console
var dbug = {
    "item": true,
    "user_info": true,
    "pres": true
};

var itemName = "User";      // what kind of item ?
// var collectionid = "col_users_kellydeli";
var kiosk_users_lane = "402267";
var region_users_lane = "402314";

var user_properties = 
{
    // "company" : "company",               // is fixed - only one value (one company)
    // "affiliate" : "affiliate",           // is fixed - only one value (one affiliate)
    "name" : "name",
    "email" : "email",
    "language" : "language",
    "phone" : "phone",
    "country" : "country",
    "timezone" : "timezone",
    "profile" : "profile",
    "region" : "region",
    "main_kiosk" : "main_kiosk",
    "kiosks_list" : "kiosks_list"

};

var login = {};
var selected_action;
var add_user_action = ${P_quoted(i18n("add_user_action", "Ajouter un utilisateur"))};
var delete_user_action = ${P_quoted(i18n("delete_user_action", "Supprimer un utilisateur"))};
var replace_user_action = ${P_quoted(i18n("replace_user_action", "Remplacer un utilisateur"))};
var update_user_action = ${P_quoted(i18n("update_user_action", "Mettre à jour un profil"))};
var actions = {
     "add_user_action": add_user_action,
     "delete_user_action": delete_user_action,
     "replace_user_action": replace_user_action,
     "update_user_action": update_user_action
};

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
    c_debug(dbug.item, "=> begin init");

    CSS_changes();
    prepare_user_action();
    fill_actions_box();

    RMPApplication.debug("end init");
}

// ===============================
//   Apply some specific CSS
// ===============================
function CSS_changes()
{
    RMPApplication.debug("begin CSS_changes");
    c_debug(dbug.item, "=> begin CSS_changes");
    $("#id_user").addClass("bkg-light-blue");
    $("#id_new_user").addClass("bkg-light-green");

    RMPApplication.debug("end CSS_changes");
}

// ===========================================
// Fill possible user's actions to do/request
// ===========================================
function fill_actions_box()
{
    RMPApplication.debug ("begin fill_actions_box");
    c_debug(dbug.item, "=> begin fill_actions_box");

    var vb_actions = new Array();
    for (key in actions)  {
        vb_actions.push({"label": " ● " + actions[key], "value": key});
    }
    c_debug(dbug.item, "    fill_actions_box : vb_actions = ", vb_actions);
        
    var a = new RMP_List();
    a.fromArray(vb_actions);
    RMPApplication.setList("vb_actions", a);

    RMPApplication.debug ("end fill_actions_box");
}

// ==================================
//   get user's Metadata information
// ==================================
function get_info() 
{
    RMPApplication.debug("begin get_info");
    var options = {};
    var pattern = {};
    pattern.login = RMPApplication.get("existing_account");
    c_debug(dbug.user_info, "=> get_info: pattern = ", pattern);

    id_get_user_info_as_admin_api.trigger (pattern, options , get_info_ok, get_info_ko); 
    RMPApplication.debug("end get_info");
}

// ============================================
// Get user details from user metadata details
// ============================================
function get_info_ok(result)
{
    RMPApplication.debug("begin get_info_ok: result =  " + JSON.stringify(result));
    c_debug(dbug.user_info, "=> get_info_ok: result = " + JSON.stringify(result));

    // define "login" variable properties
    login.user = result.user;
    login.email = (!isEmpty(result.user)) ? result.user.trim() : '';
    login.phone = (!isEmpty(result.phone)) ? result.phone.trim() : '';
    login.timezone = result.timezone;
    login.profil = result.profil;
    login.company = (!isEmpty(result.compagnie)) ? result.compagnie.trim().toUpperCase() : '';
    login.grp_affiliates = (!isEmpty(result.grp_ens)) ? result.grp_ens.trim().toUpperCase() : '';
    login.affiliates_access = (!isEmpty(result.acces_enseignes)) ? result.acces_enseignes.trim().toUpperCase() : '';  
    login.affiliate = (!isEmpty(result.enseigne)) ? result.enseigne.trim().toUpperCase() : '';
    login.country = (!isEmpty(result.pays)) ? result.pays.trim().toUpperCase() : '';
    login.location_code = (!isEmpty(result.code_magasin)) ? result.code_magasin.trim().toUpperCase() : '';
    login.division = (!isEmpty(result.division)) ? result.division.trim().toUpperCase() : '';
    login.region = (!isEmpty(result.region)) ? result.region.trim().toUpperCase() : '';
    login.is_super_user = (!isEmpty(result.is_super_user)) ? result.is_super_user.toUpperCase() : '';
    c_debug(dbug.user_info, "=> get_info_ok: login = ", login);

    RMPApplication.debug("end get_info_ok");
}

function get_info_ko(error)
{
    RMPApplication.debug("=> begin get_info_ko: error = " + JSON.stringify(error));
    c_debug(dbug.user_info, "=> get_info_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("user_info_ko_msg", "Impossible de récupérer les informations de l'utilisateur !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end get_info_ko");
}

// ============================================
//   set user's Metadata information on screen
// ============================================
function set_info(user_login) 
{
    RMPApplication.debug("begin set_info");
    c_debug(dbug.user_info, "=> set_info: user_login = ", user_login);

    for (key in user_properties) {
        RMPApplication.set(key, user_login[key]);
    }

    RMPApplication.debug("end set_info");
}

// ==================================================
//   According to user's choice, make somme actions
// ==================================================
function prepare_user_action()
{
     RMPApplication.debug("begin prepare_user_action");
    c_debug(dbug.pres, "=> prepare_user_action: widget_name");
    
    var action = RMPApplication.get("user_action");
    var account_selected = (!isEmpty(RMPApplication.get("existing_account")));

    switch (action) {
            case "add_user_action" :
                id_user.setVisible(true);
                id_new_user.setVisible(false);
                RMPApplication.set("existing_account", "");
                set_fields_active("id_my_user", true);
                break;
            
            case "delete_user_action" :
                id_user.setVisible(account_selected);
                id_new_user.setVisible(false);
                set_fields_active("id_my_user", false);
                break;
            
            case "replace_user_action" :
                id_user.setVisible(account_selected);
                id_new_user.setVisible(account_selected);
                set_fields_active("id_my_user", false);
                break;
            
            case "update_user_action" :  
                id_user.setVisible(account_selected);
                id_new_user.setVisible(false);
                set_fields_active("id_my_user", true);
                break;

            default:                        // no selection
                id_user.setVisible(false);
                id_new_user.setVisible(false);
                RMPApplication.set("existing_account", "");
                break;
        }
    RMPApplication.debug("end prepare_user_action");
}

// ============================================
//   We set as active or inactive all Widget fields
// ============================================
function set_fields_active(widget_name, bool)
{
    RMPApplication.debug("begin set_fields_active");
    c_debug(dbug.pres, "=> set_fields_active: widget_name = ", widget_name);
    c_debug(dbug.pres, "=>                  : bool = ", bool);

    var action = RMPApplication.get("user_action");
    for (key in user_properties) {
        var id_widget = widget_name + ".id_" + key;
        c_debug(dbug.pres, "=>                  : id_widget = ", id_widget);
        if (key != "email") {
            eval(id_widget).setEnabled(bool);
        } else if (action == "update_user_action") {
            eval(id_widget).setEnabled(false);
        } else {
            eval(id_widget).setEnabled(bool);
        }
    }

    RMPApplication.debug("end set_fields_active");
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
    for (key in var_list)  {
        if (key != "code_language") {
            RMPApplication.set(key, "");
        }
    }
    RMPApplication.debug("end " + itemName + " Widget Area cleaned");
}

// ======================
// add_item
// ======================
function add_item()
{
    RMPApplication.debug ("begin add_item");
    var code_language = RMPApplication.get("code_language");
    c_debug(dbug.item, "=> add_item: code_language = ", code_language);
    var my_object = {};
    for (key in var_list)  {
        my_object[key] = RMPApplication.get(key);
    }
    
    if (!item_already_exists(code_language)) {

        c_debug(dbug.item, "=> add_item: my_object", my_object);
        eval(collectionid).saveCallback(my_object, add_ok, add_ko);
        RMPApplication.debug ("New" + itemName.toUpperCase() + " added");
    } else {
        c_debug(dbug.item, "=> update_item: my_object", my_object);
        update_item(my_object);
        RMPApplication.debug (itemName.toUpperCase() + " will be updated!");
    }
    RMPApplication.debug ("end add_item");
}

function add_ok(result)
{
    RMPApplication.debug("begin add_ok");
    c_debug(dbug.item, "=> add_ok: result", result);
    var success_msg = ${P_quoted(i18n("add_ok_msg", "Nouvelle langue ajoutée !"))};
    notify_success(success_title_notify, success_msg);
    RMPApplication.debug("end add_ok");
}

function add_ko(error)
{
    //Error while adding item in the collection
    RMPApplication.debug("begin add_ko");
    c_debug(dbug.item, "=> update_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("add_ko_msg", "Sauvegarde impossible de langue !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end add_ko");
}

// ======================
// udpate_item
// ======================
function update_item(my_object)
{
    RMPApplication.debug ("begin update_item");
    c_debug(dbug.item, "=> update_item: my_object = ", my_object);
    var my_pattern = {};
    my_pattern.code_language = RMPApplication.get("code_language");
    eval(collectionid).updateCallback(my_pattern, my_object, update_ok, update_ko);
    RMPApplication.debug ("end update_item");
}

function update_ok(result)
{
    RMPApplication.debug ("begin update_ok");
    c_debug(dbug.item, "=> update_ok: result", result);
    var success_msg = ${P_quoted(i18n("update_ok_msg", "Informations correctement mises à jour !"))};
    notify_success(success_title_notify, success_msg);
    RMPApplication.debug ("end update_ok");
}

function update_ko(error)
{
    //Error while updating item in the collection
    RMPApplication.debug ("begin update_ko");
    c_debug(dbug.item, "=> update_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("update_ko_msg", "Mise à jour impossible de la collection !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end update_ko");
}

// ======================
// load_item
// ======================
function load_item(code_language)
{
    RMPApplication.debug ("begin load_item");
    c_debug(dbug.item, "=> load_item: code_language = ", code_language);
    var my_pattern = {};
    my_pattern.code_language = code_language;
    RMPApplication.debug ("my_pattern.code_language = " + my_pattern.code_language);    
    eval(collectionid).listCallback(my_pattern, {}, load_ok, load_ko);
    RMPApplication.debug ("end load_item");
}

function load_ok(result)
{
    RMPApplication.debug ("begin load_ok");
    c_debug(dbug.item, "=> load_ok: result", result);
    clean_item();
    if (result.length > 0) {
        for (key in var_list)  {
            if (key != "code_language") { 
                RMPApplication.set(key, result[0][key])
            }
        }
        var success_msg = ${P_quoted(i18n("load_ok_msg", "Informations de la collection chargées !"))};
        notify_success(success_title_notify, success_msg);
    }
    RMPApplication.debug ("end load_ok");
}

function load_ko(error)
{
    RMPApplication.debug ("begin load_ko");
    c_debug(dbug.item, "=> load_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("load_ko_msg", "Récupération impossible des données !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end load_ko");
}

// ======================
// delete_item
// ======================
function delete_item(code_language)
{
    RMPApplication.debug ("begin delete_item");
    c_debug(dbug.item, "=> delete_item: code_language = ", code_language);
    var my_pattern = {};
    my_pattern.code_language = code_language;
    RMPApplication.debug ("my_pattern.code_language = " + my_pattern.code_language);  
    eval(collectionid).removeCallback(my_pattern, delete_ok, delete_ko);
    RMPApplication.debug ("end delete_item");
}

function delete_ok(result)
{
    RMPApplication.debug ("begin delete_ok");
    c_debug(dbug.item, "=> delete_ok: result", result);
    var success_msg = ${P_quoted(i18n("delete_ok_msg", "Langue supprimée !"))};
    notify_success(success_title_notify, success_msg);
    // clean_item();
    RMPApplication.debug ("end delete_ok");
}

function delete_ko(error)
{
    //Error while deleting item from the collection
    RMPApplication.debug ("begin delete_ko");
    c_debug(dbug.item, "=> delete_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("delete_ko_msg", "Suppression impossible de la langue !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end delete_ko");
}

// ======================
// Other functions
// ======================
function item_already_exists(code_language) 
{
    RMPApplication.debug ("begin function item_already_exists");
    c_debug(dbug.item, "=> item_already_exists: code_language = ", code_language);
    var my_pattern = {};
    my_pattern.code_language = code_language;
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
    var error_msg = ${P_quoted(i18n("exists_ko_msg", "La langue n'a pu être trouvée !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end exists_ko");
}