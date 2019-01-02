// id_js_def1
// Variables listened:

function load_project(level_3)
{
    var my_pattern = {};
    my_pattern.level_3 = level_3;
    col_Kering_projects.listCallback(my_pattern, {}, load_ok, load_ko);
}

function load_ok(result)
{
    RMPApplication.set("level_3_c", result[0].level_3);
	RMPApplication.set("label_c", result[0].label);
    RMPApplication.set("on_going_c", result[0].ongoing);
    var id = "id_change_project";

    //id_MyComponent is the ID of the element that we want to deploy in the window
    var windowComp2 = $('[id="'+id+'"]').dialog({ 
                                                autoOpen: false, 
                                                modal: true, 
                                                stack: false,  
                                                width:450,
                                                title: 'Edit'
                                                });
    id_change_project.setVisible(true);
    $(windowComp2).dialog('open');
}

function load_ko(result)
{
    alert("Error");
}

function delete_item(level_3)
{
    var my_pattern = {};
    my_pattern.level_3 = level_3;
   // var my_object = eval('(' + RMPApplication.get("my_item") + ')');
    col_Kering_projects.removeCallback(my_pattern, delete_ok, delete_ko);
}

//Delete a project
function delete_ok(result)
{
    //id_html_msg.setHtml("<font color='green'><i>Item deleted</font><i>");
    id_report.refresh();
    //empty custom widget
}

function delete_ko(result)
{
    //Error while deleting item from the collection
    id_html_msg.setHtml("<font color='red'><i>Error while deleting item</font><i>");
}