var waitForReport = function() {
    setTimeout(function() {
        if ( $("#id_report .ColumnHeader-MEASURE_7 .descendingStyle").length ) {
            $("#id_report .ColumnHeader-MEASURE_7 .descendingStyle").click();
        } else {
            waitForReport();
        }
    }, 100);
};

waitForReport();