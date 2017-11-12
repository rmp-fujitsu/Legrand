function get_nb_days_off(start_date, end_date, start_date_ampm,end_date_ampm) {
	var ijours_conge = (parseInt(end_date) - parseInt(start_date)) / (3600 * 24) + 1;

	//alert("jours conge depart: " + ijours_conge);
	var ijours_poses = ijours_conge;
	var today = new Date();
	today.setTime(start_date * 1000);
	//alert ("date de debut:" +today.getTime());
	//alert("jours poses depart: " + ijours_poses);
	var ferie = "false";
	var weekend = "false";

	for (i = 1; i <= ijours_conge; i++) {
	ferie = "false";
	weekend = "false";
	var ijour = today.getDate();
	var imois = today.getMonth();
	var iannee = today.getFullYear();
	ferie = IsFeastDay(ijour, imois, iannee);
	weekend = IsWeekEnd(ijour, imois, iannee);
	//alert("on est le : " + ijour +"/"+imois+"/"+ iannee +". ceci est un jour ferie :" +ferie + "ceci est un weekend: " +weekend);
	if (ferie || weekend) {
	ijours_poses = ijours_poses - 1;
	}
	today.setTime(today.getTime() + (24 * 60 * 60 * 1000));
	}

	if (start_date_ampm == "pm")
	ijours_poses = ijours_poses - 0.5;
	if (end_date_ampm == "pm")
	ijours_poses = ijours_poses - 0.5;
	if (end_date_ampm == "am")
	ijours_poses = ijours_poses - 1;
	return ijours_poses;
}

var from_date_val = id_my_array.from_date_id[ P_index ].getText();
var to_date_val = id_my_array.to_date_id[ P_index ].getText();
//var to_date_val = RMPApplication.get("to_date_string");
jours_poses = get_nb_days_off(from_date_val, to_date_val);
RMPApplication.setVariable("nb_of_days",jours_poses);

var tard = new Date(parseInt(RMPApplication.get("date_max")));
RMPApplication.set('date', new Date()/1000);