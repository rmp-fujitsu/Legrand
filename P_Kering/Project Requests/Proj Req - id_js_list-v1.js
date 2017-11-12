// id_js_list

function list_ok(result) {

var vb_hour = new Array();

for(i=0;i<result.length;i++) {

vb_hour.push({"label":result[i].hour,"value":result[i].hour});

}

var a = new RMP_List();

a.fromArray(vb_hour);

 RMPApplication.setList("vb_hour",a);

}

function list_ko(result) {

//Error while retrieving cars from brand_id

alert("ko " + JSON.stringify(result));

}

var my_pattern = {};


col_hours.listCallback(my_pattern,{},list_ok,list_ko);
