// the input object is used by the composite API to retrieve, paginate, filter and sort data by calling a third party connector
var input = {};
P_first = 0;
input.pageSize = 20;
input.first = P_first;
all_users_array = [];

// sortedColumns looks like [{"order": "name", "orderby": "desc"},...]
if (id_users_report.getSortedColumns() == []) {
	input.sortedColumns = [{"orderby": "name","order":"asc"}];
} else {
	input.sortedColumns = id_users_report.getSortedColumns();
}

// currentFilters looks like [{"filter": "name", "value": "untel", "operator": "CONTAINS"},...]
input.currentFilters = id_users_report.getFilters();

// displays the report spinner while loading data
id_users_report.setLoading(true);
c_debug(dbug.report, "=> CAPI id_get_all_users_api: input = ", input);
id_get_all_users_api.trigger(input, {}, get_all_users_ok, get_all_users_ko);

function get_all_users_ok(result)
{
	RMPApplication.debug("begin get_all_users_ok");
	c_debug(dbug.report, "=> begin get_all_users_ok: result = ", result);

	all_users_array = result.data;
	var users_array = [];

	var reportOptions = {
		count: Number(all_users_array.length),					// count of the available data items (mandatory)
		first: P_first,											// pagination index (mandatory)
        pagerCount: all_users_array.length,
        filter: "region",
        operator: "CONTAINS",
        value: "KR42"
    };
    c_debug(dbug.report, "=> get_all_users_ok: reportOptions = ", reportOptions);

	// result.data is a json array that should have the same structure configured in step (2)
	id_users_report.setData(all_users_array, reportOptions);
	id_users_report.setLoading(false);
	RMPApplication.debug("end get_all_users_ok");
}

function get_all_users_ko(error)
{
	RMPApplication.debug("=> begin get_all_users_ko: error = " + JSON.stringify(error));
	c_debug(dbug.report, "=> begin get_all_users_ko: error = " + JSON.stringify(error));
	var error_msg = ${P_quoted(i18n("user_info_ko_msg", "Impossible de récupérer les informations des utilisateurs !"))};
	notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);

	id_users_report.setLoading(false);
	RMPApplication.debug("end get_all_users_ko");
}
