// ========================
//   MyTasks : MAIN
// ========================
RMPApplication.debug("MyTasks : Application started");

// ========================
// Variables declaration
// ========================
var login = {};					// metadata user
var view;						// view definition according to metadata values
var enseigne = null;            // affiliate's login user
// var affiliateList = null;       // group of alliliates for specific GRP_AFF view/scope

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
	// console.log("begin init");

	// resetWI();						// reset Web Interface  & hide sub-level area
	var options = {};
	var pattern = {};
	pattern.login = RMPApplication.get("login");
    // console.log("=> init: pattern = ", pattern);

    // CAPI for getting user information
	id_get_user_info_as_admin_api.trigger (pattern, options , get_info_ok, get_info_ko); 
	RMPApplication.debug("end init");
}

// ============================================
// Get user details from user metadata details
// ============================================
function get_info_ok(result)
{
	RMPApplication.debug("begin get_info_ok: result =  " + JSON.stringify(result));
	// console.log("=> get_info_ok: result = ", result);

    // define "login" variable properties
	login.user = result.user;
	login.email = (!isEmpty(result.user)) ? result.user.trim() : '';
    login.phone = (!isEmpty(result.phone)) ? result.phone.trim() : '';
	login.timezone = result.timezone;
    login.company = (!isEmpty(result.compagnie)) ? result.compagnie.trim().toUpperCase() : '';
    login.grp_affiliates = (!isEmpty(result.grp_ens)) ? result.grp_ens.trim().toUpperCase() : '';
    login.affiliates_access = (!isEmpty(result.acces_enseignes)) ? result.acces_enseignes.trim().toUpperCase() : '';
    login.affiliate = (!isEmpty(result.enseigne)) ? result.enseigne.trim().toUpperCase() : '';
    login.country = (!isEmpty(result.pays)) ? result.pays.trim().toUpperCase() : '';
    login.location_code = (!isEmpty(result.code_magasin)) ? result.code_magasin.trim().toUpperCase() : '';
    login.division = (!isEmpty(result.division)) ? result.division.trim().toUpperCase() : '';
    login.region = (!isEmpty(result.region)) ? result.region.trim().toUpperCase() : '';
	login.is_super_user = (!isEmpty(result.is_super_user)) ? result.is_super_user.toUpperCase() : '';
    // console.log("=> get_info_ok: login = ", login);
	enseigne = login.affiliate;

	// Define 'view' global variable, used to filter locations scop	id_hidden_variables.setVisible(true);
    // Different profiles are: SUPERUSER-COMPANY-COUNTRY-DIVISION-REGION-LOCAL
	if (login.is_super_user == "YES") {   // View as SuperUser
	    view = "SUPERUSER";

	} else if ( (login.region == login.company) || (login.division == login.company) ) {    // All countries & affiliates are available
	    view = "COMPANY";

    } else if ( (!isEmpty(login.grp_affiliates)) && (login.grp_affiliates != "NOT DEFINED") ) {    // a group of affiliates
        view = "GRP_AFF";

    } else if ( (login.region == login.affiliate) || (login.division == login.affiliate) ) {    // One affiliate, but country can be selected
        view = "AFFILIATE";

	} else if ( (login.region == login.country) || (login.division == login.country) ) {    // One country, but affiliate can be selected
	    view = "COUNTRY";


	} else if ( !isEmpty(login.division) && (login.division != "NOT DEFINED") ) {
	    view = "DIVISION";

	} else if ( !isEmpty(login.region) && (login.region != "NOT DEFINED") ) {
	    view = "REGION";

	} else {               // Only one site: 1 country - 1 affiliate - 1 location
	    view = "LOCAL";   
	}
    id_view.setValue(view);
    // console.log("get_info_ok: view = ", view);

    var affiliateList = '';
    switch (login.grp_affiliates) {
        case 'SMC':
            affiliateList = 'SAN MARINA,MINELLI,COSMOPARIS';
            break;
        case 'HALLES':
            affiliateList = 'LA HALLE CHAUSSURE,LA HALLE MODE';
            break;
        default:
            break;
    }
    id_grp_aff.setValue(affiliateList);

    check_user_lanes();

	RMPApplication.debug("end get_info_ok");
}

function get_info_ko(error) 
{
    RMPApplication.debug("begin get_info_ko: error = " + JSON.stringify(error));
    // console.log("=> get_info_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("get_info_ko_msg", "Récupération impossible des informations utilisateur!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end get_info_ko"); 
} 

// ====================================================================================
//   Check if user belong to different VIVARTE lanes
// ====================================================================================
function check_user_lanes() 
{
	RMPApplication.debug("begin check_user_lanes : login = " + login);
	// console.log("=> check_user_lanes: login = ", login);

	var options = {};
	var pattern = {};

    // CAPI for checking if user belong to some lanes
	id_check_user_lanes_api.trigger (pattern, options , check_user_lanes_ok, check_user_lanes_ko); 
	RMPApplication.debug("end check_user_lanes");
}

function check_user_lanes_ok(result) 
{
	RMPApplication.debug("begin check_user_lanes_ok: result =  " + JSON.stringify(result));
	// console.log("=> check_user_lanes_ok: result = ", result);

	// define other "login" variable properties
	login.is_sdmo = (result.is_sdmo == "true") ? true : false;
	login.is_it_group_mgr = (result.is_it_group_mgr == "true") ? true : false;
	login.is_grp_aff_mgr = (result.is_grp_aff_mgr == "true") ? true : false;
	login.is_affiliate_mgr = (result.is_affiliate_mgr == "true") ? true : false;
	login.is_country_mgr = (result.is_country_mgr == "true") ? true : false;
	login.is_region_division_mgr = (result.is_region_division_mgr == "true") ? true : false;
	login.is_local_user = (result.is_local_user == "true") ? true : false;
	login.is_desk_user = (result.is_desk_user == "true") ? true : false;
	login.is_vivarte_user = (result.is_vivarte_user == "true") ? true : false;
	login.is_imac_requestor = (result.is_imac_requestor == "true") ? true : false;
	login.is_imac_validator = (result.is_imac_validator == "true") ? true : false;
	login.is_imac_contributor = (result.is_imac_contributor == "true") ? true : false;
	// console.log("=> check_user_lanes_ok: login = ", login);

	set_tab_visibility();

    RMPApplication.debug("end check_user_lanes_ok"); 
} 

function check_user_lanes_ko(error) 
{
    RMPApplication.debug("begin check_user_lanes_ko: error = " + JSON.stringify(error));
    // console.log("=> check_user_lanes_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("get_info_ko_msg", "Vérification impossible des droits de l'utilisateur!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end check_user_lanes_ko"); 
} 

// ====================================================================================
//   Set some sections visibility according to roles user
// ====================================================================================

function set_tab_visibility() 
{
	RMPApplication.debug("begin set_tab_visibility : login = " + login);
	// console.log("=> set_section_visibility: login.is_sdmo = ", login.is_sdmo);

	// Following tab will be opened at start according specific users
	// Tab [0]: Evaluations
	// Tab [1]: Suivi IMAC
	// Tab [2]: IMAC (brouillon)
	// Tab [3]: IMAC (SDMO)
	if (login.is_sdmo) {
		id_tabs_my_actions.setSelectedTabIndex(3);		// IMAC (SDMO) tab
	} else {
		id_tabs_my_actions.setSelectedTabIndex(1);		// Suivi IMAC tab
	}
    
	RMPApplication.debug("end set_tab_visibility");
}
