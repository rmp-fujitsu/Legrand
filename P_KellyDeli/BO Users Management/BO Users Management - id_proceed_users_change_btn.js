// id_proceed_users_change_btn
// pre-launch script

var tmp = [];
tmp = JSON.parse("[" + RMPApplication.get("file") + "]");
RMPApplication.set("file_id", tmp[0][0].id);
setTimeout(function(){  location.reload(); }, 3000);
true;
