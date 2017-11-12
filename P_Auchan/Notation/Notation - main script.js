// ===========================
//   Notation : MAIN
// ===========================
RMPApplication.debug("Main : Application started");

// ========================
// Variables declaration
// ========================

var login = {};
var view = "";
var site = {};
var var_location_list = null;
var var_order_list = null;
var var_task_list = null;
var v_ol = null;
var curr_indice = 0;
var current_indice = 0;
var iso_code ='fr';

var error_title_notify = ${P_quoted(i18n("error_title_notify", "Erreur"))};
var info_title_notify = ${P_quoted(i18n("info_title_notify", "Information"))};
var error_thanks_notify = ${P_quoted(i18n("error_thanks_notify", "Merci de signaler cette erreur!"))};
var btn_ok = ${P_quoted(i18n("btn_ok", "OK"))};

// used collections list
var col_locations = "col_locations_auchan";

init();

// ========================
// initialization part
// ========================
function init() 
{
    RMPApplication.debug("begin init : Login = " + login);
    $("#id_spinner_search").hide();
    resetWI(); 
    
    var option = {};
    var pattern = {};
    pattern.login = RMPApplication.get("login");
    // console.log("=> pattern:", pattern); 

    id_get_user_info_as_admin_api.trigger(pattern, option , get_info_ok, get_info_ko); 

    RMPApplication.debug("end init");
}

// ======================
// Reset interface
// ======================
function resetWI()
{
    RMPApplication.debug("begin resetWI");
    id_ticket_details.setVisible(false);
    $("#id_rowValidation").hide();
    RMPApplication.debug("end resetWI"); 
}

// ============================================
// get user details from user metadata details
// ============================================
function get_info_ok(result) 
{
    RMPApplication.debug("begin get_info_ok: result =  " + JSON.stringify(result));
    // console.log("=> get_info_ok: result = ", result);

    // define "login" variable properties
    login.user = result.user;
    login.email = (!isEmpty(result.user)) ? result.user.trim() : '';
    login.phone = (!isEmpty(result.phone)) ? result.phone.trim() : '';
    login.timezone = result.timezone;
    login.company = (!isEmpty(result.compagnie)) ? result.compagnie.trim().toUpperCase() : '';
    login.grp_affiliates = (!isEmpty(result.grp_ens)) ? result.grp_ens.trim().toUpperCase() : '';
    login.affiliates_access = (!isEmpty(result.acces_enseignes)) ? result.acces_enseignes.trim().toUpperCase() : '';
    login.affiliate = (!isEmpty(result.enseigne)) ? result.enseigne.trim().toUpperCase() : '';
    login.country = (!isEmpty(result.pays)) ? result.pays.trim().toUpperCase() : '';
    login.location_code = (!isEmpty(result.code_magasin)) ? result.code_magasin.trim().toUpperCase() : '';
    login.division = (!isEmpty(result.division)) ? result.division.trim().toUpperCase() : '';
    login.region = (!isEmpty(result.region)) ? result.region.trim().toUpperCase() : '';
    login.is_super_user = (!isEmpty(result.is_super_user)) ? result.is_super_user.toUpperCase() : '';
    // console.log("=> get_info_ok: login = ", login);

    // Define 'view' global variable, used to filter locations scope
    // Different profiles are: SUPERUSER-COMPANY-COUNTRY-DIVISION-REGION-LOCAL
    if (login.is_super_user == "YES") {   // View as SuperUser
        view = "SUPERUSER";

    } else if ( (login.region == login.company) || (login.division == login.company) ) {    // All countries & affiliates are available
        view = "COMPANY";

    } else if ( (!isEmpty(login.grp_affiliates)) && (login.grp_affiliates != "NOT DEFINED") ) {    // a group of affiliates
        view = "GRP_AFF";

    } else if ( (login.region == login.affiliate) || (login.division == login.affiliate) ) {    // One affiliate, but country can be selected
        view = "AFFILIATE";

    } else if ( (login.region == login.country) || (login.division == login.country) ) {    // One country, but affiliate can be selected
        view = "COUNTRY";

    } else if ( !isEmpty(login.division) && (login.division != "NOT DEFINED") ) {
        view = "DIVISION";

    } else if ( !isEmpty(login.region) && (login.region != "NOT DEFINED") ) {
        view = "REGION";

    } else {               // Only one site: 1 country - 1 affiliate - 1 location
        view = "LOCAL";   
    }

    RMPApplication.debug("end get_info_ok");
}

