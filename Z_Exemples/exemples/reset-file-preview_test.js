

1- récupérer le nom du "File Upload widget" actuel (voir l'ID)
var id_product_img_st = id_product_img.getName();

2- changer l'identifier ou le nom


3- inserer le nouveau widget avant le précédent widget
var conf = {"id":"id_product_img","label":{"text":"Sélectionner une image"},"variable":[{"name":"product_img","value":""}],"js-type":"RMP_FileUpload","tooltip":"",
"action":"file_upload","submit":"Télécharger","file-exts":[{"ext":"png"},{"ext":"jpg"}],"url":"live/1/entity/0f8406f0-3cb7-11e4-804d-f0bf97e1b068/upload?appli=[[appli_id]]&context=[[context]]&P_mode=TEST&P_version="};
var id_product_img = new RMP_FileUpload(conf);
id_files_preview.insertAbove(id_product_img);


4- supprimer l'ancien widget
id_product_img.remove();

${detach_file(file_id, account_id)}