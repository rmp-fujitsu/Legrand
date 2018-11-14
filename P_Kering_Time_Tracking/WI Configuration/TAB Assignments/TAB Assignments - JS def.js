// id_js_def

function delete_assignment (project)
{
    var input = { "project": project, "user": RMPApplication.get("user") };
    var options = {};
    id_delete_user_to_project.trigger(input, options, ok, ko);

    function ok()
    {
        alert("The assignment has been deleted");
        id_report_2.refresh();
    }
    
    function ko(P_error)
    {
        alert(JSON.stringify(P_error));
     
    }
}