// id_set_basic_monitoring_and_back_up

if (RMPApplication.get("full_management_and_monitoring") == "yes")	{
	id_basic_monitoring_and_back_up.setSelectedValue("no");
} else if (RMPApplication.get("full_management_and_monitoring") == "no") {
	id_basic_monitoring_and_back_up.setSelectedValue("yes");
}
