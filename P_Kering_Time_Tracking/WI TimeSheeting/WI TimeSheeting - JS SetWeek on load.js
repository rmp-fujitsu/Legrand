// id_js_setweek_on_load

var today = new Date ();
var week = new Date;
var diff = today.getDay();
if (diff == 0) {
    week.setDate(today.getDate()+1);
} else {
    week.setDate(today.getDate()-(diff-1));
}
RMPApplication.set("monday",(week/1000));
id_array.id_date[0].setValue(RMPApplication.get("monday"));

week.setDate(week.getDate()+1);
RMPApplication.set("tuesday",(week/1000));
id_array.id_date[1].setValue(RMPApplication.get("tuesday"));

week.setDate(week.getDate()+1);
RMPApplication.set("wednesday",(week/1000));
id_array.id_date[2].setValue(RMPApplication.get("wednesday"));

week.setDate(week.getDate()+1);
RMPApplication.set("thursday",(week/1000));
id_array.id_date[3].setValue(RMPApplication.get("thursday"));

week.setDate(week.getDate()+1);
RMPApplication.set("friday",(week/1000));
id_array.id_date[4].setValue(RMPApplication.get("friday"));

week.setDate(week.getDate()+1);
RMPApplication.set("saturday",(week/1000));
id_array.id_date[5].setValue(RMPApplication.get("saturday"));

week.setDate(week.getDate()+1);
RMPApplication.set("sunday",(week/1000));
id_array.id_date[6].setValue(RMPApplication.get("sunday"));
