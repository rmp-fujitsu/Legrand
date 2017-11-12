// id_set_date

my_date = new Date();  
currentTime = Math.round(my_date.getTime() / 1000);  
currentTime2 = my_date.getDate();

mois2 = my_date.getMonth();
annee2 = my_date.getFullYear();
RMPApplication.setVariable("date_today", currentTime);
RMPApplication.setVariable("date_today_2", currentTime2);
RMPApplication.setVariable("today_month", mois2);
RMPApplication.setVariable("today_year", annee2);
