<@script env="javascript">
function JSON2CSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var line = '';
    var head = array[0];
    for (var index in array[0]) {
        line += index + ',';
    }
    line = line.slice(0, -1);
    str += line + '\r\n';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            line += array[i][index] + ',';
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
}
var record = JSON.parse(data); // here data is your variable in which all data (JSON) persists.
var array=record;
setVariable("log_records",JSON2CSV(array));  // here "log_records" is the variable where I am saving the content of the data into log_records.
</@script>