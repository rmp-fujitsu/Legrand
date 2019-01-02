
var var_data_pdf = {};      // data collected ready to be imported in final PDF report


// save datas from basic info fields
function get_basic_info()
{
    var basic_info = {
        "type": RMPApplication.get("type"),
        "legrand_ref": RMPApplication.get("legrand_ref"),
        "priority": id_priority.getSelectedLabel()
    };
    // stocke ident dans le widget var_ident
    RMPApplication.set("var_basic_info", JSON.stringify(basic_info));
}


// save datas from location CW
function get_location_info()
{
    var location_info = {
        "site_name": RMPApplication.get("my_location.site_name"),
        "site_code": RMPApplication.get("my_location.site_code"),
        "address": RMPApplication.get("my_location.address"),
        // "town": RMPApplication.get("my_location.town"),
        // "postal_code": RMPApplication.get("my_location.postal_code"),
        "country": RMPApplication.get("my_location.country"),
        "site_contact": RMPApplication.get("my_location.site_contact"),
        "name_country": RMPApplication.get("my_location.name_country")
    };
    // stocke ident dans le widget var_ident
    RMPApplication.set("var_location_info", JSON.stringify(location_info));
}

// save datas from user CW
function get_user_info()
{
    var user_info = {
        "name": RMPApplication.get("my_user.name"),
        "fix_mobile_number": RMPApplication.get("my_user.fix_mobile_number"),
        "user_email_unknown": RMPApplication.get("my_user.user_email_unknown"),
        "contact_email": RMPApplication.get("my_user.contact_email")
    };
    // stocke ident dans le widget var_ident
    RMPApplication.set("var_user_info", JSON.stringify(user_info));
}

// save datas from installation_type fields
function get_installation_type_info()
{
    var installation_type_info = {
        "installation_type": id_installation_type.getSelectedLabel(),
        "reason_issue": RMPApplication.get("reason_issue"),
        "old_pc_status": id_old_pc_status.getSelectedLabel(),
        "reason": RMPApplication.get("reason")
    }; 
    // stocke ident dans le widget var_ident
    RMPApplication.set("var_installation_type_info", JSON.stringify(installation_type_info));
}


// save datas from pc_initial_info CW
function get_pc_initial_info()
{
    var pc_initial_info = {
        "windows_version": RMPApplication.get("my_current_pc_initial.windows_version"),
        "pc_name": RMPApplication.get("my_current_pc_initial.pc_name"),
        "pc_model": RMPApplication.get("my_current_pc_initial.pc_model"),
        "serial_number": RMPApplication.get("my_current_pc_initial.serial_number"),
        "software_installed": RMPApplication.get("my_current_pc_initial.software_installed")
    };
    // stocke ident dans le widget var_ident
    RMPApplication.set("var_pc_initial_info", JSON.stringify(pc_initial_info));
}

// save datas from my_new_pc_swap CW
function get_pc_swap_info()
{
    var pc_swap_info = {
        "windows_version": RMPApplication.get("my_new_pc_swap.windows_version"),
        "pc_name": RMPApplication.get("my_new_pc_swap.pc_name"),
        "pc_model": RMPApplication.get("my_new_pc_swap.pc_model"),
        "serial_number": RMPApplication.get("my_new_pc_swap.serial_number"),
        "software_installed": RMPApplication.get("my_new_pc_swap.software_installed")
    };
    // stocke ident dans le widget var_ident
    RMPApplication.set("var_pc_swap_info", JSON.stringify(pc_swap_info));
}

// save datas from my_current_pc_confirm CW
function get_pc_confirm_info()
{
    var pc_confirm_info = {
        "windows_version": RMPApplication.get("my_current_pc_confirm.windows_version"),
        "pc_name": RMPApplication.get("my_current_pc_confirm.pc_name"),
        "pc_model": RMPApplication.get("my_current_pc_confirm.pc_model"),
        "serial_number": RMPApplication.get("my_current_pc_confirm.serial_number"),
        "software_installed": RMPApplication.get("my_current_pc_confirm.software_installed")
    };
    // stocke ident dans le widget var_ident
    RMPApplication.set("var_pc_confirm_info", JSON.stringify(pc_confirm_info));
}

