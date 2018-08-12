RMPApplication.debug ("Application started");

// ========================
// Variables declaration
// ========================

// if "true", logs will be showed on the browser console
var dbug = {
    "location" : false,
    "catalog" : false,
    "tutorial" : false,
    "location" : false,
    "affiliate" : false
};

// following collections could be used
var col_locations = "col_locations_rmsdemo";
var col_catalog = "col_catalogue_rmsdemo";
var col_affiliates = "col_enseignes_rmsdemo";
var col_languages = "col_langues_rmsdemo";
var col_tutorials = "col_tutoriels_bluegate";


var error_title_notify = ${P_quoted(i18n("error_title_notify", "Erreur"))};
var error_thanks_notify = ${P_quoted(i18n("error_thanks_notify", "Merci de signaler cette erreur !"))};
var btn_ok = ${P_quoted(i18n("btn_ok", "OK"))};

// ========================================================
//    Count number of locations in related collection
// ========================================================
function count_locations() 
{
	RMPApplication.debug ("begin count_locations");
	c_debug(dbug.location, "=> count_locations");
	var my_pipelines = [{$group: {_id: null,count: {$sum: 1}}}];
	var my_options = {};

	eval(col_locations).aggregateCallback(my_pipelines, my_options, count_locations_ok, count_locations_ko);
	RMPApplication.debug ("end count_locations");
}

function count_locations_ok (result) 
{
	RMPApplication.debug("begin count_locations_ok");
	c_debug(dbug.location, "=> count_locations_ok: result = ", result);
	// TO DO
	// MAJ id_location_nb
	RMPApplication.debug("end count_locations_ko");
}
function count_locations_ko (error) 
{
	RMPApplication.debug("begin count_locations_ko");
	c_debug(dbug.location, "=> count_locations_ko: error = ", error);
	var error_msg = ${P_quoted(i18n("count_locations_ko_msg", "Impossible de comptabiliser le nombre de sites dans la collection !"))};
    notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end count_locations_ko");
}

// ========================================================
//    Count number of families in related collection
// ========================================================
function count_family() 
{
	RMPApplication.debug ("begin count_family");
	c_debug(dbug.catalog, "=> count_family");
	var my_pipelines = [ {$match : {"class":"family"}} ,{$group: {_id: null, count: {$sum: 1} } } ];
	var my_options = {};
	eval(col_catalog).aggregateCallback(my_pipelines, my_options, count_family_ok, count_family_ko);
	RMPApplication.debug ("end count_family");
}

function count_family_ok (result) 
{
	RMPApplication.debug("begin count_family_ok");
	c_debug(dbug.catalog, "=> count_locations_ok: result = ", result);
	// TO DO
	// MAJ id_family_nb
	RMPApplication.debug("end count_family_ok");
}

function count_family_ko (error) 
{
	RMPApplication.debug("begin count_family_ko");
	c_debug(dbug.catalog, "=> count_family_ko: error = ", error);
	var error_msg = ${P_quoted(i18n("count_family_ko_msg", "Impossible de comptabiliser le nombre de familles dans la collection !"))};
	notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end count_family_ko");
}

// ========================================================
//    Count number of categories in related collection
// ========================================================
function count_category() 
{
	RMPApplication.debug ("begin count_category");
	c_debug(dbug.catalog, "=> count_category");
	var my_pipelines = [ {$match : {"class":"category"}} ,{$group: {_id: null, count: {$sum: 1} } } ];
	var my_options = {};
	eval(col_catalog).aggregateCallback(my_pipelines, my_options, count_category_ok, count_category_ko);
	RMPApplication.debug ("end count_category");
}

function count_category_ok (result) 
{
	RMPApplication.debug("begin count_category_ok");
	c_debug(dbug.catalog, "=> count_category_ok: result = ", result);
	// TO DO
	// MAJ id_category_nb
	RMPApplication.debug("end count_category_ok");
}

function count_category_ko (error) 
{
	RMPApplication.debug("begin count_category_ko");
	c_debug(dbug.catalog, "=> count_category_ko: error = ", error);
	var error_msg = ${P_quoted(i18n("count_category_ko_msg", "Impossible de comptabiliser le nombre de catégories dans la collection !"))};
	notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end count_category_ko");
}

// ========================================================
//    Count number of brands in related collection
// ========================================================
function count_brand() 
{
	RMPApplication.debug ("begin count_brand");
	c_debug(dbug.catalog, "=> count_brand");
	var my_pipelines = [ {$match : {"class":"brand"}} ,{$group: {_id: null, count: {$sum: 1} } } ];
	var my_options = {};
	eval(col_catalog).aggregateCallback(my_pipelines, my_options, count_brand_ok, count_brand_ko);
	RMPApplication.debug ("end count_brand");
}

function count_brand_ok (result) 
{
	RMPApplication.debug("begin count_brand_ok");
	c_debug(dbug.catalog, "=> count_brand_ok: result = ", result);
	// TO DO
	// MAJ id_brand_nb
	RMPApplication.debug("end count_brand_ok");
}

