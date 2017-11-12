RMPApplication.debug("Main : Application started");

// #####################################
// Reactive different calls to SMS-capi
// 
// #####################################

// ========================
// Variables declaration
// ========================

var login = {};
var view = "";
var site = {};
var iso_code ='fr';

var var_location_list = null;
var var_order_list = null;
var var_task_list = null;
var v_ol = null;
var toEvaluate = true;
var var_notation = null;
var all_notations = null;
var current_indice = 0;
var current_wo_sys_id = 0;
var current_update_state = null;
//var current_update_state = '10';   // Diagnostiqué

// following collections could be used
var col_notations = "col_notations_vivarte";
var col_locations = "col_locations_vivarte";
var col_catalog = "col_catalogue_vivarte";

var isInit = false;

init();


// ========================
// initialization part
// ========================
function init() 
{
    RMPApplication.debug("begin init : Login = " + login);
    $("#id_spinner_search").hide();
    // Show only the necessary section: search
    id_search_filters.setVisible(true);
    id_search_results.setVisible(false);
    id_ticket_details.setVisible(false);
    $("#id_rowValidation").hide();

    // All date fields use specific jquery datepicker for more convenience
    $("#id_beginOpenedDateFilter").datepicker();
    $("#id_endOpenedDateFilter").datepicker();
    $("#id_beginClosedDateFilter").datepicker();
    $("#id_endClosedDateFilter").datepicker();

    var option = {};
    var pattern = {};
    pattern.login = RMPApplication.get("login");
    // console.log("=> pattern:", pattern); 
    id_get_user_info_as_admin_api.trigger(pattern, option , get_info_ok, get_info_ko); 

    // Fill different select lists
    // fillStateBox();  // executed by Post loaded script in id_request_status_cl properties
    // fillCategoryBox();  // executed by Post loaded script in id_request_type_cl properties

    RMPApplication.debug("end init");

    //Mises sur ecoutes:

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
    login.email = result.user;
    login.phone = result.phone; 
    login.contract = result.compagnie.toUpperCase() + "\\" + result.enseigne.toUpperCase();
    login.company = result.compagnie.toUpperCase();
    login.affiliate = result.enseigne.toUpperCase();
    login.country = result.pays.toUpperCase();
    login.location_code = result.code_magasin.toUpperCase();
    login.division = result.division.toUpperCase();
    login.region = result.region.toUpperCase();
    login.is_super_user = result.is_super_user.toUpperCase();

    if (login.is_super_user == "YES") {   // View as SuperUser
        view = "SUPERUSER";
    } else if ( (login.region == login.company) || (login.division == login.company) ) {    // View all COMPANY
        view = "COMPANY";
    } else if ( (login.region == login.country) || (login.division == login.country) ) {    // COUNTRY view
        view = "COUNTRY";
    } else if ( !isEmpty(login.division) && (login.division != "NOT DEFINED") ) {
        view = "DIVISION";
    } else if ( !isEmpty(login.region) && (login.region != "NOT DEFINED") ) {
        view = "REGION";
    } else {        // Only one site
        view = "LOCAL";
    }
    
    fillCountryBox(view);
    fillAffiliateBox(view);
    getFilteredLocations();
    if(view === "DIVISION" || view === "REGION" || view === "LOCAL"){
       // getFilteredLocations();
    }
    RMPApplication.debug("end get_info_ok");
}

function get_info_ko(result) 
{
    RMPApplication.debug("beginn get_info_ko: result = " + JSON.stringify(result));
    // console.log("=> get_info_ko: result = ", result);
    alertify.error("Error while getting user info!");
    alert("end get_info_ko");
} 

// ========================
// selection boxes filling
// ========================

// function script executed in Post loaded script for hidden "Request Status" Widget
function fillStateBox2() 
{
    RMPApplication.debug("begin fillStateBox");
    $("#id_statusFilter").append("<option value='tous' selected>Tous les statuts</option>");
    var stateList = JSON.parse(id_request_status_cl.getList()).list;
    for (i=0; i < stateList.length; i++) {
        $("#id_statusFilter").append("<option value='" + stateList[i].value + "'>&#10143; " + stateList[i].label + "</option>");
    }
    RMPApplication.debug("end fillStateBox");
}

// function script executed in Post loaded script for hidden "Request Type" Widget
function fillWoTypeBox2() 
{
    RMPApplication.debug("begin fillWoTypeBox2");
    $("#id_woTypeFilter").append("<option value='tous' selected>Tous</option>");
    var typeList = JSON.parse(id_request_type_cl.getList()).list;
    for (i=0; i < typeList.length; i++) {
        $("#id_woTypeFilter").append("<option value='" + typeList[i].value + "'>&#10143; " + typeList[i].label + "</option>");
    }
     RMPApplication.debug("end fillWoTypeBox2");
}

function fillLocationBox(locations_array){
    console.log("in fillLocationBox");
    RMPApplication.debug("begin fillLocationBox: locations_array = " + JSON.stringify(locations_array));
    $("#id_locationFilter").empty(); //reset du champs avant insertion des options

    if(locations_array.length > 0){
        //insertion
        $("#id_locationFilter").append("<option value='tous' selected>Ensemble des sites</option>");
        for (var i= 0 ; i< locations_array.length ; i++) {
                $("#id_locationFilter").append("<option value='" + locations_array[i].location_code + "'>&#10143; " + locations_array[i].location_code + " - "+ locations_array[i].city + "</option>");
        }
    }else{
        //si le locations_array ne contient pas de locations on definit un code false
        $("#id_locationFilter").append("<option value='false' selected>Aucun site pour la selection</option>");
    }
    RMPApplication.debug("end fillLocationBox");
}

