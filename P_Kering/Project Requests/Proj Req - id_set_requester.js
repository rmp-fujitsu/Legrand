// id_set_requester

var tab = eval(id_request_on_behalf_of.getSelectedValue());

setTimeout( function() { 
	if (tab[0] == "yes")	{
		id_requested_by.setText(RMPApplication.get("user_label"));
		id_initiator_email.setText(RMPApplication.get("user"));
	} else {
		id_requested_by.setText(RMPApplication.get("user_name"));
		id_initiator_email.setText(RMPApplication.get("user_login"));
	}
}, 1000);