function count_brand_ko (error) 
{
	RMPApplication.debug("begin count_brand_ko");
	c_debug(dbug.catalog, "=> count_brand_ko: error = ", error);
	var error_msg = ${P_quoted(i18n("count_brand_ko_msg", "Impossible de comptabiliser le nombre de marques dans la collection !"))};
	notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end count_brand_ko");
}

// ========================================================
//    Count number of models in related collection
// ========================================================
function count_model() 
{
	RMPApplication.debug ("begin count_model");
	c_debug(dbug.catalog, "=> count_model");
	var my_pipelines = [ {$match : {"class":"category"}} ,{$group: {_id: null, count: {$sum: 1} } } ];
	var my_options = {};
	eval(col_catalog).aggregateCallback(my_pipelines, my_options, count_model_ok, count_model_ko);
	RMPApplication.debug ("end count_model");
}

function count_model_ok (result) 
{
	RMPApplication.debug("begin count_model_ok");
	c_debug(dbug.catalog, "=> count_model_ok: result = ", result);
	// TO DO
	// MAJ id_model_nb
	RMPApplication.debug("end count_model_ok");
}

function count_model_ko (error) 
{
	RMPApplication.debug("begin count_model_ko");
	c_debug(dbug.catalog, "=> count_model_ko: error = ", error);
	var error_msg = ${P_quoted(i18n("count_model_ko_msg", "Impossible de comptabiliser le nombre de modèles dans la collection !"))};
	notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end count_model_ko");
}

// ========================================================
//    Count number of tutorials in related collection
// ========================================================
function count_tutorial() 
{
	RMPApplication.debug ("begin count_tutorial");
	c_debug(dbug.tutorial, "=> count_tutorial");
	var my_pipelines = [ {$match : {"class":"category"}} ,{$group: {_id: null, count: {$sum: 1} } } ];
	var my_options = {};
	eval(col_tutorials).aggregateCallback(my_pipelines, my_options, count_tutorial_ok, count_tutorial_ko);
	RMPApplication.debug ("end count_tutorial");
}

function count_tutorial_ok (result) 
{
	RMPApplication.debug("begin count_tutorial_ok");
	c_debug(dbug.tutorial, "=> count_tutorial_ok: result = ", result);
	// TO DO
	// MAJ id_tutorial_nb
	RMPApplication.debug("end count_tutorial_ok");
}

function count_tutorial_ko (error) 
{
	RMPApplication.debug("begin count_tutorial_ko");
	c_debug(dbug.tutorial, "=> count_tutorial_ko: error = ", error);
	var error_msg = ${P_quoted(i18n("count_tutorial_ko_msg", "Impossible de comptabiliser le nombre de tutoriels dans la collection !"))};
	notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end count_tutorial_ko");
}

// ========================================================
//    Count number of affiliates in related collection
// ========================================================
function count_affiliate() 
{
	RMPApplication.debug ("begin count_affiliate");
	c_debug(dbug.affiliate, "=> count_affiliate");
	var my_pipelines = [ {$match : {"class":"category"}} ,{$group: {_id: null, count: {$sum: 1} } } ];
	var my_options = {};
	eval(col_affiliates).aggregateCallback(my_pipelines, my_options, count_affiliate_ok, count_affiliate_ko);
	RMPApplication.debug ("end count_affiliate");
}

function count_affiliate_ok (result) 
{
	RMPApplication.debug("begin count_affiliate_ok");
	c_debug(dbug.affiliate, "=> count_affiliate_ok: result = ", result);
	// TO DO
	// MAJ id_affiliate_nb
	RMPApplication.debug("end count_affiliate_ok");
}

function count_affiliate_ko (error) 
{
	RMPApplication.debug("begin count_affiliate_ko");
	c_debug(dbug.affiliate, "=> count_affiliate_ko: error = ", error);
	var error_msg = ${P_quoted(i18n("count_affiliate_ko_msg", "Impossible de comptabiliser le nombre d'enseignes dans la collection !"))};
	notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end count_affiliate_ko");
}

// ========================================================
//    Count number of languages in related collection
// ========================================================
function count_language() 
{
	RMPApplication.debug ("begin count_language");
	c_debug(dbug.language, "=> count_language");
	var my_pipelines = [ {$match : {"class":"category"}} ,{$group: {_id: null, count: {$sum: 1} } } ];
	var my_options = {};
	eval(col_languages).aggregateCallback(my_pipelines, my_options, count_language_ok, count_language_ko);
	RMPApplication.debug ("end count_language");
}

function count_language_ok (result) 
{
	RMPApplication.debug("begin count_language_ok");
	c_debug(dbug.language, "=> count_language_ok: result = ", result);
	// TO DO
	// MAJ id_affiliate_nb
	RMPApplication.debug("end count_language_ok");
}

function count_language_ko (error) 
{
	RMPApplication.debug("begin count_language_ko");
	c_debug(dbug.language, "=> count_language_ko: error = ", error);
	var error_msg = ${P_quoted(i18n("count_language_ko_msg", "Impossible de comptabiliser le nombre de langues dans la collection !"))};
	notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);
    RMPApplication.debug("end count_language_ko");
}