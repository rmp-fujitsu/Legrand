// id_js_set_workload_column_inactive
// Variables listened: 

var arr = JSON.parse(id_array.getValue());
var arr_transp = rmp_transpose(arr);

for(i=0; i< arr_transp.length; i++) {
	if (arr_transp[i].project == undefined) {
		id_array.id_workload[i].setActive(false);
	} else {
        console.log(arr_transp[i].project);
        console.log(i);
		id_array.id_workload[i].setActive(true);
	}
}