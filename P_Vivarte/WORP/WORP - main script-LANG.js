// ========================
//   Work Order Report : MAIN
// ========================
RMPApplication.debug("Main : Application started");

// #####################################
// Reactive different calls to SMS-capi
// 
// #####################################

// ========================
// Variables declaration
// ========================

var login = {};                     // retrieve metadata user
var view = "";                      // define current profile view
var scope = null;
var site = {};
var sn_query = null;
var affiliate_obj = null;
var affiliateList = null;           // group of alliliates for specific GRP_AFF view/scope
var var_location_list = null;
var var_order_list = null;
var var_task_list = null;
var v_ol = null;
var toEvaluate = true;
var var_notation = null;
var all_notations = null;
var curr_indice = 0;
var current_indice = 0;
var i_current = 0;
var current_wo_sys_id = 0;
var current_update_state = null;
var iso_code ='fr';

// // desactivated since direct calls in program code
var col_locations = "col_locations_vivarte";

// execute main program
init();

// ========================
// initialization part
// ========================
function init() 
{
    RMPApplication.debug("begin init : login = " + login);
    $("#id_spinner_search").hide();
    resetWI();              // reset Web Iterface
    var option = {};
    var pattern = {};
    pattern.login = RMPApplication.get("login");
    // console.log("=> init: pattern = ", pattern); tern);

    id_get_user_info_as_admin_api.trigger(pattern, option , get_info_ok, get_info_ko); 
    RMPApplication.debug("end init");
}

// ======================
// Reset interface
// ======================
function resetWI()
{
    RMPApplication.debug("begin resetWI");

    // Show only the necessary section: search
    id_search_filters.setVisible(true);
    id_search_results.setVisible(false);
    id_ticket_details.setVisible(false);

    // Desactivatet if no IMAC process inside this WI
    $("#id_rowValidation").hide();

    var selectedLang = "fr";                // french by default
    var datebox_lang = selectedLang;
    var datepicker_lang = selectedLang;

    var contexte = id_context.getValue();
    // contexte == "web" for desktop screen and datepicker; otherwise (for tablet & mobile) datebox is used as calendar component

    if (contexte == "web") {       // desktop

        var datepicker_options = $.extend(
            {},       // empty object
            $.datepicker.regional[datepicker_lang]
        );
        // All date fields use specific jquery datepicker for more convenience
        $("#id_beginOpenedDateFilter").datepicker(datepicker_options);
        $("#id_endOpenedDateFilter").datepicker(datepicker_options);
        $("#id_beginClosedDateFilter").datepicker(datepicker_options);
        $("#id_endClosedDateFilter").datepicker(datepicker_options);
        // set a high z-index value to show datepicker above any tooltip
        $("#id_beginOpenedDateFilter").css('zIndex', 999999);
        $("#id_endOpenedDateFilter").css('zIndex', 999999);
        $("#id_beginClosedDateFilter").css('zIndex', 999999);
        $("#id_endClosedDateFilter").css('zIndex', 999999);

    } else {                        // tablet or mobile
        // Common Options for datebox pluggins
        var datebox_options = {
            mode: "flipbox",
            themeDate: "info",
            themeDatePick: "warning",
            useLang: selectedLang,
            minYear: 2016,
            maxYear: 2022,
            useSetButton: true,
            themeSetButton: "primary",
            //overrideSetDateButtonLabel: "Valider",
            useClearButton: true,
            themeClearButton: "warning",
            useCollapsedBut: true,
            useFocus: true,
            useInlineBlind: true
        };
        $('#id_beginOpenedDateFilter').datebox(datebox_options);
        $('#id_endOpenedDateFilter').datebox(datebox_options);
        $('#id_beginClosedDateFilter').datebox(datebox_options);
        $('#id_endClosedDateFilter').datebox(datebox_options);
    }

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
    login.email = result.user;
    login.phone = result.phone;
    login.timezone = result.timezone;
    login.company = (!isEmpty(result.compagnie)) ? result.compagnie.trim().toUpperCase() : '';
    login.grp_affiliates = (!isEmpty(result.grp_ens)) ? result.grp_ens.trim().toUpperCase() : '';
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
    
    fillStateBox();
    fillWoTypeBox();
    fillAffiliateBox(view);
    fillCountryBox(view);
    getFilteredLocations();

    // direct call if current view don't propose a location selection
    if (view === "DIVISION" || view === "REGION" || view === "LOCAL") {
        // getFilteredLocations();
    }

    RMPApplication.debug("end get_info_ok");
}

function get_info_ko(error) 
{
    RMPApplication.debug("begin get_info_ko: error = " + JSON.stringify(error));
    // console.log("=> get_info_ko: error = ", error);
    var error_msg = "Error while getting user info!";
    alertify.error(error_msg);
    RMPApplication.debug("end get_info_ko");
} 

// ========================
// selection boxes filling
// ========================

// following function is executed in Post loaded script for hidden "Request Status" Widget
function fillStateBox() 
{
    RMPApplication.debug("begin fillStateBox");
    $("#id_statusFilter").append($("<option selected />").val('tous').html('Tous les statuts'));
    var stateList = JSON.parse(id_request_status_cl.getList()).list;
    for (i=0; i < stateList.length; i++) {
        $("#id_statusFilter").append("<option value='" + stateList[i].value + "'>&#10143; " + stateList[i].label + "</option>");
    }
    RMPApplication.debug("end fillStateBox");
}

// following function is executed in Post loaded script for hidden "Request Type" Widget
function fillWoTypeBox() 
{
    RMPApplication.debug("begin fillWoTypeBox");
    $("#id_woTypeFilter").append($("<option selected />").val('tous').html('Tous'));
    var typeList = JSON.parse(id_request_type_cl.getList()).list;
    for (i=0; i < typeList.length; i++) {
        $("#id_woTypeFilter").append("<option value='" + typeList[i].value + "'>&#10143; " + typeList[i].label + "</option>");
    }
    RMPApplication.debug("end fillWoTypeBox");
}

