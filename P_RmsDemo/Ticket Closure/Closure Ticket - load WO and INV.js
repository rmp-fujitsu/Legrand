// ===================================
//   Ticket Closure : Load WO and INV
// ===================================
RMPApplication.debug("Ticket Closure : Additional scripts");

// execute process
load_WO_InvFromSN();


// ==============================================================
//   Prepare query before loading WO and INV from Service Now
// ==============================================================
function load_WO_InvFromSN() 
{
	RMPApplication.debug("begin load_WO_InvFromSN");
	console.log("=> load_WO_InvFromSN");

	var sn_query = "";											// query to be defined with following criterias
	sn_query += "^company.u_full_nameLIKE" + login.company;		// contract definition
	sn_query += "^stateIN10,11,13,15,16,18";					// different states ready to be closed

	var options = {};
	var input = {"wm_order_query": sn_query};
    console.log("=> load_WO_InvFromSN: input = ", input);
	id_get_work_order_list_api.trigger(input, options, order_ok, order_ko);

	RMPApplication.debug("end load_WO_InvFromSN");
}

function order_ok(result)
{
	RMPApplication.debug("order_ok : result =  " + result);
	// console.log('=> order_ok: result = ', result);

	var wm_ol = result.wm_order_list.getRecordsResult;
	console.log('=> order_ok: wm_ol = ', wm_ol);

	if (typeof(wm_ol) == 'undefined') {					// Aucun résultat

		var error_msg = ${P_quoted(i18n("order_ok_msg", "Aucun Work Order n'a été trouvé!"))};
    	alertify.error(error_msg);

	} else {
		var wo_list = "";								// list of work orders

		if (typeof(wm_ol[0]) == 'undefined') {			// 1 Seul résultat
			wo_list = wm_ol.number;
		} else {										// 1 liste de résultats
			for (i=0; i<wm_ol.length; i++) {
				wo_list += "," + wm_ol[i].number;
			}
		}
		var sn_query = "parent.numberIN" + wo_list;
		sn_query += "^stateIN10,11,13,15,16,18";
		var input = {"wm_task_query": sn_query};		// different states ready to be closed
		var options = {};
		console.log("=> order_ok: input = ", input);
		id_get_work_order_tasks_list.trigger(input, options, inv_ok, inv_ko);
	}
	id_spinner.setVisible(false);
	RMPApplication.debug("end order_ok");
}

function order_ko(error)
{
    RMPApplication.debug("begin order_ko : error =  " + JSON.stringify(error));
	id_spinner.setVisible(false);
    var error_msg = ${P_quoted(i18n("order_ko_msg", "INFO - Erreur lors de la recherche des Work Order!"))};
    alertify.error(error_msg);
    RMPApplication.debug("end order_ko");
}


function inv_ok(result)
{
	RMPApplication.debug("inv_ok : result =  " + result);
	// console.log('=> inv_ok: result = ', result);

	var wt_ol = result.wm_task_list.getRecordsResult;
	console.log('=> inv_ok: wt_ol = ', wt_ol);

	if (typeof(wt_ol) == 'undefined') {				// Aucun résultat
		
		var error_msg = ${P_quoted(i18n("inv_ok_msg", "Aucune intervention n'a été trouvée!"))};
    	alertify.error(error_msg);

	} else {
		var dispatch_group = id_dispatch_group.getValue();
		var vb_wo = new Array();
		if (typeof(wt_ol[0]) == 'undefined') {		// 1 Seul résultat
			if (wt_ol.dispatch_group == dispatch_group || wt_ol.assignment_group == dispatch_group) {
				vb_wo.push({"label": wt_ol.number + "-" + wt_ol.location, "value": wt_ol.sys_id});
			}

		} else {											// 1 liste de résultats
			for(i=0; i<wt_ol.length; i++) {
				if (wt_ol[i].dispatch_group == dispatch_group || wt_ol[i].assignment_group == dispatch_group) {
					vb_wo.push({"label": wt_ol[i].number + "-" + wt_ol[i].location, "value": wt_ol[i].sys_id});
				}
			}			
		}
		var a = new RMP_List();
		a.fromArray(vb_wo);
		RMPApplication.setList("vb_wo", a);		// List of interventions
	}

	RMPApplication.debug("end inv_ok");
}

function inv_ko(error)
{
    RMPApplication.debug("begin inv_ko : error =  " + JSON.stringify(error));
	id_spinner.setVisible(false);
    var error_msg = ${P_quoted(i18n("inv_ko_msg", "INFO - Erreur lors de la recherche des Interventions!"))};
    alertify.error(error_msg);
    RMPApplication.debug("end inv_ko");
}
