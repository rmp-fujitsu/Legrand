function getFirstDayCurrentMonth() 
{
	var firstDay = new Date();
	firstDay = moment(firstDay).startOf('month').format("YYYY-MM-DD 00:00:00");
	return firstDay;
}

function getLastDayCurrentMonth() 
{
	var lastDay = new Date();
	lastDay = moment(lastDay).endOf('month').format("YYYY-MM-DD 23:59:59");
	return lastDay;
}

function getFirstDayPreviousMonth() 
{
	var firstDay = new Date();
	firstDay = moment(firstDay).subtract(1,'months').startOf('month').format("YYYY-MM-DD 00:00:00");
	return firstDay;
}

function getLastDayPreviousMonth() 
{
	var lastDay = new Date();
	lastDay = moment(lastDay).subtract(1,'months').endOf('month').format("YYYY-MM-DD 23:59:59");
	return lastDay;
}

function getLastDayMonth(date)
{
	var lastDay = new Date();
	lastDay = moment(date).endOf('month');
	return lastDay;
}

function getFirstDayCurrentQuarter() 
{
	var firstDay = new Date();
	firstDay = moment().startOf('quarter').format("YYYY-MM-DD 00:00:00");
	return firstDay;
}

function getLastDayCurrentQuarter() 
{
	var lastDay = new Date();
	lastDay = moment().endOf('quarter').format("YYYY-MM-DD 23:59:59");
	return lastDay;
}

function getFirstDayPreviousQuarter() 
{
	var firstDay = new Date();
	firstDay = moment(firstDay).subtract(1,'quarters').startOf('quarter').format("YYYY-MM-DD 00:00:00");
	return firstDay;
}

function getLastDayPreviousQuarter() 
{
	var lastDay = new Date();
	lastDay = moment().subtract(1,'quarters').endOf('quarter').format("YYYY-MM-DD 23:59:59");
	return lastDay;
}

function getCurrentQuarter()
{
	var current_quarter = {};
	var today = new Date();
	// current_quarter.num = Math.floor(getNumberMonth(today) / 3) + 1;
	current_quarter.num = Math.floor((today.getMonth() + 3) / 3);
	current_quarter.year = today.getFullYear();
	return current_quarter;
}

function getPreviousQuarter()
{
	var previous_quarter = {};
	var current_quarter = getCurrentQuarter();
	previous_quarter.num = (current_quarter.num == 1) ? 4 : (current_quarter.num - 1);
	previous_quarter.year = (current_quarter.num == 1) ? (current_quarter.year - 1) : (current_quarter.year);
	return previous_quarter;
}

function getCurrentYear()
{
	var today = new Date();
	var year = today.getFullYear();
	return year;
}

function getPreviousYear()
{
	return getCurrentYear() - 1;
}

function getNextYear()
{
	return getCurrentYear() + 1;
}

function getFirstDayCurrentExercise(firstMonthExerc)
{
	var firstDay = new Date();
	var num_curr_month = getNumberMonth(firstDay);
	var current_year = getCurrentYear();
	var previous_year = getPreviousYear();

	if (num_curr_month >= firstMonthExerc) {
		firstDay = current_year + "-" + firstMonthExerc + "-01";
	} else {
		firstDay = previous_year + "-" + firstMonthExerc + "-01";
	}
	firstDay = moment(firstDay, "YYYY-MM-DD").format("YYYY-MM-DD 00:00:00");
	return firstDay;
}

function getLastDayCurrentExercise(firstMonthExerc)
{
	var firstDay = new Date();
	var lastDay = new Date();
	var num_curr_month = getNumberMonth(firstDay);
	var current_year = getCurrentYear();
	var next_year = getNextYear();
	if (firstMonthExerc == "01") {
		firstDay = current_year + "-" + "12" + "-01";
	} else if ( num_curr_month < firstMonthExerc) {
		firstDay = current_year + "-" + firstMonthExerc + "-01";
		firstDay = moment(firstDay).subtract(1,'months').format("YYYY-MM-DD");
	} else {
		firstDay = next_year + "-" + firstMonthExerc + "-01";
		firstDay = moment(firstDay).subtract(1,'months').format("YYYY-MM-DD");
	}
	lastDay = moment(firstDay, "YYYY-MM-DD").endOf('month').format("YYYY-MM-DD 23:59:59");
	return lastDay;
}

function getCurrentExercice(firstMonthExerc) 
{
	current_exercise.first_day = getFirstDayCurrentExercise(firstMonthExerc);
	current_exercise.last_day = getLastDayCurrentExercise(firstMonthExerc);
	current_exercise.init_year = moment(current_exercise.first_day).year();
	current_exercise.final_year = moment(current_exercise.last_day).year();
	return current_exercise;
}

function getFirstDayPreviousExercise(firstMonthExerc)
{
	var firstDay = new Date();
	firstDay = getFirstDayCurrentExercise(firstMonthExerc);
	firstDay = moment(firstDay).subtract(1,'years').format("YYYY-MM-DD 00:00:00");
	return firstDay;
}

function getLastDayPreviousExercise(firstMonthExerc)
{
	var lastDay = new Date();
	lastDay = getLastDayCurrentExercise(firstMonthExerc);
	lastDay = moment(lastDay).subtract(1,'years').format("YYYY-MM-DD 23:59:59");
	return lastDay;
}

function getPreviousExercice(firstMonthExerc) 
{
	previous_exercise.first_day = getFirstDayPreviousExercise(firstMonthExerc);
	previous_exercise.last_day = getLastDayPreviousExercise(firstMonthExerc);
	previous_exercise.init_year = moment(previous_exercise.first_day).year();
	previous_exercise.final_year = moment(previous_exercise.last_day).year();
	return previous_exercise;
}
