// =====================================
//   VideoAssistancePage : Sightcall.js
// =====================================
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
    c_debug(dbug.sight, "=> begin initSightcall");

    // Change information zone's content
    var session_alert_content = ${P_quoted(i18n("session_alert_content", "Suite à la création d'un Work Order, vous établissez une relation avec l'utilisateur (téléphone + contrôle vidéo)."))};     
    $("#id_video_assistance_note").html(alert_note + " " + session_alert_content);

	var input = {};
    var options = {};
	id_sightcall_authentication_api.trigger(input, options, get_token_OK, get_token_KO);

	RMPApplication.debug("end initSightcall");
}

function get_token_OK(result)
{
	RMPApplication.debug("begin get_token_OK : result = " + JSON.stringify(result));
    c_debug(dbug.sight, "get_token_OK: result = ", result);

    // Sightcall session target's definition
    var sightcall_frame_options = {
    	mode: 'iframe',
    	target: 'sightcallId'
    };
    c_debug(dbug.sight, "=> get_token_OK: sightcall_frame_options = ", sightcall_frame_options);
	var sightcall_console = new SightcallConsole(sightcall_frame_options);
	sightcall_console.on("console.requireAuth", function() {
		// Sightcall authentication's definition
		var sightcall_auth_mode_options = {
			auth_mode: 'internal',
			temporary_token: result.user_token
		};
        c_debug(dbug.sight, "=> get_token_OK: sightcall_auth_mode_options = ", sightcall_auth_mode_options);
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
    c_debug(dbug.sight, "=> get_token_OK: sightcall_user_options = ", sightcall_user_options);
	sightcall_console.on('agent.online', function() {
		sightcall_console.sendInfo(sightcall_user_options);
	});

	RMPApplication.debug("end get_token_OK"); 
}

function get_token_KO(error)
{
	RMPApplication.debug("begin get_token_KO : error = " + JSON.stringify(error));
    c_debug(dbug.sight, "get_token_KO: error = ", error);
    var error_msg = ${P_quoted(i18n("get_token_KO_msg", "Récupération impossible d'un jeton de session pour Sightcall !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end get_token_KO");
}
