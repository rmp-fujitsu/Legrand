RMPApplication.debug ("Application started");

// ========================
// Variables declaration
// ========================


// following collections could be used
var col_locations = "col_locations_auchan";
var col_catalog = "col_catalogue_auchan";
var col_affiliates = "col_enseignes_auchan";


function count_locations() 
{
	RMPApplication.debug ("begin count_locations");
	var my_pipelines = [{$group: {_id: null,count: {$sum: 1}}}];
	var my_options = {};

	eval(col_locations).aggregateCallback(my_pipelines, my_options, count_locations_ok, count_locations_ko);
	RMPApplication.debug ("end count_locations");
}

function count_locations_ok (result) 
{
	RMPApplication.debug("begin count_locations_ok");
	alertify.success("Success: " + result + " items in the collection");
	// TO DO
	// MAJ id_location_nb
	RMPApplication.debug("end count_locations_ko");
}
function count_locations_ko (result) 
{
	RMPApplication.debug("begin count_locations_ko");
    alertify.error("Error while counting items in collection" ); 
    RMPApplication.debug("end count_locations_ko");
}

function count_family() 
{
	RMPApplication.debug ("begin count_family");
	var my_pipelines = [ {$match : {"class":"family"}} ,{$group: {_id: null, count: {$sum: 1} } } ];
	var my_options = {};
	eval(col_catalog).aggregateCallback(my_pipelines, my_options, count_family_ok, count_family_ko);
	RMPApplication.debug ("end count_family");
}

function count_family_ok (result) 
{
	RMPApplication.debug("begin count_family_ok");
	alertify.success("Success: " + result + " families in the collection");
	// TO DO
	// MAJ id_family_nb
	RMPApplication.debug("end count_family_ok");
}

function count_family_ko (result) 
{
	RMPApplication.debug("begin count_family_ko");
    alertify.error("Error while counting families in collection" ); 
    RMPApplication.debug("end count_family_ko");
}

function count_category() 
{
	RMPApplication.debug ("begin count_category");
	var my_pipelines = [ {$match : {"class":"category"}} ,{$group: {_id: null, count: {$sum: 1} } } ];
	var my_options = {};
	eval(col_catalog).aggregateCallback(my_pipelines, my_options, count_category_ok, count_category_ko);
	RMPApplication.debug ("end count_category");
}

function count_category_ok (result) 
{
	RMPApplication.debug("begin count_category_ok");
	alertify.success("Success: " + result + " categories in the collection");
	// TO DO
	// MAJ id_category_nb
	RMPApplication.debug("end count_category_ok");
}

function count_category_ko (result) 
{
	RMPApplication.debug("begin count_category_ko");
    alertify.error("Error while counting categories in collection" ); 
    RMPApplication.debug("end count_category_ko");
}

function count_brand() 
{
	RMPApplication.debug ("begin count_brand");
	var my_pipelines = [ {$match : {"class":"brand"}} ,{$group: {_id: null, count: {$sum: 1} } } ];
	var my_options = {};
	eval(col_catalog).aggregateCallback(my_pipelines, my_options, count_brand_ok, count_brand_ko);
	RMPApplication.debug ("end count_brand");
}

function count_brand_ok (result) 
{
	RMPApplication.debug("begin count_brand_ok");
	alertify.success("Success: " + result + " brands in the collection");
	// TO DO
	// MAJ id_brand_nb
	RMPApplication.debug("end count_brand_ok");
}

function count_brand_ko (result) 
{
	RMPApplication.debug("begin count_brand_ko");
    alertify.error("Error while counting brands in collection" ); 
    RMPApplication.debug("end count_brand_ko");
}

function count_model() 
{
	RMPApplication.debug ("begin count_model");
	var my_pipelines = [ {$match : {"class":"category"}} ,{$group: {_id: null, count: {$sum: 1} } } ];
	var my_options = {};
	eval(col_catalog).aggregateCallback(my_pipelines, my_options, count_model_ok, count_model_ko);
	RMPApplication.debug ("end count_model");
}

function count_model_ok (result) 
{
	RMPApplication.debug("begin count_model_ok");
	alertify.success("Success: " + result + " models in the collection");
	// TO DO
	// MAJ id_model_nb
	RMPApplication.debug("end count_model_ok");
}

function count_model_ko (result) 
{
	RMPApplication.debug("begin count_model_ko");
    alertify.error("Error while counting models in collection" ); 
    RMPApplication.debug("end count_model_ko");
}