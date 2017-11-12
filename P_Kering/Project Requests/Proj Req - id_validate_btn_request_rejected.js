// id_validate_btn_request_rejected

RMPApplication.setVariable("statut", "Rejected");
id_comment_section.close();

var id = "id_comment_section";
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