// ========================================================
// According to the view, fill the affiliate select box
// ========================================================
function fillAffiliateBox(vue) 
{
    RMPApplication.debug("begin fillAffiliateBox : vue = ", vue);
    // console.log("=>  fillAffiliateBox: vue = ", vue);

    var affiliateListTemp = JSON.parse(id_affiliate_cl.getList()).list;

    // Complete affiliate selection filter according connected profile
    switch (vue) {
        case "SUPERUSER" :
        case "COMPANY" : // see "COUNTRY"
        case "COUNTRY" :
            // Following line can be disabled if the concerned company only have one affiliate 
            $("#id_affiliateFilter").append($("<option selected />").val('tous').html('TOUTES LES ENSEIGNES'));
            affiliateList = JSON.parse(id_affiliate_cl.getList()).list;
            for (var i=0; i < affiliateList.length; i++) {
                $("#id_affiliateFilter").append($("<option />").val(affiliateList[i].value).html("&#10143; " + affiliateList[i].label.toUpperCase()))
            }
            // If we have only one affiliate, we can fix the following field as read-only
            // $("#id_affiliateFilter").attr('readonly', 'readonly');
            break;

        case "GRP_AFF" :
            $("#id_affiliateFilter").append($("<option selected />").val('tous').html('TOUTES LES ENSEIGNES'));
            affiliateList = [];
            switch (login.grp_affiliates) {
                case 'SMC':
                    affiliateList = [{'label':'COSMOPARIS', 'value':'COSMO'}, {'label':'MINELLI', 'value':'MINELLI'}, {'label':'SAN MARINA', 'value':'SMARINA'}];
                    break;
                case 'HALLES':
                    affiliateList = [{'label':'LA HALLE CHAUSSURE', 'value':'CEC'}, {'label':'LA HALLE MODE', 'value':'HAV'}];
                    break;
                default:
                    break;
            }
            for (var i=0; i < affiliateList.length; i++) {
                $("#id_affiliateFilter").append($("<option />").val(affiliateList[i].value).html("&#10143; " + affiliateList[i].label.toUpperCase()));

            }
            break;

        case "AFFILIATE" :  // see "LOCAL"
        case "DIVISION" :   // see "LOCAL"
        case "REGION" :     // see "LOCAL"
        case "LOCAL" :
            affiliateList = [];
            for (var i=0; i < affiliateListTemp.length; i++) {
                if (affiliateListTemp[i].label.toUpperCase() == login.affiliate.toUpperCase()) {
                     affiliateList = [{ 'label': affiliateListTemp[i].label.toUpperCase(), 'value': affiliateListTemp[i].value }];
                }
            }
            // console.log("fillAffiliateBox: affiliateList = ", affiliateList);
            $("#id_affiliateFilter").append($("<option selected />").val(affiliateList[0].value).html(affiliateList[0].label.toUpperCase()));
            $("#id_affiliateFilter").attr('readonly', 'readonly');
            break;
    }

    // Listen changes before populating dynamically locations select box
    $("#id_affiliateFilter").change(getFilteredLocations);
    RMPApplication.debug ("end fillAffiliateBox"); 
}

// ========================================================
// According to the view, fill the country select box
// ========================================================
function fillCountryBox(vue) 
{
    RMPApplication.debug("begin fillCountryBox: vue = " + JSON.stringify(vue));
    // console.log("=>  fillCountryBox: vue = ", vue);

    // Complete country selection filter according connected profile
    switch (vue) {
        case "SUPERUSER" :
            // no instructions for the moment

        case "COMPANY" :        // see "AFFILIATE"
        case "GRP_AFF" :        // see "AFFILIATE"
        case "AFFILIATE" :  
            // ATTENTION: we use a hidden CustomRMP component List to generate our own list
            // First option include all countries to avoid a huge selection of all countries
            $("#id_countryFilter").append($("<option selected />").val('tous').html('TOUS LES PAYS'));
            var countryList = JSON.parse(id_country_cl.getList()).list;
            countryList = countryList.sort(sortArrayByKey({key: 'label', string: true}, false) );
            $.each(countryList, function() {
                var id_i = this.value;
                var text_i = "&#10143; " + this.label.toUpperCase();
                if ( this.label.toUpperCase() == login.country.toUpperCase() ) {
                    $('#id_countryFilter[value="tous"]').attr('selected', false);
                    $("#id_countryFilter").append($("<option selected />").val(id_i).html(text_i));
                } else {
                    $("#id_countryFilter").append($("<option />").val(id_i).html(text_i));
                }
            });
            getFilteredLocations();
            break;

        case "COUNTRY" :    // see "LOCAL"
        case "DIVISION" :   // see "LOCAL"
        case "REGION" :     // see "LOCAL"
        case "LOCAL" :
            $("#id_countryFilter").append($("<option selected />").val(login.country).html(login.country.toUpperCase()));
            $("#id_countryFilter").attr('readonly', 'readonly');
            break;
    }

    // Listen changes before populating locations select box
    $("#id_countryFilter").change(getFilteredLocations);

    RMPApplication.debug ("end fillCountryBox"); 
}

