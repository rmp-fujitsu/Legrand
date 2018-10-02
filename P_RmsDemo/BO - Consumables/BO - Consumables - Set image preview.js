// id_set_uploaded_image_preview
// Listen variable: my_paper_image.file_upload_var


var preview_html_files = "";
for(f=0; f<JSON.parse(RMPApplication.get("my_paper_image.file_upload_var")).length; f++){
     var preview_html_files = preview_html_files + "<img class=\"homeIcon img-thumbnail\" src=" + JSON.parse(RMPApplication.get("my_paper_image.file_upload_var"))[f].url + " alt='File preview' title='File preview' onClick='window.open(\"" + JSON.parse(RMPApplication.get("my_paper_image.file_upload_var"))[f].url + "\",\"_blank\");'><br>";
     if (f == 0 && (!isEmpty(JSON.parse(RMPApplication.get("my_paper_image.file_upload_var"))[f].url))) {
     	id_my_paper_image.id_collection_image.setHtml("");
     	id_my_paper_image.id_collection_image.setVisible(false);
     }
}

id_my_paper_image.id_files_preview.setHtml(preview_html_files);
id_my_paper_image.id_files_preview.setVisible(true);