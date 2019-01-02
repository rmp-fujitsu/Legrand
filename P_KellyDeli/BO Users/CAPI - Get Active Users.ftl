<#assign users = []>
<#assign data = []>
<#if currentFilters?size != 0>
	<#list currentFilters as x>
			<#assign tmp = get_lane_users(organization, all_field_users_lane)>
			<#list tmp as y >
				<#if y.login?contains(x.value)>
					<#assign users = users +  [y.login]>
				</#if>
			</#list>
	</#list>
<#else>
		<#assign tmp = get_lane_users(organization, all_field_users_lane)>
        <#--  Retrieve all emails of "KD - Users in the field" lane  -->
		<#list tmp as x >
			<#assign users = users +  [x.login]>
		</#list>
</#if>

<#-- Retrieve & complete all informations related to each account -->
<#list users as x >
	<#assign properties = {}>
    <#--  First: basic information  -->
	<#assign user_data = get_user_data(x)>
	<#assign properties = P_json_put(properties, "name", user_data.name, true)>
	<#assign properties = P_json_put(properties, "email", user_data.login, true)>
	<#assign properties = P_json_put(properties, "language", user_data.i18n, true)>
    <#assign properties = P_json_put(properties, "status", user_data.status, true)>
    <#assign properties = P_json_put(properties, "profile", user_data.profile, true)>
    <#--  2nd: User Metadata  -->
	<#assign user_metadata = get_user_metadata(x)>
	<#assign properties = P_json_put(properties, "company", user_metadata.compagnie?default(""), true)>
	<#assign properties = P_json_put(properties, "phone", user_metadata.phone?default(""), true)>
	<#assign properties = P_json_put(properties, "timezone", user_metadata.timezone?default(""), true)>
	<#assign properties = P_json_put(properties, "country", user_metadata.pays?default(""), true)>
	<#assign properties = P_json_put(properties, "rights", user_metadata.profil?default(""), true)>
	<#assign properties = P_json_put(properties, "main_kiosk", user_metadata.code_magasin?default(""), true)>
	<#assign properties = P_json_put(properties, "kiosks_list", user_metadata.acces_enseignes?default(""), true)>
	<#assign properties = P_json_put(properties, "region", user_metadata.region?default(""), true)>
	<#assign data = data + [properties]>
</#list>
${data}