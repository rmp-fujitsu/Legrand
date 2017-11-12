// id_set_delivery_end_date

my_date = new Date();  
currentTime = Math.round(my_date.getTime() / 1000);  
RMPApplication.setVariable("delivery_end_date", currentTime);
