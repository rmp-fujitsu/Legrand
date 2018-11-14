// id_js_listen_user_email_unknown
// Listened variable: user_email_unknown

var helpdesk_oss_email = "LegrandHelpDeskOSS@ts.fujitsu.com";
var conf_parent =  RMP_this.id_user_email_unknown.getParent();
var user_email_unknown_val = RMP_this.id_user_email_unknown.getValue();
var id_parent = conf_parent.conf.id;
var conf_global_parent = eval(id_parent).getParent();
var id_global_parent = conf_global_parent.conf.id ;

set_active_email();

function set_active_email()
{
	if ( ${has_right(P_connected_user.login,"452695")}
		|| ${has_right(P_connected_user.login,"452558")}) {
		if (user_email_unknown_val == "true") {
			RMPApplication.set("RMP_this.variable.contact_email", helpdesk_oss_email);
			RMP_this.id_contact_email.setActive(false);
		} else if (user_email_unknown_val == "false") {
			RMPApplication.set("RMP_this.variable.contact_email", "");
			RMP_this.id_contact_email.setActive(true);
		}
	} else {
		RMP_this.id_contact_email.setActive(false);
	}
}