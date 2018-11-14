// id_save_project_btn

var my_object = {};
my_object.level_1 = RMPApplication.get("level_1_l");
my_object.level_2 = RMPApplication.get("level_2_l");
my_object.level_3 = RMPApplication.get("level_3");
my_object.label = RMPApplication.get("label");
my_object.ongoing = "yes";
col_Kering_projects.saveCallback(my_object, add_ok, add_ko);
id_report.refresh();
$(windowComp).dialog('close');

function add_ok(result)
{
    alert("Item Added");
}
    
function add_ko(result)
{
    alert("ko " + JSON.stringify(result));
}