function fillCountryBox(vue) 
{
    RMPApplication.debug("begin fillCountryBox: vue = " + JSON.stringify(vue));

    // TO DO
    // Complete selection filter according connected profile
    switch (vue) {
        case "SUPERUSER" :
        case "COMPANY" :
            $("#id_countryFilter").append("<option value='tous' selected>TOUS LES PAYS</option>");
            var countryList = JSON.parse(id_country_cl.getList()).list;
            for (i=0; i < countryList.length; i++) {
                $("#id_countryFilter").append("<option value='" + countryList[i].value + "'>&#10143; " + countryList[i].label + "</option>");
            }
            break;
        case "COUNTRY" :
        case "DIVISION" :
        case "REGION" :
        case "LOCAL" :
            $("#id_countryFilter").append("<option value='" + login.country + "' selected>" + login.country + "</option>");
            $("#id_countryFilter").attr('readonly', 'readonly');
            break;
    }

    //mise sur ecoute du champs pour lancer le peuplement de la site box au change
    $("#id_countryFilter").change(getFilteredLocations);

    RMPApplication.debug ("end fillCountryBox"); 
}

// function script executed in Post loaded script for hidden "Affiliate List" Widget
function fillAffiliateBox(vue) 
{
    RMPApplication.debug("begin fillAffiliateBox: vue = " + JSON.stringify(vue));

    // TO DO
    // Complete selection filter according connected profile
    switch (vue) {
        case "SUPERUSER" :
        case "COMPANY" :
        case "COUNTRY" :
            $("#id_affiliateFilter").append("<option value='tous' selected>TOUTES LES ENSEIGNES</option>");
            var affiliateList = JSON.parse(id_affiliate_cl.getList()).list;
            for (i=0; i < affiliateList.length; i++) {
                $("#id_affiliateFilter").append("<option value='" + affiliateList[i].value + "'>&#10143; " + affiliateList[i].label + "</option>");
            }
            break;
        case "DIVISION" :
        case "REGION" :
        case "LOCAL" :
            $("#id_affiliateFilter").append("<option value='" + login.affiliate + "' selected>" + login.affiliate + "</option>");
            $("#id_affiliateFilter").attr('readonly', 'readonly');
            break;
    }

    //mise sur ecoute du champs pour lancer le peuplement de la site box au change
    $("#id_affiliateFilter").change(getFilteredLocations);
    RMPApplication.debug ("end fillAffiliateBox"); 
}

/*// ======================================================
// load_location
// ======================================================
function load_location(locationCode) 
{
    RMPApplication.debug ("begin load_location : " + JSON.stringify(locationCode));  
    var my_option = {};
    var my_pattern = {};
    my_pattern.location_code = locationCode;
    // console.log("=> load_location: my_pattern = ", my_pattern);
    RMPApplication.debug ("my_pattern." + locationCode + " = " + my_pattern.location_code);    
    eval(col_locations).listCallback(my_pattern, my_option, load_location_ok, load_location_ko);
    RMPApplication.debug ("end load_location"); 
}

function load_location_ok(result) 
{
    RMPApplication.debug ("begin load_location_ok: result = " + JSON.stringify(result));
    // console.log("=> load_location_ok: result = ", result);   
    var_location_list = result;

    // complete "login" variable properties according to location/region/division definition
    login.location = result[0].location;
    login.location_name = result[0].location_name;
    login.address1 = result[0].address1;
    login.address2 = result[0].address2;
    login.address_title = result[0].address_title;
    login.postal_code = result[0].postal_code;
    login.city = result[0].city;
    login.latitude_coord = result[0].latitude_coord;
    login.longitude_coord = result[0].longitude_coord;
    login.reg_code = result[0].region;
    login.div_code = result[0].division;

    // Fill the location list
    fillLocationBox(login.location_code);
    RMPApplication.debug ("end load_location_ok");    
}

function load_location_ko(result) 
{
    RMPApplication.debug ("begin load_location_ko: result = " + JSON.stringify(result)); 
    alertify.error("Error while loading location!");
    RMPApplication.debug ("end load_location_ko");      
}*/

// ======================================================
// load_site
// ======================================================
function load_site(locationCode) 
{
    RMPApplication.debug ("begin load_site: locationCode = " + JSON.stringify(locationCode)); 
    var my_pattern = {};
    var options = {};
    my_pattern.location_code = locationCode;
    options.asynchronous = false;   
    eval(col_locations).listCallback(my_pattern, options, load_site_ok, load_site_ko);
    RMPApplication.debug ("end load_site"); 
}

function load_site_ok(result) 
{
    RMPApplication.debug ("begin load_site_ok: result = " + JSON.stringify(result)); 
    site = result;
    // console.log("=> load_site_ok: site", site);
    RMPApplication.debug ("end load_site_ok");    
}

function load_site_ko(result) 
{
    RMPApplication.debug ("begin load_site_ko: result = " + JSON.stringify(result)); 
    alertify.error("Error while loading site!");
    RMPApplication.debug ("end load_site_ko");    
}

//////////////////////////////////////////////////////////////////////
function getFilteredLocations(){
    RMPApplication.debug("begin getFilteredLocations");
    //get the location depending of the user's inputs
    var wos_array;
    var division_value = login.division ; 
    var region_value = login.region ;
    var location_code_value = login.location_code;
    var country_value = $("#id_countryFilter").val();
    var affiliate_value = $("#id_affiliateFilter").val();


    //capi
    if((view ==="COMPANY" && country_value === "tous" && affiliate_value ==="tous")||(view ==="COUNTRY" && affiliate_value ==="tous")){
        //si vue avec possibilité de select avec valeur tous par défaut on ne propose qu'une ligne d'ensemble des sites
        $("#id_locationFilter").empty(); //reset d'une valeur precedente.
        $("#id_locationFilter").append("<option value='tous' selected>Ensemble des sites</option>");

    }else{

        //on passe d'abord par une query sur la col rmp localisations pour ramener les sites
        var input  = {};

        switch(view){
            case "COMPANY":
            console.log("switch COMPANY");
            if(country_value !=="tous"){
            input.country = country_value;  
            }
            if(affiliate_value !=="tous"){
            input.affiliate = affiliate_value;
            }
            break;

            case "COUNTRY":
            console.log("switch COUNTRY");
            input.country = country_value;
            if(affiliate_value !=="tous"){
            input.affiliate = affiliate_value;
            }
            break;

            case "DIVISION":
            console.log("switch DIVISION");
            input.country = country_value;
            input.affiliate = affiliate_value;
            input.division = division_value;
            break;

            case "REGION":
            console.log("switch REGION");
            input.country = country_value;
            input.affiliate = affiliate_value;
            input.region = region_value;
            break;

            case "LOCAL" :
            console.log("switch LOCAL");
            input.country = country_value;
            input.affiliate = affiliate_value;
            input.location_code = location_code_value;

        }
        
        //get locations
        id_capi_get_filtered_locations_from_col.trigger(input, {}, capi_get_locations_ok, capi_get_locations_ko);
    }
    RMPApplication.debug("end getFilteredLocations");
}

