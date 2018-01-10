// id_reject_request_btn

id_rejection_comment_section.setVisible(true);
var id = "id_rejection_comment_section";
$('[id="' + id + '"]').attr("title", "${i18n('widgettitle', 'Reject')}");
$('[id="' + id + '"]').dialog({
    autoOpen: false,
    height: 500,
    width: 500,
    modal: true,
    resizable: false
});
$('[id="' + id + '"]').dialog("open");