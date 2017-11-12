// id_initialize_final_go_live_date

my_date = new Date();  
currentTime = Math.round(my_date.getTime() / 1000);  
RMPApplication.setVariable("final_go_live_date", currentTime);		// Stored in seconds
