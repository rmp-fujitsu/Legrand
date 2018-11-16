// id_import_btn

var options = {};
var input = {};
input.project_l = RMPApplication.get("project_l");
input.user = RMPApplication.get("user");
id_add_user_to_project.trigger(input, options, ok_assign, ko_assign);

$(windowComp).dialog('close');

function ok_assign(P_computed)
{
    alert("The assignment has been done!");    
    id_report_2.refresh();
}
 
function ko_assign(P_error)
{
    alert(JSON.stringify(P_error));
}