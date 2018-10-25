// id_js_listen_status_intervention
// Variables listened: intervention_finished

var listened_var = "intervention_finished";
var show_var = "reason";
var condition_value = "yes";

var id_listened_var = "id_" + listened_var;
var id_conf_parent = "RMP_this." + id_listened_var;
var conf_parent =  eval(id_conf_parent).getParent();
var id_parent = conf_parent.conf.id;
var conf_global_parent = eval(id_parent).getParent();
var id_global_parent = conf_global_parent.conf.id 
var id_selected_field = id_global_parent + "." + id_listened_var;
var id_show_var = "id_" + show_var;

display_reason(id_selected_field, condition_value, id_show_var);
