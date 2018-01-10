// id_set_full_management_and_monitoring

if (RMPApplication.get("basic_monitoring_and_back_up") == "yes")	{
	id_full_management_and_monitoring.setSelectedValue("no");
} else if(RMPApplication.get("basic_monitoring_and_back_up") == "no") {
	id_full_management_and_monitoring.setSelectedValue("yes");
}
