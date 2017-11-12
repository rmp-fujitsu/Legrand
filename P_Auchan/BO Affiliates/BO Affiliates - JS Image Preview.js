//============================
//       Image preview
//============================

var preview_html_files ="";
for (f=0; f<JSON.parse(RMPApplication.get("my_item.affiliate_img")).length; f++) {
     var preview_html_files = preview_html_files + "<img src=" + JSON.parse(RMPApplication.get("my_item.affiliate_img"))[f].url + " alt='File preview' title='Aperçu Image' width='150px' onClick='window.open(\"" + JSON.parse(RMPApplication.get("my_item.affiliate_img"))[f].url + "\",\"_blank\");'><br>"
}
// console.log('preview_html_files: ', preview_html_files);
id_my_item.id_files_preview.setHtml(preview_html_files);
id_my_item.id_files_preview.setVisible(true);