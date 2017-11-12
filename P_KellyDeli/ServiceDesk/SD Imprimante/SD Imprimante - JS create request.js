function createRequest()
{
	var requestType = "intervention";
	RMPApplication.set("sn_caller","Resp "+ RMPApplication.get("location_name"));
	var work_order_type = requestType;
	var contract = "KD\\KELLYDELI" 
    var customer_site = RMPApplication.get("location_name"); 
    var contact_type = "RunMyStore";
    var qualification_group = "";
    var customer_reference = ""; 
    var contact = "";
    var description = RMPApplication.get("description");;
    var short_description = description.substring(0,99);
    var state = "1";    // draft
    var expected_start = "";
    // var expected_start = getExpectedStartDateSN(7);
    var priority = "1";
    var contact_detail = "";

	// define insertion query before sending to Service Now
	var options = {};
    var work_order = {};
	work_order.sn_caller = RMPApplication.get("sn_caller");
	work_order.sn_contract = contract;
	work_order.sn_contact_type = contact_type;
	work_order.sn_correlation_id = customer_reference;
	work_order.sn_description = description;
	work_order.sn_location = RMPApplication.get("location_name");;
	work_order.sn_state = state;
	work_order.sn_qualification_group = qualification_group;
	work_order.sn_short_description = short_description;
	work_order.sn_priority = priority;
	work_order.sn_category = RMPApplication.get("category");
	work_order.sn_u_contact_details = contact_detail;
	work_order.sn_u_customer_site = customer_site;
	work_order.sn_u_work_order_type = work_order_type;
	work_order.sn_u_problem_type = RMPApplication.get("problem_type");
	work_order.sn_u_product_type = RMPApplication.get("product_type");
	work_order.sn_expected_start = expected_start;
	work_order.sn_cmdb_ci = RMPApplication.get("ci")+ "_" + RMPApplication.get("kiosk_reference");
	work_order.location_code = RMPApplication.get("location_code");
	var my_array = eval(RMPApplication.get("take_a_photo"));
	if (my_array.length !=0) {
		var pictures = [];
		for (var i = 0; i < my_array.length; i++) {
			pictures.push(my_array[i].id);
		}
		work_order.picture = pictures;
	}
	
	
	console.log("=> createRequest: work_order = ", work_order);
	console.log(RMPApplication.get("sn_caller"));
	
	id_insert_work_order_api.trigger (work_order, options, insert_ok, insert_ko);
	
	// after insertion in Service Now => reload a new work order request screen

	RMPApplication.debug("end createRequest");

	
}

function insert_ok(result) 
{
	RMPApplication.debug("begin insert_ok : " + JSON.stringify(result));
	// console.log("=> insert_ok: result = ", result);

	wm_order = result;
        RMPApplication.showErrorBox (${P_quoted(i18n('id_title_1','Information Suivi Demande'))}, ${P_quoted(i18n('id_msg_1','Demande créée sous la référence:'))} + "\n" + wm_order.insertResponse.number + "\n" + ${P_quoted(i18n('id_msg_2','Vous allez être contacté dans les plus brefs délais'))} );
	var input = {};
	var my_array = eval(RMPApplication.get("take_a_photo"));
	if (my_array.length !=0) {
		var entries = [];
		for (var i = 0; i < my_array.length; i++) {
			var entry_json = {};
			entry_json.url = my_array[i].url;
			entry_json.name= my_array[i].name;
			entry_json.wo_number = wm_order.insertResponse.number
			entries.push(entry_json);
		}
			input.picture = entries;
		}
	
	else {
		input.picture = [];
	}

	id_save_picture_in_collection.trigger (input, {}, save_ok,save_ko);
	RMPApplication.debug("end insert_ok");
	$("#id_ouvrir_ticket").click();	
}
function insert_ko(error) 
{
    RMPApplication.debug("begin insert_ko : error = " + JSON.stringify(error));
    // console.log("=> insert_ko: error = ", error);
    //alertify.error("Error while creating new work order!");
	RMPApplication.debug("end insert_ko");		
}

function save_ok (result)
{
	console.log(result);
}
function save_ko (error) 
{
	console.log(error);
}