/*<a href="#" onClick="javascript:add_adhesifs();return false;">
	<img src="https://live.runmyprocess.com/pub/112501412000161590/upload/b47d1020-0c54-11e6-9bd1-066d75fba2ef/+.png?method=GET">
</a>&nbsp;&nbsp;
<a href="#" onClick="javascript:supprimer_adhesifs();return false;">
	<img src="https://live.runmyprocess.com/pub/112501412000161590/upload/f43cf2c0-0c54-11e6-8484-0619bd984419/x.png?method=GET">
</a>*/


var indice_adhesifs=0;

function add_adhesifs()
{
	indice_adhesifs++;	
	
	var conf = {"id":"id_section_adhesifs"+indice_adhesifs,"js-type":"RMP_Section","label":"SGVhZGVyIHRleHQ=","open":"false","on-open":"Y29uc29sZS5sb2coInNlY3Rpb24gb3BlbmVkIik7","on-close":"Y29uc29sZS5sb2coInNlY3Rpb24gY2xvc2VkIik7"};
	id_section= new RMP_Section(conf);
	id_section.setLabel("Adhésifs réglementaires");
	id_section_adhesifs.insertAbove(id_section); 

	var conf = {"id":"id_input_adhesifs"+indice_adhesifs,"label":{"text":"Numéro du dispositif : "},"variable":[{"name":"variable_input_adhesifs"+indice_adhesifs,"value":""}],"js-type":"RMP_TextInput"};
	id_input= new RMP_TextInput(conf);
	id_section.insertInside(id_input);

	var conf = {"id":"id_upload_large_adhesifs"+indice_adhesifs,"label":{"text":"Plan large"},"variable":[{"name":"variable_large_adhesifs"+indice_adhesifs,"value":""}],"js-type":"RMP_FileUpload","tooltip":"My tooltip",
	"action":"file_upload","submit":"Submit","file-exts":[{"ext":"png"},{"ext":"gif"},{"ext":"jpeg"},{"ext":"bmp"},{"ext":"jpg"}],"url":"live/2/entity/0f8406f0-3cb7-11e4-804d-f0bf97e1b068/upload?appli=[[appli_id]]&context=[[context]]&P_mode=TEST&P_version="};
	id_upload_large= new RMP_FileUpload(conf);
	id_input.insertBelow(id_upload_large);
}


function supprimer_adhesifs()
{
	var widgetList = RMPWidgets.getAllWidgets();

	for( i=0 ; i< widgetList.length ; i++ )	{
		
		if (widgetList[i].getName() == "id_input_adhesifs"+indice_adhesifs) {
			widgetList[i].remove();
		}
		if (widgetList[i].getName() == "id_section_adhesifs"+indice_adhesifs) {
			widgetList[i].remove();
		}
		if (widgetList[i].getName() == "id_upload_large_adhesifs"+indice_adhesifs)	{
			widgetList[i].remove();
			indice_adhesifs = indice_adhesifs - 1;
		}
	}
}