// =====================================================================
// According to the view, fill the available locations
// Note: a little bit different with same function in NewWorkOrderPage
// =====================================================================
function fillLocationBox(locations_array)
{
    RMPApplication.debug("begin fillLocationBox: locations_array = " + JSON.stringify(locations_array));
    // console.log("=>  fillLocationBox: locations_array = ", locations_array);

    $("#id_locationFilter").empty();    // field reset

    if (locations_array.length > 0) {

        // to permit the display of placeholder
        // $("#id_locationFilter").append($("<option />").html(''));

        if (locations_array.length > 1) {       // more than 1 only location

            $("#id_locationFilter").append($("<option selected />").val('tous').html("Ensemble des sites"));
            // console.log('fillLocationBox: => Ensemble des sites');
        }

        // locations_array is alphabetically ordered
        locations_array = locations_array.sort(sortArrayByKey({key: 'location_code', string: true}, false) );

        // We populate selection box with all locations match filter queries
        $.each(locations_array, function() {
            var id_i = this.location_code;
            var text_i = "&#10143; " + this.location_code + " - " + this.city.toUpperCase();
            if (locations_array.length == 1) {
                $("#id_locationFilter").append($("<option selected />").val(id_i).html(text_i));
            } else {  
                $("#id_locationFilter").append($("<option />").val(id_i).html(text_i));
            }
        });

    } else {
        // if locations_array is empty, "false" is affected to "value"
        $("#id_locationFilter").append($("<option selected />").val('false').html("Aucun site pour la selection"));
    }

    RMPApplication.debug("end fillLocationBox");
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
    // TO DO: Remplacement PAR CAPI.
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
    site = {};
    alertify.error("Error while loading site!");
    RMPApplication.debug ("end load_site_ko");    
}

// ======================================================================================================
// Retrieve values from country, affiliate & location to define request pattern to location collection
// ======================================================================================================
function getFilteredLocations()
{
    RMPApplication.debug("begin getFilteredLocations");
    // console.log("=>  getFilteredLocations");

    // Retrieving user's input value
    var country_value = $("#id_countryFilter").val();
    var affiliate_value = $("#id_affiliateFilter").val();
    // console.log("=>  getFilteredLocations: affiliate_value = ", affiliate_value);
    var affiliate_label = $("#id_affiliateFilter").text();
    var division_value = login.division; 
    var region_value = login.region;
    var location_code_value = login.location_code;

    // TO DO:
    // au changement de valeur dans l'un des filtres Pays ou Enseigne, sauvegarder la liste des localisations
    // dans un tableau d'objets de type Location. Ce même tableau peut servir ensuite à fournir les informations
    // nécessaires dans l'appel d'une fonction comme load_site !!

    // According to specific views, if "tous" value is set for one of country & affiliate boxes
    if ((view ==="COMPANY" && country_value === "tous" && affiliate_value ==="tous") || (view ==="GRP_AFF" && affiliate_value ==="tous") || (view ==="AFFILIATE" && country_value ==="tous") || (view ==="COUNTRY" && affiliate_value ==="tous")) {
        
        // we propose only one value for all locations "Ensemble des sites"
        $("#id_locationFilter").empty();    // previous value reset
        $("#id_locationFilter").append($("<option selected />").val('tous').html("Ensemble des sites"));
        // console.log('getFilteredLocations: => Ensemble des sites');

    } else {

        // define pattern to query RMP locations collection
        var input  = {};
        var options = {};

         // retrieve complete name of affiliate (actually abrreviate name is value)
        if ( (affiliate_value !== "tous") && (!isEmpty(affiliate_value)) ) {
            for (var i=0; i < affiliateList.length; i++) {
                if ( affiliate_value.toUpperCase() ==  affiliateList[i].value.toUpperCase() ) {
                    affiliate_value = affiliateList[i].label.toUpperCase();
                    // console.log("getFilteredLocations: affiliate_value = ", affiliate_value);
                }
            }
        }

        switch (view) {
            case "COMPANY" :
                // console.log("switch COMPANY");
                if ( (country_value !== "tous") && (!isEmpty(country_value)) ) {
                    input.country = { "$regex" : country_value, "$options" : "i"};   
                }
                if ( (affiliate_value !== "tous") && (!isEmpty(affiliate_value)) ) {
                    input.affiliate = { "$regex" : affiliate_value, "$options" : "i"}; 
                }
                break;

            case "GRP_AFF" :
                // console.log("switch GRP_AFF");
                // TO DO => traiter ce cas particulier => ex: SMC (3 enseignes)
                if ( (country_value !== "tous") && (!isEmpty(country_value)) ) {
                    input.country = { "$regex" : country_value, "$options" : "i"};   
                }
                switch (login.grp_affiliates) {
                    case 'SMC':
                        if ( (affiliate_value !== "tous") && (!isEmpty(affiliate_value)) ) {
                            input.affiliate = { "$regex" : affiliate_value, "$options" : "i"}; 
                        } else {
                            // TO DO: composer la query avec le nom des 3 enseignes
                            input.affiliate = {};
                            input.affiliate.$in = ['COSMOPARIS', 'MINELLI', 'SAN MARINA']; 
                        }
                        break;
                    case 'HALLES':
                        if ( (affiliate_value !== "tous") && (!isEmpty(affiliate_value)) ) {
                            input.affiliate = { "$regex" : affiliate_value, "$options" : "i"}; 
                        } else {
                            // TO DO: composer la query avec le nom des 2 enseignes
                            input.affiliate = {};
                            input.affiliate.$in = ['LA HALLE CHAUSSURE', 'LA HALLE MODE']; 
                        }
                        break;
                    default:
                        if ( (affiliate_value !== "tous") && (!isEmpty(affiliate_value)) ) {
                            input.affiliate = { "$regex" : affiliate_value, "$options" : "i"};
                        }
                        break;
                }
                break;

            case "AFFILIATE" :
                // console.log("switch AFFILIATE");
                if ( (country_value !== "tous") && (!isEmpty(country_value)) ) {
                    input.country = { "$regex" : country_value, "$options" : "i"};   
                }
                if ( (affiliate_value !== "tous") && (!isEmpty(affiliate_value)) ) {
                    input.affiliate = { "$regex" : affiliate_value, "$options" : "i"};
                }
                break;

            case "COUNTRY" :
                // console.log("switch COUNTRY");
                if ( (country_value !== "tous") && (!isEmpty(country_value)) ) {
                    input.country = { "$regex" : country_value, "$options" : "i"}; 
                } 
                if ( (affiliate_value !== "tous") && (!isEmpty(affiliate_value)) ) {
                    input.affiliate = { "$regex" : affiliate_value, "$options" : "i"};
                }
                break;

            case "DIVISION" :
                // console.log("switch DIVISION");
                if ( (country_value !== "tous") && (!isEmpty(country_value)) ) {
                    input.country = { "$regex" : country_value, "$options" : "i"};  
                }
                if ( (affiliate_value !== "tous") && (!isEmpty(affiliate_value)) ) {
                    input.affiliate = { "$regex" : affiliate_value, "$options" : "i"};
                }
                if ( (division_value !== "tous") && (!isEmpty(division_value)) ) {
                    input.division = { "$regex" : division_value, "$options" : "i"};
                } 
                break;

            case "REGION" :
                // console.log("switch REGION");
                if ( (country_value !== "tous") && (!isEmpty(country_value)) ) {
                    input.country = { "$regex" : country_value, "$options" : "i"};  
                } 
                if ( (affiliate_value !== "tous") && (!isEmpty(affiliate_value)) ) {
                    input.affiliate = { "$regex" : affiliate_value, "$options" : "i"};
                }
                if ( (region_value !== "tous") && (!isEmpty(region_value)) ) {
                    input.region = { "$regex" : region_value, "$options" : "i"};
                }
                break;

            case "LOCAL" :
                // console.log("switch LOCAL");
                if ( (country_value !== "tous") && (!isEmpty(country_value)) ) {
                    input.country = { "$regex" : country_value, "$options" : "i"};  
                } 
                if ( (affiliate_value !== "tous") && (!isEmpty(affiliate_value)) ) {
                    input.affiliate = { "$regex" : affiliate_value, "$options" : "i"};
                }
                if ( (location_code_value !== "tous") && (!isEmpty(location_code_value)) ) {
                    input.location_code = { "$regex" : location_code_value, "$options" : "i"};
                }
        }
        
        //call api to location collection
        console.log("getFilteredLocations : input = ", input);
        id_get_filtered_locations_api.trigger(input, options, get_locations_ok, get_locations_ko);
    }
    RMPApplication.debug("end getFilteredLocations");
}

