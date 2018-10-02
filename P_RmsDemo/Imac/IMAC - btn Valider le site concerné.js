// id_location_validate

var new_adr = id_new_adresse.getValue();
if ( (new_adr == "" || new_adr == null) && "[[material_todo]]" == "move" ) {
	var title = ${P_quoted(i18n("error_siteValidation_title", "Erreur"))};
	var content = ${P_quoted(i18n("error_siteValidation_msg", "Le champ Adresse de destination ne peut être vide dans le cas d'un déménagement de site ou déplacement de caisse !"))};
	dialog_warning(title, content, btn_ok);
	
} else {
	id_location_info.close();
	id_imac_request.setVisible(true);
	id_imac_request.open();
	id_save_draft.setVisible(true);
	id_transfer_to_sdmo.setVisible(true);
}
