function clean_item() {
    
    id_company_info.setVisible(true);
    id_company_info.open();
    RMPApplication.set("my_item", "{}");
}

// ====================
// add_company
// ====================
function add_company()
{
    var my_object = eval('(' + RMPApplication.get("my_item") + ')');
    col_email_company_tpi.saveCallback(my_object, add_ok, add_ko);
}

function add_ok(result) 
{
    id_html_msg.setHtml("<font color='green'><i>Société ajoutée avec succès<i></font>");
    clean_item();
    id_report.refresh();
}

function add_ko(result) 
{
    //Error while adding item in the collection
    id_html_msg.setHtml("<font color='red'><i>Une erreur s'est produite<i></font>");
}

// ====================
// delete_intervenant
// ====================
function delete_company(email) 
{
    var my_pattern = {};
    my_pattern.email = email;
    var my_object = eval('(' + RMPApplication.get("my_item") + ')');
    col_email_company_tpi.removeCallback(my_pattern, delete_ok, delete_ko);
}

function delete_ok(result)
{
    id_html_msg.setHtml("<font color='green'><i>Société supprimée avec succès<i></font>");
    id_report.refresh();
    //empty custom widget
    RMPApplication.set("my_item", "{}");
}

function delete_ko(result)
{
    //Error while deleting item from the collection
    id_html_msg.setHtml("<font color='red'><i>Erreur lors de la suppression<i></font>");
}
