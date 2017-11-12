// ==========================
//   Dashboard: CHARTS part
// ==========================
RMPApplication.debug("Dashboard : CHARTS part started");

// ========================
// Variables declaration
// ========================

var ready = false;			// special variable use as flag to tell if function 
var wo_query = {};			// query to Service Now Work Order table
var data_query = {};

// Keep different periods query 
var input_current_month = {};
var input_previous_month = {};
var input_current_quarter = {};
var input_previous_quarter = {};
var input_current_exercise = {};
var input_previous_exercise = {};
// Identify special DIV for graphical charts
var id_currMonth = $("#id_current_month");
var id_prevMonth = $("#id_previous_month");
var id_currQuart = $("#id_current_quarter");
var id_prevQuart = $("#id_previous_quarter");
var id_currExercise = $("#id_current_exercise");
var id_prevExercise = $("#id_previous_exercise");
// We register the different period to be considered
var reports_list = {
    "current_month" : "current_month", 
    // "previous_month" : "previous_month"
	"previous_month" : "previous_month", 
	"current_quarter" : "current_quarter", 
	"previous_quarter" : "previous_quarter", 
	"current_exercise" : "current_exercise", 
	"previous_exercise" : "previous_exercise"
};

// following collections could be used in the future
// var col_pannes = "col_kpi_panne_vite";

setLabels();	// set Labels for different periods

// setBreakdownRate();

// ==================================
// set Labels for different periods
// ==================================
function setLabels () 
{
	RMPApplication.debug("begin setLabels");
	$("#id_spinner_search").show();

	// hide actual & previous period during definitions
	id_currMonth.hide();
	id_prevMonth.hide();
	id_currQuart.hide();
	id_prevQuart.hide();
	id_currExercise.hide();
	id_prevExercise.hide();

	// Definition of content labels
	var curr_month = getLongMonth(Date.now());
	var prev_month = getPrevLongMonth(Date.now());
	// console.log("actual_month :", actual_month);
	// console.log("previous_month :", previous_month);
	var curr_quarter = getCurrentQuarter();
	var prev_quarter = getPreviousQuarter();
	var curr_year = getCurrentYear();
	var prev_year = getPreviousYear(); 
	var next_year = getNextYear();
	var today = new Date();
	var num_curr_month = getNumberMonth(today);

	id_currMonth.append("Mois de " + curr_month);
	id_prevMonth.append("Mois de " + prev_month);
	id_currQuart.append("Q" + curr_quarter.num + ' - ' + curr_quarter.year);
	id_prevQuart.append("Q" + prev_quarter.num + ' - ' + prev_quarter.year);

	if (FIRSTMONTHOFEXERCISE == "01") {
		id_currExercise.append("Exercice " + curr_year);
		id_prevExercise.append("Exercice " + prev_year);		
	} else {
		if (num_curr_month < FIRSTMONTHOFEXERCISE) {
			prev_year -= 1 ;
			curr_year -= 1;
			next_year -= 1 ;
		}
		id_currExercise.append("Exercice " + curr_year + " / " + next_year);
		id_prevExercise.append("Exercice " + prev_year + " / " + curr_year);
	}
	RMPApplication.debug("end setLabels");
}

