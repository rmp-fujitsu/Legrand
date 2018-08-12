// id_update_kiosks_list
// Listen variable: location_code

var dbug = {
    "item": false
};

dbug.item = true;

var kiosks_list = RMPApplication.get("my_user.kiosks_list");
kiosks_list = (isEmpty(kiosks_list)) ? "" : kiosks_list.toUpperCase();
var main_kiosk = RMPApplication.get("my_user.main_kiosk");
main_kiosk = (isEmpty(main_kiosk)) ? "" : main_kiosk.toUpperCase();
RMPApplication.set("my_user.main_kiosk", main_kiosk);
c_debug(dbug.item, "=> update_kiosks_list: kiosks_list = ", kiosks_list);
c_debug(dbug.item, "=> update_kiosks_list: main_kiosk = ", main_kiosk);
if ( (!isEmpty(kiosks_list)) && (!include_string(kiosks_list, main_kiosk)) ) {
	kiosks_list = main_kiosk + ',' + kiosks_list;
	c_debug(dbug.item, "=> update_kiosks_list: kiosks_list = ", kiosks_list);
	RMPApplication.set("my_user.kiosks_list", kiosks_list);
}	