function get_info_ko(error) 
{
    RMPApplication.debug("begin get_info_ko: error = " + JSON.stringify(error));
    // console.log("=> get_info_ko: error = ", error);
    var error_msg = ${P_quoted(i18n("get_info_ko_msg", "Récupération impossible des informations utilisateur!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end get_info_ko");
}  

// ======================================================
// load_site
// ======================================================
function load_site(locationCode) 
{
    RMPApplication.debug ("begin load_site: locationCode = " + JSON.stringify(locationCode)); 
    var my_pattern = {};
    var options = {};
    my_pattern.location_code = locationCode;
    id_get_location_by_code_api.trigger(my_pattern , options, load_site_ok, load_site_ko);
    RMPApplication.debug ("end load_site"); 
}

function load_site_ok(result) 
{
    RMPApplication.debug ("begin load_site_ok: result = " + JSON.stringify(result)); 
    site = result;
    // console.log("=> load_site_ok: site", site);
    RMPApplication.debug ("end load_site_ok");    
}

function load_site_ko(error) 
{
    RMPApplication.debug ("begin load_site_ko: result = " + JSON.stringify(error)); 
    site = {};
    var error_msg = ${P_quoted(i18n("get_load_site_ko_msg", "Récupération impossible des informations du site!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug ("end load_site_ko");    
}

// ===========================
//  send query to Service Now
// ===========================
function queryServiceNow(input)
{
    RMPApplication.debug("begin queryServiceNow: input = ", input);
    $("#id_spinner_search").show();
    var option = {};
    id_get_work_order_list_api.trigger(input, option, order_ok, order_ko);
    RMPApplication.debug("end queryServiceNow");
}


// ===========================
//  work order filter
// ===========================
function getFilter()
{
    RMPApplication.debug("begin getFilter");
    var sn_query = "";
    var first = true;
    var company = login.company;
    var wm_number = $("#id_numberFilter").val();
    var referenceClient = $("#id_clientReferenceFilter").val();
    var locations = $("#id_locationFilter").val();
    // console.log ("locationFilter: locations = ", locations);
    var description = $("#id_descriptionFilter").val();
    var status = $("#id_statusFilter").val();
    var wo_type = $("#id_woTypeFilter").val();
    var begin_opened_date = $("#id_beginOpenedDateFilter").val();
    var end_opened_date = $("#id_endOpenedDateFilter").val();
    var begin_closed_date = $("#id_beginClosedDateFilter").val();
    var end_closed_date = $("#id_endClosedDateFilter").val();
    
    // ----- company definition ------ //
    RMPApplication.debug("getFilter : company" );
    sn_query = "company.u_name=" + company;
    // sn_query = "company.u_name=" + company;
    // sn_query = "company.u_nameIN=" + "AUCHAN,VIVARTE";

    // ----- contract definition ------ //
    RMPApplication.debug("getFilter : contract" );
    sn_query += "^company.u_full_name=" + login.contract;

    // ----- numberFilter definition ------ //
    RMPApplication.debug("getFilter : wm_number" );    
    if (wm_number != "") {
        sn_query += "^number=" + $.trim(wm_number);
    }

    // ----- referenceClient definition ------ //
    RMPApplication.debug("getFilter : referenceClient" );
    if (referenceClient != "") {
            sn_query += "^correlation_id=" + $.trim(referenceClient);
    }

    // ----- locationFilter definition ------ //
    RMPApplication.debug("getFilter : location" );
    var tous = false;
    // console.log("getFilter location 0-A: ", locations);
    if (locations != null) {
        if ( locations.indexOf ("tous") > -1 ) {
            tous = true;
            // if ( (login.region != null) && (login.region != "") && (login.region != "not defined") ) {
            //     locations = var_location_list;
            // }
            locations = var_location_list;
            // console.log("getFilter location boucle 1");
        } else {
            var var_site_list = [];
            for (var i=0; i<locations.length; i++) {
                for (var j=0; j<var_location_list.length; j++) {
                    if (locations[i] == var_location_list[j].location_code) {
                        var_site_list[i] = var_location_list[j];
                        break;
                    }
                }
            }
            locations = var_site_list;
            // console.log("getFilter location boucle 2");
        }
    } else {    // Rien de sélectionné, donc "Tous" par défaut
        tous = true;
        locations = var_location_list;
        // console.log("getFilter location 3");
    }
    first = true;
    // console.log("getFilter: locations.length = ", locations.length, "\nlocations: ", locations);
    for (var i = 0; i < locations.length; i++) {
        var loca_name = $.trim(locations[i].location) + "-" + $.trim(locations[i].location_code);
        // console.log('i:', i, "n loca_name: ", loca_name);
        if (first == true) {
            first = false;
            if (tous) {
                sn_query += "^location.nameIN" + loca_name;
                // console.log("getFilter location 4: ", sn_query);
            }
            else {
                sn_query += "^location.nameIN" + loca_name;
                // console.log("getFilter location 5: ", sn_query);
            }
        } else {
            if (tous) {
                sn_query += "," + loca_name;
                // console.log("getFilter location 6: ", sn_query);
            } else {
                sn_query += "," + loca_name;
                // console.log("getFilter location 7: ", sn_query);
            }
        }
    }

    // sn_query += "^location.nameIN" + "testvivartecaroll";
    
    // ----- statusFilter definition ------ //
    RMPApplication.debug("getFilter : status" );
    first = true;
    if (status != null) {
        if (status != "tous") {
            for (var i = 0; i < status.length; i++) {
                if (first == true) {
                    first = false;
                    sn_query += "^stateIN" + $.trim(status[i]);
                } else {
                    sn_query += "," + $.trim(status[i]);
                }
            }
        }
    }

    // ----- categoryFilter definition ------ //
    RMPApplication.debug("getFilter : work order type" );
    // all incidents will be listed with "tous" value selected
    if (wo_type != null) {
        console.log('wo_type = ', wo_type);
        if (wo_type != "tous") {
            sn_query += "^u_work_order_type=" + $.trim(wo_type);
        }
    }

    // ----- descriptionFilter definition ------ // 
    RMPApplication.debug("getFilter : description" );
    if (description != "") {
        sn_query += "^short_descriptionLIKE" + $.trim(description);
    }

    // ----- opended Dates Filter definition ------ //
    RMPApplication.debug("getFilter : opened date " + begin_opened_date + ":" + end_opened_date );
    if (begin_opened_date != "" && end_opened_date != "") {
        var date1 = begin_opened_date.split("-");
        var date2 = end_opened_date.split("-");
        sn_query += "^opened_atBETWEEN" + date1[2] + "-" + date1[1] + "-" + date1[0] + "@" + date2[2] + "-" + date2[1] + "-" + date2[0];
    }
    if (begin_opened_date != "" && end_opened_date == "") {
        var date = begin_opened_date.split("-");
        sn_query += "^opened_at&gt;=" + date[2] + "-" + date[1] + "-" + date[0];
    }
    if (begin_opened_date == "" && end_opened_date != "") {
        var date = end_opened_date.split("-");
        sn_query += "^opened_at&lt;=" + date[2] + "-" + date[1] + "-" + date[0];
    }

    // ----- closed Dates Filter definition ------ //
    RMPApplication.debug("getFilter : closed date "  + begin_closed_date + ":" + end_closed_date );
    if (begin_closed_date != "" && end_closed_date != "") {
        var date1 = begin_closed_date.split("-");
        var date2 = end_closed_date.split("-");
        sn_query += "^closed_atBETWEEN" + date1[2] + "-" + date1[1] + "-" + date1[0] + "@" + date2[2] + "-" + date2[1] + "-" + date2[0];
    }
    if (begin_closed_date != "" && end_closed_date == "") {
        var date = begin_closed_date.split("-");
        sn_query += "^closed_at&gt;=" + date[2] + "-" + date[1] + "-" + date[0];
    }
    if (begin_closed_date == "" && end_closed_date != "") {
        var date = end_closed_date.split("-");
        sn_query += "^closed_at&lt;=" + date[2] + "-" + date[1] + "-" + date[0];
    }
    RMPApplication.debug("sn_query = " + sn_query);
    console.log("getFilter: sn_query = ", sn_query);
    return {"wm_order_query": sn_query};    

    RMPApplication.debug("end getFilter");
}

// =====================
// Get Work Order List 
// =====================
function getWorkOrderList() 
{
    RMPApplication.debug("begin getWorkOrderList");
    var query = "";
    if (var_order_list == null) {
        RMPApplication.debug("getWorkOrderList : var_order_list not set ");
        return;
    }
    if (var_order_list.length == undefined) {
        query = "parent.number=" + var_order_list.number;
        // console.log("=> getWorkOrderList: query 1 = ", query);
    } else {
        for (i=0; i < var_order_list.length; i++) {
            if (query == "") {
                if (var_order_list.length == 1) {
                    query = "parent.number=" + var_order_list[i].number;
                } else {
                    query = "parent.numberIN" + var_order_list[i].number;
                }
            } else {
                query += "," + var_order_list[i].number;
            }
        }
        // console.log("=> getWorkOrderList: query 2 = ", query);
    }
    RMPApplication.debug("query = " + query);
    return {"wm_task_query": query};
    RMPApplication.debug("end getWorkOrderList");
}

function order_ok(P_computed)
{
    RMPApplication.debug("order_ok : httpCode =  " + P_computed.httpCode);
    if (P_computed.wm_order_list == "") {
        var_order_list = null;
        // console.log("=> order_ok: var_order_list 1 = ", var_order_list);
        clearOrderDataTable();
        clearTaskDataTable();
        alertify.success("INFO: Aucun ticket ne correspond aux critères donnés!", 0);
        id_search_results.setVisible(false);
        $("#id_spinner_search").hide();
        return;
    } else {
        var_order_list = P_computed.wm_order_list.getRecordsResult;
        console.log("=> order_ok: var_order_list = ", var_order_list);
    }
    
    RMPApplication.debug("end order_ok");
}

function order_ko(error) 
{
    RMPApplication.debug("begin order_ko : error =  " + JSON.stringify(error));
    $("#id_spinner_search").hide();

    var error_msg = ${P_quoted(i18n("order_ko_msg", "Récupération impossible des informations de Work Order!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify); 
    RMPApplication.debug("end order_ko");
}

// ==========================================
// Show satisfaction areas under conditions
// ==========================================
function fillSatisfaction(note, toEval, evalComment)
{
    RMPApplication.debug("begin fillSatisfaction");
    if (note) {                             // already evaluated
        $("#id_divEvaluation").show();
        $("#id_evaluation").rating({
            language: 'fr',
            size: 'sm',
            theme: 'rating-rms-fa',
            showClear: false,
            filledStar: '<i class="fa fa-lg fa-heart"></i>',
            emptyStar: '<i class="fa fa-lg fa-heart-o"></i>'
        });
        $("#id_evaluation").rating('update', note);
        $("#id_evaluation").rating('refresh', {readonly: true});
        $("#id_rowSatisfaction").hide();
        $("#id_rating").show();
        $("#id_divHeartRating").hide();
        $("#id_divSendEval").hide();
        // console.log("fillSatisfaction: #1");
        if (evalComment) {                  // show comment only if not empty
            $("#id_divComment").hide();
            $("#id_divEvalComment").show();
            $("#id_evalComment").val (evalComment);
            $("#id_evalComment").attr('readonly', 'readonly');
            // console.log("fillSatisfaction: #2");
        } else {                                
            $("#id_divComment").hide();
            $("#id_divEvalComment").hide();
            // console.log("fillSatisfaction: #3");
        }
    } else if (toEval) {                    // not yet evaluated & ticket status: solved or closed
        $("#id_divEvaluation").hide();
        $("#id_divEvalComment").hide();
        $("#id_rowSatisfaction").addClass("bkg-light-blue");
        $("#id_rowSatisfaction").show();
        $("#id_divHeartRating").show();
        $("#id_rating").show();
        $("#id_divComment").show();
        $("#id_comment").val ("");
        $("#id_comment").prop('readonly', false);
        $("#id_divSendEval").show();
        // console.log("fillSatisfaction: #4");
    } else {                                // ticket not already resolved
        $("#id_rowSatisfaction").hide();
        $("#id_divEvaluation").hide();
        $("#id_divEvalComment").hide();
        // console.log("fillSatisfaction: #5");
    }

    //  Options for heartRating element
    $("#id_heartRating").rating({
        language: 'fr',
        stars:5 ,
        min: 0, 
        max: 5, 
        step: 1, 
        size: 'sm',
        theme: 'rating-rms-fa',
        filledStar: '<i class="fa fa-lg fa-heart"></i>',
        emptyStar: '<i class="fa fa-lg fa-heart-o"></i>'
    });
    
    $("#id_heartRating").on(
        'change', function () {
            var selectedNote = $(this).val(); 
            console.log('selectedNote: ' + selectedNote);
            setNotationValue(selectedNote);
    });
    RMPApplication.debug("end fillSatisfaction");
}

// ==================================
// Get notation value from user input
// ==================================
function setNotationValue(note)
{
    RMPApplication.debug("begin setNotationValue");
    $("#id_selectedNotation").val(note);
    RMPApplication.debug("end setNotationValue");
}

// ==================================
// Display details selected Ticket
// ==================================
function displayDetail()
{
    RMPApplication.debug("begin displayDetail");
    console.log('displayDetail: v_ol = ', v_ol);
    id_ticket_details.setVisible(true);
    
    var affiliate_detail = v_ol.site[0].location_code + " / " + v_ol.site[0].affiliate;
    var country_detail = v_ol.site[0].country;
    var city_detail = v_ol.site[0].city;

    if (v_ol.opened_at != "") {
        var opened_at_utc = moment.tz(v_ol.opened_at, "UTC");
        var opened_at = moment(opened_at_utc, "YYYY-MM-DD HH:mm:ss").tz(login.timezone).format("DD/MM/YYYY HH:mm:ss");
    }
    if (v_ol.closed_at != "") {
        var closed_at_utc = moment.tz(v_ol.closed_at, "UTC");
        var closed_at = moment(closed_at_utc, "YYYY-MM-DD HH:mm:ss").tz(login.timezone).format("DD/MM/YYYY HH:mm:ss");
    }
    if (v_ol.u_resolution_time != "") {
        var u_resolution_time_utc = moment.tz(v_ol.u_resolution_time, "UTC");
        var u_resolution_time = moment(u_resolution_time_utc, "YYYY-MM-DD HH:mm:ss").tz(login.timezone).format("DD/MM/YYYY HH:mm:ss");
    }

    var contract_detail = (v_ol.site[0] == undefined) ? v_ol.company : v_ol.site[0].company;

    $("#id_number_detail").val (v_ol.number);
    $("#id_correlation_id_detail").val (v_ol.correlation_id);
    $("#id_caller_detail").val (v_ol.caller);
    $("#id_contact_detail").val (v_ol.u_contact_details);
    $("#id_contract_detail").val (v_ol.company);
    $("#id_affiliate_detail").val (affiliate_detail);
    $("#id_country_detail").val (country_detail);
    $("#id_location_detail").val (v_ol.u_customer_site);
    $("#id_city_detail").val (city_detail);
    $("#id_opened_detail").val (opened_at);
    $("#id_priority_detail").val (v_ol.priority);
    $("#id_state_detail").val (v_ol.state);
    $("#id_closed_detail").val (closed_at);
    $("#id_billable_detail").val (v_ol.billable);
    $("#id_category_detail").val (v_ol.u_category);
    $("#id_product_type_detail").val (v_ol.u_product_type);
    $("#id_problem_type_detail").val (v_ol.u_problem_type);
    $("#id_short_description_detail").val (v_ol.short_description);
    $("#id_description_detail").val (v_ol.description);

    // Try to show product image associated with the opened ticket
    load_img_pb_type();

    RMPApplication.debug("end displayDetail");
}

// ========================================================
//  Model selection and reduce models target object
// ========================================================
function load_img_pb_type() 
{
    RMPApplication.debug ("begin load_img_pb_type");

    // we retrieve all fields needed to define precisely the problem_type
    var selectedCat = v_ol.u_category;
    var selectedProductType = v_ol.u_product_type;
    var selectedProblemType = v_ol.u_problem_type;
    var item_pb_img = "";    

    if ( (!isEmpty(selectedCat)) && (!isEmpty(selectedProductType)) && (!isEmpty(selectedProblemType)) ) {
        RMPApplication.debug ("=> load_img_pb_type: retrieve image details in catalog collection");   

        //capi
        var input_obj = {};
        var query_obj = {};
        query_obj.u_category = selectedCat;
        query_obj.u_product_type = selectedProductType;
        query_obj.u_problem_type = selectedProblemType;

        input_obj.input_query = query_obj;
        id_get_catalog_api.trigger(input_obj ,{}, load_img_pb_type_ok, load_img_pb_type_ko);

    } else {
        RMPApplication.debug("Catalogue", "Il n'y a aucun image correspondant à ce type de problème: \n" + selectedCat + ' - ' + selectedProductType + ' - ' + selectedProblemType);
        item_model_img += '<div id="id_item_model_img">'
                        + '<img id="id_product_img" src="https://live.runmyprocess.com/live/112501480325272109/upload/e4359180-c210-11e6-9cf7-02b3a23437c9/no_image_available.png" height="200" width="200" alt="Image associée au produit" class="img-thumbnail"><br>'
                        + '</div>';
        $("#id_product_img_div").html(''); 
        $("#id_product_img_div").append(item_model_img);
        $("#id_product_img_div").show();
    }

    RMPApplication.debug ("end load_img_pb_type");
}

function load_img_pb_type_ok(result) 
{
    RMPApplication.debug ("begin load_img_pb_type_ok");
    // console.log("=> load_img_pb_type_ok: result = ", result);
    var account_id = RMPApplication.get("account");
    var item_model_img = "";
    model_target = result.records;
    // console.log("=> load_img_pb_type_ok: model_target = ", model_target);
    if (model_target.length == 0) {
        item_model_img += '<div id="id_item_model_img">'
                        + '<img id="id_product_img" src="https://live.runmyprocess.com/live/112501480325272109/upload/e4359180-c210-11e6-9cf7-02b3a23437c9/no_image_available.png" height="200" width="200" alt="Image associée au produit" class="img-thumbnail"><br>'
                        + '</div>';
    } else {
        var model_img_url = "https://live.runmyprocess.com/live/";
        model_img_url += account_id + '/upload/';
        // find the chosen model if existing according previous selections and show it
        for (var i=0; i<model_target.length; i++) {
            model_img_url += model_target[i].idmedia + '/' + model_target[i].file_name;
            item_model_img += '<div id="id_item_model_img_' + i + '">'
                                    + '<i class="homeImage">'
                                    + '<img src="' + model_img_url + '" height="200" width="200" alt="Image associée au produit" class="img-thumbnail"><br>'
                                    + '<div class="homeThumbnail">'
                                    + '<span class="homeTitle">' + model_target[i].category + '<br>' + model_target[i].product_type + ' - ' + model_target[i].problem_type + '</span>'
                                    + '</div></i></div>';
            break;
        }
        
    }

    // console.log('item_model_img', item_model_img);
    $("#id_product_img_div").html(''); 
    $("#id_product_img_div").append(item_model_img);
    $("#id_product_img_div").show();
    RMPApplication.debug ("end load_img_pb_type_ok");    
}

function load_img_pb_type_ko(error) 
{
    RMPApplication.debug ("begin load_img_pb_type_ko : " + JSON.stringify(error));
    var error_msg = ${P_quoted(i18n("load_img_pb_type_ko", "Chargement impossible de l'image associée!"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify); 
    RMPApplication.debug ("end load_img_pb_type_ko");    
}

// =======================================
// Get Status Value from ServiceNow data
// =======================================
function getStatusValue (libelle)
{
    switch (libelle)  {
        case "Brouillon" :
        case "Transmis" :
        case "Draft" :
            return '1';
            break;
        case "Clos - Résolu" :
        case "Closed Complete" :
            return '3';
            break;
        case "Clos - Non résolu" :
        case "Closed Incomplete" :
            return '4';
            break;
        case "Clos - Annulé" :          
        case "Cancelled" :
            return '7';
            break;
        case "Diagnostiqué" :
        case "Qualifié" :
        case "Diagnosed" :
        case "Qualified" :
            return '10';
            break;
        case "En attente d'approbation" :
        case "Awaiting Approval" :
            return '11';
            break;
        case "Approuvé" :
        case "Approved" :
            return '13';
            break;
        case "En attente de diagnostic" :
        case "Awaiting Diagnosis" :
            return '15';
            break;
        case "Assigné" :
        case "Affecté" :
        case "Assigned" :
            return '16';
            break;
        case "En cours de résolution" :
        case "En cours de traitement" :
        case "Work In Progress" :
            return '18';
            break;
        case "Erreur" :
        case "Error" :
            return '19';
            break;
        case "Résolu - En attente de cloture" : 
        case "Resolved" :
            return '20';
            break;
        case "Non résolu - En attente de cloture" :
        case "Unresolved" :
            return '21';
            break;
        default:        // All status or no status selected)
            return '0';
            break;
    }
}

// =======================================
// Traduce Status Label from UK to FR
// =======================================
function StatusFromUkToFr (libelle)
{
    switch (libelle)  {
        case "Draft" :
            return "Transmis";
            break;
        case "Closed Complete" :
            return "Terminé - Complet";
            break;
        case "Closed Incomplete" :
            return "Terminé - Incomplet";
            break;       
        case "Cancelled" :
            return "Clos - Annulé";
            break;
        case "Diagnosed" : 
        case "Qualified" :
            return "Diagnostiqué";
            break;
        case "Awaiting Approval" :
            return "En attente d'approbation";
            break;
        case "Approved" :
            return "Approuvé";
            break;
        case "Awaiting Diagnosis" :
            return "En attente de diagnostic";
            break;
        case "Assigned" :
        case "Assigné" :
            return "Affecté";
            break;
        case "Work In Progress" :
            return "En cours de résolution";
            break;
        case "Error" :
            return "Erreur";
            break;
        case "Resolved" :
            return "Terminé - Complet";
            break;
        case "Unresolved" :
            return "Terminé - Incomplet";
            break;
        default:        // All status or no status selected)
            return "Aucun statut";
            break;
    }
}

// =======================================
// Get Simplified Status Label
// =======================================
function getStatusLabel (status)
{
    switch (status)  {
        case '1' :
            return "Transmis";
            break;
        case '3' :
        case '20' :
            return "Terminé - Complet";
            break;
        case '4' :
        case '21' :
            return "Terminé - Incomplet";
            break;
        case '7' :          
            return "Clos - Annulé";
            break;
        case '10' :
            return "Diagnostiqué";
            break;
        case '11' :
            return "En attente d'approbation";
            break;
        case '13' :
            return "Approuvé";
            break;
        case '15' :
            return "En attente de diagnostic";
            break;
        case '16' :
            return "Affecté";
            break;
        case '18' :
            return "En cours de résolution";
            break;
        case '19':
            return "Erreur";
            break;
        default:        // All status or no status selected)
            return 'Aucun statut';
            break;
    }
}

// ======================================
// save ticket evaluation to collection
// ======================================
function sendEval() {
    var my_pattern = {};
    var my_notation = {};
    my_notation.number = $("#id_number_detail").val();
    my_notation.login = id_login.getValue();
    my_notation.notation = $("#id_selectedNotation").val();
    my_notation.comment = $("#id_comment").val();
    RMPApplication.debug ("my_notation.number = " + my_notation.number);
    if ( var_notation.length == 0 ) {
        if (isEmpty(my_notation.notation)) {
            alertify.error("Erreur: une note d'évaluation est obligatoire!");
            return;
        } else {
            eval(col_notations).saveCallback(my_notation, notation_update_ok, notation_update_ko);
            var_notation = my_notation;
        }
    }
} 

function notation_update_ok(P_computed)
{
    RMPApplication.debug("notation_update_ok : P_computed =  " + JSON.stringify(P_computed));
    var style = 'style="font-size: 1.2em; color: ';
    var star = "";
    var heart = '<i class="fa fa-lg fa-heart"></i>';
    switch ( $("#id_selectedNotation").val() ) {
        case '1':
            star = heart;
            style += 'red;"';
            break;
        case '2':
            star = heart+heart;
            style += 'red;"';
            break;
        case '3':
            star = heart+heart+heart;
            style += '#f1c40f;"';
            break;
        case '4':
            star = heart+heart+heart+heart;
            style += 'green;"';
            break;
        case '5':
            star = heart+heart+heart+heart+heart;
            style += 'green;"';
            break;
    }
    $('#id_notation' + current_indice).html('<span '+ style + '>' + star + '</span>');  
    alertify.success("Votre évaluation a bien été enregistrée. Merci!");
    $("#id_divHeartRating").hide();
    $("#id_divSendEval").hide();
    $("#id_divComment").show();
    $("#id_comment").attr('readonly', 'readonly');
}

function notation_update_ko(P_error)
{
    RMPApplication.debug("notation_update_ko : P_error =  " + JSON.stringify(P_error));
}
