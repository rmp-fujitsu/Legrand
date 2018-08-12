// ========================
//   SD Screen : MAIN
// ========================
RMPApplication.debug("SD Screen : Application started");

// ========================
// Variables declaration
// ========================

// if "true", logs will be showed on the browser console
var dbug = {
    "init" : false,
    "insert" : false,
    "media" : false
};

var view;
var login = {};
var selected_location = null;   // selected location according to input's user
var selected_affiliate = {};    // selected affiliate according to input's user
var wm_order = null;            // work order details saved in Service Now

// other global variables
var error_title_notify = ${P_quoted(i18n("error_title_notify", "Erreur"))};
var close_title_notify = ${P_quoted(i18n("close_title_notify", "Information"))};
var error_thanks_notify = ${P_quoted(i18n("error_thanks_notify", "Merci de signaler cette erreur !"))};
var close_msg_notify = ${P_quoted(i18n("close_msg_notify", "Merci d'avoir utilisé RunMyStore !"))};
var btn_ok = ${P_quoted(i18n("btn_ok", "OK"))};


// =============================================================
// Create Work Order insertion request to Service Now
// =============================================================
function createRequest()
{
    RMPApplication.debug("begin createRequest");
    c_debug(dbug.insert, "begin createRequest");
    $("#id_spinner_insert").show();

    var caller, logical_name, location, separator;
    var num_pos = "01";     // Cashdesk n° => we sinplify RMSDEMO case
    selected_location = JSON.parse(RMPApplication.get("selected_location"));
    selected_affiliate = JSON.parse(RMPApplication.get("selected_affiliate"));
    
    switch (selected_location.affiliate) {

        case 'societeXX':      // EXAMPLE
            caller = "hotline@societexx.com";
            location = $.trim(selected_location.location_name);
            // logical_name format => MAG00BxxxCAI01
            logical_name = "MAG00" + selected_location.location_code + RMPApplication.get("variables.short_cat") + num_pos;
            break;

        default:
            separator = "-";
            location = $.trim(selected_location.location) + separator + $.trim(selected_location.location_code);
            // caller = login.user;
            caller = "Resp " + location;
            logical_name = "MAG" + selected_location.location_code + RMPApplication.get("variables.short_cat") + num_pos;
    }

    var contract = selected_affiliate.company + "\\" + selected_affiliate.abbreviation;    // SNOW contract name
    var customer_site = location; 
    var requestType = "intervention";
    var work_order_type = requestType;
    var contact_type = "RunMyStore";
    var qualification_group = "";
    var customer_reference = ""; 
    var contact = login.user;
    var description = RMPApplication.get("description");;
    var short_description = description.substring(0,99);
    var state = "1";    // draft
    var expected_start = "";
    var priority = "2";
    var contact_detail = (isEmpty(selected_location.email)) ? "" : selected_location.email;
    contact_detail += (isEmpty(selected_location.phone)) ? "" :  "\n" +selected_location.phone;
    var photo_consult = ${P_quoted(i18n("photo_consult_txt", "Connectez-vous à RMS pour consulter les photos jointes lors de l'ouverture de l'incident"))};

    // define insertion query before sending to Service Now
    var work_order = {};
    work_order.sn_caller = caller
    work_order.sn_contract = contract;
    work_order.sn_contact_type = contact_type;
    work_order.sn_correlation_id = customer_reference;
    work_order.sn_location = location;
    work_order.sn_u_customer_site = customer_site;
    work_order.sn_state = state;
    work_order.sn_qualification_group = qualification_group;
    work_order.sn_short_description = short_description;
    work_order.sn_priority = priority;
    work_order.sn_u_contact_details = contact_detail;
    work_order.sn_u_work_order_type = work_order_type;
    work_order.sn_category = RMPApplication.get("variables.category") + " " + selected_affiliate.affiliate;;
    work_order.sn_u_problem_type = RMPApplication.get("variables.problem_type");
    work_order.sn_u_product_type = RMPApplication.get("variables.product_type");
    work_order.sn_expected_start = expected_start;
    work_order.sn_cmdb_ci = logical_name;
    work_order.location_code = selected_location.location_code;
    
    var my_array = eval(RMPApplication.get("attachment"));
    if (my_array.length !=0) {
        var medias = [];
        for (var i = 0; i < my_array.length; i++) {
            medias.push(my_array[i].id);
        }
        work_order.media = medias;
        description += "\n => " + photo_consult;
    }
    work_order.sn_description = description;

    c_debug(dbug.insert, "=> createRequest: work_order = ", work_order);
    var options = {};
    id_insert_work_order_api.trigger (work_order, options, insert_ok, insert_ko);
    
    RMPApplication.debug("end createRequest");
}

