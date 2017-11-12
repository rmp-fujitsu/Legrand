function getFilters(){

  RMPApplication.debug("getFilters ");
  id_spinner.setVisible(true);
  //
  // check if the fields dates are in order and alert and return if not
  //
  if((RMPApplication.get("opened_from")!== null) && (RMPApplication.get("opened_to")!== null)){
                 if(datesNotInOrder(RMPApplication.get("opened_from") , RMPApplication.get("opened_to"))){
                                 var error_msg = "${ P_quoted( i18n('alert_error_date', 'start date must be earlier than to date') ) }";
                                 alertify.alert(error_msg);
                                 id_spinner.setVisible(false);
                                 return ;
                 }
  }
  //
  // recuperations des champs de search et creation de la query que l'on va passer au report
  //
  var jsonThisQuery = {};
  jsonThisQuery.$and = [];
  //
  // on force le champs state a ne pas etre dans le tableau de code correspondant 
  // à des taches non ouvertes
  // nombre au format string sinon la query n'est pas valide!!!
  // 3 -> close complete
  // 4 -> close imcomplete
  // 7 -> cancel
  // 
  if ( RMPApplication.get("open_only") == '["1"]')
  {
                 var state = {};
                 state.$nin = ["3", "4", "7"];
                 jsonThisQuery.$and.push({state}) ;
  }
  //
  // recuperation de la valeur du maintenance work center
  //
  if(!isEmpty(RMPApplication.get("mwc"))){
                 jsonThisQuery.$and.push({"maintenance_work_center" : RMPApplication.get("mwc")});
  }
  //
  // recuperation de la valeur de site location et insertion dans l'objet
  //
  if(!isEmpty(RMPApplication.get("location_name"))){
                 jsonThisQuery.$and.push({"location_name" : RMPApplication.get("location_name")});
  }
  //
  // recuperation de la valeur Equipement
  //
  if(!isEmpty(RMPApplication.get("affected_ci"))){
                 jsonThisQuery.$and.push({"affected_ci" : RMPApplication.get("affected_ci")});

  }
  //
  // recuperation de Numero d'incident (incident_number)
  //
  if(!isEmpty(RMPApplication.get("incident_number"))){
                 jsonThisQuery.$and.push({"incident_number" : RMPApplication.get("incident_number")});
  }
  //
  //recuperation de Numero de ticket (Number)
  //
  if(!isEmpty(RMPApplication.get("number"))){
                 jsonThisQuery.$and.push({"number" : RMPApplication.get("number")});

  }
  //
  //            recuperation de date Opened From
  //
  var opened_at = {};
  if(!isEmpty(RMPApplication.get("opened_from"))){
                 RMPApplication.debug("in manage opened_from");
                                 var openDate = parseInt(RMPApplication.get("opened_from"), 10);
                                 RMPApplication.debug("openDate: " + openDate);
                                 //
                                 // set opening date at 0h 0min 0sec and get the new modified timestamp
                                 //
                                 var begin = new Date(openDate*1000);
                                 RMPApplication.debug("begin avant traitement is " + begin);
                                 RMPApplication.debug("begingetTime avant traitement is " + begin.getTime());
                                 begin.setHours(00);
                                 begin.setMinutes(00);
                                 begin.setSeconds(00);
                                 begin.setMilliseconds(0);
                                 RMPApplication.debug("begin apres traitement is :" + begin);
                                 RMPApplication.debug("begingetTime apres traitement is :" + begin.getTime());
                                 //
                                 // transform to timestamp and inject in query object
                                 //
                                 opened_at.$gte = ((begin.getTime())/1000);
  }
  //
  //            recuperation de date Opened To
  //
  if(!isEmpty(RMPApplication.get("opened_to"))){
                 RMPApplication.debug("in manage opened_to");
                 var closeDate = parseInt(RMPApplication.get("opened_to"), 10); // 10 pour base decimale
                 RMPApplication.debug("closeDate: " + closeDate);
                 //set close date at 23h 59min 59sec
                 var end = new Date(closeDate * 1000);
                 end.setHours(23);
                 end.setMinutes(59);
                 end.setSeconds(59);
                 //
                 // transform to timestamp and inject in a new object field
                 //
                 opened_at.$lte = ((end.getTime())/1000);
  }
  if((opened_at.$gte!== undefined )|| (opened_at.$lte!== undefined)){
                 jsonThisQuery.$and.push({"opened_at" : opened_at });
  }
  //
  // setting the report query
  //
  var jsonReportQuery = {};
  var jsonThisOrder = {};
  jsonThisOrder.opened_at = -1 ;
  jsonReportQuery.$query = jsonThisQuery;
  jsonReportQuery.$orderby = jsonThisOrder;
  id_tasks_report.setQuery(JSON.stringify(jsonReportQuery));
  RMPApplication.debug("jsonReportQuery is");
  RMPApplication.debug(JSON.stringify(jsonReportQuery));
  //
  // on veux cacher le report le temps de faire son refresh
  //
  id_tasks_report.setVisible(false);
  id_tasks_report.refresh();
  id_tasks_report.setVisible(true);
  //
  // on rend visible la section contenant le report
  //
  id_task_listing_section.setVisible(true);
  id_task_listing_section.open();
  id_spinner.setVisible(false);
}