function get_locations_ok(result)
{
    RMPApplication.debug("begin get_locations_ok : result = " + JSON.stringify(result));
    var_location_list = result.res;
    // console.log("begin get_locations_ok : var_location_list = ", var_location_list);

    // Fill locations select box with locations result
    fillLocationBox(var_location_list);
    RMPApplication.debug("end get_locations_ok");
}

function get_locations_ko(error)
{
    RMPApplication.debug("begin get_locations_ko : error = " + JSON.stringify(error));
    // console.log("=> get_locations_ko: error = ", error);
    var error_msg = "Error while getting location info!";
    alertify.error(error_msg);
    RMPApplication.debug("end get_locations_ko");
}

// ===================================================================
//  retrieve all information site before fill Workd Order datatable 
// ===================================================================
function get_all_siteinfo() 
{
    RMPApplication.debug("begin get_all_siteinfo");
    // console.log("=> get_all_siteinfo");
    // TO DO: tenter de faire un appel API pour récupérer toutes les informations
    //     des locations concernées par le filtre de recherche
    //     PUIS pour chaque entrée de var_order_list, associer les informations de SITE

    curr_indice = 0;
    var v_ol_len = var_order_list.length;
    // console.log("=> get_all_siteinfo: v_ol_len = ", v_ol_len);
    if (var_order_list.length == undefined) {       // only one search's result
        var buf = var_order_list.location.split('-');
        var loc_code = $.trim(buf[buf.length - 1]);
        var input = {};
        input.location_code = loc_code;
        // console.log("=> get_all_siteinfo: loc_code = ",loc_code);
        //call api to location collection
        id_get_filtered_locations_api.trigger(input, {}, get_all_siteinfo_ok, get_all_siteinfo_ko);
    } else {
        for (var i=0; i<var_order_list.length; i++) {
            var buf = var_order_list[i].location.split('-');
            var loc_code = $.trim(buf[buf.length - 1]);
            
            // test par exemple sur le 3ème enregistrement
            /*if (i == 3) {
                console.log('=> get_all_siteinfo: \n +var_order_list[i].location = ', var_order_list[i].location, '\n +loc_code = ', loc_code);
            }*/

            var input = {};
            input.location_code = loc_code;
            // console.log("=> get_all_siteinfo: loc_code = ",loc_code);
            //call api to location collection
            id_get_filtered_locations_api.trigger(input, {}, get_all_siteinfo_ok, get_all_siteinfo_ko);
        }
    }
    RMPApplication.debug("end get_all_siteinfo");
}

function get_all_siteinfo_ok(result)
{
    RMPApplication.debug("begin get_all_siteinfo_ok : result = " + JSON.stringify(result));
    // console.log("=> get_all_siteinfo_ok : result = ", result);
    if (var_order_list.length == undefined) {       // only one work order => 1 object with non length
        var_order_list.site = result.res;
        fillOrderArray();
    } else {
        var_order_list[curr_indice].site = result.res;

        // test par exemple sur le 3ème enregistrement
        /*if (curr_indice == 3) {
            console.log('=> get_all_siteinfo_ok : \n +curr_indice = ', curr_indice);
            console.log('\n +var_order_list[curr_indice].location = ', var_order_list[curr_indice].location);
            console.log('\n +var_order_list[curr_indice].site = ', var_order_list[curr_indice].site);
        }*/

        if (curr_indice == var_order_list.length-1) {
            fillOrderArray();
        } else {
            curr_indice++;
        }
    }
    RMPApplication.debug("end get_all_siteinfo_ok");
}

function get_all_siteinfo_ko(error)
{
    RMPApplication.debug("begin get_all_siteinfo_ko : error = " + JSON.stringify(error));
    // console.log("=> get_all_siteinfo_ko: error = ", error);
    var error_msg = "Could not fetch datas , please try again";
    alertify.error(error_msg);
    RMPApplication.debug("end get_all_siteinfo_ko");
}

