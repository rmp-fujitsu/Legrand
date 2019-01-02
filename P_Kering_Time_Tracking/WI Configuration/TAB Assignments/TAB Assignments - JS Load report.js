// id_js_load_report
// Variable listened: user

// the input object is used by the composite API to retrieve, paginate, filter and sort data by calling a third party connector
var input = {};
input.pageSize = 20;

// sortedColumns looks like [{"order":"name","orderby":"desc"},...]
input.sortedColumns = id_report_2.getSortedColumns();
// currentFilters looks like [{"filter":"name","value":"hakim","operator":"CONTAINS"},...]
id_report_2.setLoading(true);

input.connected_user = RMPApplication.get("user");
id_get_user_projects.trigger(input, {}, successCallback, failureCallback);

function successCallback(P_computed)
{
    var reportOptions = {
        // count of the available data items (mandatory)
        // if the count of data items is not known you should use RMP_Report.DYNAMIC_COUNT here
        count: RMP_Report.DYNAMIC_COUNT,
        // pagination index (mandatory)
        first: P_computed.P_first,
        // A text that may be displayed in the report pager if data items' count is not known (optional)
        pagerCount: "xxx"
    };
    // P_computed.data is a json array that should have the same structure configured in step (2)
    id_report_2.setData( P_computed.data, reportOptions )
    id_report_2.setLoading(false);
}

function failureCallback(P_error)
{
    alert(JSON.stringify(P_error));
    id_report_2.setLoading(false);
}