// ============================
//   BO - Notifications - MAIN
// ============================
RMPApplication.debug("BO - Notifications: Application started");

// ========================
// Variables declaration
// ========================

// if "true", logs will be showed on the browser console
var dbug = {
	"hidden": false,
    "init": false,
	"email_notif": false,
	"country": false,
	"popup": false
};

var itemName = "Country";      // what kind of item ?
var collectionid = "col_legrand_notifications_cri";		// name of collection
var selected_item = "rmpoption0_2"; // Retrieve the id of the tab to assign it a color / background color inside ready.js

var country_var_list =
{
    "country": "country",
    "iso_country": "iso_country"
};
var notifications = {
	"notif_new_request_to_country": {},
	"notif_gdc_about_eta": {},
	"notif_inform_legrand_next_intervention": {},
	"notif_legrand_about_closure": {},
	"notif_gdc_about_closure": {},
	"notif_gdc_about_issue": {},
	"notif_country_plan_new_intervention": {},
	"notif_test_mode": {}
};
var notif_entries = [];         // contains all entries in Notifications collection
var selected_country_info = {};

// Modal box variables
var obj = "my_country";
var id_obj = "id_" + obj;
var country_modal = $('[id="' + id_obj + '"]').dialog({ 
	autoOpen: false, 
	modal: true, 
	stack: false,  
	width: 450,
	title: 'Country Information'
});

var success_title_notify = ${P_quoted(i18n("success_title_notify", "Success"))};
var error_title_notify = ${P_quoted(i18n("error_title_notify", "Error"))};
var error_thanks_notify = ${P_quoted(i18n("error_thanks_notify", "Thanks to report this issue!"))};

// Fill country box when opening the page
get_entries();

// ==============================
// clean custom widget (CW) area
// variable: my_country
// ==============================
function clean_item()
{
    // clean widget area before any add-action
    RMPApplication.debug ("begin " + itemName + " Widget Area cleaned");
    c_debug(dbug.country, "=> begin clean_item");
    for (var key in country_var_list) {
        var field = "my_country" + "." + key;
        RMPApplication.set(field, "");
    }
    RMPApplication.debug("end " + itemName + " Widget Area cleaned");
}

// ===========================================================================
//  Open a modal box for filling basic information related to a new country
// ===========================================================================
function add_new_country() 
{
    RMPApplication.debug ("begin function add_new_country");
    c_debug(dbug.country, "=> Begin add_new_country");
    clean_item();
    $(country_modal).dialog('open');
    RMPApplication.debug ("end add_new_country");
}

// ===========================================================================
//  Reset fields before closing New country modal box
// ===========================================================================
function popup_cancel()
{
    RMPApplication.debug ("begin function popup_cancel");
    c_debug(dbug.country, "=> Begin popup_cancel");
    $(country_modal).dialog('close');
    clean_item();
    RMPApplication.debug ("end popup_cancel");
}

// ===========================================================================
//  Save the new country if it doesn't already exist in collection
// ===========================================================================
function save_country()
{
    RMPApplication.debug ("begin function save_country");
    c_debug(dbug.country, "=> Begin save_country");
	var my_object = {};
    my_object.country = RMPApplication.get(eval("\"" + obj + "." + "country" + "\"")).toUpperCase();
    my_object.iso_country = RMPApplication.get(eval("\"" + obj + "." + "iso_country" + "\"")).toUpperCase();
    c_debug(dbug.country, "=> save_country: my_object", my_object);
    if (!country_already_exists(my_object)) {
        c_debug(dbug.country, "=> save_country: Country doesn't exist => Try to save this new country in the collection.");
        eval(collectionid).saveCallback(my_object, add_country_ok, add_country_ko);
    } else {
        var error_msg2 = ${P_quoted(i18n("save_country_msg2", "Country already exists and can not be created again!"))};
        notify_warning(error_title_notify, error_msg2 + ' ' + 'You must modify current entry for this country.');
    }
    RMPApplication.debug ("end save_country");
}


function add_country_ok(result)
{
    RMPApplication.debug ("begin function add_country_ok");
    c_debug(dbug.country, "=> Begin add_country_ok: result = ", result);
    var success_msg = ${P_quoted(i18n("add_ok_msg", "New country added in collection!"))};
    notify_success(success_title_notify, success_msg);
    // Close and clean popup box
    popup_cancel();
    
	// with this new country addition, we need to update the list of countries
	selected_country_info = {};
    get_entries();
    RMPApplication.debug ("end add_country_ok");
}

function add_country_ko(error)
{
    RMPApplication.debug ("begin function add_country_ko");
    c_debug(dbug.item, "=> add_country_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("add_country_ko", "Country can not be saved!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);

    RMPApplication.debug ("end add_country_ko");
}

