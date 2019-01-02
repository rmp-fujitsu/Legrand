// id_import_btn

if (JSON.parse(RMPApplication.get("portfolio_file")).length != 0) {
	RMPApplication.set("file_id", JSON.parse(RMPApplication.get("portfolio_file"))[0].id);
	RMPApplication.set("import_activities", Math.random());
   true;
} else {
	alert("Please Select a file before importing!");
	false;
}