<#assign chrono = now("yyyy-MM-dd hh:mm:ss")>
<#assign journal = [{"chrono":chrono,"message":"*** Sub1 *** Check EQ Files contents : start process"}]>
<#assign foo = save_object(journal,"td_journal")>

<#assign collectionName = "td_uploaded_file">
<#assign  filename = filename>
<#assign statut = main()>
${statut}

<#function main>
	<#attempt>  
		<#assign item = {}>
		<#assign query = {}>
		<#assign query = P_json_put(query, "filename", filename, true)>
		<#assign item = load_object(query, collectionName)>
		<#if item?size != 0>
			<#assign item = P_json_put(item, "processed", true, false)>
			<#assign update_count = update_objects (query, item, collectionName)>
		<#else>
			<#return "KO">
		</#if>
		<#return "OK">
	<#recover>  
		<#assign foo = trace("updateCollection: " + .error)>
		<#return "KO">
	</#recover>
</#function>
<#function trace message>
	<#assign chrono = now("dd-MM-yyyy hh:mm:ss")>
	<#assign journal = [{"chrono": chrono, "message": message}]>
	<#assign foo = save_object(journal, "users_management_log_kellydeli")>
	<#return "">
</#function>
