// id_js_set_activity_required
// Variables listened: array.workload

var arr = eval(RMPApplication.get("array.workload"));

for( i=0; i<arr.length; i++) {
	if(arr[i] != "0") {
		id_array.id_project[i].setRequired(true);
	}
}