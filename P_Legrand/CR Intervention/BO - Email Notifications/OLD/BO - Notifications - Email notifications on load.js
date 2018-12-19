// =================================
//   BO - Notifications - id_js_on
// =================================

var collectionid_var = "col_legrand_notifications_cri";
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
var nb_objects_in_collection = 0;


// set_email_notifications();

// Récupère toutes les informations liées au notification email existantes dans le workflow existant
function set_email_notifications()
{
    RMPApplication.debug ("begin set_email_notifications");
    var my_pattern = {};
    var options = {};
    eval(collectionid_var).listCallback(my_pattern, options, set_email_notifications_ok, set_email_notifications_ko);
    RMPApplication.debug ("end set_email_notifications");
}

function set_email_notifications_ok(result) 
{
    RMPApplication.debug ("begin set_email_notifications_ok");
    c_debug(dbug.email_notif, "=> set_email_notifications_ok: result = ", result);

	// for (key in notifications) {
	for (var i=0; i<result.length; i++) {
		var my_notif_var = "my_" + result[i].notification_step;
		if (result[i].notification_step == "notif_test_mode") {
			RMPApplication.set("test_email_to", result[i].test_email_to);
		} else {
			RMPApplication.set(eval("\"" + my_notif_var + "." + "live_email_to" + "\""), result[i].live_email_to);
			RMPApplication.set(eval("\"" + my_notif_var + "." + "live_email_cc" + "\""), result[i].live_email_cc);
			RMPApplication.set(eval("\"" + my_notif_var + "." + "acceptance_email_to" + "\""), result[i].acceptance_email_to);
		}
	}
    RMPApplication.debug ("end set_email_notifications_ok");
}

function set_email_notifications_ko(error) 
{
    RMPApplication.debug ("begin set_email_notifications_ko");
    alert("ERROR: no entries in Noficiations collection: " + JSON.stringify(error));
    RMPApplication.debug ("end set_email_notifications_ko");
}

// prepare save_changes
// function save_changes()
// {
// 	RMPApplication.debug ("begin save_changes");
// 	var my_pattern = {};
// 	// drop all the previous contents of Notifications collection
//     eval(collectionid_var).removeCallback(my_pattern, drop_collection_ok, drop_collection_ko);
//     RMPApplication.debug ("end drop_collection");
// }

function drop_collection_ok(result) 
{
    RMPApplication.debug ("begin drop_collection_ok");
	c_debug(dbug.email_notif, "=> drop_collection_ok: result = ", result);
	nb_objects_in_collection = 0;
	c_debug(dbug.email_notif, "=> drop_collection_ok: nb_objects_in_collection = ", nb_objects_in_collection);
	save_emails();
    RMPApplication.debug ("end drop_collection_ok");
}

function drop_collection_ko(error) 
{
    RMPApplication.debug ("begin drop_collection_ko");
	var error_msg = ${P_quoted(i18n("save_changes_ko_msg", "Unable to drop the Notifications collection!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end drop_collection_ko");
}

// count the number of objects in collection and set "nb_objects_in_collection" variable
function entries_count()
{
	RMPApplication.debug ("begin entries_count");
    var my_pattern = {};
    var options = {};
    eval(collectionid_var).listCallback(my_pattern, options, entries_count_ok, entries_count_ko);
    RMPApplication.debug ("end entries_count");
}

function entries_count_ok(result) 
{
    RMPApplication.debug ("begin entries_count_ok");
	c_debug(dbug.email_notif, "=> entries_count_ok: result = ", result);
	nb_objects_in_collection = result.length;
	c_debug(dbug.email_notif, "=> entries_count_ok: nb_objects_in_collection = ", nb_objects_in_collection);
    RMPApplication.debug ("end entries_count_ok");
}

function entries_count_ko(error) 
{
	RMPApplication.debug ("begin entries_count_ko");
	var error_msg = ${P_quoted(i18n("save_changes_ko_msg", "No entries in Notifications collection!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end entries_count_ko");
}

// =====================================================
function save_emails()
{
	RMPApplication.debug ("begin save_emails");

    for (key in notifications) {
		var my_notif_var = "my_" + key;
		var my_pattern = {};
		my_pattern.notification_step = key;
		c_debug(dbug.email_notif, "=> save_emails: my_pattern = ", my_pattern);
		var my_object = {};
		my_object.notification_step = key;
		if (key == "notif_test_mode") {
			my_object.test_email_to = RMPApplication.get("test_email_to");
		} else {
			my_object.live_email_to = RMPApplication.get(eval("\"" + my_notif_var + "." + "live_email_to" + "\""));
			my_object.live_email_cc = RMPApplication.get(eval("\"" + my_notif_var + "." + "live_email_cc" + "\""));
			my_object.acceptance_email_to = RMPApplication.get(eval("\"" + my_notif_var + "." + "acceptance_email_to" + "\""));
		}
		c_debug(dbug.email_notif, "=> save_emails: my_object = ", my_object);
		eval(collectionid_var).saveCallback(my_object, save_emails_ok, save_emails_ko);
	}
	var success_msg = ${P_quoted(i18n("save_emails_ok_msg", "Email notifications are updated with success!"))};
	notify_success(success_title_notify, success_msg);
    RMPApplication.debug ("end save_emails");
}

function save_emails_ok(result)
{
	RMPApplication.debug ("begin save_emails_ok");
	c_debug(dbug.email_notif, "=> save_emails_ok: result = ", result);
    RMPApplication.debug ("end save_emails_ok");
}

function save_emails_ko(error)
{
    RMPApplication.debug ("begin save_emails_ko");
    var error_msg = ${P_quoted(i18n("save_emails_ko_msg", "No changes are applied!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end save_emails_ko");
}