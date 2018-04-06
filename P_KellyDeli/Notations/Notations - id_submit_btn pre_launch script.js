// id_submit_btn pre_launch script

var my_notation = {};
my_notation.WO_number = $("#id_number_detail").val();
my_notation.notation = $("#id_heartRating").val();
my_notation.opened_date = $("#id_opened_detail").val();
my_notation.closed_date = $("#id_closed_detail").val();
my_notation.comment = $("#id_comment").val();
RMPApplication.set("my_notation", my_notation);
$("#id_rowSatisfaction").attr('readonly', 'readonly');

control_OK = check_eval(my_notation.notation, my_notation.comment);
if (control_OK) {
    var evaluation_conf = ${P_quoted(i18n("evaluation_conf", "Votre évaluation a bien été prise en compte"))}; 
    notify_success(info_title_notify, evaluation_conf);
    true;
} else {
    false;
}
