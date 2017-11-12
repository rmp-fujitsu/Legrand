//====================================================
//   Get properties of first media
//====================================================
var preview_html_files = "";
var img_product_data = JSON.parse(RMPApplication.get("product_img"));
console.log('img_product_data = ', img_product_data);
if (img_product_data.length != 0) {
	// console.log('remplissage valeurs idmedia, file_name,media_url');
    RMPApplication.set("my_item.idmedia", img_product_data[0].id);	// get ID of first media
    RMPApplication.set("my_item.file_name", img_product_data[0].name);	// get file name of first media
    RMPApplication.set("my_item.media_url", img_product_data[0].url);	// get url of first media
	
	for (f=0; f<img_product_data.length; f++) {
	    preview_html_files += "<img src=" + img_product_data[f].url + " alt='File preview' title='Aperçu Image' width='150px' onClick='window.open(\"" + img_product_data[f].url + "\",\"_blank\");'><br>"
	}
	console.log('preview_html_files: ', preview_html_files);
	id_files_preview.setHtml(preview_html_files);
	id_files_preview.setVisible(true);
} else {
	console.log('réinitiliasation des champs Media');
	RMPApplication.set("my_item.idmedia", '');
	RMPApplication.set("my_item.file_name", '');
	RMPApplication.set("my_item.media_url", '');	
	id_files_preview.setHtml('');
	id_files_preview.setVisible(false);
}