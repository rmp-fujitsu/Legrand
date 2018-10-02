// id_images_preview
// Listen var: my_item.product_img

//============================
//       Images preview
//============================

var preview_html_files ="";
for (f=0; f<JSON.parse(RMPApplication.get("my_item.category_img")).length; f++) {
     preview_html_files = "<img src=" + JSON.parse(RMPApplication.get("my_item.category_img"))[f].url + " alt='File preview' title='Aperçu Image' width='150px' onClick='window.open(\"" + JSON.parse(RMPApplication.get("my_item.category_img"))[f].url + "\",\"_blank\");'><br>"
}
id_my_item.category_preview.setHtml(preview_html_files);
id_my_item.category_preview.setVisible(true);
for (f=0; f<JSON.parse(RMPApplication.get("my_item.product_img")).length; f++) {
     preview_html_files = "<img src=" + JSON.parse(RMPApplication.get("my_item.product_img"))[f].url + " alt='File preview' title='Aperçu Image' width='150px' onClick='window.open(\"" + JSON.parse(RMPApplication.get("my_item.product_img"))[f].url + "\",\"_blank\");'><br>"
}
id_my_item.product_preview.setHtml(preview_html_files);
id_my_item.product_preview.setVisible(true);
for (f=0; f<JSON.parse(RMPApplication.get("my_item.type_img")).length; f++) {
     preview_html_files = "<img src=" + JSON.parse(RMPApplication.get("my_item.type_img"))[f].url + " alt='File preview' title='Aperçu Image' width='150px' onClick='window.open(\"" + JSON.parse(RMPApplication.get("my_item.type_img"))[f].url + "\",\"_blank\");'><br>"
}
id_my_item.type_preview.setHtml(preview_html_files);
id_my_item.type_preview.setVisible(true);