function capi_get_locations_ok(result){
    RMPApplication.debug ("begin capi_get_locations_ok: result = " + JSON.stringify(result)); 
    console.log("in capi ok: result = ", result);
    var result_array = result.res;
    var location_names_array = [];
    var_location_list = result.res;
    for (var i = 0 ; i < result_array.length ; i++){
        if(!isEmpty(result_array[i].location) && !isEmpty(result_array[i].location_code)){
            location_name = result_array[i].location.trim() + "-" + result_array[i].location_code.trim() ;
            location_names_array.push(location_name);
        }
    }

    fillLocationBox(result_array);
    RMPApplication.debug ("end capi_get_locations_ok");
}

function capi_get_locations_ko(error){
    RMPApplication.debug ("begin capi_get_locations_ko: result = " + JSON.stringify(result)); 
    console.log("error: in capi_get_locations_ko");
    var error_msg = "Could not fetch datas , please try again"
    alertify.error(error_msg);
    RMPApplication.debug ("end capi_get_locations_ko");
}

// ===================================================================
// Get Work Order List From ServiceNow when clicking on Search button 
// ===================================================================
function getWorkOrderListFromServiceNow() 
{
    RMPApplication.debug("begin getWorkOrderListFromServiceNow");
    initDataTable();
    clearOrderDataTable();
    var sn_wo_type = $("#id_woTypeFilter").val();

    // TO DO
    // Adjust the following values with the contract
    switch (sn_wo_type) {
        case 'intervention':
            break;
        case 'preventive':
            break;
        case 'phone':
            break;
        case 'third_party':
            RMPApplication.showErrorBox("Type d'incident","La recherche pour le type d'incident sélectionné n'est pas encore implémentée!");
            return;
            break;
        case 'tous':
        default:
            break;
    }

    var result = getFilter();
    // console.log("getWorkOrderListFromServiceNow: result = ", result);
    queryServiceNow(result);

    RMPApplication.debug("end getWorkOrderListFromServiceNow");
}

// ===========================
//  favorite filter
// ===========================
function favoriteFilter(favQuery)
{
    RMPApplication.debug("begin favoriteFilter: favQuery = ", favQuery);
    initDataTable();
    clearOrderDataTable();
    var sn_query = "";
    var company = login.company;
    var locations = $("#id_locationFilter").val();
    var status = $("#id_statusFilter").val();

    // ----- company definition ------ //
    RMPApplication.debug("favoriteFilter : company" );
    sn_query = "company.u_name=" + company;

    // ----- contract definition ------ //
    RMPApplication.debug("favoriteFilter : contract" );
    sn_query += "^company.u_full_name=" + login.contract;

    // ----- locationFilter definition ------ //
    RMPApplication.debug("favoriteFilter : location" );
    var tous = false;
    // console.log("favoriteFilter location 0-A: ", locations);
    if (locations != null) {
        if ( locations.indexOf ("tous") > -1 ) {
            tous = true;
            // if ( (login.region != null) && (login.region != "") && (login.region != "not defined") ) {
            //     locations = var_location_list;
            // }
            locations = var_location_list;
            // console.log("favoriteFilter location boucle 1");
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
            // console.log("favoriteFilter location boucle 2");
        }
    } else {    // Rien de sélectionné, donc "Tous" par défaut
        tous = true;
        locations = var_location_list;
        // console.log("favoriteFilter location 3");
    }
  first = true;
    // console.log("favoriteFilter: locations.length = ", locations.length, "\nlocations: ", locations);
    for (var i = 0; i < locations.length; i++) {
        var loca_name = $.trim(locations[i].location) + "-" + $.trim(locations[i].location_code);
        // console.log('i:', i, "- loca_name: ", loca_name);
        if (first == true) {
            first = false;
            if (tous) {
                sn_query += "^location.nameIN" + loca_name;
                // console.log("favoriteFilter location 4: ", sn_query);
            }
            else {
                sn_query += "^location.nameIN" + loca_name;
                // console.log("favoriteFilter location 5: ", sn_query);
            }
        } else {
            if (tous) {
                sn_query += "," + loca_name;
                // console.log("favoriteFilter location 6: ", sn_query);
            } else {
                sn_query += "," + loca_name;
                // console.log("favoriteFilter location 7: ", sn_query);
            }
        }
    }

    switch (favQuery) {
        case 'opened' :
            status = ["1", "10", "11", "13", "15", "16", "18"];
            sn_query += "^stateIN" + $.trim(status[0]);
            for (i=1; i<status.length; i++) {
                sn_query += "," + $.trim(status[i]);
            }
            break;
        case 'closed' :
            status = ["3", "4", "20", "21"];
            sn_query += "^stateIN" + $.trim(status[0]);
            for (i=1; i<status.length; i++) {
                sn_query += "," + $.trim(status[i]);
            }
            break;
        case 'currentMonth' :
            var today = new Date();
            var dat = moment(today).subtract(1,'months').format("YYYY-MM-DD");
            sn_query += "^opened_at&gt;=" + dat;
            break;
        case 'lastOne' :        // by default, all ordered by creation date
            RMPApplication.showErrorBox ("INFO Recherche", "Ce résultat peut être obtenu en cliquant directement sur le bouton \"Rechercher\" situé en bas de l\'écran.");
            return;
            break;
        default:     
            break;
    }

    var result = {"wm_order_query": sn_query};
    // console.log("favoriteFilter: result = ", result);

    queryServiceNow(result);

    RMPApplication.debug("end favoriteFilter");
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
    
    var my_pattern = getWorkOrderList();
    // console.log("order_ok: my_pattern = ", my_pattern);
    var option = {};
    id_get_work_order_tasks_list_api.trigger(my_pattern, option, task_ok, task_ko);
    RMPApplication.debug("end order_ok");
}