// ===============================================
//  prepare queries to be submitted to Service Now
// ===============================================
function getFilter() 		
{
	RMPApplication.debug("begin getFilter");
	// console.log('begin getFilter');
	$("#id_spinner_search").show();
	var current_month_query = "^opened_atBETWEEN" + getFirstDayCurrentMonth() + "@" + getLastDayCurrentMonth();
	var previous_month_query = "^opened_atBETWEEN" + getFirstDayPreviousMonth() + "@" + getLastDayPreviousMonth();
	var current_quarter_query = "^opened_atBETWEEN" + getFirstDayCurrentQuarter() + "@" + getLastDayCurrentQuarter();
	var previous_quarter_query = "^opened_atBETWEEN" + getFirstDayPreviousQuarter() + "@" + getLastDayPreviousQuarter();
	var current_exercise_query = "^opened_atBETWEEN" + getFirstDayCurrentExercise(FIRSTMONTHOFEXERCISE) + "@" + getLastDayCurrentExercise(FIRSTMONTHOFEXERCISE);
	var previous_exercise_query = "^opened_atBETWEEN" + getFirstDayPreviousExercise(FIRSTMONTHOFEXERCISE) + "@" + getLastDayPreviousExercise(FIRSTMONTHOFEXERCISE);	
	
	var query = "companyLIKE" + login.company;

	// following any change to affiliate filter, we use contractsListQuery, already defined :)
	query += contractsListQuery;
	query += locationsListQuery;

	current_month_query = query + current_month_query;
	previous_month_query = query + previous_month_query;
	current_quarter_query = query + current_quarter_query;
	previous_quarter_query = query + previous_quarter_query;
	current_exercise_query = query + current_exercise_query;
	previous_exercise_query = query + previous_exercise_query;

	wo_query = {};			// reset of previous
	wo_query.current_month = {"wm_order_query" : current_month_query};
	wo_query.previous_month = {"wm_order_query" : previous_month_query};
	wo_query.current_quarter = {"wm_order_query" : current_quarter_query};
	wo_query.previous_quarter = {"wm_order_query" : previous_quarter_query};
	wo_query.current_exercise = {"wm_order_query" : current_exercise_query};
	wo_query.previous_exercise = {"wm_order_query" : previous_exercise_query};

	// console.log('getFilter: wo_query = ', wo_query);

	// load Google Charts Library
	google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    // getFilteredLocations();

    RMPApplication.debug("end getFilter");
}

// ===============================================
//  prepare queries to be submitted to Service Now
// ===============================================
function drawChart()
{
	RMPApplication.debug("begin drawChart");
	// console.log('begin drawChart');

	var options = {};
	// Following CAPI is only implemented for 6 periods (current & previous months, quarters, exercises)
	id_get_report_datas_api.trigger(wo_query, options, wo_list_ok, wo_list_ko);
	// Following CAPI is only implemented for 2 periods (current & previous months)
	// id_get_report_datas_ltd_version_api.trigger(wo_query, options, wo_list_ok, wo_list_ko);
	
	RMPApplication.debug("end drawChart");
}

