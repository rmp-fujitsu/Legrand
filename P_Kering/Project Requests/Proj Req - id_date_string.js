// id_date_string

/* 
var t = new Date(RMPApplication.get("date_Sub") * 1000);
var d = t.getFullYear()+ '-' + (t.getMonth()+1) + '-' + t.getDate() ;
RMPApplication.set("submission_date", d);
*/

var t3 = new Date(RMPApplication.get("expected_delivery_date") * 1000);
var d3 = t3.getDate() + '/' + (t3.getMonth() + 1) + '/' + t3.getFullYear();
RMPApplication.set("date_expected", d3);

var t4 = new Date(RMPApplication.get("expected_go_live_date") * 1000);
var d4 = t4.getDate() + '/' + (t4.getMonth() + 1) + '/' + t4.getFullYear();
RMPApplication.set("date_golive",d4);

var t5 = new Date(RMPApplication.get("date_meeting") * 1000);
var d5 = t5.getDate() + '/' + (t5.getMonth() + 1) + '/' + t5.getFullYear();
RMPApplication.set("kickoff", d5);