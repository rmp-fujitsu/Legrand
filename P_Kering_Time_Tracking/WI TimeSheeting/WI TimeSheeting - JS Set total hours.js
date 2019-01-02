// id_js_set_workload_column_inactive
// Variables listened: 

var sum = 0;
for (var k=0; k<id_array.id_workload.length; k++){
	if (id_array.id_workload[k].getValue() != null && id_array.id_workload[k].getValue() !="") {
	    sum = sum + parseFloat(id_array.id_workload[k].getValue()) ;
    }
}

id_total_number_of_hours.setText(sum);

var mon = 0;
var tue = 0;
var wed = 0;
var thu = 0;
var fri = 0;
var sat = 0;
var sun = 0;

for (var k=0; k<id_array.id_workload.length; k++) {
	if (id_array.id_workload[k].getValue() != null && id_array.id_workload[k].getValue() != "" && id_array.id_day[k].getValue() == "Monday" ) {
	    mon = mon + parseFloat(id_array.id_workload[k].getValue()) ;
	}
	else if (id_array.id_workload[k].getValue() != null && id_array.id_workload[k].getValue() != "" && id_array.id_day[k].getValue() == "Tuesday" ) {
	    tue = tue + parseFloat(id_array.id_workload[k].getValue()) ;
	}
	else if (id_array.id_workload[k].getValue() != null && id_array.id_workload[k].getValue() != "" && id_array.id_day[k].getValue() == "Wednesday" ) {
	    wed = wed + parseFloat(id_array.id_workload[k].getValue()) ;
	}
	else if (id_array.id_workload[k].getValue() != null && id_array.id_workload[k].getValue() != "" && id_array.id_day[k].getValue() == "Thursday" ) {
	    thu = thu + parseFloat(id_array.id_workload[k].getValue()) ;
	}
	else if (id_array.id_workload[k].getValue() != null && id_array.id_workload[k].getValue() != "" && id_array.id_day[k].getValue() == "Friday" ) {
	    fri = fri + parseFloat(id_array.id_workload[k].getValue()) ;
	}
	else if (id_array.id_workload[k].getValue() != null && id_array.id_workload[k].getValue() != "" && id_array.id_day[k].getValue() == "Saturday" ) {
	    sat = sat + parseFloat(id_array.id_workload[k].getValue()) ;
	}
	else if (id_array.id_workload[k].getValue() != null && id_array.id_workload[k].getValue() != "" && id_array.id_day[k].getValue() == "Sunday" ) {
	    sun = sun + parseFloat(id_array.id_workload[k].getValue()) ;
	}
}

id_total_number_of_hours.setText(sum);
id_total_mon.setText(mon);
id_total_tue.setText(tue);
id_total_wed.setText(wed);
id_total_thu.setText(thu);
id_total_fri.setText(fri);
id_total_sat.setText(sat);
id_total_sun.setText(sun);