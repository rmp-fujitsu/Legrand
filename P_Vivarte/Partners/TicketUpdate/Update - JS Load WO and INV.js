var sn_query = "^company.u_full_name=VIVARTE\\CAROLL";
sn_query += "^stateIN16";
var input = {"wm_order_query": sn_query};
var options = {};
id_get_wo_list.trigger(input, options, wo_ok, wo_ko);

function wo_ok(result)
{
	console.log(result);
	if (typeof(result.wm_order_list.getRecordsResult) == 'undefined'){
        alert("pas de résultats");
        
	} else if (typeof(result.wm_order_list.getRecordsResult[0]) == 'undefined') {
		var work_order;
		work_order = result.wm_order_list.getRecordsResult.number;
		var sn_query = "parent.numberIN" + work_order;
		sn_query += "^stateIN10,11,13,15,16,18";
		var input = {"wm_task_query": sn_query};
		var options = {};
		console.log(result.wm_order_list)
        id_get_work_order_tasks_list.trigger(input, options, inv_ok, inv_ko);
        
	} else {
        var work_order;
        for (i=0; i<result.wm_order_list.getRecordsResult.length; i++) {
            work_order= work_order + "," + result.wm_order_list.getRecordsResult[i].number;
        }
        var sn_query = "parent.numberIN" + work_order;
        sn_query += "^stateIN10,11,13,15,16,18";
        var input = {"wm_task_query": sn_query};
        var options = {};
        console.log(result.wm_order_list)
        id_get_work_order_tasks_list.trigger(input, options, inv_ok, inv_ko);

    }
    id_spinner.setVisible(false);
}

function wo_ko(error)
{
    alert(JSON.stringify(error));
	id_spinner.setVisible(false);
}


function inv_ok(result)
{
    console.log(result);
    if (typeof(result.wm_task_list.getRecordsResult) == 'undefined') {
        alert("pas de résultats");

    } else if (typeof(result.wm_task_list.getRecordsResult[0]) == 'undefined') {
        var vb_wo = new Array();
        if (result.wm_task_list.getRecordsResult.dispatch_group == RMPApplication.get("dispatch_group") || result.wm_task_list.getRecordsResult.assignment_group == RMPApplication.get("dispatch_group")) {
            vb_wo.push({"label": result.wm_task_list.getRecordsResult.number + "-" + result.wm_task_list.getRecordsResult.location, "value": result.wm_task_list.getRecordsResult.sys_id});
        }
        var a = new RMP_List();
        a.fromArray(vb_wo);
        RMPApplication.setList("vb_wo", a);
    
    } else {
        var vb_wo = new Array();
        for (i=0; i<result.wm_task_list.getRecordsResult.length; i++) {
            if (result.wm_task_list.getRecordsResult[i].dispatch_group == RMPApplication.get("dispatch_group") || result.wm_task_list.getRecordsResult[i].assignment_group == RMPApplication.get("dispatch_group")) {
                vb_wo.push({"label": result.wm_task_list.getRecordsResult[i].number + "-" + result.wm_task_list.getRecordsResult[i].location, "value": result.wm_task_list.getRecordsResult[i].sys_id});
            }
		}
        var a = new RMP_List();
        a.fromArray(vb_wo);
        RMPApplication.setList("vb_wo", a);
    }
}

function inv_ko(error)
{
    alert(JSON.stringify(error));
}






