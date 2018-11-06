// Manipulation de dates sur 2 widgets INPUT de type date
// 

var tot, tard;    // Numeric date vaiable
tot = new Date(parseInt(RMPApplication.get("date_au_plus_tot")));
tard = new Date(parseInt(RMPApplication.get("date_au_plus_tard")));



if (  tot>tard ) {
alert("Erreur :  Date au plus tard < Date au plus tôt ");
RMPApplication.set('date_au_plus_tard', RMPApplication.get("date_au_plus_tot"))
}
