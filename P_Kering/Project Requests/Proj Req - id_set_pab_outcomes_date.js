// id_set_pab_outcomes_date

my_date = new Date();  
currentTime = Math.round(my_date.getTime() / 1000);  
RMPApplication.setVariable("pab_outcomes_dates", currentTime);