// ===================================================================
// Get Work Order List From ServiceNow when clicking on Search button 
// ===================================================================
function getWorkOrderListFromServiceNow() 
{
    RMPApplication.debug("begin getWorkOrderListFromServiceNow");
    // console.log("=> getWorkOrderListFromServiceNow");
    initDataTable();
    clearOrderDataTable();
    clearTaskDataTable();
    var wo_type = $("#id_woTypeFilter").val();

    // TO DO
    // Adjust the following values with the contract
    switch (wo_type) {
        case 'intervention':
            break;
        case 'imac':
            break;
        case 'tous':
            break;
        default:
            RMPApplication.showErrorBox("Type d'incident","La recherche pour le type d'incident sélectionné n'est pas encore implémentée!");
            return;
            break;
    }
    getFilter();

    RMPApplication.debug("end getWorkOrderListFromServiceNow");
}

// ===========================
//  favorite filter
// ===========================
function favoriteFilter(favQuery)
{
    RMPApplication.debug("begin favoriteFilter: favQuery = ", favQuery);
    // console.log("=> favoriteFilter: favQuery = ", favQuery);
    initDataTable();
    clearOrderDataTable();

    // retrieve values and prepare query
    sn_query = "";

    // specific queries according to selected button
    switch (favQuery) {
        case 'opened' :
            var status = ["1", "10", "11", "13", "15", "16", "18"];
            sn_query += "stateIN" + $.trim(status[0]);
            for (i=1; i<status.length; i++) {
                sn_query += "," + $.trim(status[i]);
            }
            break;
        case 'closed_one_month' :
            var status = ["3", "4", "20", "21"];
            sn_query += "stateIN" + $.trim(status[0]);
            for (i=1; i<status.length; i++) {
                sn_query += "," + $.trim(status[i]);
            }
            var today = new Date();
            var dat = moment(today).subtract(1,'months').format("YYYY-MM-DD");
            // closed_at should be filled by Service Now after 7 days
            // We prefer use u_resolution_time which register the last actions in Service Now
            // sn_query += "^closed_at&gt;=" + dat;
            sn_query += "^u_resolution_time&gt;=" + dat;
            break;
        case 'currentMonth' :
            var today = new Date(), y = today.getFullYear(), m = today.getMonth();
            var firstday = new Date(y, m, 1);
            firstday = moment(firstday).format("YYYY-MM-DD");
            sn_query += "opened_at&gt;=" + firstday;
            break;
        case 'lastOne' :        // by default, all ordered by creation date
            RMPApplication.showErrorBox ("INFO Recherche", "Ce résultat peut être obtenu en cliquant directement sur le bouton \"Rechercher\" situé en bas de l\'écran.");
            return;
            break;
        default:     
            break;
    }

    getLocations();
    RMPApplication.debug("end favoriteFilter");
}

// ===========================
//  work order filter
// ===========================
function getFilter()
{
    RMPApplication.debug("begin getFilter");
    // console.log('=> getFilter');

    // retrieve values and prepare query
    sn_query = "";
    sn_query += getWoNumberQuery();         
    sn_query += getCorrelationIdQuery();
    sn_query += getStatusQuery();
    sn_query += getWoTypeQuery();
    sn_query += getDescriptionQuery();
    sn_query += getOpenedAtQuery();
    sn_query += getClosedAtQuery();
    // console.log('=> getFilter : sn_query = ', sn_query);
    getLocations();     // retrieve company, contract and locations
    RMPApplication.debug("end getFilter");
}

// ===========================
//  send query to Service Now
// ===========================
function queryServiceNow()
{
    RMPApplication.debug("begin queryServiceNow: sn_query = ", sn_query);
    // console.log("=> queryServiceNow: sn_query = ", sn_query);
    $("#id_spinner_search").show();
    clearOrderDataTable();
    clearTaskDataTable();
    
    var wm_order_query = {"wm_order_query": sn_query};
    var option = {};
    id_get_work_order_list_api.trigger(wm_order_query, option, order_ok, order_ko);

    RMPApplication.debug("end queryServiceNow");
}

function order_ok(result)
{
    RMPApplication.debug("order_ok : httpCode =  " + result.httpCode);
    console.log('=> order_ok: \n +view = ', view + ' || scope = ', scope, '\n +result = ', result);

    if (isEmpty(result.wm_order_list)) {
        var_order_list = null;
        // console.log("=> order_ok: var_order_list 1 = ", var_order_list);

        alertify.success("INFO: Aucun ticket ne correspond aux critères donnés!", 0);
        id_search_results.setVisible(false);
        $("#id_spinner_search").hide();
        return;
    } else {

        var_order_list = result.wm_order_list.getRecordsResult;
        // console.log("=> order_ok: var_order_list = ", var_order_list);

    }
    
    getWorkOrderList();
    RMPApplication.debug("end order_ok");
}

function order_ko(error) 
{
    RMPApplication.debug("begin order_ko : error =  " + JSON.stringify(error));
    $("#id_spinner_search").hide();
    alertify.error("Error while retrieving work order!");
    RMPApplication.debug("end order_ko");
}

// =====================
// Get Work Order List 
// =====================
function getWorkOrderList() 
{
    RMPApplication.debug("begin getWorkOrderList");
    // console.log ("getWorkOrderList");

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

    var option = {};
    var pattern =  {"wm_task_query": query};
    // console.log("=> getWorkOrderList: pattern = ", pattern);
    id_get_work_order_tasks_list_api.trigger(pattern, option, task_ok, task_ko);
    RMPApplication.debug("end getWorkOrderList");
}

