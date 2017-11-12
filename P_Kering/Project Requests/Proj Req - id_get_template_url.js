// id_get_template_url

var my_pattern = {};
col_hours.listCallback(my_pattern, {}, list_ok, list_ko);

function list_ok(result) 
{
    //alert("ok=" + JSON.stringify(result));
	id_file_url.setText(result[result.length - 1].file_url);
}

function list_ko(result) 
{
    alert("The template file was not uploaded. Please contact your administrator. Error :" + JSON.stringify(result));
}
