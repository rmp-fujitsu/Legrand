// id_js_main_script

// ========================
// Variables declaration
// ========================

// if "true", logs will be showed on the browser console
var debug = {
	"hidden": false,
    "init": false,
    "ci_file": false,
    "timer": false,
    "update_list": false,
    "email_notif": false
};

var success_title_notify = ${P_quoted(i18n("success_title_notify", "Success"))};
var error_title_notify = ${P_quoted(i18n("error_title_notify", "Error"))};
var error_thanks_notify = ${P_quoted(i18n("error_thanks_notify", "Thanks to report this issue!"))};