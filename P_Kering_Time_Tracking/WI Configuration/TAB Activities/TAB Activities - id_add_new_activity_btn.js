// id_add_new_activity_btn

RMPApplication.set("level_1", "");
RMPApplication.set("level_2", "");
RMPApplication.set("level_3", "");
RMPApplication.set("label", "");

var id = "id_new_project";
//id_MyComponent is the ID of the element that we want to deploy in the window
var windowComp = $('[id="'+id+'"]').dialog({ 
                                            autoOpen: false, 
                                            modal: true, 
                                            stack: false,  
                                            width:450,
                                            title: 'Add a new project'
                                            });
id_new_project.setVisible(true);
$(windowComp).dialog('open');