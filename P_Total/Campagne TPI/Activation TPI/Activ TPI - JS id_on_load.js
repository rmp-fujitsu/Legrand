// id_on_load

var myVar;
myVar = setTimeout(check_localisation, 5000);

function check_localisation() 
{
    if (RMPApplication.get("code_implant") == null) {
		alert("La station n'a pas été localisée, veuillez la sélectionner manuellement, soit par code postal, soit par code implant");
		id_rechercher_la_station_par.setVisible(true);
		id_spinner.setVisible(false);
		id_message.setVisible(false);
		}
	else {
		id_recherche.setVisible(false);
	}		
}