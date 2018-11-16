// id_js_set_project_list

var my_pattern = {};
my_pattern.ongoing = "yes";
var options = {};
options.nb = 1000;
col_Kering_projects.listCallback(my_pattern, options, list_ok, list_ko);

function list_ok(result)
{
    var vb_proj = new Array();
    for (i=0; i<result.length; i++) {
        vb_proj.push({ "label": result[i].level_3 + "-" + result[i].label , "value": result[i].level_3 + "-" + result[i].label});
    }
    var a = new RMP_List();
    a.fromArray(vb_proj);
    RMPApplication.setList("vb_proj", a);
}
    
function list_ko(result)
{
    //Error while retrieving cars from brand_id
    alert("ko " + JSON.stringify(result));
}
