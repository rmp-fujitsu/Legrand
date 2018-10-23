var conf_parent =  RMP_this.id_intervention_finished.getParent();
var id_parent = conf_parent.conf.id;
var conf_global_parent = eval(id_parent).getParent();
var id_global_parent = conf_global_parent.conf.id 
var id_local_inter_finished = id_global_parent + ".id_intervention_finished";
RMPApplication.set("RMP_this.variable.global_parent", id_local_inter_finished);
var id_local_reason = id_global_parent + ".id_reason";
displayReason();

function displayReason()
{
    var selected_val = eval(id_local_inter_finished).getSelectedValue();
    var display_reason = (selected_val == "yes") ? false : true;
    eval(id_local_reason).setVisible(display_reason);
}    

