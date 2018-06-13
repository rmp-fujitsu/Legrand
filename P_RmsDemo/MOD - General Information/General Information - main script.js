// =======================================
//   General Information: id_main_script
// =======================================
RMPApplication.debug("General Information : Application started");

// ========================
// Variables declaration
// ========================

// if "true", logs will be showed on the browser console
var debug = {
    "datas": false
};

var lanes = {
    "everybody": "405227",
    "all_stores": "405229,405110",
    "support_only": "405161",
    "test_grp_only": "441463"
};

var error_title_notify = ${P_quoted(i18n("error_title_notify", "Error"))};
var info_title_notify = ${P_quoted(i18n("info_title_notify", "Information"))};
var error_thanks_notify = ${P_quoted(i18n("error_thanks_notify", "Thanks to report this error!"))};
var btn_ok = ${P_quoted(i18n("btn_ok", "OK"))};

collect_data();

// =================================================================
// Collect datas from Web Interface before executing the process
// =================================================================
function collect_data()
{
    RMPApplication.debug("begin collect_data");
    c_debug(debug.datas, "=> collect_data");
    var msg_var = {};
    var msg_type = "";
    var msg_recipients = "";

    msg_var.type = msg_type;
    msg_var.recipients = msg_recipients;
    msg_var.content = RMPApplication.get("content");
    RMPApplication.set("msg_var", msg_var);
    c_debug(debug.datas, "=> collect_data: msg_var = ", msg_var);
    RMPApplication.debug("end collect_data");
}