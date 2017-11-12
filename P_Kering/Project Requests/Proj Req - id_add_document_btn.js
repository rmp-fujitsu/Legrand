// id_add_document_btn

if (RMPApplication.get("upload") == "[]") {
	RMPApplication.showErrorBox("Error", "Please load a document before uploading");
} else {
	console.log("1");
	add_document_e();
}
//$("#id_doc_approval_e .array-td-buttons").hide();