// ===============================================================
//  Calculate et define all datas needed to draw different charts
// ===============================================================
function wo_list_ok(P_computed)
{
	RMPApplication.debug("begin wo_list_ok : ", JSON.stringify(P_computed));
	console.log("=>  wo_list_ok: P_computed = ", P_computed);

	data_query = {};			// reset previous data_query
	for (key in reports_list) {
		// console.log("*** KEY : ", key, "***");
		var array = [];
		if ( isEmpty(P_computed[key].data.getRecordsResult) ) {
			array = null;
		} else if ( Array.isArray(P_computed[key].data.getRecordsResult) ) {
				array = P_computed[key].data.getRecordsResult;
		} else {
				array[0] = P_computed[key].data.getRecordsResult;
		}

		// var array = (typeof P_computed[key].data.getRecordsResult  === 'object') ? [P_computed[key].data.getRecordsResult] : P_computed[key].data.getRecordsResult;
		// console.log('wo_list_ok: \n +KEY : ', key, '\n +array: ', array);
		var result = {};
		if (!isEmpty(array)) {
			result.nb_draf = 0;			// "Draft"
			result.nb_aw = 0;			// "Awaiting Diagnosis"
			result.nb_diag = 0;			// "Diagnosed"
			result.nb_ass = 0;			// "Assigned"
			result.nb_work = 0;			// "Work In Progress"
			result.nb_comp = 0;			// "Closed Complete"
			result.nb_inc = 0;			// "Closed Incomplete"
			result.nb_canc = 0;			// "Cancelled"
			result.nb_err = 0;			// "Error"
			result.nb_res = 0;			// "Resolved"
			result.nb_unr = 0;			// "Unresolved"
			result.nb_fcom = 0;			// "Finished - Complete" = Resolved + Closed Complete
			result.nb_finc = 0;			// "Finished - Incomplete" = Unresolved + Closed Incomplete
			result.wo_number = "";		// number of Work Order
			result.states = [];
			result.wo_type = [];
			result.wo_prod = [];
				
			for (var i=0; i<array.length; i++) {
				result.states[i] = array[i].state;					// Get list of states
				result.wo_type[i] = array[i].u_work_order_type;   	// Get list of work order types
				result.wo_prod[i] = array[i].u_product_type;		// Get list of work order categories
			}
			result.wo_type_reduced = reduce_array(result.wo_type);
			result.wo_prod_reduced = reduce_array(result.wo_prod);
			// console.log('result.states: ', result.states);
			// console.log('result.wo_type: ', result.wo_type);
			// console.log('result.wo_type_reduced: ', result.wo_type_reduced);
			// console.log('result.wo_prod_reduced: ', result.wo_prod_reduced);

			// Get number per state
			for (var i=0; i<result.states.length; i++) {
				// console.log('result.states[i] = ', result.states[i]);
				switch (result.states[i]) {
					case "Draft":
						result.nb_draf++;
						break;
					case "Awaiting Diagnosis": 
						result.nb_aw++;
						break;
					case "Diagnosed": 
					case "Qualified":
						result.nb_diag++;
						break;
					case "Assigné":
					case "Assigned": 
						result.nb_ass++;
						break;
					case "Work In Progress": 
						result.nb_work++;
						break;
					case "Resolved": 
						result.nb_res++;
						result.nb_fcom++;
						break;
					case "Unresolved": 
						result.nb_unr++;
						result.nb_finc++;
						break;
					case "Closed Complete": 
						result.nb_comp++;
						result.nb_fcom++;
						break;
					case "Closed Incomplete": 
						result.nb_inc++;
						result.nb_finc++;
						break;
					case "Cancelled": 
						result.nb_canc++;
						break;
					case "Error": 
						result.nb_err++;
						break
				}
			}
			result.wo_number = result.nb_draf + result.nb_aw + result.nb_diag + result.nb_ass 
						+ result.nb_work + result.nb_res + result.nb_unr 
						+ result.nb_comp + result.nb_inc + result.nb_canc + result.nb_err;
			// result.nb_fcomp = result.nb_comp + result.nb_res;		// "Finished - Complete" = Resolved + Closed Complete
			// result.nb_finc = result.nb_inc + result.nb_unr;		// "Finished - Incomplete" = Unresolved + Closed Incomplete
			// console.log('result.wo_number: ', result.wo_number);

			//Get number per work order type
			result.wo_type_details = new Array (result.wo_type_reduced.length);
			result.wo_type_number = 0;
			for (var i=0; i<result.wo_type_reduced.length; i++) {
				result.wo_type_details[i] = 0;
				for (var j=0; j<result.wo_type.length; j++) {
					if (result.wo_type[j] == result.wo_type_reduced[i]) {
						result.wo_type_details[i]++;
						result.wo_type_number++;	
					}
				}
			}
			// console.log('result.wo_type_details: ', result.wo_type_details);

			// Get number per work order product
			result.wo_prod_details = new Array (result.wo_prod_reduced.length);
			result.wo_prod_number = 0;
			for (var i=0; i<result.wo_prod_reduced.length; i++) {
				result.wo_prod_details[i] = 0;
				for(var j=0; j<result.wo_prod.length; j++) {
					if (result.wo_prod[j] == result.wo_prod_reduced[i]) {
						result.wo_prod_details[i]++;
						result.wo_prod_number++;
					}
				}
			}
			// console.log('result.wo_prod_details: ', result.wo_prod_details);
			// console.log('result: ', result);
		}
		data_query[key] = result;
		// console.log('data_query[',key,'] = ',result);
	}
	ready = true;			// tabs on WI can now executed the different drawing functions
	drawSelectedPeriodChart();

	RMPApplication.debug("end wo_list_ok");
}

