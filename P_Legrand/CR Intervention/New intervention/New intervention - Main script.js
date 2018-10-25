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



var login = {};
var module_selected;


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
