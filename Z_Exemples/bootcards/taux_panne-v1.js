/*
 * Clear the target DOM element and draw the chart
 */
 
var barChartTauxPanne = null;

var data = [
			{period: 'Mois', current: 2.04, previous: 2.50},
			{period: 'Trimestre', current: 2.37, previous: 2.42},
			{period: 'Exercice', current: 2.40, previous: 2.43}
];

bootcards.init( {
        offCanvasHideOnMainClick : true,
        offCanvasBackdrop : true,
        enableTabletPortraitMode : true,
        disableRubberBanding : true,
        disableBreakoutSelector : 'a.no-break-out'
      });

var drawBarchartTauxPanne = function() {

	$("#chartTauxPanne").empty();

	barChartTauxPanne = Morris.Bar({
		element: 'chartTauxPanne',
		data: data,
		xkey: 'period',
		xLabels: 'Période',
		ykeys: ['current', 'previous'],
		labels: ['En cours', 'Précédent'],
		xLabelAngle: 20,
		hideHover: 'auto',
		postUnits: ' %',
		resize: true,
		formatter: function (y) { return y + " %" }
	});
};

//draw the chart when the DOM is ready
$(document).ready( function() {
	drawBarchartTauxPanne();
});

//on resize of the page: redraw the charts
$(window).on('resize', function() {
	window.setTimeout( function() {
		if (barChartTauxPanne !== null) { 
			barChartTauxPanne.redraw(); 
		}
	}, 250);
});