function wo_list_ko(P_error) 
{
	RMPApplication.debug("begin wo_list_ko: P_error = ", JSON.stringify(P_error));
	console.log('=> wo_list_ko: P_error = ', JSON.stringify(P_error));
    alertify.error('Erreur lors du chargement des rapports!');
    RMPApplication.debug("end wo_list_ko");
}

// ===============================================================
//  Draw all charts in different tabs
// ===============================================================
function drawSelectedPeriodChart()
{
	RMPApplication.debug("begin drawSelectedPeriodChart");
	// console.log("=> drawSelectedPeriodChart");

	// input to store selected tabs
	var selected_dashboard_tab = id_selected_dashboard_tab.getValue();
	var selected_period_tab = id_selected_period_tab.getValue();
	var selected_month_tab = id_selected_month_tab.getValue();
	var selected_quarter_tab = id_selected_quarter_tab.getValue();
	var selected_exercise_tab = id_selected_exercise_tab.getValue();
	// console.log("=> drawSelectedPeriodChart : \n  +selected_dashboard_tab = ", selected_dashboard_tab, "\n  +selected_period_tab = ", selected_period_tab);
	
	if (selected_dashboard_tab == "chart") {
		switch (selected_period_tab) {
			case 'month':
				if (selected_month_tab == "current") {
					drawCurrentMonthChart();
				} else {
					drawPreviousMonthChart();
				}
				break;
			case 'quarter':
				if (selected_quarter_tab == "current") {
					drawCurrentQuarterChart();
				} else {
					drawPreviousQuarterChart();
				}
				break;
			case 'exercise':
				if (selected_exercise_tab == "current") {
					drawCurrentExerciseChart();
				} else {
					drawPreviousExerciseChart();
				}
				break;
		}
	}
	$("#id_spinner_search").hide();
	RMPApplication.debug("end drawSelectedPeriodChart");
}
	
// ===============================================================
//  Draw all charts in different tabs
// ===============================================================
function drawCurrentMonthChart()
{
	RMPApplication.debug("begin drawCurrentMonthChart");
	// console.log("=> drawCurrentMonthChart");
	var id_current_month_chart = $("#id_current_month_chart");
	id_currMonth.removeClass('hidden');
	id_currMonth.show();
	if (Object.keys(data_query.current_month).length == 0) {
		id_current_month_chart.addClass('hidden');
		RMPApplication.showErrorBox ("Information", "Aucune donnée à afficher pour cette période"); 
	} else {
		id_current_month_chart.removeClass('hidden');
		drawBarChart(data_query.current_month, "id_current_month_chart_states");
		drawColumnChart(data_query.current_month, "id_current_month_chart_types");
		drawPieChart(data_query.current_month, "id_current_month_chart_products");
	}
	$("#id_spinner_search").hide();
	RMPApplication.debug("end drawCurrentMonthChart");
}

function drawPreviousMonthChart()
{
	RMPApplication.debug("begin drawPreviousMonthChart");
	// console.log("=> drawPreviousMonthChart");
	var id_previous_month_chart = $("#id_previous_month_chart");
	id_prevMonth.show();
	if (Object.keys(data_query.previous_month).length == 0) {
		id_previous_month_chart.addClass('hidden');
		RMPApplication.showErrorBox ("Information", "Aucune donnée à afficher pour cette période"); 
	} else {
		id_previous_month_chart.removeClass('hidden');
		drawBarChart(data_query.previous_month, "id_previous_month_chart_states");
		drawColumnChart(data_query.previous_month, "id_previous_month_chart_types");
		drawPieChart(data_query.previous_month, "id_previous_month_chart_products");
	}
	$("#id_spinner_search").hide();
	RMPApplication.debug("end drawPreviousMonthChart");
}

