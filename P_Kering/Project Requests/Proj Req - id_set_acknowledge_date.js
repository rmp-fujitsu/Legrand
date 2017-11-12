// id_set_acknowledge_date

my_date = new Date();  
currentTime = Math.round(my_date.getTime() / 1000);  
RMPApplication.setVariable("acknowledge_date", currentTime);