function order_ko(P_error) 
{
    RMPApplication.debug("begin order_ko : P_error =  " + JSON.stringify(P_error));
    clearOrderDataTable();
    clearTaskDataTable();
    $("#id_spinner_search").hide();
    alertify.error("Error while retrieving work order!");
    RMPApplication.debug("end order_ko");
}


function task_ok(P_computed) 
{
    RMPApplication.debug("begin task_ok : httpCode =  " + P_computed.httpCode); 
    RMPApplication.debug("task_ok : P_computed =  " + JSON.stringify(P_computed)); 
    console.log ("task_ok: P_computed = ", P_computed);
    if (P_computed.wm_task_list == "") {
        var_task_list = null;
        // console.log ("task_ok: var_task_list 1 = ", var_task_list);
        clearTaskDataTable();
        id_search_results.setVisible(true);
        $("#id_spinner_search").hide();
        // return;
    } else {
        var_task_list = P_computed.wm_task_list.getRecordsResult;
        // console.log ("task_ok: var_task_list 2 = ", var_task_list);
    }
    
    if (var_order_list.length != 0) {
        var option = {};
        var pattern = {};
        eval(col_notations).listCallback(pattern, option, all_notations_ok, all_notations_ko);
    } else {
        clearOrderDataTable();
    }
    RMPApplication.debug("end task_ok");
}

function task_ko(P_error) 
{
    RMPApplication.debug("begin task_ko : P_error =  " + JSON.stringify(P_error));
    $("#id_spinner_search").hide();
    clearTaskDataTable();
    alertify.error("Error while retrieving tasks!");
    RMPApplication.debug("end task_ko");
}

function all_notations_ok(P_computed) 
{
    RMPApplication.debug("all_notations_ok =  " + JSON.stringify(P_computed)); 
    all_notations = P_computed;
    // console.log("all_notations_ok: all_notations = ", all_notations);
    fillOrderArray();
    $("#id_spinner_search").hide();
    RMPApplication.debug("end all_notations_ok");    
}

function all_notations_ko(P_error) 
{
    RMPApplication.debug("all_notations_ko =  " + JSON.stringify(P_error));
    clearTaskDataTable();
    $("#id_spinner_search").hide();
    alertify.error("Error while retrieving all notations!");
    RMPApplication.debug("end all_notations_ok");
}

// ===================================================
// Fill Order Array with Service Now Request Results
// ===================================================
function fillOrderArray()  
{
    RMPApplication.debug("begin fillOrderArray");
    // console.log("fillOrderArray: var_order_list = ", var_order_list);
    if (var_order_list == null) {
        RMPApplication.debug("fillOrderArray : var_order_list not set ");
        return;
    }
    $('#id_tab_wm_order').DataTable().clear();
    if (var_order_list.length == undefined) {       // 1 seul résultat à la recherche
        var opened_at = "";
        var expected_start = "";
        var closed_at = "";
        var site_code = "";

        // Following bloc exist for purpose tests
        if (var_order_list.u_customer_site != "testvivartecaroll") {
            var buf = var_order_list.u_customer_site.split('-');
            site_code = buf[buf.length - 1];
        } else {
            site_code = "TEST";
        }

        var my_pattern = {};
        my_pattern.location_code = site_code;
        var options = {};
        options.asynchronous = false;   
        eval(col_locations).listCallback(my_pattern, options, load_site_ok, load_site_ko);

        var_order_list.site = site;
        var_order_list.notation = getNotation(var_order_list.number, 0);
        var_order_list.toEvaluate = (toEvaluate) ? true : false;

        if (var_order_list.opened_at != "") {
            opened_at = moment(var_order_list.opened_at).add(2,'hour').format("DD/MM/YYYY HH:mm:ss");
        }
        if (var_order_list.expected_start != "") {
            expected_start = moment(var_order_list.expected_start).add(2,'hour').format("DD/MM/YYYY HH:mm:ss");
        }
        if (var_order_list.closed_at != "") {
            closed_at = moment(var_order_list.closed_at).add(2,'hour').format("DD/MM/YYYY HH:mm:ss");
        }
        RMPApplication.debug("fillOrderArray : number = " + var_order_list.number + "\n opened_at = " + opened_at + "\n sn_opened_at = " + var_order_list.opened_at);
        var row = new Array (
            "",
            "<span>&nbsp;&nbsp;<a href=\"#\" onClick=\"displayDetail(0);\"><i class=\"fa fa-search fa-lg\" aria-hidden=\"true\"></i></a></span>",
            var_order_list.number,
            var_order_list.short_description.substring(0,45),
            "<div id='id_state0'>" + StatusFromUkToFr(var_order_list.state) + "</div>",
            var_order_list.notation,
            var_order_list.site[0].location_name,
            var_order_list.site[0].location_code,
            opened_at,
            expected_start,
            closed_at
        );
        $('#id_tab_wm_order').DataTable().row.add(row);
        
    } else {
        for (i=0; i < var_order_list.length; i++) {
            try {
                var opened_at = "";
                var expected_start = "";
                var closed_at = "";
                var site_code = "";

                // Following bloc exist for purpose tests
                if (var_order_list[i].u_customer_site != "testvivartecaroll") {
                    var buf = var_order_list[i].u_customer_site.split('-');
                    site_code = buf[buf.length - 1];
                } else {
                    site_code = "TEST";
                }

                var my_pattern = {};
                my_pattern.location_code = site_code;
                var options = {};
                options.asynchronous = false;   
                eval(col_locations).listCallback(my_pattern, options, load_site_ok, load_site_ko);

                var_order_list[i].site = site;
                var_order_list[i].notation = getNotation (var_order_list[i].number, i);
                var_order_list[i].toEvaluate = (toEvaluate) ? true : false;

                if (var_order_list[i].opened_at != "") {
                    opened_at = moment(var_order_list[i].opened_at).add(2,'hour').format("DD/MM/YYYY HH:mm:ss");
                }
                if (var_order_list[i].expected_start != "") {
                    expected_start = moment(var_order_list[i].expected_start).add(2,'hour').format("DD/MM/YYYY HH:mm:ss");
                }
                if (var_order_list[i].closed_at != "") {
                    closed_at = moment(var_order_list[i].closed_at).add(2,'hour').format("DD/MM/YYYY HH:mm:ss");
                }
                RMPApplication.debug("fillOrderArray : number = " + var_order_list[i].number + "\n opened_at = " + opened_at + "\n sn_opened_at = " + var_order_list[i].opened_at);
                var row = new Array (
                    "",
                    "<span>&nbsp;&nbsp;<a href=\"#\" onClick=\"displayDetail(" + i + ");\"><i class=\"fa fa-search fa-lg\" aria-hidden=\"true\"></i></a></span>",
                    var_order_list[i].number, 
                    var_order_list[i].short_description.substring(0,45),
                    "<div id='id_state" + i + "'>" + StatusFromUkToFr(var_order_list[i].state) + "</div>",
                    var_order_list[i].notation,
                    var_order_list[i].site[0].location_name,
                    var_order_list[i].site[0].location_code,
                    opened_at,
                    expected_start,
                    closed_at
                );
                $('#id_tab_wm_order').DataTable().row.add(row);
            } catch (ee) {
                alert(ee.message);
            }
        }
    }
    id_search_filters.close();
    id_search_results.setVisible(true);
    $('#id_tab_wm_order').DataTable().order([8, 'desc']);       // descending order for date columns
    $('#id_tab_wm_order').DataTable().draw();
    RMPApplication.debug("end fillOrderArray");
}

