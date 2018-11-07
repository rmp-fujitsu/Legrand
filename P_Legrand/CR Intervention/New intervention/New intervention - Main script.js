// =============================
//   New Intervention : MAIN
// =============================
RMPApplication.debug("New Intervention : Application started");

// ========================
// Variables declaration
// ========================

// if "true", logs will be showed on the browser console
var dbug = {
    "init" : true,
    "function" : true,
    "visibility" : true
};

var selected_item = "rmpoption0_1"; // Retrieve the id of the tab to assign it a color / background color inside ready.js

var int_finished = "id_intervention_finished_0";
var int_not_finished = "id_intervention_finished_1";
var label_reason = "id_reason_label";
var reason = "id_reason";
var visit_counter;

var login = {};
var module_selected;
var collectionid = "col_legrand_locations";

// execute main program
init();


// ===============================
//   Initialization part
// ===============================
function init() 
{
    RMPApplication.debug("begin init");
    login = RMPApplication.get("login");
    c_debug(dbug.init, "=> begin init : login = ", login);

    // modules_visibility("global");
    fill_all_cw_pc();
    fill_all_cw_visit();
    set_required_current_pc();
	RMPApplication.debug("end init");
}

//=================================================
// Dynamically change the title of PC's information
//=================================================
function fill_all_cw_pc() 
{
    RMPApplication.debug("begin fill_all_cw_pc");
    c_debug(dbug.visibility, "=> begin fill_all_cw_pc");

    // Set the titles
    var var_newTitle = {
        "id_my_current_pc_initial" : "Current user's PC",
        "id_my_new_pc_swap" : "New PC in case of swap requested",
        "id_my_current_pc_confirm" : "Current user's PC",
        "id_my_new_pc_confirm" : "New PC"
    };
    // Do a loop for all the Title
    for (key in var_newTitle) {
        fill_cw_pc_title(key, var_newTitle[key]);
    } 

}

//========================================================
// Retrieve the id of the element and remplace the title
//========================================================
function fill_cw_pc_title(id_cw, title) 
{
    RMPApplication.debug("begin fill_cw_pc_title: id_cw = ", id_cw);
    c_debug(dbug.visibility, "=> begin fill_all_cw_pc: id_cw = ", id_cw);
    var temp = $("#" + id_cw + " #pc_content");
    temp.text(title);
}

//==================================================
// Dynamically change the degree of the intervention
//==================================================
function fill_all_cw_visit() 
{
    RMPApplication.debug("begin fill_all_cw_visit");
    c_debug(dbug.visibility, "=> begin fill_all_cw_visit");

    // Set the titles
    var var_newTitle_visit = {
        "id_my_intervention_1" : "Visit #1",
        "id_my_intervention_2" : "Visit #2",
        "id_my_intervention_3" : "Visit #3"
    };
    // Do a loop for all the Title
    for (key in var_newTitle_visit) {
        fill_cw_title_visit(key, var_newTitle_visit[key]);
    }

}

//========================================================
// Retrieve the id of the element and remplace the title
//========================================================
function fill_cw_title_visit(id_cw, number) 
{
    RMPApplication.debug("begin fill_cw_pc_title: id_cw = ", id_cw);
    c_debug(dbug.visibility, "=> begin fill_cw_pc_title: id_cw = ", id_cw);
    var temp = $("#" + id_cw + " #visit_content");
    temp.text(number);
}

// ======================================================
// Test the variable value in specified widget 
// and show or not an another widget according this value
// ======================================================
function display_reason(id_sel_field, cond_val, id_show_field)
{
    var selected_val = eval(id_sel_field).getSelectedValue();
    var display_reason = (selected_val == cond_val) ? false : true;
    eval(id_show_field).setVisible(display_reason);
    id_my_pc_check.setVisible(!display_reason);
} 

// ====================================================================================================
// Test the variable value in specified widget 
// and show or not an another widget according this value
// Ex:
        /*  obj = {
                "id": "id_of_cw (complete path)",
                "widgets_var_list" : ["sub_cw_var1", "sub_cw_var2", "sub_cw_var3, "sub_cw_var4", ...]
            }
        */
