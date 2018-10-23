// ====================================================================================
//   Command to execute before saving form => INACTIVE
// ====================================================================================
function prepareSaveImac() 
{
    RMPApplication.debug("begin prepareSaveImac");
    c_debug(debug.process_btn, "=> prepareSaveImac");

    dataValidation();
	setTimeout( function() {}, 500);
	c_debug(debug.process_btn, "=> prepareSaveImac: simulate click to continue process");
    document.getElementById("id_continue_process").click();
	// RMPApplication.save(updateImacSuccess, updateImacFail);
	
	RMPApplication.debug("end prepareSaveImac");
}

// ====================================================================================
//   Update IMAC success
// ====================================================================================
function updateImacSuccess() 
{
    RMPApplication.debug("begin updateImacSuccess");
	c_debug(debug.process_btn, "=> updateImacSuccess");
	var success_msg = ${P_quoted(i18n("updateImacSuccess_msg", "Le formulaire a bien été mis à jour!"))};
    notify_success(success_title_notify, success_msg);

    RMPApplication.debug("end updateImacSuccess");
    
	// return true;		// needed as called by pre-launch script "Mettre à jour l'IMAC" button
}

// ====================================================================================
//   Update IMAC failure
// ====================================================================================
function updateImacFail() 
{
    RMPApplication.debug("begin updateImacFail");
	c_debug(debug.process_btn, "=> updateImacFail");
	var error_msg = ${P_quoted(i18n("updateImacFail_msg", "La sauvegarde du formulaire a généré une erreur!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
	
    RMPApplication.debug("end updateImacFail");
    
	// return false;		// needed as called by pre-launch script "Mettre à jour l'IMAC" button
}