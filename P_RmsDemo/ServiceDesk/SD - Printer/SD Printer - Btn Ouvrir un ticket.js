if (isEmpty(RMPApplication.get("description"))) {
	alert(${P_quoted(i18n("id_alert_desc", "Merci de remplir une description pour l'incident"))});
	false;
} else { 
	createRequest();
	true;
}