// ====================================================================================================
function set_required_option_cw(obj, bool)
{
    c_debug(dbug.function, "=> begin set_required_option_cw: obj = ", obj);
    c_debug(dbug.function, '=> set_required_option_cw: bool = ', bool);
    var obj_id = obj.id;
    c_debug(dbug.function, '=> set_required_option_cw: obj_id = ', obj_id);
    for (i=0; i <= obj.widgets_var_list.length-1; i++) {
        var id_local_widget = "id_" + obj.widgets_var_list[i];
        var id_complete_path = obj_id + "." + id_local_widget;
        eval(id_complete_path).setRequired(bool);
        c_debug(dbug.function, '=> set_required_option_cw: Required option of "' + id_complete_path + '" has been changed!');
    }
} 

function set_required_current_pc()
{
    c_debug(dbug.function, "=> begin set_required_current_pc");
    // var instal_type_val = RMPApplication.get("installation_type");
    // var swap_pc_requested = (instal_type_val == "computer_swap") ? true : false;
    var obj_cw = {
        "id": "id_my_current_pc_initial",
        "widgets_var_list" : ["windows_version", "pc_name", "pc_model", "serial_number"]
    };
    set_required_option_cw(obj_cw, true);
}


function set_required_pc_confirm()
{
    c_debug(dbug.function, "=> begin set_required_swap_pc");
    var instal_type_val = RMPApplication.get("installation_type");
    var swap_pc_requested = (instal_type_val == "computer_swap") ? true : false;
    var obj_cw = {
        "id": "id_my_new_pc_confirm",
        "widgets_var_list" : ["windows_version", "pc_name", "pc_model", "serial_number"]
    };
    set_required_option_cw(obj_cw, swap_pc_requested);
}

function set_required_visits()
{
    c_debug(dbug.function, "=> begin set_required_visits");
    // id_intervention_grid.setVisible(true);				// debug
    for (i=1; i<(visit_counter+1); i++) {
	    var id_cw_current_visit = "id_my_intervention_" + i.toString();
	    var obj_cw = {
	        "id": id_cw_current_visit,
	        "widgets_var_list" : ["arrival_time", "end_time", "intervention_finished"]
	    };
	    set_required_option_cw(obj_cw, true);
	    // eval(id_cw_current_visit).setVisible(true);		// debug
	}
}


// prepare data from GDC to Country Desk
function prepare_data_for_country_desk()
{
    c_debug(dbug.function, "=> begin prepare_data_for_country_desk");
    visit_counter = 0;      // initialize # of visit
    RMPApplication.set("visit_counter", visit_counter);
}

// fill or not the last visit's reason of cancellation
function load_data_for_country_desk_screen()
{
    c_debug(dbug.function, "=> begin load_data_for_country_desk_screen");
    visit_counter = parseInt(RMPApplication.get("visit_counter"));

    // set Required some fileds of #CW-Visit
    set_required_visits();
    
    // following #visit
    if (visit_counter > 0) {
    	c_debug(dbug.function, "=> load_data_for_country_desk_screen: visit_counter = ", visit_counter);
        // Reset ETA if new intervention should be planned
        RMPApplication.set('my_issue_intervention.info_eta', null);

        // let the Country Desk define a new "readable" comment intended to the customer
        id_my_issue_intervention.id_last_cancellation_reason.setVisible(true);
        id_my_issue_intervention.id_last_cancellation_reason.setActive(false);
        id_my_issue_intervention.id_cancellation_attention.setVisible(true);
        id_my_issue_intervention.id_new_cancellation_reason.setVisible(true);

		// set "delivery_done" variable before to continue process
		var id_intervention_num_previous = "id_my_intervention_" + RMPApplication.get("visit_counter") + ".id_reason";
		var last_cancellation_str = eval(id_intervention_num_previous).getValue();
		RMPApplication.set("my_issue_intervention.last_cancellation_reason", last_cancellation_str);
        RMPApplication.set("my_issue_intervention.new_cancellation_reason", last_cancellation_str);
        c_debug(dbug.function, "=> load_data_for_country_desk_screen: last_cancellation_str = ", last_cancellation_str);
    }

}

// test if 2 strings are equal
function string_compare(st1, st2)
{
    var string_eq = (st1 === st2) ? true : false;
    return string_eq;
}

