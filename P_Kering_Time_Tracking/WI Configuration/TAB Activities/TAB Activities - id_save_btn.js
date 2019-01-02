// id_js_on_level_1_change
// Variables listened: level_1

var my_pattern = {};
my_pattern.level_3 = RMPApplication.get("level_3_c");
var my_object = {};
my_object.label = RMPApplication.get("label_c");
my_object.ongoing = RMPApplication.get("on_going_c");
col_Kering_projects.updateMultiCallback(my_pattern, {$set:my_object}, update_ok, update_ko);
id_report.refresh();

function update_ok(result)
{
    alert("Item updated");
    var id  ="id_change_project";
    var windowComp2 = $('[id="'+id+'"]').dialog({ 
                                                autoOpen: false, 
                                                modal: true, 
                                                stack: false,  
                                                width:450,
                                                title: 'Edit'
                                                });
    id_change_project.setVisible(true);
    $(windowComp2).dialog('open');
    $(windowComp2).dialog('close');
}
    
function update_ko(result)
{
    alert("ko " + JSON.stringify(result));
}