// ===========================================================================
//  Check in collection if the country doesn't already exist
// ===========================================================================
function country_already_exists(my_object)
{
    RMPApplication.debug ("begin function country_already_exists");
    c_debug(dbug.country, "=> country_already_exists: my_object = ", my_object);
    var my_pattern = {};
	for (var key in my_object) {
		my_pattern[key] = (my_object[key] !== "") ? my_object[key] : "";
	}
    var options = {};
	options.asynchronous = false;
	res = false;
    eval(collectionid).listCallback(my_pattern, options, country_exists_ok, country_exists_ko);
    RMPApplication.debug ("end function country_already_exists");
	return res;
}

function country_exists_ok(result) 
{
    RMPApplication.debug ("begin country_exists_ok");
    c_debug(dbug.country, "=> country_exists_ok: result = ", result);
    if (result[0]) {
        res = true;
    } else {
        res = false;
    }
    RMPApplication.debug ("end country_exists_ok");
}

function country_exists_ko(error)
{
    RMPApplication.debug ("begin country_exists_ko");
    c_debug(dbug.country, "=> country_exists_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("country_exists_ko_msg", "Country existence could not be verified!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end country_exists_ko");
}

// ===========================================================================
//   Retrieve all entries in collection
// ===========================================================================
function get_entries()
{
    RMPApplication.debug ("begin get_entries");
    c_debug(dbug.country, "=> get_entries");
    var my_pattern = {};    // we retrieve all objects in collection
    var options = {};
    eval(collectionid).listCallback(my_pattern, options, get_entries_ok, get_entries_ko);
    RMPApplication.debug ("end get_entries");
}

function get_entries_ok(result) 
{
    RMPApplication.debug ("begin get_entries_ok");
    c_debug(dbug.country, "=> get_entries_ok: result = ", result);
    // save results in a new array
    notif_entries =  result.slice();

    // Create of a list of countries, ordered alphabetically
    if (Object.keys(selected_country_info).length === 0 && selected_country_info.constructor === Object) {
        set_countries_list();
    }
    RMPApplication.debug ("end get_entries_ok");
}

function get_entries_ko(error)
{
    RMPApplication.debug ("begin get_entries_ko");
    c_debug(dbug.country, "=> get_entries_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("get_entries_ko_msg", "Can not retrieve ant entry from collection!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end get_entries_ko");
}

// ========================================================================================
//   Create a list of countries referenced in collection to fil a dedicated selection box
// ========================================================================================
function set_countries_list()
{
    RMPApplication.debug ("begin set_countries_list");
    c_debug(dbug.country, "=> set_countries_list");

    $("#id_countryFilter").empty();    // field reset

    if (notif_entries.length > 0) {
        // We propose a list of countries, but only one location must be selected by the user

        // to permit the display of placeholder
        $("#id_countryFilter").append($("<option />").html(''));

        // notif_entries is alphabetically ordered
        var text_countryFilter = ${P_quoted(i18n("countryFilter_text", "Select an existing country"))};
        $("#id_countryFilter").append($("<option selected />").val('none').html(text_countryFilter));
        notif_entries = notif_entries.sort(sortArrayByKey({key: 'country', string: true}, false) );

        // We populate selection box with all locations match filter queries
        $.each(notif_entries, function() {
            var id_i = this.country.toUpperCase();
            var text_i = "&#10143; " + this.country.toUpperCase() + " - " + this.iso_country.toUpperCase();
            $("#id_countryFilter").append($("<option />").val(id_i).html(text_i));
        });

    } else {    
        // if notif_entries is empty, "false" is affected to "value"
        var error_msg = ${P_quoted(i18n("set_countries_list_msg", "No country exists in collection!"))};
        notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    }
    c_debug(dbug.country, "=> end set_countries_list: notif_entries = ", notif_entries);

    // Listen changes before populating dynamically countries select box
    $("#id_countryFilter").change(set_email_notifications);

    RMPApplication.debug ("end set_countries_list");
}

function set_email_notifications() 
{
    RMPApplication.debug ("begin set_email_notifications");
    // Retrieving user's input value
    var country_value = $("#id_countryFilter").val();

    c_debug(dbug.email_notif, "=> set_email_notifications: country_value = ", country_value);

	for (var i=0; i<notif_entries.length; i++) {

        if (notif_entries[i].country.toUpperCase() == country_value) {
            
            selected_country_info = notif_entries[i];
            c_debug(dbug.email_notif, "=> set_email_notifications: selected_country_info = ", selected_country_info);
            
            // if the country is just created, we don't have any email notification entries
            if (notif_entries[i].hasOwnProperty('notifications')) {
                for (var j=0; j<notif_entries[i].notifications.length; j++) {
                    var my_notif_var = "my_" + notif_entries[i].notifications[j].notification_step;
                    c_debug(dbug.email_notif, "=> set_email_notifications: step = ", notif_entries[i].notifications[j].notification_step);

                    if (notif_entries[i].notifications[j].notification_step == "notif_test_mode") {
                        RMPApplication.set("test_email_to", notif_entries[i].notifications[j].test_email_to);
                    } else {
                        RMPApplication.set(eval("\"" + my_notif_var + "." + "live_email_to" + "\""), notif_entries[i].notifications[j].live_email_to);
                        RMPApplication.set(eval("\"" + my_notif_var + "." + "live_email_cc" + "\""), notif_entries[i].notifications[j].live_email_cc);
                        RMPApplication.set(eval("\"" + my_notif_var + "." + "acceptance_email_to" + "\""), notif_entries[i].notifications[j].acceptance_email_to);
                    }
                } 
            } else {
				// we need to reset all notification fields
				for (key in notifications) {
					var my_notif_var = "my_" + key;
					if (key == "notif_test_mode") {
						RMPApplication.set("test_email_to", "");
					} else {
						RMPApplication.set(eval("\"" + my_notif_var + "." + "live_email_to" + "\""), "");
						RMPApplication.set(eval("\"" + my_notif_var + "." + "live_email_cc" + "\""), "");
						RMPApplication.set(eval("\"" + my_notif_var + "." + "acceptance_email_to" + "\""), "");
					}
					c_debug(dbug.email_notif, "=> set_email_notifications: all fields are resseted");
				}
			}
			break;			// we don't need to continue as we find the selected country
        }
    }
    RMPApplication.debug ("end set_email_notifications_ok");
}

// ========================================================================================
//   Save email notifications changes in collection
// ========================================================================================
function save_changes()
{
    RMPApplication.debug ("begin save_changes");

    // Select which country to be updated in collection
    var my_pattern = {};
    my_pattern.country = selected_country_info.country;
    c_debug(dbug.email_notif, "=> save_changes: my_pattern = ", my_pattern);
    
    // prepare country object to be saved in collection
    var my_object = {};
    my_object.country = selected_country_info.country;
    my_object.iso_country = selected_country_info.iso_country;
    my_object.notifications = [];

    for (key in notifications) {
        var my_notif_var = "my_" + key;
        var sub_object = {};
        sub_object.notification_step = key;
        if (key == "notif_test_mode") {
			sub_object.test_email_to = RMPApplication.get("test_email_to");
		} else {
			sub_object.live_email_to = RMPApplication.get(eval("\"" + my_notif_var + "." + "live_email_to" + "\""));
			sub_object.live_email_cc = RMPApplication.get(eval("\"" + my_notif_var + "." + "live_email_cc" + "\""));
			sub_object.acceptance_email_to = RMPApplication.get(eval("\"" + my_notif_var + "." + "acceptance_email_to" + "\""));
		}
        c_debug(dbug.email_notif, "=> save_changes: sub_object = ", sub_object);
        // We add this new email notification step to country object
        my_object.notifications.push(sub_object);
    }
    
    c_debug(dbug.email_notif, "=> save_changes: my_object = ", my_object);
    // Save changes for this country in collection
    eval(collectionid).updateCallback(my_pattern, my_object, save_changes_ok, save_changes_ko);
    RMPApplication.debug ("end save_changes");
}

function save_changes_ok(result)
{
	RMPApplication.debug ("begin save_changes_ok");
    c_debug(dbug.email_notif, "=> save_changes_ok: result = ", result);
    var success_msg = ${P_quoted(i18n("save_changes_ok_msg", "Email notifications are updated with success!"))};
    notify_success(success_title_notify, success_msg);
    // we update notif_entries variable
    get_entries();
    RMPApplication.debug ("end save_changes_ok");
}

function save_changes_ko(error)
{
    RMPApplication.debug ("begin save_changes_ko");
    var error_msg = ${P_quoted(i18n("save_changes_ko_msg", "No changes are applied!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end save_changes_ko");
}

// ==============================
// Generates a unique ID
// ==============================
function uniqueId()
{
	var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
	do {
		// between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
		var ascicode = Math.floor((Math.random() * 42) + 48);
		if (ascicode < 58 || ascicode > 64) {
			// exclude all chars between : (58) and @ (64)
			idstr += String.fromCharCode(ascicode);
		}
	} while (idstr.length < 32);
	
	return (idstr);
}