// prepare data from Country Desk to Engineer
function prepare_data_for_engineer()
{
    c_debug(dbug.function, "=> begin prepare_data_for_engineer");
    var confirmation = true;
    var attendre = true;
    // visit_counter = parseInt(RMPApplication.get("visit_counter")) + 1;        // increment nb of visits
    // RMPApplication.set("visit_counter", visit_counter);
    c_debug(dbug.function, "=> prepare_data_for_engineer: visit_counter = ", visit_counter);

    if (visit_counter > 0) {

        var last_cancellation_str = RMPApplication.get("my_issue_intervention.last_cancellation_reason");
        var new_cancellation_str = RMPApplication.get("my_issue_intervention.new_cancellation_reason");

        var cancellation_eq = string_compare(last_cancellation_str, new_cancellation_str);
        c_debug(dbug.function, "=> prepare_data_for_engineer: cancellation_eq = ", cancellation_eq);
        if (cancellation_eq) {
            // traitement si egaux
            var question = "You decide not to change the reason of cancellation. Do you confirm ?"
            
            modal_confirm(question, "YES", confirm_OK, "NO", cancel_KO);

            function confirm_OK()
            {
                confirmation = true;
                attendre = false;
            }
            function cancel_KO()
            {
                confirmation = false;
                attendre = false;
            }

            while (attendre == true) { 
            	setTimeout( () => {}, 500 );
           	}

        } else {
            confirmation = false;
        }
    }

    c_debug(dbug.function, "=> prepare_data_for_engineer: confirmation = ", confirmation);
    return confirmation;
}

// prepare engineer data screen
function load_data_for_engineer_screen()
{
    c_debug(dbug.function, "=> begin load_data_for_engineer_screen");
    visit_counter = parseInt(RMPApplication.get("visit_counter"));
    c_debug(dbug.function, "=> load_data_for_engineer_screen: visit_counter = ", visit_counter);
    

    // let the Country Desk define a new "readable" comment intended to the customer
    id_my_issue_intervention.id_last_cancellation_reason.setVisible(false);
    id_my_issue_intervention.id_cancellation_attention.setVisible(false);
    id_my_issue_intervention.id_new_cancellation_reason.setVisible(false);

    // set Required some fileds of #CW-Visit
    set_required_visits();

}

// retrieve data following the engineer's intervention and decide to close or plan a new one
function prepare_data_for_closure()
{
    c_debug(dbug.function, "=> begin prepare_data_for_closure");
    var confirmation = true;

    visit_counter = parseInt(RMPApplication.get("visit_counter"));

    // set "delivery_done" variable before to continue process
    var id_intervention_num_finished = "id_my_intervention_" + RMPApplication.get("visit_counter") + ".id_intervention_finished";
    var current_intervention_finished = eval(id_intervention_num_finished).getSelectedValue();
    c_debug(dbug.function, "=> prepare_data_for_closure: current_intervention_finished = ", current_intervention_finished);
    RMPApplication.set("delivery_done", current_intervention_finished);
    c_debug(dbug.function, "=> prepare_data_for_closure: delivery_done = ", current_intervention_finished);

    /*if (visit_counter > 1) {

        var last_cancellation_visit_str = "id_my_intervention_" + RMPApplication.get("visit_counter") + ".id_reason";
        RMPApplication.set("my_issue_intervention.last_cancellation_reason", last_cancellation_visit_str);
        var new_cancellation_str = RMPApplication.get("my_issue_intervention.new_cancellation_reason");
        var last_cancellation_str = RMPApplication.get("my_issue_intervention.last_cancellation_reason");

        var cancellation_eq = string_compare(last_cancellation_str, new_cancellation_str);
        c_debug(dbug.function, "=> prepare_data_for_closure: cancellation_eq = ", cancellation_eq);
        if (cancellation_eq) {
            // traitement si egaux
            var question = "You decide not to change the reason of cancellation. Do you confirm ?"
            
            modal_confirm(question, "OK", confirm_OK, "No", cancel_KO);

            function confirm_OK()
            {
                confirmation = true;
            }
            function cancel_KO()
            {
                confirmation = false;
            }

        } else {
            confirmation = false;
        }
    }*/
    c_debug(dbug.function, "=> prepare_data_for_closure: confirmation = ", confirmation);
    return confirmation;
}


// 
function close_request()
{
    c_debug(dbug.function, "=> begin close_request");


}