// =======================================
// Get Notation from Notations collection 
// =======================================
function getNotation(number, indice)
{
    RMPApplication.debug("begin getNotation: number = " + number + "\n indice = " + indice);
    var column_notation = "";
    var style = 'style="font-size: 1.2em; color: ';
    var heart = '<i class="fa fa-lg fa-heart"></i>';
    var find = null;
    for(j=0; j < all_notations.length; j++) {
        if (all_notations[j].number == number)
        {
            RMPApplication.debug("=> getNotation : notation = " + all_notations[j].notation + "for : " + number);
            find = all_notations[j];
            break;
        }
    }
    if (find == null) {
        column_notation = '<div id="id_notation' + indice + '"></div>';
        toEvaluate = true;
    } else {
        toEvaluate = false;
        switch (find.notation) {
            case '1':
                star = heart;
                style += '#D9534F;"';
                break;
            case '2':
                star = heart+heart;
                style += '#F0AD4E;"';
                break;
            case '3':
                star = heart+heart+heart;
                style += '#5BC0DE;"';
                break;
            case '4':
                star = heart+heart+heart+heart;
                style += '#337AB7;"';
                break;
            case '5':
                star = heart+heart+heart+heart+heart;
                style += '#5CB85C;"';
                break;
        }
        column_notation = '<div id="id_notation' + indice + '"><span ' + style + '>' + star + '</span></div>';  
    }
    RMPApplication.debug("=> getNotation : column_notation = " + column_notation);
    return column_notation;
    RMPApplication.debug("end getNotation");
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
function displayDetail(indice)
{
    RMPApplication.debug("displayDetail : indice =  " + indice);
    id_search_filters.setVisible(false);
    id_search_results.setVisible(false);
    id_ticket_details.setVisible(true);
    
    current_indice = indice;

    if (var_order_list == null) {
        RMPApplication.debug("displayDetail : var_order_list not set ! ");
        return;
    }

    // Code optimized with ternaire condition
    v_ol = (var_order_list.length == undefined) ? var_order_list : var_order_list[indice];
    current_wo_sys_id = v_ol.sys_id;
    var affiliate_detail = v_ol.site[0].location_code + " / " + v_ol.site[0].affiliate;
    var country_detail = v_ol.site[0].country;
    var city_detail = v_ol.site[0].city;
    console.log('displayDetail: v_ol = ', v_ol);
    console.log('displayDetail: v_ol.site[0] = ', v_ol.site[0]);

    if (v_ol.opened_at != "") {
        var opened_at = moment(v_ol.opened_at).add(2,'hour').format("DD/MM/YYYY HH:mm:ss");
    }
    if (v_ol.closed_at != "") {
        var closed_at = moment(v_ol.closed_at).add(2,'hour').format("DD/MM/YYYY HH:mm:ss");
    }

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
    load_img_model();

    // Fill a 2nd table with tasks associated to current work order
    fillTaskArray(v_ol.number);
    var number = v_ol.number;
    // var state = getStatusValue( $("#id_state_detail").val() );
    
    // Draw a progess bar to follow request status
    $("#id_rowProgression").show();
    setProgression(number);      // toEvaluate var is defined during this function call

    // Define a new function: "askApproval"
    // Following instructions to be considered when IMAC is implemented
    // and request awaiting approval from Region Manager
    if ( (v_ol.state == '1') && (login.region != "not defined") ) {
        RMPApplication.debug ("displayDetail : region_managed =  " + login.region)
        $("#id_rowValidation").show();
    } else {
       $("#id_rowValidation").hide();
    }
}

// ========================================================
//  Model selection and reduce models target object
// ========================================================
function load_img_model() 
{
    RMPApplication.debug ("begin load_img_model");

    // for reminder, description saved during the ticket registering:
    //  description: "- Matériel: " + selectedCat + " (" + selectedBrand + " - " + selectedModel + ")"
    var descrip = v_ol.description;
    var selectedCat = "";
    var selectedBrand = "";
    var selectedModel = "";
    var item_model_img = "";    
    // console.log('descrip: ',descrip);
    if (descrip.substr(0, 11) == "- Matériel:") {
        var start = descrip.indexOf(":");
        var first = descrip.indexOf("(");
        var second = descrip.indexOf(")");
        var tiret = descrip.indexOf(" - ");
        selectedCat = descrip.substring(start+2, first-1);
        if (tiret > first+2) {
            selectedBrand = descrip.substring(first+1, tiret);
            if (tiret < second-2) {
                selectedModel = descrip.substring(tiret+3, second);
            }
        }
    }
    // console.log('selectedCat: [' + selectedCat + '] - selectedBrand: [' + selectedBrand + '] - selectedModel: [' + selectedModel + ']');
    if ( (!isEmpty(selectedCat)) && (!isEmpty(selectedBrand)) && (!isEmpty(selectedModel)) ) {
        RMPApplication.debug ("retrieve image details in catalog collection");   
        var option = {};
        var my_pattern = {};
        my_pattern.category = selectedCat;
        my_pattern.brand = selectedBrand;
        my_pattern.model = selectedModel;
        // console.log('my_pattern: ', my_pattern);
        eval(col_catalog).listCallback(my_pattern, option, load_img_model_ok, load_img_model_ko);
    } else {
        RMPApplication.debug("Catalogue", "Il n'y a aucun image correspondant à cet équipement: \n" + selectedCat + ' - ' + selectedBrand + ' - ' + selectedModel);
        item_model_img += '<div id="id_item_model_img">'
                        + '<img id="id_product_img" src="https://live.runmyprocess.com/live/112501480325272109/upload/2b73eb40-0f10-11e7-8bf9-02b3a23437c9/no_image_available.png" height="200" width="200" alt="Image associée au produit" class="img-thumbnail"><br>'
                        + '</div>';
        $("#id_product_img_div").html(''); 
        $("#id_product_img_div").append(item_model_img);
        $("#id_product_img_div").show();
    }

    RMPApplication.debug ("end load_img_model");
}

function load_img_model_ok(result) 
{
    RMPApplication.debug ("begin load_img_model_ok");
    var selectedFam = $("#id_selectedFamily").val();
    var selectedCat = $("#id_selectedCategory").val();
    var selectedBrand = $("#id_selectedBrand").val();
    var account_id = RMPApplication.get("account");
    var item_model_img = "";
    var model_list = [];
    var reduce_model_list = [];
    model_target = result;
    model_img_url = "https://live.runmyprocess.com/live/";
    model_img_url += account_id + '/upload/';

    // find the chosen model if existing according previous selections and show it
    for (i=0; i<model_target.length; i++) {
        model_img_url += model_target[i].idmedia + '/' + model_target[i].file_name;
        item_model_img += '<div id="id_item_model_img_' + i + '">'
                                + '<i class="homeImage">'
                                + '<img src="' + model_img_url + '" height="200" width="200" alt="Image associée au produit" class="img-thumbnail"><br>'
                                + '<div class="homeThumbnail">'
                                + '<span class="homeTitle">' + model_target[i].category + '<br>' + model_target[i].brand + ' - ' + model_target[i].model + '</span>'
                                + '</div></i></div>';
        break;
    }
    // console.log('item_model_img', item_model_img);
    $("#id_product_img_div").html(''); 
    $("#id_product_img_div").append(item_model_img);
    $("#id_product_img_div").show();
    RMPApplication.debug ("end load_img_model_ok");    
}

function load_img_model_ko(result) 
{
    RMPApplication.debug ("begin load_img_model_ko : " + JSON.stringify(result));
    alertify.error("Error while loading catalog!");    
    RMPApplication.debug ("end load_img_model_ko");    
}

// ====================================
// Reset fields after New Search click
// ====================================
function displayDetailClose()
{
    RMPApplication.debug("begin displayDetailClose");
    id_search_filters.setVisible(true);
    id_search_results.setVisible(true);
    id_ticket_details.setVisible(false);
    $("#id_number_detail").val ("");
    $("#id_correlation_id_detail").val ("");
    $("#id_caller_detail").val ("");
    $("#id_contact_detail").val ("");   
    $("#id_company_detail").val ("");
    $("#id_country_detail").val ("");
    $("#id_affiliate_detail").val ("");
    $("#id_location_detail").val ("");
    $("#id_city_detail").val ("");
    $("#id_opened_detail").val ("");
    $("#id_priority_detail").val ("");
    $("#id_state_detail").val ("");
    $("#id_closed_detail").val ("");
    $("#id_billable_detail").val ("");
    $("#id_category_detail").val ("");
    $("#id_product_type_detail").val ("");
    $("#id_problem_type_detail").val ("");
    $("#id_short_description_detail").val ("");
    $("#id_description_detail").val ("");
    // $("#id_attachment").html ("");
    clearTaskDataTable();
    $("#id_rowValidation").hide();
    $("#id_rowProgression").hide();
    RMPApplication.debug("end displayDetailClose");
}

// ==============================================
// Fill Task Array with data from ticket details
// ==============================================
function fillTaskArray(wm_order_num)  
{
    if (var_task_list == null) {
        RMPApplication.debug("fillTaskArray : var_task_list not set!");
        return;
    }

    $('#id_tab_wm_task').DataTable().clear();
    if (var_task_list.length == undefined) {
        if (var_task_list.parent == wm_order_num) {
            var row = new Array (
                "",
                var_task_list.number, 
                var_task_list.short_description,
                var_task_list.state, 
                var_task_list.assigned_to
            );
            $('#id_tab_wm_task').DataTable().row.add(row);
        }
    } else {
        for (j=0; j < var_task_list.length; j++) {
            try {
                if (var_task_list[j].parent == undefined) continue;
                if (var_task_list[j].parent == wm_order_num) {
                    var row = new Array (
                        "",
                        var_task_list[j].number,
                        var_task_list[j].short_description,
                        var_task_list[j].state,
                        var_task_list[j].assigned_to
                    );
                    $('#id_tab_wm_task').DataTable().row.add(row)
                }
            } catch (ee) {
                alert(ee.message);
            }
        }
    }
    $('#id_tab_wm_task').DataTable().draw();
}


function setProgression(numb) 
{
    var selectedValue = 0; 
    var state = $("#id_state_detail").val();
    RMPApplication.debug("displayDetail : state =  " + state);
    switch (getStatusValue(state))
    {
        case '1':                   // "Draft"
            selectedValue = 1;
            toEvaluate = false;
            break;
        case '11':                  // "Awaiting Approval"
            selectedValue = 2;
            toEvaluate = false;
            break;
        case '10':                  // "Diagnosed", "Qualified"
            selectedValue = 3;
            toEvaluate = false;
            break;
        case '15':                  // "Awaiting Diagnosis" 
        case '16':                  // "Assigned"
            selectedValue = 4;
            toEvaluate = false;     
            break;
        case '18':                  // "Work In Progress"
            selectedValue = 5;
            toEvaluate = false;
            break;
        case '20':                  // "Resolved"
        case '21':                  // "Unresolved"
            selectedValue = 6;
            toEvaluate = true;
            break;
        case '3':                   // "Closed Complete"
        case '4':                   // "Closed Incomplete"
            selectedValue = 6;
            toEvaluate = true;
            break;
        case '7':                   // "Cancelled"
            selectedValue = 7;
            toEvaluate = false;
            break;
        case '19':
        default:
            toEvaluate = false;            
    }
    v_ol.toEvaluate = toEvaluate;
    if (selectedValue == 0) {
        return;                 // progression row should not be showed
    }

    // Draw the progression bar accordig the current work order status
    $('#id_title1').html('Créée');
    $('#id_title2').html('Validée');
    $('#id_title3').html('Planifiée');
    $('#id_title4').html('En cours');
    $('#id_title5').html('Réalisée');
    // draw different step circles
    for (i = 1; i < 6; i++) {
        $('#id_circle' + i).attr("class", "circle");
        $('#id_label' + i).html(i);
    }
    // draw bars between different step circles
    for (i = 1; i < 5; i++) {
        $('#id_bar' + i).attr("class", "bar");
    }
    
    $('#id_circle' + selectedValue).attr("class", "circle active");
    for (j = selectedValue - 1; j > 0; j--) {
        $('#id_circle' + j).attr("class", "circle done")
        $('#id_label' + j).html('&#10003;');
    }

    var limit = selectedValue - 1;
    if (selectedValue == 7) {
        for (i=1; i<6; i++) {
            $('#id_circle' + i).attr("class", "circle reject");
            $('#id_label' + i).html('&#10007;');
            $('#id_title' + i).html('Rejetée');
            if (i<5) {
                $('#id_bar' + i).attr("class", "bar reject");
            }
        }
    } else {
        for (i=1; i<selectedValue; i++) {
            if ( (i=limit) && (limit!=5) ) {
                $('#id_bar' + i).attr("class", "bar half");
            } else if (i!=limit) {
                $('#id_bar' + i).attr("class", "bar done");
            }
        }
    }

    // 
    var option = {};
    var my_pattern = {};
    my_pattern.number = numb;
    RMPApplication.debug ("displayDetail : my_pattern.number = " + my_pattern.number);
    eval(col_notations).listCallback(my_pattern, option, notation_ok, notation_ko);

}

function notation_ok(P_computed)
{
    RMPApplication.debug ("end notation_ok : P_computed = " + JSON.stringify(P_computed));
    var_notation = P_computed;
    console.log("=> notation_ok: var_notation = ", var_notation);
    console.log("=> notation_ok: var_notation.length = ", var_notation.length);

    var note = false;
    var toEval = v_ol.toEvaluate;
    var evalComment = false;
    if (var_notation.length != 0) {
        note = (!isEmpty(var_notation[0].notation)) ? var_notation[0].notation : false;
        evalComment = (!isEmpty(var_notation[0].comment)) ? var_notation[0].comment : false;
    }

    console.log('=> notation_ok: note = ', note);
    console.log('=> notation_ok: toEval = ', toEval);
    console.log('=> notation_ok: evalComment = ', evalComment);
    
    // Show Satisfaction part 
    // only if no ticket notation and request status is "closed" or equal
    fillSatisfaction(note, toEval, evalComment);
    RMPApplication.debug("end notation_ok");
}

function notation_ko(P_error) 
{
    RMPApplication.debug("begin notation_ko : P_error =  " + JSON.stringify(P_error));
    alertify.error("Error while getting notation!");
    RMPApplication.debug("end notation_ko");
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

// ============================================
// post-actions for validation buttons
// ============================================

// ==>>> Reactivate call to sms-capi !!

function request(type)
{
    RMPApplication.debug ("request : current_wo_sys_id = " + current_wo_sys_id);
    var motif = $("#id_motive").val();
    RMPApplication.debug ("request : motif = " + motif);
    if (type == 'reject' && motif == "") {
        // RMPApplication.showErrorBox ("Alert", "Le motif est obligatoire pour le rejet d'une demande");
        alertify.error("Erreur: le motif est obligatoire en cas de rejet!")
        return;
    }

    var message = "";
    var state = '1';        // 1 => Draft status
    if (type == 'accept') {
        message = "acceptée le " + getDateTimeNow() + " par " + id_name.getValue();
        if ( motif != "") {
            message += "\npour le motif suivant : " + motif;
        }
        message += "\nDescription originale : \n" + $("#id_description_detail").val();
        current_update_state = 'Diagnosed';
        state = '10';   // New status: diagnosed

    } else {    // (type == 'reject')
        message = "refusée le " + getDateTimeNow() + " par " + id_name.getValue();
        message += "\npour le motif suivant : " + motif;
        message += "\nDescription originale : \n" + $("#id_description_detail").val();
        current_update_state = 'Cancelled';
        state = '7';  // New status: cancelled
    }

    var my_pattern = {};
    my_pattern.sn_sys_id = current_wo_sys_id;
    my_pattern.sn_state = state;
    my_pattern.sn_description = message;
    RMPApplication.debug ("request : state = " + state);
    RMPApplication.debug ("request : description = " + message);
    
    var option = {};
    id_update_work_order_status_api.trigger (my_pattern, option, update_ok, update_ko);

    var input2 = {};
    input2.message = "Votre demande (N°" + $("#id_number_detail").val() + ") a été " + message;
    input2.to_tel = login.phone;
    //id_send_wo_assignation_by_sms_api.trigger(input2, {}, sms_ok, sms_ko);
}

function sms_ok(result) 
{
    RMPApplication.debug("sms_ok : " + JSON.stringify(result));
}

function sms_ko(result) {
    RMPApplication.debug("sms_ko : " + JSON.stringify(result));
}

function update_ok(P_computed) {
    var motif = $("#id_motive").val();
    var message = "";
    if (current_update_state == 'Diagnosed') {
        message = "Accepté le " + getDateTimeNow() + " par " + id_name.getValue();
        if (motif != "") {
            message += "\npour le motif suivant : " + motif;
        }
        message += "\nDescription originale : \n" + $("#id_description_detail").val();
    }
    if (current_update_state == 'Cancelled') {
        message = "Refusé le " + getDateTimeNow() + " par " + id_name.getValue();
        message = message + "\npour le motif suivant : " + motif;
        message = message + "\nDescription originale : \n" + $("#id_description_detail").val();
    }
    if (var_order_list.length == undefined) {
        $("#id_state0").html(current_update_state);
        var_order_list.state = current_update_state;
        var_order_list.description = message;
    } else {
        $("#id_state" + current_indice).html(current_update_state);
        var_order_list[current_indice].state = current_update_state;
        var_order_list[current_indice].description = message;
    }
    displayDetail (current_indice);
}

function update_ko(P_error) {
    RMPApplication.debug("update_ko : P_error =  " + JSON.stringify(P_error));
    // id_spinner.setVisible(false);
    $("#id_spinner_search").hide();
    alert(JSON.stringify(P_error));
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
/*  } else {
        eval(col_notations).updateCallback(my_pattern, my_notation, notation_update_ok, notation_update_ko);
*/
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

// ======================
//  datatable clean
// ======================
function clearOrderDataTable()
{
    RMPApplication.debug("begin clearOrderDataTable");
    $('#id_tab_wm_order').DataTable().clear();
    $('#id_tab_wm_order').DataTable().draw();
    RMPApplication.debug("end clearOrderDataTable");

}

function clearTaskDataTable()
{
    RMPApplication.debug("begin clearOrderDataTable");
    $('#id_tab_wm_task').DataTable().clear();
    $('#id_tab_wm_task').DataTable().draw();
    RMPApplication.debug("end clearOrderDataTable");
}


// ===========================
// Table initialization
// ===========================
function initDataTable()
{
    RMPApplication.debug("begin initDataTable");
    if ( isInit == true ) {
        return;
    } else {
        isInit = true;
    }

    if ( $.fn.dataTable.isDataTable('#id_tab_wm_order') == false ) {
        $.fn.dataTable.moment('DD/MM/YYYY HH:mm:ss', iso_code);
        $('#id_tab_wm_order').DataTable({
            // responsive: true,
            responsive: {
                details: {
                    type: 'column'
                }
            },
            /*responsive: {
                details: {
                    display: $.fn.dataTable.Responsive.display.modal()
                }
            },*/
            columnDefs: [{
                className: 'control',
                orderable: false,
                targets:   0
            }],
            select: true,
            ordering: true,
            // "fixedHeader": {
            //     "footer": true
            // },
            // autoWidth: false,
            columns: [
                { title : "" },
                { title : "", "orderable": false },
                { title : "N° Ticket"},
                { title : "Description (abrégée)" },
                { title : "Statut"}, 
                { title : "Evaluation", "orderable": false },
                { title : "Libellé Site"},
                { title : "Code Site"},
                { title : "Date Ouverture"},
                { title : "Date Intervention Estimée"},
                { title : "Date Fermeture"}
            ],
            "pagingType": "full_numbers",
            "language": {
                "emptyTable": "Aucune donnée disponible",
                "zeroRecords": "Pas d'information à afficher",
                "lengthMenu": "Affiche _MENU_ enregistrements par page",
                "info": "Page _PAGE_ sur _PAGES_",
                "infoEmpty": "Pas d'information pour cette selection",
                "infoFiltered": "(filtré sur le nombre _MAX_ total d'enregistrements)",
                "loadingRecords": "Chargement en cours...",
                "processing": "Traitement en cours...",
                "search": "Rechercher:",
                "paginate" : {
                    "first" : "<i class=\"fa fa-fast-backward\" aria-hidden=\"true\"></i>",
                    "previous" : "<i class=\"fa fa-step-backward\" aria-hidden=\"true\"></i>",
                    "next" : "<i class=\"fa fa-step-forward\" aria-hidden=\"true\"></i>",
                    "last" : "<i class=\"fa fa-fast-forward\" aria-hidden=\"true\"></i>"
                }
            }
        });
    }
    if ( $.fn.dataTable.isDataTable('#id_tab_wm_task') == false ) {
        $.fn.dataTable.moment('DD/MM/YYYY HH:mm:ss', iso_code);
        $('#id_tab_wm_task').DataTable({
            responsive: {
                details: {
                    type: 'column'
                }
            },
            columnDefs: [{
                className: 'control',
                orderable: false,
                targets:   0
            }],
            select: true,
            ordering: true,
            columns: [
                { title : "" },
                { title : "N° Tâche"},
                { title : "Description"},
                { title : "Statut"},
                { title : "Affectée à"}
            ],
            "pagingType": "full_numbers",
            "language": {
                "emptyTable": "Aucune donnée disponible",
                "zeroRecords": "Pas d'information à afficher",
                "lengthMenu": "Affiche _MENU_ enregistrements par page",
                "info": "Page _PAGE_ sur _PAGES_",
                "infoEmpty": "Pas d'information pour cette selection",
                "infoFiltered": "(filtré sur le nombre _MAX_ total d'enregistrements)",
                "loadingRecords": "Chargement en cours...",
                "processing": "Traitement en cours...",
                "search": "Rechercher:",
                "paginate" : {
                    "first" : "<i class=\"fa fa-fast-backward\" aria-hidden=\"true\"></i>",
                    "previous" : "<i class=\"fa fa-step-backward\" aria-hidden=\"true\"></i>",
                    "next" : "<i class=\"fa fa-step-forward\" aria-hidden=\"true\"></i>",
                    "last" : "<i class=\"fa fa-fast-forward\" aria-hidden=\"true\"></i>"
                }
            }
        });
    }
    RMPApplication.debug("end initDataTable");
}
