// id_back_to_requester_btn

id_more_info_comment_section.setVisible(true);
var id = "id_more_info_comment_section";
$('[id="' + id + '"]').attr("title", "${i18n('widgettitle', 'Send Back To Requester')}");
$('[id="' + id + '"]').dialog({
    autoOpen: false,
    height: 500,
    width: 500,
    modal: true,
    resizable: false
});
$('[id="' + id + '"]').dialog("open");