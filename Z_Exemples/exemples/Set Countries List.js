// Proposer une liste de pays récupérés dans une collection

var div_filter = id_region.getSelectedValue();

if (div_filter == "__##prompt##__") {

    }
    else {

        var my_pattern = {};
        my_pattern.region = id_region.getSelectedValue();
        col_Region.listCallback(my_pattern, {}, list_ok, list_ko);    

        function list_ok(result) 
        {
            //alert("ok=" + JSON.stringify(result));
            var country_list = new Array();

            for (var i=0; i<result.length; i++) {
                if (i>=1 && result[i].country != result[i-1].country) {
                    country_list.push({"label":result[i].country, "value":result[i].country});
                    
                } else if (i<1) {
                    country_list.push({"label":result[i].country, "value":result[i].country});
                }
            }
            var a_country = new RMP_List();
            a_country.fromArray(country_list);
            RMPApplication.setList("country_list", a_country);
        }

        function list_ko(result) 
        {
            alert("ko=" + JSON.stringify(result));
        }
    }
