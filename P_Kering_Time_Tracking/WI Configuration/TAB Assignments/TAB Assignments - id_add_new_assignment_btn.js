// id_add_new_assignment_btn

if (RMPApplication.get("user") != null && RMPApplication.get("user") != "") {
	input.connected_user = RMPApplication.get("user");
	id_get_user_projects.trigger(input, {}, successCallback, failureCallback);

	function successCallback(P_computed) {
		if (P_computed.go == "yes") {
			RMPApplication.set("project", P_computed.projects_list);
		}
	}

	function failureCallback(P_error) {
    	alert(JSON.stringify(P_error));
    }
    
	var id = "id_new_assignment";
	//id_MyComponent is the ID of the element that we want to deploy in the window
	var windowComp = $('[id="'+id+'"]').dialog({ 
                                            autoOpen: false, 
                                            modal: true, 
                                            stack: false,  
                                            width:700,
                                            title: 'Assign Project'
                                            });
	id_new_assignment.setVisible(true);
	$(windowComp).dialog('open');}
else {
	alert("Select a user before starting assignment");
}