function task_ok(result) 
{
    RMPApplication.debug("begin task_ok : result =  " + JSON.stringify(result)); 
    RMPApplication.debug("=> task_ok : httpCode =  " + result.httpCode); 
    // console.log ("2=> task_ok: result = ", result);
    if (result.wm_task_list == "") {
        var_task_list = null;
        // console.log ("task_ok: var_task_list 1 = ", var_task_list);
        clearTaskDataTable();
        id_search_results.setVisible(true);
        $("#id_spinner_search").hide();
        // return;
    } else {
        var_task_list = result.wm_task_list.getRecordsResult;
        // console.log ("task_ok: var_task_list 2 = ", var_task_list);
    }
    
    if (var_order_list.length != 0) {
        get_all_siteinfo();

    } else {
        clearOrderDataTable();
    }
    RMPApplication.debug("end task_ok");
}

function task_ko(error) 
{
    RMPApplication.debug("begin task_ko : error =  " + JSON.stringify(error));
    $("#id_spinner_search").hide();
    clearTaskDataTable();
    alertify.error("Error while retrieving tasks!");
    RMPApplication.debug("end task_ko");
}

// ===================================================
// Fill Order Array with Service Now Request Results
// ===================================================
function fillOrderArray()  
{
    RMPApplication.debug("begin fillOrderArray");
    // console.log("fillOrderArray: var_order_list = ", var_order_list);

    if (var_order_list == null) {
        $("#id_spinner_search").hide();
        RMPApplication.debug("fillOrderArray : var_order_list not set ");
        RMPApplication.showErrorBox ("INFO Recherche", "Aucune demande ne correspond à votre recherche! \n (var_order_list non défini)");
        return;
    }
    $('#id_tab_wm_order').DataTable().clear();
    // Dealing with a single object or an array of objects
    var var_ol = (var_order_list.length == undefined) ? [var_order_list] : var_order_list;
    for (i=0; i < var_ol.length; i++) {
        try {
            var opened_at = "";
            var expected_start = "";
            var closed_at = "";

            var buf = var_ol[i].location.split('-');
            var site_code = $.trim(buf[buf.length - 1]);
            // console.log('var_ol[i] = ', var_ol[i]);

            var notation = (isEmpty(var_ol[i].u_customer_satisfaction)) ? "" : setNotation(var_ol[i].u_customer_satisfaction, i);

            if (var_ol[i].opened_at != "") {
                var opened_at_utc = moment.tz(var_ol[i].opened_at, "UTC");
                opened_at = moment(opened_at_utc, "YYYY-MM-DD HH:mm:ss").tz(login.timezone).format("DD/MM/YYYY HH:mm:ss");
            }
            if (var_ol[i].expected_start != "") {
                var expected_start_utc = moment.tz(var_ol[i].expected_start, "UTC");
                expected_start = moment(expected_start_utc, "YYYY-MM-DD HH:mm:ss").tz(login.timezone).format("DD/MM/YYYY HH:mm:ss");
            }
            if (var_ol[i].closed_at != "") {
                var closed_at_utc = moment.tz(var_ol[i].closed_at, "UTC");
                closed_at = moment(closed_at_utc, "YYYY-MM-DD HH:mm:ss").tz(login.timezone).format("DD/MM/YYYY HH:mm:ss");
            }
            var site_name = (!isEmpty(var_ol[i].location)) ? var_ol[i].location : "";
            var row = new Array (
                "",
                "<button onClick=\"displayDetail(" + i + ");\" class=\"btn_no_style\">&nbsp;<i class=\"fa fa-search fa-lg loupe\" aria-hidden=\"true\"></i></button>",
                var_ol[i].number, 
                var_ol[i].short_description.substring(0,45),
                "<div id='id_state" + i + "'>" + StatusFromUkToFr(var_ol[i].state) + "</div>",
                notation,
                site_name,
                site_code,
                opened_at,
                // expected_start,
                closed_at
            );
            // console.log('row = ', row);
            $('#id_tab_wm_order').DataTable().row.add(row);
        } catch (ee) {
            alert(ee.message);
        }
    }
    $("#id_spinner_search").hide();
    id_search_filters.close();
    id_search_results.setVisible(true);
    $('#id_tab_wm_order').DataTable().order([8, 'desc']);       // descending order for date column
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
    for(var j=0; j < all_notations.length; j++) {
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

// ==========================================================
// Set numerous of hearts according to customer satisfaction 
// ==========================================================
function setNotation(note, indice)
{
    RMPApplication.debug("begin setNotation: note = ", note);
    var column_notation = "";
    var style = 'style="font-size: 1.2em; color: ';
    var heart = '<i class="fa fa-heart"></i>';
    if (note == '0') {
        column_notation = '<div id="id_notation' + indice + '">- &#216; -</div>';
    } else {
        switch (note) {
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
    RMPApplication.debug("=> setNotation : column_notation = " + column_notation);
    return column_notation;
    RMPApplication.debug("end setNotation");
}

// ==========================================
// Show satisfaction areas under conditions
// ==========================================
// function fillSatisfaction(note, toEval, evalComment)
function fillSatisfaction(note, evalComment)
{
    RMPApplication.debug("begin fillSatisfaction");
    if (!isEmpty(note)) {                             // already evaluated
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
        // $("#id_rowSatisfaction").hide();
        // $("#id_rating").show();
        // $("#id_divHeartRating").hide();
        // $("#id_divSendEval").hide();
        // console.log("fillSatisfaction: #1");
        if (!isEmpty(evalComment)) {                  // show comment only if not empty
            // $("#id_divComment").hide();
            $("#id_divEvalComment").show();
            $("#id_evalComment").val (evalComment);
            $("#id_evalComment").attr('readonly', 'readonly');
            // console.log("fillSatisfaction: #2");
        } else {                                
            // $("#id_divComment").hide();
            $("#id_divEvalComment").hide();
            // console.log("fillSatisfaction: #3");
        }
    } else {
        $("#id_rowSatisfaction").hide();
        $("#id_divEvaluation").hide();
        $("#id_divEvalComment").hide();
    } 
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
    console.log('displayDetail: v_ol = ', v_ol);
    current_wo_sys_id = v_ol.sys_id;

    var affiliate_detail, country_detail, city_detail, location_detail;
    if (!isEmpty(v_ol.u_customer_site)) {
        var buf = v_ol.u_customer_site.split('-');
        var loc_name = $.trim(buf[0]);
        var loc_code = $.trim(buf[buf.length - 1]);
        load_site(loc_code);    // => define "site" variable with all concerned site's informations 
        setTimeout(function() {     // to be sure "site" variable is defined by load_site
            if ((site.length == 0) || (site.length == undefined)) {
            affiliate_detail = "Non trouvé!";
            country_detail = "Non trouvé!";
            city_detail = "Non trouvé!";
            location_detail = (isEmpty(loc_name)) ? "Non trouvé!" : loc_name;
            } else {
                v_ol.site = site;
                affiliate_detail = v_ol.site[0].affiliate;
                country_detail = v_ol.site[0].country;
                city_detail = v_ol.site[0].city;
                location_detail = v_ol.site[0].location_name;
            }
            $("#id_affiliate_detail").val (affiliate_detail);
            $("#id_country_detail").val (country_detail);
            $("#id_city_detail").val (city_detail);
            $("#id_location_detail").val (v_ol.u_customer_site);   
        }, 2000);
    }

    if (v_ol.opened_at != "") {
        var opened_at_utc = moment.tz(v_ol.opened_at, "UTC");
        var opened_at = moment(opened_at_utc, "YYYY-MM-DD HH:mm:ss").tz(login.timezone).format("DD/MM/YYYY HH:mm:ss");
    }
    if (v_ol.closed_at != "") {
        var closed_at_utc = moment.tz(v_ol.closed_at, "UTC");
        var closed_at = moment(closed_at_utc, "YYYY-MM-DD HH:mm:ss").tz(login.timezone).format("DD/MM/YYYY HH:mm:ss");
    }

    $("#id_number_detail").val (v_ol.number);
    $("#id_correlation_id_detail").val (v_ol.correlation_id);
    $("#id_caller_detail").val (v_ol.caller);
    $("#id_contact_detail").val (v_ol.u_contact_details);
    $("#id_contract_detail").val (v_ol.company);
    $("#id_opened_detail").val (opened_at);
    $("#id_priority_detail").val (getPrioriyLabel(v_ol.priority));
    $("#id_state_detail").val (StatusFromUkToFr(v_ol.state));
    $("#id_closed_detail").val (closed_at);
    // $("#id_billable_detail").val (v_ol.billable);    // inactive as not actually used
    $("#id_category_detail").val (v_ol.u_category);
    $("#id_product_type_detail").val (v_ol.u_product_type);
    $("#id_problem_type_detail").val (v_ol.u_problem_type);
    $("#id_short_description_detail").val (v_ol.short_description);
    $("#id_description_detail").val (v_ol.description);
    $("#id_close_notes").val (v_ol.close_notes);

    // Try to show product image associated with the opened ticket
    load_img_model();

    // Fill a 2nd table with tasks associated to current work order
    fillTaskArray(v_ol.number);
    var number = v_ol.number;
    // var state = getStatusValue( $("#id_state_detail").val() );
    
    // Fill statisfaction part if already evaluated or if closed since 5 days
    var eval_note = v_ol.u_customer_satisfaction;
    var eval_comment = v_ol.u_satisfaction_comment;
    fillSatisfaction(eval_note, eval_comment);

    // Draw a progess bar to follow request status
    $("#id_rowProgression").show();
    setProgression(number);      // toEvaluate var is defined during this function call

    $("#id_rowValidation").hide();
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

        //capi
        var input_obj = {};
        var query_obj = {};
        query_obj.category = selectedCat;
        query_obj.brand = selectedBrand;
        query_obj.model = selectedModel;

        input_obj.input_query = query_obj;
        id_get_catalog_api.trigger(input_obj ,{}, load_img_model_ok, load_img_model_ko);

    } else {
        RMPApplication.debug("Catalogue", "Il n'y a aucun image correspondant à cet équipement: \n" + selectedCat + ' - ' + selectedBrand + ' - ' + selectedModel);
        item_model_img += '<div id="id_item_model_img">'
                        + '<img id="id_product_img" src="https://live.runmyprocess.com/live/112501480325272109/upload/e4359180-c210-11e6-9cf7-02b3a23437c9/no_image_available.png" height="200" width="200" alt="Image associée au produit" class="img-thumbnail"><br>'
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
    // console.log("=> load_img_model_ok: result = ", result);
    var selectedFam = $("#id_selectedFamily").val();
    var selectedCat = $("#id_selectedCategory").val();
    var selectedBrand = $("#id_selectedBrand").val();
    var account_id = RMPApplication.get("account");
    var item_model_img = "";
    var model_list = [];
    var reduce_model_list = [];
    model_target = result.records;
    // console.log("=> load_img_model_ok: model_target = ", model_target);
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
                                    + '<span class="homeTitle">' + model_target[i].category + '<br>' + model_target[i].brand + ' - ' + model_target[i].model + '</span>'
                                    + '</div></i></div>';
            break;
        }
        
    }

    // console.log('item_model_img', item_model_img);
    $("#id_product_img_div").html(''); 
    $("#id_product_img_div").append(item_model_img);
    $("#id_product_img_div").show();
    RMPApplication.debug ("end load_img_model_ok");    
}

function load_img_model_ko(error) 
{
    RMPApplication.debug ("begin load_img_model_ko : " + JSON.stringify(error));
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
    $("#id_category_detail").val ("");
    $("#id_product_type_detail").val ("");
    $("#id_problem_type_detail").val ("");
    $("#id_short_description_detail").val ("");
    $("#id_description_detail").val ("");
    // $("#id_billable_detail").val ("");       // inactive as not actually used
    // $("#id_attachment").html ("");           // to activate as soon as attachment is valid
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
    // Dealing with a single object or an array of objects
    var var_tl = (var_task_list.length == undefined) ? [var_task_list] : var_task_list;
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
    $('#id_tab_wm_task').DataTable().draw();
}


function setProgression(numb) 
{
    RMPApplication.debug("begin setProgression : numb =  " + numb);
    var selectedValue = 0; 
    var state = $("#id_state_detail").val();
    // console.log('=> setProgression: state : ', state);
    switch (getStatusValue(state))
    {
        case '1':                   // "Draft"
            selectedValue = 1;
            break;
        case '11':                  // "Awaiting Approval"
            selectedValue = 2;
            break;
        case '10':                  // "Diagnosed", "Qualified"
            selectedValue = 3;
            break;
        case '15':                  // "Awaiting Diagnosis" 
        case '16':                  // "Assigned"
            selectedValue = 4;
            break;
        case '18':                  // "Work In Progress"
            selectedValue = 5;
            break;
        case '20':                  // "Resolved"
        case '21':                  // "Unresolved"
            selectedValue = 6;
            break;
        case '3':                   // "Closed Complete"
        case '4':                   // "Closed Incomplete"
            selectedValue = 6;
            break;
        case '7':                   // "Cancelled"
            selectedValue = 7;
            break;
        case '19':
        default:
            // toEvaluate = false;            
    }
    // console.log('=> setProgression: selectedValue : ', selectedValue);
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
            if ( (i==limit) && (limit!=5) ) {
                $('#id_bar' + i).attr("class", "bar half");
            } else if (i!=limit) {
                $('#id_bar' + i).attr("class", "bar done");
            }
        }
    }

    RMPApplication.debug("end setProgression");
}

