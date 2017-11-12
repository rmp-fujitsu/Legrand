// id_initialize_actual_delivery_date_with_current_date

my_date = new Date();  
currentTime = Math.round(my_date.getTime() / 1000);  
RMPApplication.setVariable("actual_delivery_date", currentTime);		// Stored in seconds
