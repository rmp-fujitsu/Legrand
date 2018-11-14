// id_js_transpose_function
// Variables listened: 

function rmp_transpose(my_object)
{
    if (my_object instanceof Array) {
        //we try to convert array of json to json of arrays
        var a_keys = new Array();
        var my_output = {}

        if (my_object.length > 0) {
            for (my_key in my_object[0]) {
                a_keys.push(my_key);
            }
        }
        for (var j = 0; j < a_keys.length; j++) {
            var a_cell = new Array();
            for (var i = 0; i < my_object.length; i++) {
                if (my_object[i][a_keys[j]] != undefined) {
                    a_cell.push(my_object[i][a_keys[j]]);
                } else {
                    a_cell.push("");
                }
            }
            my_output[a_keys[j]] = a_cell;
        }
        return my_output;

    } else {
    //we try to convert json of arrays into an array of json
    var my_output = new Array();
    var a_keys = new Array();
    for (my_key in my_object) {
        a_keys.push(my_key);
    }
    if (a_keys.length > 0) {
        for (var i = 0; i < my_object[a_keys[0]].length; i++) {
            var my_json = {};
            for (var j = 0; j < a_keys.length; j++) {
                my_json[a_keys[j]] = my_object[a_keys[j]][i];
            }
            my_output.push(my_json);
        }
    }
    return my_output;
    }
}

/*
//=============================================================================================
// Example if my_object is an array of jsons to transpose

var my_object = [{"firstname":"Tony","lastname":"Boy"},{"firstname":"John","lastname":"Smith"}];
JSON.stringify(rmp_transpose(my_object)) => will return

{"firstname":["Tony","John"],"lastname":["Boy","Smith"]}

and JSON.stringify(rmp_transpose(rmp_transpose(my_object))) will return the original my_object

[{"firstname":"Tony","lastname":"Boy"},{"firstname":"John","lastname":"Smith"}]
//=============================================================================================
*/