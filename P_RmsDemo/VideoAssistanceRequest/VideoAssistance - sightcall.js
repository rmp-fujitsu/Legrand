// ========================
//   Sightcall : MAIN
// ========================
RMPApplication.debug("Sightcall : Application started");

// ========================
// Variables declaration
// ========================

// execute main program
initSightcall();


// ===============================
//   Initialization part
// ===============================
function initSightcall()
{
	RMPApplication.debug("begin initSightcall");
    // console.log("=>  initSightcall");

    // Change information zone's content
    var session_alert_content = ${P_quoted(i18n("session_alert_content", "Suite à la création d'un Work Order, vous établissez une relation avec l'utilisateur (téléphone + contrôle vidéo)"))} + ".";     
    $("#id_video_assistance_note").html(alert_note + " " + session_alert_content);

	var input  = {};
    var options = {};
	id_sightcall_authentication_api.trigger(input, options, getTokenOK, getTokenKO);

	RMPApplication.debug("end initSightcall");
}

function getTokenOK(result)
{
	RMPApplication.debug("begin getTokenOK : result = " + JSON.stringify(result));
    // console.log("begin getTokenOK : result = ", result);

    // Sightcall session target's definition
    var sightcall_frame_options = {
    	mode: 'iframe',
    	target: 'sightcallId'
    };
	var sightcall_console = new SightcallConsole(sightcall_frame_options);
	sightcall_console.on("console.requireAuth", function() {
		// Sightcall authentication's definition
		var sightcall_auth_mode_options = {
			auth_mode: 'internal',
			temporary_token: result.user_token
		};
		sightcall_console.connect(sightcall_auth_mode_options);
	});
	sightcall_console.open();

    // Sightcall user options definition
    var wo_inv_ref = RMPApplication.get("ticket_number_l");
    var sightcall_user_options = {
    	phone: login.phone,
    	email: login.email,
    	reference: wo_inv_ref
    };
	sightcall_console.on('agent.online', function() {
		sightcall_console.sendInfo(sightcall_user_options);
	});

	RMPApplication.debug("end getTokenOK"); 
}

function getTokenKO(error)
{
	RMPApplication.debug("begin getTokenKO : error = " + JSON.stringify(error));
    // console.log("=> getTokenKO: error = ", error);
    var error_msg = ${P_quoted(i18n("getTokenKO_msg", "Récupération impossible d'un jeton de session pour Sightcall!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end getTokenKO");
}
