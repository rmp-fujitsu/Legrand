// =====================================
//     id_clore_intervention_valid_btn
// =====================================


/////////////////////////////
// Specific to this widget //
/////////////////////////////
// => NOTHING


// show a "success" final popup
var title = ${P_quoted(i18n("form_valid_ok_title", "Statut d'intervention"))};
var content = ${P_quoted(i18n("form_valid_ok_msg", "Votre rapport d'intervention va être envoyé sous peu à votre responsable. Merci pour votre action."))};
dialog_success(title, content + "\n", btn_ok);
