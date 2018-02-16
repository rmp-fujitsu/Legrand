// ========================
//   id_main_script
// ========================
RMPApplication.debug("Update Ticket : Application started");

// ========================
// Variables declaration
// ========================

// if "true", logs will be showed on the browser console
var debug = {
	"user_info": false,
	"dates_check": false,
	"work_order": false,
	"intervention": false
};

var error_title_notify = ${P_quoted(i18n("error_title_notify", "Error"))};
var info_title_notify = ${P_quoted(i18n("info_title_notify", "Information"))};
var error_thanks_notify = ${P_quoted(i18n("error_thanks_notify", "Thanks to report this error!"))};
var btn_ok = ${P_quoted(i18n("btn_ok", "OK"))};