function drawCurrentQuarterChart()
{
	RMPApplication.debug("begin drawCurrentQuarterChart");
	// console.log("=> drawCurrentQuarterChart");
	var id_current_quarter_chart = $("#id_current_quarter_chart");
	id_currQuart.show();
	if (Object.keys(data_query.current_quarter).length == 0) {
		id_current_quarter_chart.addClass('hidden');
		RMPApplication.showErrorBox ("Information", "Aucune donnée à afficher pour cette période"); 
	} else {
		id_current_quarter_chart.removeClass('hidden');
		drawBarChart(data_query.current_quarter, "id_current_quarter_chart_states");
		drawColumnChart(data_query.current_quarter, "id_current_quarter_chart_types");
		drawPieChart(data_query.current_quarter, "id_current_quarter_chart_products");
	}
	$("#id_spinner_search").hide();
	RMPApplication.debug("end drawCurrentQuarterChart");
}

function drawPreviousQuarterChart()
{
	RMPApplication.debug("begin drawPreviousQuarterChart");
	// console.log("=> drawPreviousQuarterChart");
	var id_previous_quarter_chart = $("#id_previous_quarter_chart");
	id_prevQuart.show();
	if (Object.keys(data_query.previous_quarter).length == 0) {
		id_previous_quarter_chart.addClass('hidden');
		RMPApplication.showErrorBox ("Information", "Aucune donnée à afficher pour cette période"); 
	} else {
		id_previous_quarter_chart.removeClass('hidden');
		drawBarChart(data_query.previous_quarter, "id_previous_quarter_chart_states");
		drawColumnChart(data_query.previous_quarter, "id_previous_quarter_chart_types");
		drawPieChart(data_query.previous_quarter, "id_previous_quarter_chart_products");
	}
	$("#id_spinner_search").hide();
	RMPApplication.debug("end drawPreviousQuarterChart");
}

function drawCurrentExerciseChart()
{
	RMPApplication.debug("begin drawCurrentExerciseChart");
	// console.log("=> drawCurrentExerciseChart");
	var id_current_exercise_chart = $("#id_current_exercise_chart");
	id_currExercise.show();
	if (Object.keys(data_query.current_exercise).length == 0) {
		id_current_exercise_chart.addClass('hidden');
		RMPApplication.showErrorBox ("Information", "Aucune donnée à afficher pour cette période"); 
	} else {
		id_current_exercise_chart.removeClass('hidden');
		drawBarChart(data_query.current_exercise, "id_current_exercise_chart_states");
		drawColumnChart(data_query.current_exercise, "id_current_exercise_chart_types");
		drawPieChart(data_query.current_exercise, "id_current_exercise_chart_products");
	}
	$("#id_spinner_search").hide();
	RMPApplication.debug("end drawCurrentExerciseChart");
}

function drawPreviousExerciseChart()
{
	RMPApplication.debug("begin drawPreviousExerciseChart");
	// console.log("=> drawPreviousExerciseChart");
	var id_previous_exercise_chart = $("#id_previous_exercise_chart");
	id_prevExercise.show();
	if (Object.keys(data_query.previous_exercise).length == 0) {
		id_previous_exercise_chart.addClass('hidden');
		RMPApplication.showErrorBox ("Information", "Aucune donnée à afficher pour cette période"); 
	} else {
		id_previous_exercise_chart.removeClass('hidden');
		drawBarChart(data_query.previous_exercise, "id_previous_exercise_chart_states");
		drawColumnChart(data_query.previous_exercise, "id_previous_exercise_chart_types");
		drawPieChart(data_query.previous_exercise, "id_previous_exercise_chart_products");
	}
	$("#id_spinner_search").hide();
	RMPApplication.debug("end drawPreviousExerciseChart");
}

