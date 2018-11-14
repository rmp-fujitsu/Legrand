// id_tab_exports_export_btn
//  Process: Exports Reports


if (RMPApplication.get("export") != null && RMPApplication.get("export") != "") {
    alert("Thank you for exporting, you will shortly receive an email with your export");
    true;

} else {
    alert("Please choose a report before exporting");
    false;
}