// save datas from my_new_pc_confirm CW
function get_new_pc_confirm_info()
{
    var new_pc_confirm_info = {
        "windows_version": RMPApplication.get("my_new_pc_confirm.windows_version"),
        "pc_name": RMPApplication.get("my_new_pc_confirm.pc_name"),
        "pc_model": RMPApplication.get("my_new_pc_confirm.pc_model"),
        "serial_number": RMPApplication.get("my_new_pc_confirm.serial_number"),
        "software_installed": RMPApplication.get("my_new_pc_confirm.software_installed")
    };
    // stocke ident dans le widget var_ident
    RMPApplication.set("var_new_pc_confirm_info", JSON.stringify(new_pc_confirm_info));
}


// save datas from gdc_details CW
function get_gdc_details_info()
{
    var gdc_details_info = {
        "issue_description": RMPApplication.get("my_gdc_details.issue_description"),
        "action_to_be_done": RMPApplication.get("my_gdc_details.action_to_be_done")
    };
    // stocke ident dans le widget var_ident
    RMPApplication.set("var_gdc_details_info", JSON.stringify(gdc_details_info));
}

// save datas from my_issue_intervention CW
function get_issue_intervention_info()
{
    var issue_intervention_info = {
        "fujitsu_ref": RMPApplication.get("my_issue_intervention.fujitsu_ref"),
        "oss_ref": RMPApplication.get("my_issue_intervention.oss_ref"),
        "info_eta_str": RMPApplication.get("my_issue_intervention.info_eta_str"),
        "last_cancellation_reason": RMPApplication.get("my_issue_intervention.last_cancellation_reason"),
        "new_cancellation_reason": RMPApplication.get("my_issue_intervention.new_cancellation_reason"),
        "info_for_this_engineer": RMPApplication.get("my_issue_intervention.info_for_this_engineer")
    };
    // stocke ident dans le widget var_ident
    RMPApplication.set("var_issue_intervention_info", JSON.stringify(issue_intervention_info));
}

// save datas from intervention1_info CW
function get_intervention1_info()
{
    var intervention1_info = {
        "arrival_time_str": RMPApplication.get("my_intervention_1.arrival_time_str"),
        "end_time": RMPApplication.get("my_intervention_1.end_time"),
        "actions_done": RMPApplication.get("my_intervention_1.actions_done"),
        "intervention_finished": id_my_intervention_1.id_intervention_finished.getSelectedLabel(),
        "reason": RMPApplication.get("my_intervention_1.reason")
    };
    // stocke ident dans le widget var_ident
    RMPApplication.set("var_intervention1_info", JSON.stringify(intervention1_info));
}

// save datas from intervention2 CW
function get_intervention2_info()
{
    var intervention2_info = {
        "arrival_time_str": RMPApplication.get("my_intervention_2.arrival_time_str"),
        "end_time": RMPApplication.get("my_intervention_2.end_time"),
        "actions_done": RMPApplication.get("my_intervention_2.actions_done"),
        "intervention_finished": id_my_intervention_2.id_intervention_finished.getSelectedLabel(),
        "reason": RMPApplication.get("my_intervention_2.reason")
    };
    // stocke ident dans le widget var_ident
    RMPApplication.set("var_intervention2_info", JSON.stringify(intervention2_info));
}

// save datas from intervention3 CW
function get_intervention3_info()
{
    var intervention3_info = {
        "arrival_time_str": RMPApplication.get("my_intervention_3.arrival_time_str"),
        "end_time": RMPApplication.get("my_intervention_3.end_time"),
        "actions_done": RMPApplication.get("my_intervention_3.actions_done"),
        "intervention_finished": id_my_intervention_3.id_intervention_finished.getSelectedLabel(),
        "reason": RMPApplication.get("my_intervention_3.reason")
    };
    // stocke ident dans le widget var_ident
    RMPApplication.set("var_intervention3_info", JSON.stringify(intervention3_info));
}



