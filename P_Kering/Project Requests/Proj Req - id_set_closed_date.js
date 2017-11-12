// id_set_closed_date

my_date = new Date();  
currentTime = Math.round(my_date.getTime() / 1000);  
RMPApplication.setVariable("closed_date", currentTime);
