function createRequest()
{
		var contract = "";
		var category = "";
		var problem_type = "";
		var product_type = "";
		var caller = "";
		var contact_type = "";
		var qualification_group = "";

		var typeDemande =  RMPApplication.get("requestType");
		// if ( typeDemande == "visitehebdomadaire")
		// {
		contract = "VIVARTE";
		category = RMPApplication.get("requestType"); 
		problem_type = RMPApplication.get("requestType"
		product_type = $("#id_category").val();
		caller = "issindou.t@gmail.com";
		contact_type = "Email interface";
			// qualification_group = "";
		// } 

		var customer_reference = RMPApplication.get("referenceClient"); 
		var contact = $("#id_contact").val();
		var description = $("#id_description").val();
		var short_description = description.substring(0,99);
		var SelectedLocation = $("#id_code_magasin").val();
		var location_name = $("#id_code_magasin").val();
		var location_code = $("#id_code_magasin").val();
		var customer_site = $("#id_code_magasin").val();
		/* for (i=0; i < localisation.length; i++)
		{
			if (localisation[i].title == SelectedLocation)
			{
				location_name = localisation[i].location_name;
				location_code = localisation[i].location_code;
				customer_site = localisation[i].location_name;
				break;
			}
		} */
		var priority = 5; 	// plannning
		var State = ""; 	// assigned
		var contact_detail = ("#id_contact").val();
		var expected_start = getExpectedStartDateSN(7);
		
		RMPApplication.debug(" send : typeDemande = " + typeDemande);
		RMPApplication.debug(" send : customer_reference = " + customer_reference);
		RMPApplication.debug(" send : contract = " + contract);
		RMPApplication.debug(" send : category = " + category);
		RMPApplication.debug(" send : problem_type = " + problem_type);
		RMPApplication.debug(" send : product_type = " + product_type);
		RMPApplication.debug(" send : contact = " + contact);
		RMPApplication.debug(" send : description = " + description);
		RMPApplication.debug(" send : short_description = " + short_description);
		RMPApplication.debug(" send : SelectedLocation = " + SelectedLocation);
		RMPApplication.debug(" send : location_name = " + location_name);
		RMPApplication.debug(" send : location_code = " + location_code);
		RMPApplication.debug(" send : contact_detail = " + contact_detail);
		RMPApplication.debug(" send : customer_site = " + customer_site);
		RMPApplication.debug(" send : expected_start = " + expected_start);

		var input = {};
		var option = {};
		input.sn_caller = caller;
		input.sn_contract = contract;
		input.sn_contact_type = contact_type;
		input.sn_correlation_id = customer_reference;
		input.sn_description = description;
		input.sn_location = location_name;
		input.sn_qualification_group = qualification_group;
		input.sn_short_description = short_description;
		input.sn_priority = priority;
		input.sn_category = category;
		input.sn_u_contact_details = contact_detail;
		input.sn_u_customer_site = location_name;
		input.sn_u_problem_type = problem_type;
		input.sn_u_product_type = product_type;
      	input.sn_expected_start = expected_start;
		id_spinner.setVisible(true);
		id_insert_work_order_api.trigger (input, option, insert_ok, insert_ko)
}

function insert_ok(result) {
	RMPApplication.debug(" location_ok : " + JSON.stringify(result));
	id_spinner.setVisible(false);
	wm_order = result;
	var input1 = {};
	input1.message = "RunMyStore: votre demande a été créée sous le n° " + wm_order.insertResponse.number;
	input1.to_tel = $("#id_phone").val();
	//id_send_wo_confirmation_by_sms_api.trigger(input1, {}, sms_ok, sms_ko);
	RMPApplication.showErrorBox ("Information Suivi Demande", "Demande créée sous la référence: " + wm_order.insertResponse.number );
	reset();
	var input2 = {};
	input2.message = "RunMyStore: Demande n° "+ wm_order.insertResponse.number + " => Intervention planifiée le : " + getExpectedStartDateRMP(7);
	input2.to_tel = $("#id_phone").val();
	//id_send_wo_assignation_by_sms_api.trigger(input2, {}, sms_ok, sms_ko);
}

function insert_ko(result) {
    RMPApplication.debug("insert_ko : " + JSON.stringify(result));
    alertify.error("Error while creating new work order");
	id_spinner.setVisible(false);
}