function insert_ok(result) 
{
    RMPApplication.debug("begin insert_ok : " + JSON.stringify(result));
    c_debug(dbug.insert, "=> insert_ok: result = ", JSON.stringify(result));

    wm_order = result;
    var input = {};
    var my_array = eval(RMPApplication.get("attachment"));
    if (my_array.length !=0) {
        var entries = [];
        for (var i = 0; i < my_array.length; i++) {
            var entry_json = {};
            entry_json.url = my_array[i].url;
            entry_json.name= my_array[i].name;
            entry_json.wo_number = wm_order.insertResponse.number
            entries.push(entry_json);
        }
        input.media = entries;
    } else {
        input.media = [];
    }

    var options = {};
    c_debug(dbug.insert, "=> insert_ok: input = ", input);
    id_save_media_in_collection_api.trigger (input, options, save_media_ok, save_media_ko);
    
    var title = ${P_quoted(i18n("insert_ok_title", "Information Suivi Demande"))};
    var content1 = ${P_quoted(i18n("insert_ok_msg1", "Demande créée sous la référence"))};
    var content2 = ${P_quoted(i18n("insert_ok_msg2", "Vous allez être contacté dans les plus brefs délais."))};
    notify_then_close_process(title, content1 + ": <br><strong>" + wm_order.insertResponse.number + "</strong><br>" + content2, btn_ok);
    
    // $("#id_ouvrir_ticket").click();

    RMPApplication.debug("end insert_ok");
}

function insert_ko(error) 
{
    RMPApplication.debug("begin insert_ko : error = " + JSON.stringify(error));
    c_debug(dbug.insert, "=> insert_ko: error = ", error);
    var title = ${P_quoted(i18n("id_title_insert_ko_1", "Information Suivi Demande"))};
    var content1 = ${P_quoted(i18n("id_msg_insert_ko_1", "Le processus de création du ticket a été anormalement long OU n'a pas abouti !"))};
    var content2 = ${P_quoted(i18n("id_msg_insert_ko_2", "-> Veuillez vérifier dans 'Suivi des demandes' si le ticket a cependant bien été créé."))};
    var content3 = ${P_quoted(i18n("id_msg_insert_ko_3", "Dans le cas contraire, renouvelez une création de ticket."))};
    alert_then_close_process(title, content1 + "<br><strong>" + wm_order.insertResponse + "</strong><br>" + content2 + "<br>" + content3, btn_ok);
    RMPApplication.debug("end insert_ko");  
}

function save_media_ok(result)
{
    RMPApplication.debug("begin save_media_ok: result =  " + JSON.stringify(result));
    c_debug(dbug.media, "=> save_media_ok: result = ", result);
    RMPApplication.debug("end save_media_ok");
}

function save_media_ko(error) 
{
    RMPApplication.debug("begin save_media_ko: error = " + JSON.stringify(error));
    c_debug(dbug.media, "=> save_media_ko: error = ", error);
    var title = ${P_quoted(i18n("id_title_save_picture_ko_1", "Information Suivi Demande"))};
    var content1 = ${P_quoted(i18n("id_msg_save_picture_ko_1", "Le document n'a pu être sauvegardé !"))};
    var content2 = ${P_quoted(i18n("id_msg_save_picture_ko_2", "-> Veuillez vérifier dans 'Suivi des demandes' si le ticket a cependant bien été créé."))};
    var content3 = ${P_quoted(i18n("id_msg_save_picture_ko_3", "Dans le cas contraire, renouvelez une création de ticket."))};
    alert_then_close_process(title, content1 + "<br><strong>" + wm_order.insertResponse + "</strong><br>" + content2 + "<br>" + content3, btn_ok);
    RMPApplication.debug("end save_media_ko");
}

// =====================================================================================
//   Show a notification then redirect to an another page when dialog box is validated
// =====================================================================================
function notify_then_close_process(title, content, labelBtn)
{
    $("#id_spinner_insert").hide();
    ssi_modal.dialog({
        title: title,
        content: content, 
        okBtn:
            {
                className:'btn btn-success btn-responsive',
                label: labelBtn
            }
    },
    function() {
        // update the process => next step
        document.getElementById("id_close_process").click();
    });
}

// =====================================================================================
//   Show an alert then redirect to an another page when dialog box is validated
// =====================================================================================
function alert_then_close_process(title, content, labelBtn)
{
    $("#id_spinner_insert").hide();
    ssi_modal.dialog({
        title: title,
        content: content, 
        okBtn:
            {
                className:'btn btn-danger btn-responsive',
                label: labelBtn
            }
    },
    function() {
        // update the process => next step
        document.getElementById("id_close_process").click();
    });
}