var conf = {
	"id": "id_file_upload",
	"label": {"text": "Une SEULE image par produit"},
	"variable": [{
		"name": "file_upload_var",
		"value": ""
	}],
	"js-type": "RMP_FileUpload",
	"tooltip": "",
	"action": "file_upload",
	"submit": "Upload",
	"url":"live/1/112501480325272109/0f8406f0-3cb7-11e4-804d-f0bf97e1b068/upload?appli=[[appli_id]]&context=[[context]]&P_version=${P_version}&P_mode=${P_mode}"
};
var id_file_upload= new RMP_FileUpload(conf);
id_files_preview.insertAfter(id_file_upload);

id_my_paper_image.id_file_upload.remove();

	var conf = {"id":"id_upload_large_adhesifs"+indice_adhesifs,"label":{"text":"Plan large"},"variable":[{"name":"variable_large_adhesifs"+indice_adhesifs,"value":""}],"js-type":"RMP_FileUpload","tooltip":"My tooltip",
	"action":"file_upload","submit":"Submit","file-exts":[{"ext":"png"},{"ext":"gif"},{"ext":"jpeg"},{"ext":"bmp"},{"ext":"jpg"}],"url":"live/2/entity/0f8406f0-3cb7-11e4-804d-f0bf97e1b068/upload?appli=[[appli_id]]&context=[[context]]&P_mode=TEST&P_version="};
	id_upload_large= new RMP_FileUpload(conf);
	id_input.insertBelow(id_upload_large);

// ======================================
var file_upload_conf = {
	"id": "id_file_upload",
	"label": {"text": "Une SEULE image par produit"},
	"variable": [{
		"name": "file_upload_var",
		"value": ""
	}],
	"js-type": "RMP_FileUpload",
	"tooltip": "",
	"action": "file_upload",
	"submit": "Upload",
	"url":"live/1/112501480325272109/0f8406f0-3cb7-11e4-804d-f0bf97e1b068/upload?appli=[[appli_id]]&context=[[context]]&P_version=${P_version}&P_mode=${P_mode}"
};

id_my_paper_image.id_file_upload.remove();
var id_file_upload= new RMP_FileUpload(file_upload_conf);
id_my_paper_image.id_files_preview.insertBefore(id_file_upload);