function notation_ok(result)
{
     RMPApplication.debug ("end notation_ok : result = " + JSON.stringify(result));
    var_notation = result.records ;
    // console.log("=> notation_ok: var_notation = ", var_notation);
    // console.log("=> notation_ok: var_notation.length = ", var_notation.length);

    var note = false;
    var toEval = v_ol.toEvaluate;
    var evalComment = false;
    if (var_notation.length != 0) {
        note = (!isEmpty(var_notation[0].notation)) ? var_notation[0].notation : false;
        evalComment = (!isEmpty(var_notation[0].comment)) ? var_notation[0].comment : false;
    }
    fillSatisfaction(note, toEval, evalComment);
    RMPApplication.debug("end notation_ok");
}

function notation_ko(error) 
{
    RMPApplication.debug("begin notation_ko : error =  " + JSON.stringify(error));
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
        case "Terminé - Complet" :
        case "Closed Complete" :
            return '3';
            break;
        case "Clos - Non résolu" :
        case "Terminé - Incomplet" :
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

// =======================================
// Get Simplified Priority Label
// =======================================
function getPrioriyLabel (priority)
{
    switch (priority)  {
        case '1':
        case '1 - Critical':
            return "1 - Critique";
            break;
        case '2':
        case '2 - High':
            return "2 - Elevée";
            break;
        case '3':
        case '3 - Moderate':
            return "3 - Modérée";
            break;
        case '4':
        case '4 - Low':       
            return "4 - Basse";
            break;
        case '5':
        case '5 - Planning':
            return "5 - Planifiée";
            break;
        default:        // All priorities or no priority selected)
            return 'Aucune priorité';
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

function update_ok(result) {
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
    displayDetail(current_indice);
}

function update_ko(error) {
    RMPApplication.debug("update_ko : error =  " + JSON.stringify(error));
    // id_spinner.setVisible(false);
    $("#id_spinner_search").hide();
    alert(JSON.stringify(error));
}

function notation_update_ok(result)
{
    RMPApplication.debug("notation_update_ok : result =  " + JSON.stringify(result));
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

function notation_update_ko(error)
{
    RMPApplication.debug("notation_update_ko : error =  " + JSON.stringify(error));
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
    
    // Common options for all of our tables
    var  fr_language = {
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
    };
    var tab_wm_order_col = [
        { title : "" },
        { title : "", "orderable": false },
        { title : "N° Ticket"},
        { title : "Description (abrégée)" },
        { title : "Statut"}, 
        { title : "Evaluation", "orderable": false },
        { title : "Libellé Site"},
        { title : "Code Site"},
        { title : "Date Ouverture"},
        // { title : "Date Intervention Estimée"},
        { title : "Date Fermeture"}
    ];
    var tab_wm_task_col = [
        { title : "" },
        { title : "N° Tâche"},
        { title : "Description"},
        { title : "Statut"},
        { title : "Affectée à"}
    ];
    var responsive_options = {
        details: {
            type: 'column'
        }
    };
    var columDefs_options = [{
        className: 'control',
        orderable: false,
        targets:   0
    }];

    // #id_tab_wm_order table options
    if ( $.fn.dataTable.isDataTable('#id_tab_wm_order') == false ) {
        $.fn.dataTable.moment('DD/MM/YYYY HH:mm:ss', iso_code);
        $('#id_tab_wm_order').DataTable({
            responsive: responsive_options,
            columnDefs:columDefs_options,
            select: true,
            ordering: true,
            columns: tab_wm_order_col,
            "pagingType": "full_numbers",
            "language": fr_language
        });
    }
    // #id_tab_wm_task table options
    if ( $.fn.dataTable.isDataTable('#id_tab_wm_task') == false ) {
        $.fn.dataTable.moment('DD/MM/YYYY HH:mm:ss', iso_code);
        $('#id_tab_wm_task').DataTable({
            responsive: responsive_options,
            columnDefs: columDefs_options,
            select: true,
            ordering: true,
            columns: tab_wm_task_col,
            "pagingType": "full_numbers",
            "language": fr_language
        });
    }
    RMPApplication.debug("end initDataTable");
}
