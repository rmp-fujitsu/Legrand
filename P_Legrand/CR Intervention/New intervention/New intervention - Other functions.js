// Special Javascript functions declaration used in the rest of page

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
