var indice_centrale_alarme = 0;

function add_centrale_alarme()
{
	if (indice_centrale_alarme < 2) {
	
		indice_centrale_alarme++;	
		
		// Insertion d'une section fille
		var conf = {
			"id": "id_section_centrale" + indice_centrale_alarme,
			"js-type": "RMP_Section",
			"label": "SGVhZGVyIHRleHQ=",
			"open": "false",
			"on-open": "Y29uc29sZS5sb2coInNlY3Rpb24gb3BlbmVkIik7",
			"on-close": "Y29uc29sZS5sb2coInNlY3Rpb24gY2xvc2VkIik7"
		};
		id_section = new RMP_Section(conf);
		id_section.setLabel("Centrale d'alarme");
		id_section_centrale_alarme.insertAbove(id_section); 

		// insertion d'une zone Input de type Texte dans la section créée précédemment
		var conf = {
			"id": "id_input_centrale" + indice_centrale_alarme,
			"label": {
				"text": "Numéro du dispositif : "
			},
			"variable": 
				[
					{
						"name":"variable_input_centrale_alarme" + indice_centrale_alarme, 
						"value": ""
					}
				],
			"js-type": "RMP_TextInput"
		};
		id_input = new RMP_TextInput(conf);
		id_section.insertInside(id_input);

		// insertion d'un widget de type File Upload
		var conf = {
			"id": "id_upload_large_centrale" + indice_centrale_alarme,
			"label": {
				"text": "Plan large"
			},
			"variable": 
				[
					{
						"name": "variable_large_centrale_alarme" + indice_centrale_alarme,
						"value": ""
					}
				],
			"js-type": "RMP_FileUpload",
			"tooltip": "My tooltip",
			"action": "file_upload",
			"submit": "Submit",
			"file-exts":
				[
					{"ext": "png"},
					{"ext": "gif"},
					{"ext": "jpeg"},
					{"ext": "bmp"},
					{"ext": "jpg"}
				],
			"url": "live/2/entity/0f8406f0-3cb7-11e4-804d-f0bf97e1b068/upload?appli=[[appli_id]]&context=[[context]]&P_mode=TEST&P_version="};
		id_upload_large = new RMP_FileUpload(conf);
		id_input.insertBelow(id_upload_large);
	}
}


function supprimer_centrale_alarme()
{
	var widgetList = RMPWidgets.getAllWidgets();

	for( i=0 ; i< widgetList.length ; i++ )	{
		if (widgetList[i].getName() == "id_input_centrale" + indice_centrale_alarme) {
		widgetList[i].remove();
		}
		if (widgetList[i].getName() == "id_section_centrale" + indice_centrale_alarme) {
			widgetList[i].remove();
		}
		if (widgetList[i].getName() == "id_upload_large_centrale" + indice_centrale_alarme) {
			widgetList[i].remove();
			indice_centrale_alarme = indice_centrale_alarme - 1;
		}
	}
}
