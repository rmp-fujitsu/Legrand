// id_js_listen_swap_pc_request
// Listened variable: installation_type

var instal_type_val = RMPApplication.get("installation_type");

// if (!isEmpty(instal_type_val)) {
    var swap_pc_requested = (instal_type_val == "computer_swap") ? true : false;
    var obj_cw = {
        "id": "id_my_new_pc_swap",
        "widgets_var_list" : ["windows_version", "pc_name", "pc_model", "serial_number"]
    };

    set_required_option_cw(obj_cw, swap_pc_requested);
// }
