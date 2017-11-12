$(function () {
	// Tooltip functionnality
	$('[data-toggle="tooltip"]').tooltip();

	// autocomplete functionnality for selection boxes
	$('#id_locationFilter').select2({
	  placeholder: "Choisir un site",
	  width: '100%',
	  allowClear: true
	});

})