// save datas from my_pc_check CW
function get_pc_check_info()
{
    var pc_check_info = {
        "my_document": RMPApplication.get("my_pc_check.my_document"),
        "desktop": RMPApplication.get("my_pc_check.desktop"),
        "favorite_internet": RMPApplication.get("my_pc_check.favorite_internet"),
        "favorite_google_chrome": RMPApplication.get("my_pc_check.favorite_google_chrome"),
        "lotus_notes_backup": RMPApplication.get("my_pc_check.lotus_notes_backup"),
        "office_template": RMPApplication.get("my_pc_check.office_template"),
        "other_local_data": RMPApplication.get("my_pc_check.other_local_data"),
        "bios_password": RMPApplication.get("my_pc_check.bios_password"),
        "software_installation": RMPApplication.get("my_pc_check.software_installation"),
        "office_version": RMPApplication.get("my_pc_check.office_version"),
        "domain_integration": RMPApplication.get("my_pc_check.domain_integration"),
        "software_detail": RMPApplication.get("my_pc_check.software_detail"),
        "software_configuration": RMPApplication.get("my_pc_check.software_configuration"),
        "one_drive_data": RMPApplication.get("my_pc_check.one_drive_data"),
        "skype": RMPApplication.get("my_pc_check.skype"),
        "lotus_notes_configuration": RMPApplication.get("my_pc_check.lotus_notes_configuration"),
        "printers_installation": RMPApplication.get("my_pc_check.printers_installation"),
        "login_user_profil": RMPApplication.get("my_pc_check.login_user_profil"),
        "wifi_connection": RMPApplication.get("my_pc_check.wifi_connection"),
        "dialeg_intranet_acces": RMPApplication.get("my_pc_check.dialeg_intranet_acces"),
        "office365_access": RMPApplication.get("my_pc_check.office365_access"),
        "arp_login": RMPApplication.get("my_pc_check.arp_login"),
        "skype_working": RMPApplication.get("my_pc_check.skype_working"),
        "lotus_notes": RMPApplication.get("my_pc_check.lotus_notes"),
        "printing_test": RMPApplication.get("my_pc_check.printing_test"),
        "show_sofwtare_center": RMPApplication.get("my_pc_check.show_sofwtare_center"),
        "password_changed": RMPApplication.get("my_pc_check.password_changed")
    };
    // stocke ident dans le widget var_ident
    RMPApplication.set("var_pc_check_info", JSON.stringify(pc_check_info));
}


function prepare_data()
{
    get_basic_info();
    get_location_info();
    get_user_info();
    get_installation_type_info();
    get_pc_initial_info();
    get_pc_swap_info();
    get_pc_confirm_info();
    get_new_pc_confirm_info();
    get_gdc_details_info();
    get_issue_intervention_info();
    get_intervention1_info();
    get_intervention2_info();
    get_intervention3_info();
    get_pc_check_info();

    setTimeout (consolide_data, 1000);

}

function consolide_data()
{
    var_data_pdf.my_var_main = {
    "basic_info": JSON.parse(RMPApplication.get("var_basic_info")),
    "location_info": JSON.parse(RMPApplication.get("var_location_info")),
    "user_info": JSON.parse(RMPApplication.get("var_user_info")),
    "installation_type_info": JSON.parse(RMPApplication.get("var_installation_type_info")),
    "pc_initial_info": JSON.parse(RMPApplication.get("var_pc_initial_info")),
    "pc_swap_info": JSON.parse(RMPApplication.get("var_pc_swap_info")),
    "pc_confirm_info": JSON.parse(RMPApplication.get("var_pc_confirm_info")),
    "new_pc_confirm_info": JSON.parse(RMPApplication.get("var_new_pc_confirm_info")),
    "gdc_details_info": JSON.parse(RMPApplication.get("var_gdc_details_info")),
    "issue_intervention_info": JSON.parse(RMPApplication.get("var_issue_intervention_info")),
    "intervention1_info": JSON.parse(RMPApplication.get("var_intervention1_info")),
    "intervention2_info": JSON.parse(RMPApplication.get("var_intervention2_info")),
    "intervention3_info": JSON.parse(RMPApplication.get("var_intervention3_info")),
    "pc_check_info": JSON.parse(RMPApplication.get("var_pc_check_info"))
    };


    RMPApplication.set("var_data_pdf_front", JSON.stringify(var_data_pdf));    
}