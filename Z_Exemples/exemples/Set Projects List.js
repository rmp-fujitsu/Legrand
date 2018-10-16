// Proposer une liste de projets récupérés dans une collection

var div_filter = id_site.getSelectedValue();
if (div_filter == "__##prompt##__") {

} else {

    var my_pattern = {};
    my_pattern.region = id_region.getSelectedValue();
    my_pattern.country = id_country.getSelectedValue();
    my_pattern.site = id_site.getSelectedValue();
    col_Region.listCallback(my_pattern,{},list_ok,list_ko);

    function list_ok(result) 
    {
        //alert("ok=" + JSON.stringify(result));
        var project_list = new Array();

        for (var i=0; i<result.length;i++) {
            if (i>=1 && result[i].site != result[i-1].site) {
                project_list.push({"label":result[i].project,"value":result[i].project});
            
            } else if (i<1) {
                project_list.push({"label":result[i].project,"value":result[i].project});
            }
        }
        var a_site = new RMP_List();
        a_site.fromArray(project_list);
        RMPApplication.setList("project_list",a_site);
    }

    function list_ko(result) 
    {
        alert("ko=" + JSON.stringify(result));
    }

}