// the input object is used by the composite API to retrieve, paginate, filter and sort data by calling a third party connector
var input = {};
input.pageSize = 30;
input.first = P_first;
// sortedColumns looks like [{"order":"name","orderby":"desc"},...]
input.sortedColumns = id_users_report.getSortedColumns();
// currentFilters looks like [{"filter":"name","value":"untel","operator":"CONTAINS"},...]
input.currentFilters = id_users_report.getFilters();
c_debug(dbug.report, "=> CAPI id_get_all_users_api: input = ", input);
id_users_report.setLoading(true);
id_get_all_users_api.trigger(input, {}, get_all_users_ok, get_all_users_ko);

function get_all_users_ok(result)
{
	RMPApplication.debug("begin get_all_users_ok: result =  ", result);
	c_debug(dbug.report, "=> begin get_all_users_ok");
	var reportOptions = {
		// count of the available data items (mandatory)
		// if the count of data items is not known you should use RMP_Report.DYNAMIC_COUNT here
		count: RMP_Report.DYNAMIC_COUNT,
		// pagination index (mandatory)
		first: result.P_first,
		// A text that may be displayed in the report pager if data items' count is not known (optional)
		pagerCount: "xxx"
	};

	// result.data is a json array that should have the same structure configured in step (2)
	id_users_report.setData( result.data, reportOptions )
	id_users_report.setLoading(false);
	RMPApplication.debug("end get_all_users_ok");
}

function get_all_users_ko(error)
{
	RMPApplication.debug("=> begin get_all_users_ko: error = " + JSON.stringify(error));
	c_debug(dbug.report, "=> begin get_all_users_ko");
	var error_msg = ${P_quoted(i18n("user_info_ko_msg", "Impossible de récupérer les informations des utilisateurs !"))};
	notify_error(error_title_notify, error_msg + ' ' + error_thanks_notify);

	id_users_report.setLoading(false);
	RMPApplication.debug("end get_all_users_ko");
}