// ===============================================================
//  Chart drawing functions
// ===============================================================
function drawBarChart(d_obj, id_div) 
{
	RMPApplication.debug("begin drawBarChart");
	// Style Bar options
	var opac = 'opacity: 0.5';
	var greCol = 'color: #00C851;' + opac;
	var bluCol = 'color: #33b5e5;' + opac;
	var yelCol = 'color: #ffbb33;' + opac;
	var redCol = 'color: #ff4444;' + opac;

	// Data & option definitions for work order per state Chart
	var wo_per_state_data = google.visualization.arrayToDataTable([
		['Statut', 'Nombre', { role: 'annotation' }, { role: 'style' }],
		['Transmis', d_obj.nb_draf, d_obj.nb_draf, yelCol],					// 'Awaiting Diagnosis'
		['En attente de diagnostic', d_obj.nb_aw, d_obj.nb_aw, yelCol],		// 'Awaiting Diagnosis'
		['Diagnostiqué', d_obj.nb_diag, d_obj.nb_diag, bluCol],				// 'Diagnosed'
		['Affecté', d_obj.nb_ass, d_obj.nb_ass, bluCol],					// 'Assigned'
		['En cours de résolution', d_obj.nb_work, d_obj.nb_work, bluCol],	// 'Work In Progress'
		['Terminé - Complet', d_obj.nb_fcom, d_obj.nb_fcom, greCol],		// 'Finished - Complete'
		['Terminé - Incomplet', d_obj.nb_finc, d_obj.nb_finc, redCol],		// 'Finished - Incomplete'
		['Annulé', d_obj.nb_canc, d_obj.nb_canc, bluCol],					// 'Cancelled'
		['Erreur', d_obj.nb_err, d_obj.nb_err, redCol],						// 'Error'
		// ['Clos - Complet', d_obj.nb_comp, d_obj.nb_comp, greCol],		// 'Closed Complete'
		// ['Résolu', d_obj.nb_res, d_obj.nb_res, greCol],					// 'Resolved'
		// ['Clos - Incomplet', d_obj.nb_inc, d_obj.nb_inc, greCol],		// 'Closed Incomplete'
		// ['Non résolu', d_obj.nb_unr, d_obj.nb_unr, redCol],				// 'Unresolved'
	]);
	// ],false);		// 'false' means that the first row contains labels, not data.

	var wo_per_state_option = {
		title: 'Répartition des (' + d_obj.wo_number + ') tickets par STATUT',
		titleTextStyle: {
			fontSize: 20,
			bold: true,
			color: '#c0392b'
		},
		// backgroundColor: "#FCFEE0",
		width: '90%',
		bars: 'horizontal',
		annotations: {alwaysOutside: true },
		axes: {
			x: {
				0: {side: 'top', label: 'Nombre'}
			}
		},
		hAxis: {
			textStyle: { color: 'blue', bold: true },
			format : '#'
		},
		legend: {position: 'none'}
	};

	// reset previous Chart DIV
	document.getElementById(id_div).innerHTML = '';

	// Draw Work Order per State Chart
	var wo_per_state_chart = new google.visualization.BarChart( document.getElementById(id_div) );
	wo_per_state_chart.draw(wo_per_state_data, wo_per_state_option);

	RMPApplication.debug("end drawBarChart");
}	// End function drawBarChart

function drawColumnChart(d_obj, id_div) 
{
	RMPApplication.debug("begin drawColumnChart");

	// Data & option definitions for work order per type Chart
	var wo_per_type_array = new Array(d_obj.wo_type_reduced.length);
	for (var i=0; i<d_obj.wo_type_reduced.length; i++) {
		if (i==0) {
			wo_per_type_array[i] =  new Array('Type', 'Nombre');
		} 
		wo_per_type_array[i+1] = [d_obj.wo_type_reduced[i], d_obj.wo_type_details[i]];
	}

	// console.log('wo_per_type_array: ', wo_per_type_array);
	var wo_per_type_data = google.visualization.arrayToDataTable(wo_per_type_array);
	var wo_per_type_options = {
		title: 'Répartition des (' + d_obj.wo_type_number + ') tickets par TYPE',
		titleTextStyle: {
			fontSize: '20',
			bold: true,
			color: '#c0392b'
		},
		// backgroundColor: "#FCFEE0",
		bar: {groupWidth: "95%"},
		legend: {position: 'none'}
	};

	// reset previous Chart DIV
	document.getElementById(id_div).innerHTML = '';

	// Draw Work Order per Type Chart
	var wo_per_type_chart = new google.visualization.ColumnChart( document.getElementById(id_div) );
	wo_per_type_chart.draw (wo_per_type_data, wo_per_type_options);

	RMPApplication.debug("end drawColumnChart");
}	// End function columnPieChart

