function update_ok(result) {
alert("ok " + JSON.stringify(result));
}

function update_ko(result) {
alert("ko " + JSON.stringify(result));
}

var my_pattern = {};
my_pattern.location_code = "B288";

var my_object = {};
my_object.location = "SUCC_CC Neuchâtel La Maladière";

col_locations_vivarte.updateMultiCallback(my_pattern,{$set:my_object},update_ok,update_ko);