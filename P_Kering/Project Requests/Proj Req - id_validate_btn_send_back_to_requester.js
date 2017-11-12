// id_validate_btn_send_back_to_requester

RMPApplication.setVariable("statut", "Sent Back To Requester");
id_comment_section2.close();

var id = "id_comment_section2";
$('[id="' + id + '"]').attr('title', '${i18n('widgettitle', 'Reject')}');
$('[id="' + id + '"]').dialog({
	autoOpen: false,
	height: 500,
	width: 500,
	modal: true,
	resizable: false
});
$('[id="' + id + '"]').dialog('close');

true;