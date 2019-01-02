// id_next_week_btn

while (id_array.getRowsCount() > 7 ) { 
	id_array.removeRow(7);
}

id_array.id_day[0].setText("Monday");
id_array.id_day[1].setText("Tuesday");
id_array.id_day[2].setText("Wednesday");
id_array.id_day[3].setText("Thursday");
id_array.id_day[4].setText("Friday");
id_array.id_day[5].setText("Saturday");
id_array.id_day[6].setText("Sunday");

var week = new Date (RMPApplication.get("monday") * 1000);
week.setDate(week.getDate()+7);
RMPApplication.set("monday",(week/1000));
id_array.id_date[0].setValue(RMPApplication.get("monday"));

var week = new Date (RMPApplication.get("tuesday") * 1000);
week.setDate(week.getDate()+7);
RMPApplication.set("tuesday",(week/1000));
id_array.id_date[1].setValue(RMPApplication.get("tuesday"));

var week = new Date (RMPApplication.get("wednesday") * 1000);
week.setDate(week.getDate()+7);
RMPApplication.set("wednesday",(week/1000));
id_array.id_date[2].setValue(RMPApplication.get("wednesday"));

var week = new Date (RMPApplication.get("thursday") * 1000);
week.setDate(week.getDate()+7);
RMPApplication.set("thursday",(week/1000));
id_array.id_date[3].setValue(RMPApplication.get("thursday"));

var week = new Date (RMPApplication.get("friday") * 1000);
week.setDate(week.getDate()+7);
RMPApplication.set("friday",(week/1000));
id_array.id_date[4].setValue(RMPApplication.get("friday"));

var week = new Date (RMPApplication.get("saturday") * 1000);
week.setDate(week.getDate()+7);
RMPApplication.set("saturday",(week/1000));
id_array.id_date[5].setValue(RMPApplication.get("saturday"));

var week = new Date (RMPApplication.get("sunday") * 1000);
week.setDate(week.getDate()+7);
RMPApplication.set("sunday",(week/1000));
id_array.id_date[6].setValue(RMPApplication.get("sunday"));