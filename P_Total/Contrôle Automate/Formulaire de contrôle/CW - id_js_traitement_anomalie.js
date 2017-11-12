// =====================================
// JS traitement anomalie
// =====================================

// c_debug(debug.ctrl_init, "=> widget_parent.anomalie=", RMP_this.id_anomalie);

var ano_checked = ((RMP_this.id_anomalie.getSelectedValue()) == "oui") ? true : false;
RMP_this.id_description.setVisible(ano_checked);
RMP_this.id_photo.setVisible(ano_checked);
RMP_this.id_repare.setVisible(ano_checked);
RMP_this.id_renvoi_ordre.setVisible(ano_checked);
