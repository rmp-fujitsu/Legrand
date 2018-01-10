// id_js_main_script

// ========================
// Variables declaration
// ========================

// if "true", logs will be showed on the browser console
var debug = {
    "hidden": false,
    "init": false
};

// replace double-quote character by single-quote before generating PDF report
function clean_quote(str)
{
    // return str.replace(/"/g, "&quot;");
    return str.replace(/"/g, "'");
}
