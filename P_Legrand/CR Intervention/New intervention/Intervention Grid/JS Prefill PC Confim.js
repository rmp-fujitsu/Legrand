// id_js_prefill_pc_confirm
// Listened variable: 
prefill_current_pc_confirm();

// Set the intervention and issue screen visibles
id_global_grid.setVisible(true);
id_issue_grid.setVisible(true);
id_intervention_grid.setVisible(true);

function prefill_current_pc_confirm() 
{
	var windows_version = id_my_current_pc_initial.id_windows_version.getSelectedValue();
	RMPApplication.setVariable("my_current_pc_confirm.windows_version", windows_version);
	id_my_current_pc_confirm.id_pc_name.setValue(id_my_current_pc_initial.id_pc_name.getValue());
	id_my_current_pc_confirm.id_pc_model.setValue(id_my_current_pc_initial.id_pc_model.getValue());
	id_my_current_pc_confirm.id_serial_number.setValue(id_my_current_pc_initial.id_serial_number.getValue());
}
