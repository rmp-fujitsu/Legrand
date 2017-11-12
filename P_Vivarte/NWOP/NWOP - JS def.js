// ${P_connected_user.name} => récup. du nom du user connecté
// var contact_detail = id_login.getValue();
// $("#id_dateDemande").val(getDateTimeNow());
//	$("#id_contact").val( id_name.getValue() );

RMPApplication.debug("Main : Application started");
var login = null;
var role = null;
var localisation = null;
var wm_order = null;

var col_users = "col_users_vivarte";
var col_rights = "col_droits_vivarte";
var col_locations = "col_locations_vivarte";
// var user_name = ${P_connected_user.name};
// $("#id_contact").value = ${P_user.name};

init();

function init () {
	RMPApplication.debug("Init : Login " + id_login.getValue() )
	var pattern = {};
	pattern.login = id_login.getValue();
	eval(col_users).listCallback (pattern, {}, login_ok, login_ko);
}

// =======================
// login & role functions
// =======================
function login_ok(result) 
{
	login = result;
	var pattern = {};
	pattern.role = login[0].role;
	RMPApplication.debug("login_ok : role " + login[0].role );
	eval(col_rights).listCallback (pattern,{}, role_ok, role_ko);
}

function login_ko(result) 
{
    RMPApplication.debug("login_ko : " + JSON.stringify(result));
}

function role_ok(result) 
{
	RMPApplication.debug(" role_ok : " + JSON.stringify(result));
	role = result;
	if ( checkAccess(role[0].pages) == false ) 
	{
		return;
	}
	var pattern = {};
	pattern.company_name = login[0].company;
	RMPApplication.debug("login_ok : company " + login[0].company );
	eval(col_locations).listCallback (pattern, {}, location_ok, location_ko);
}

function role_ko(result) 
{
    RMPApplication.debug("role_ko : " + JSON.stringify(result));
}

function location_ok(result) 
{
	//RMPApplication.debug(" location_ok : " + JSON.stringify(result));
	localisation = result;
	initHeader();
}

function location_ko(result) 
{
    RMPApplication.debug("location_ko : " + JSON.stringify(result));
}

function checkAccess ( pages )
{
	RMPApplication.debug("pages : " + JSON.stringify(pages));
	if ( pages.indexOf (id_page.getText()) > -1 ){
		id_message.setVisible(false);
		id_commun.setVisible(false);
		id_header.setVisible(true);
		return true;
	} else {
		id_message.setVisible(true);
		id_commun.setVisible(true);
		id_header.setVisible(false);
		return false;
	}
}


// ======================
// date & time functions
// ======================
function getDateTimeNow() 
{
    var newdate = new Date();
    newdate.setDate(newdate.getDate() + 5);
    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1; //January is 0!
    var hh = newdate.getHours();
    var MM = newdate.getMinutes();
    var ss = newdate.getSeconds();
    var yyyy = newdate.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    if (hh < 10) {
        hh = '0' + hh
    }
    if (MM < 10) {
        MM = '0' + MM
    }
    if (ss < 10) {
        ss = '0' + ss
    }
    return dd + '/' + mm + '/' + yyyy + " " + hh + ":" + MM + ":" + ss;
}

function getDateNow()
{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; 		//January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	return dd + '/' + mm + '/' + yyyy;
}

function getExpectedStartDateSN(addDays)
{
	var today = new Date();
	today.setTime(today.getTime() + addDays*24*60*60*1000);
	var dd = today.getDate();
	var mm = today.getMonth() + 1; 		//January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	return yyyy + '-' + mm + '-' + dd + " 10:00:00";
}

function getExpectedStartDateRMP(addDays)
{
	var today = new Date();
	today.setTime(today.getTime() + addDays*24*60*60*1000);
	var dd = today.getDate();
	var mm = today.getMonth() + 1; 		//January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	return yyyy + '-' + mm + '-' + dd + " 10:00:00";
}

