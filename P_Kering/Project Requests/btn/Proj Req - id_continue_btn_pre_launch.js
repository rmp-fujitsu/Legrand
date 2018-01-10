// id_continue_btn

var liste = "Valeur incorrecte ou manquante pour les champs suivants : " + "\n" + "\n";

if (RMPApplication.get("project_manager_name") == null) {
    liste += "- Kering Project Lead" + "\n";
}

if (liste != "Valeur incorrecte ou manquante pour les champs suivants : " + "\n" + "\n") {
    alert(liste);
} else {
    true;
} 