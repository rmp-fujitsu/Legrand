// id_set_pab_validation_date

my_date = new Date();  
currentTime = Math.round(my_date.getTime() / 1000);  
RMPApplication.setVariable("pab_validation_date", currentTime);