function drawPieChart(d_obj, id_div) 
{
	RMPApplication.debug("begin drawPieChart");

	// Data & option definitions for work order per product Chart
	var wo_per_prod_array = new Array(d_obj.wo_prod_reduced.length);
	for (var i=0; i<d_obj.wo_prod_reduced.length; i++) {
		if (i==0) {
			wo_per_prod_array[i] =  new Array('Produit', 'Nombre');
		} 
		wo_per_prod_array[i+1] =  [d_obj.wo_prod_reduced[i], d_obj.wo_prod_details[i]];
	}

	// console.log('wo_per_prod_array: ', wo_per_prod_array);
	var wo_per_prod_data = google.visualization.arrayToDataTable(wo_per_prod_array);
	var wo_per_prod_options = {
		title: 'Répartition des (' + d_obj.wo_prod_number + ') tickets par PRODUIT',
		titleTextStyle: {
			fontSize: 20,
			bold: true,
			color: '#c0392b'
		},
		// backgroundColor: "#FCFEE0",
		pieHole: 0.4
	};

	// reset previous Chart DIV
	document.getElementById(id_div).innerHTML = '';

	//Draw Work Order per Product Chart
	var wo_per_prod_chart = new google.visualization.PieChart( document.getElementById(id_div) );
	wo_per_prod_chart.draw(wo_per_prod_data, wo_per_prod_options);

	RMPApplication.debug("end drawPieChart");
}	// End function drawPieChart

// Calculate breakdown rate
/*function setBreakdownRate(bd_obj)
{
	RMPApplication.debug ("begin setBreakdownRate");   
	var nb_intervMonth = 125;			// Nombre d'interventions du mois
	var nb_openSiteMonth = 800;		// Nombre de magasins ouverts au dernier jour du mois
	var tx_breakdownMonth = 0;

	var nb_intervQuarter = 700;		// Nombre d'interventions du trimestre
	var nb_openSiteQuarter = 3200;		// Nombre de magasins ouverts au dernier jour du trimestre	
	var tx_breakdownQuarter = 0;

	var nb_intervPeriod = 0;		// Nombre d'interventions du mois
	var nb_openSitePeriod = 0;		// Nombre de magasins ouverts au dernier jour du mois
	var tx_breakdownPeriod = 0;
	var nb_monthPeriod = getNumberMonth(Date.now());			// Nombre de mois de la période

    var my_pattern = {};
    eval(col_pannes).listCallback(my_pattern, {}, load_panne_ok, load_panne_ko);
	

	// Monthly Breakdown Rate
	tx_breakdownMonth = (nb_intervMonth * 12) / (nb_openSiteMonth / 12);

	// Quarterly Breakdown Rate
	tx_breakdownQuarter = (nb_intervQuarter * 12 / 4) / (nb_openSiteQuarter / 12);

	// Yearly Breakdown Rate
	for (var i=0, i<nb_monthPeriod; i++) {
		nb_intervPeriod += bd_obj.nb_inter[i];
		nb_openSitePeriod += bd_obj.nb_openSite[i];
	}
	tx_breakdownPeriod = (nb_intervPeriod * 12 / nb_monthPeriod) / (nb_openSitePeriod / 12);

	RMPApplication.debug ("end setBreakdownRate"); 
}
*/
function load_panne_ok(result) 
{
    RMPApplication.debug ("begin load_panne_ok");
	// console.log("load_panne_ok: result", result);	
    RMPApplication.debug ("end load_panne_ok");    
}

function load_panne_ko(result) 
{
    RMPApplication.debug ("begin load_panne_ko : result = " + JSON.stringify(result));
	// console.log("* get_info_ko: result = ", result);
	alertify.error("Error while loading panne!");
    RMPApplication.debug ("end load_panne_ko");
}