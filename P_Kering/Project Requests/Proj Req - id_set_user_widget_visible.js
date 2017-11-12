// id_set_user_widget_visible

var tab = eval(id_request_on_behalf_of.getSelectedValue());
if (tab[0] == "yes") {
	id_user.setVisible(true);
} else {
	id_user.setVisible(false);
}