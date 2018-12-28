<#assign create_users_with_email = []>
<#assign update_users = []>

<#list rows as x>
	<#assign user_login = x.Mail>
	<#assign is_user_created = "">
	
	<#if user_login?? && user_login != "">
	 	<#attempt>
		<#assign local_metadata = get_user_metadata(user_login)>
		<#assign local_data = get_user_data(user_login)>
		<#if local_metadata??>
			<#assign is_user_created = "yes">
			
		</#if> 
	 	<#recover>
			<#assign is_user_created = "no">
		</#attempt> 
	</#if>
	
	<#assign mdt_save = "">
	<#if user_login?? && user_login != "">
		<#attempt>
			<#assign mdt_save = get_user_metadata(x.Mail)>	
		<#recover>
			<#assign is_user_created = "no">
			<#assign mdt_save = {}>
		</#attempt>
	<#else>
		<#assign mdt_save = {}>
		
	</#if>
	
	<#assign mdt = mdt_save>
	
	<#assign mdt = P_json_remove(mdt, "firstname")>
	<#assign mdt = P_json_put(mdt, "firstname", x.Prenom, "true")>
	<#assign mdt = P_json_remove(mdt, "lastname")>
	<#assign mdt = P_json_put(mdt, "lastname", x.Nom, "true")>
	<#assign mdt = P_json_remove(mdt, "matricule")>
	<#assign mdt = P_json_put(mdt, "matricule", x.Matricule, "true")>
	<#assign mdt = P_json_remove(mdt, "Date_anciennete")>
	<#assign mdt = P_json_put(mdt, "Date_anciennete", x.Date_anciennete, "true")>
	<#assign mdt = P_json_remove(mdt, "Manager")>
	<#assign mdt = P_json_put(mdt, "Manager", x.Manager, "true")>
	<#assign mdt = P_json_remove(mdt, "Fonction")>
	<#assign mdt = P_json_put(mdt, "Fonction", x.Fonction, "true")>
	<#assign mdt = P_json_remove(mdt, "Direction")>
	<#assign mdt = P_json_put(mdt, "Direction", x.Direction, "true")>
	<#assign mdt = P_json_remove(mdt, "Services")>
	<#assign mdt = P_json_put(mdt, "Services", x.Services, "true")>
	<#assign mdt = P_json_remove(mdt, "language")>
	<#assign mdt = P_json_put(mdt, "language", "fr", "true")>
	<#assign mdt = P_json_remove(mdt, "email_manager")>
	<#assign mdt = P_json_put(mdt, "email_manager", x.email_manager, "true")>
	
	
	
	<#if user_login?? && user_login != "" && is_user_created == "no">
		<#assign meta = mdt>
		<#assign meta = P_json_put(meta, "user_login", user_login)>
		<#assign create_users_with_email = create_users_with_email + [meta]>
	</#if>
	
	<#if user_login?? && user_login != "" && is_user_created == "yes">
		<#assign meta = mdt>
		<#assign meta = P_json_put(meta, "user_login", user_login)>
		<#assign update_users = update_users  + [meta]>
	</#if>
	
</#list>

<#assign hub = {}>
<#assign hub = P_json_put(hub, "create_users_with_email", create_users_with_email)>
<#assign hub = P_json_put(hub, "update_users", update_users)>

${hub}




