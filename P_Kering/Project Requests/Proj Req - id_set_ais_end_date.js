// id_set_ais_end_date

my_date = new Date();  
currentTime = Math.round(my_date.getTime() / 1000);  
RMPApplication.setVariable("ais_end_date", currentTime);
