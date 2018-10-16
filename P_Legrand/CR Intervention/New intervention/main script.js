// ========================
//   New Intervention : MAIN
// ========================
RMPApplication.debug("New Intervention : Application started");

// ========================
// Variables declaration
// ========================


// if "true", logs will be showed on the browser console
var dbug = {
    "init" : true,
    "visibility" : true
};

var login = {};
var module_selected;

var error_title_notify = ${P_quoted(i18n("error_title_notify", "Erreur"))};
var error_thanks_notify = ${P_quoted(i18n("error_thanks_notify", "Merci de signaler cette erreur !"))};
var btn_ok = ${P_quoted(i18n("btn_ok", "OK"))};

// execute main program
init();


// ===============================
//   Initialization part
// ===============================
function init() 
{
	RMPApplication.debug("begin init : login = " + login);
    modules_visibility("global");
    fill_all_cw_pc();
    fill_all_cw_visit();
	RMPApplication.debug("end init");
}

//=====================================
// Show selected module and hide others
//=====================================
function modules_visibility(module_name) 
{
	var global = (module_name == "global") ? true : false;
	var issue = (module_name == "issue") ? true : false;
	var intervention = (module_name == "intervention") ? true : false;


	// Global part
    // id_progress_status.setVisible(global);
	id_global_info_title.setVisible(global);
	id_type.setVisible(global);
    id_legrand_ref.setVisible(global);
    id_country.setVisible(global);
    id_priority.setVisible(global);
    id_my_location.setVisible(global);
    id_my_user.setVisible(global);
    id_my_new_pc_swap.setVisible(global);
    id_my_current_pc_initial.setVisible(global);
    id_save_draft_global.setVisible(global);
    id_transfer_to_country.setVisible(global);

	// Issue part
	id_issue_info_title.setVisible(issue);
	id_my_issue_intervention.setVisible(issue);
	id_save_draft_issue.setVisible(issue);
	id_request_to_engineer.setVisible(issue);

	// Intervention part
    id_intervention_info_title.setVisible(intervention);
    id_my_intervention_1.setVisible(intervention);
    id_my_intervention_2.setVisible(intervention);
    id_my_intervention_3.setVisible(intervention);
    id_confirmation_assets.setVisible(intervention);
    id_my_current_pc_confirm.setVisible(intervention);
    id_my_new_pc_confirm.setVisible(intervention);
    id_my_pc_check.setVisible(intervention);
    id_save_draft_intervention.setVisible(intervention);
    id_valid_information.setVisible(intervention);

}


//=================================================
// Dynamically change the title of PC's information
//=================================================
function fill_all_cw_pc() 
{

    var var_newTitle = {
        "id_my_current_pc_initial" : "Current user's PC",
        "id_my_new_pc_swap" : "New PC in case of swap requested",
        "id_my_current_pc_confirm" : "Current user's PC",
        "id_my_new_pc_confirm" : "New PC"
    };

    for (key in var_newTitle){
        fill_cw_title(key, var_newTitle[key])
    } 

}

function fill_cw_title(id_cw, title) 
{  
    var temp = $("#" + id_cw + " #pc_content");
    temp.text(title);
}

//==================================================
// Dynamically change the degree of the intervention
//==================================================
function fill_all_cw_visit() 
{

    var var_newTitle_visit = {
        "id_my_intervention_1" : "Visit #1",
        "id_my_intervention_2" : "Visit #2",
        "id_my_intervention_3" : "Visit #3"
    };

    for (key in var_newTitle_visit){
        fill_cw_title_visit(key, var_newTitle_visit[key])
    }

}
function fill_cw_title_visit(id_cw, number) 
{  
    var temp = $("#" + id_cw + " #visit_content");
    temp.text(number);
}



















// for( key in var_newTitle ) {
//     var temp = $("#" + key + " #pc_content");
//     temp.text(var_newTitle[key]);
// };





// var var_newIntervention = 
// {
//     "id_my_intervention_1" : "#1",
//     "id_my_intervention_2" : "Visit n°2",
//     "id_my_intervention_3" : "Visit n°3",

// }

// for( key in var_newIntervention ) {
//     var temp = $("#" + key + " #visit_content");
//     temp.text(var_newIntervention[key]);
// };