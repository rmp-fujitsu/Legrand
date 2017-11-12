// Fill assessment fields

id_assessment_date.setText(RMPApplication.get("date_meeting"));
var day = eval(RMPApplication.get("assessment_date"));
var d = new Date();
d.setTime(day*1000);	// convert in milliseconds

jour = d.getDate();
mois = d.getMonth();
annee = d.getFullYear();
id_assessment_date.setText(JSON.stringify(jour));
id_assessment_month.setText(JSON.stringify(mois));
id_assessment_year.setText(JSON.stringify(annee));
