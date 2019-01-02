// ========================
//   MyTasks : MAIN
// ========================
RMPApplication.debug("MyTasks : Application started");

// ========================
// Variables declaration
// ========================
// if "true", logs will be showed on the browser console
var dbug = {
    "init" : false,
    "function" : false,
};

var login = {};					// metadata user

var error_title_notify = ${P_quoted(i18n("error_title_notify", "Erreur"))};
var error_thanks_notify = ${P_quoted(i18n("error_thanks_notify", "Merci de signaler cette erreur!"))};
var btn_ok = ${P_quoted(i18n("btn_ok", "OK"))};

init();		// execute main program

// ===============================
//   Initialization part
// ===============================
function init() 
{
	RMPApplication.debug("begin init");


    login.email = RMPApplication.get("login");
    c_debug(dbug.init, "=> begin init : login = ", login);

    check_user_lanes();
}

// ====================================================================================
//   Check if user belong to different VIVARTE lanes
// ====================================================================================
function check_user_lanes() 
{
	RMPApplication.debug("begin check_user_lanes : login = " + login);
	c_debug(dbug.function, "=> begin check_user_lanes : login = ", login);

    // CAPI for checking if user belong to some lanes
    var pattern = {};
    var options = {};

	id_legrand_check_user_lanes_api.trigger (pattern, options , check_user_lanes_ok, check_user_lanes_ko); 
    RMPApplication.debug("end check_user_lanes");
    c_debug(dbug.function, "end check_user_lanes");
}

function check_user_lanes_ok(result) 
{
	RMPApplication.debug("begin check_user_lanes_ok: result =  " + JSON.stringify(result));
    c_debug(dbug.function, "=> check user lanes ok: result =  " + JSON.stringify(result));
	// define other "login" variable properties
	login.is_gdc = (result.is_gdc == "true") ? true : false;
	login.is_country_desk = (result.is_country_desk == "true") ? true : false;
	login.is_engineer = (result.is_engineer == "true") ? true : false;
	login.is_sdmo = (result.is_sdmo == "true") ? true : false;
    c_debug(dbug.function, "=>check user lanes ok: login =  " + login);

	set_tab_visibility();

    RMPApplication.debug("end check_user_lanes_ok");
    c_debug(dbug.function, "=> end check_user_lanes_ok");
} 

function check_user_lanes_ko(error) 
{
    
    RMPApplication.debug("begin check_user_lanes_ko: error = " + JSON.stringify(error));
    c_debug(dbug.function, "=> begin check user lanes ko: error = " + JSON.stringify(error));
    var error_msg = ${P_quoted(i18n("get_info_ko_msg", "Vérification impossible des droits de l'utilisateur!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end check_user_lanes_ko");
    c_debug(dbug.function, "=> end check_user_lanes_ko ");
} 

// ====================================================================================
//   Set some sections visibility according to roles user
// ====================================================================================

function set_tab_visibility() 
{
	RMPApplication.debug("begin set_tab_visibility : login = " + login);
    c_debug(dbug.function, "=> begin set_tab_visibility : login = " + login);
	// Following tab will be opened at start according specific users
	// Tab [0]: My tasks
	// Tab [1]: To close
	// Tab [2]: Requests (draft)
    // Tab [3]: My Tasks (Country)
    // Tab [4]: Country Desk
	// Tab [5]: Engineer
	// Tab [6]: GDC - All
    // Tab [7]: Designer View
    
	if (login.is_gdc == true) {
        id_tabs_my_tasks.setSelectedTabIndex(1);        // To close 
    }
    
    else if (login.is_country_desk == true) {
        id_tabs_my_tasks.setSelectedTabIndex(3);		// My tasks (Country)
    }
       
    else if (login.is_engineer == true) {
        id_tabs_my_tasks.setSelectedTabIndex(0);		// My tasks
	}
    
    RMPApplication.debug("end set_tab_visibility");
    c_debug(dbug.function, "=> end set_tab_visibility");
}
