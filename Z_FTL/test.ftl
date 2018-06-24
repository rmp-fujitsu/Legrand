<#assign userId = []/> 
<#list owner as groupId> 
	<#assign users = get_lane_users(poolId, groupId)/> 
	<#list users as user> 
		<#assign userId = userId + [user.id]/> 
	</#list> 
</#list> 
<#list userId as singleId> 
	${P_add_user_to_lane(303971, singleId)} 
</#list> 


<#assign mailId = "">
<#assign users = get_lane_users("pool_id", "role_id")>
<#list users as i>
	<#assign mailId = mailId + i.login + ",">
</#list>
${mailId}

Here mailId is an array consisting of all the email id which we are going to push.
user_list is the variable which temporarily consisting of all users details.

<#assign mailID = "">
<#list recipients as r>
	<#assign users = get_lane_users(poolID, r)>
	<#list users as u>
		<#assign mailID = mailID + u.login + ",">
	</#list>
</#list>


<#assign user_id = []/> 
<#list recipients as lane_id> 
	<#assign users = get_lane_users(pool_id, lane_id)/> 
	<#list users as user> 
		<#assign user_id = user_id + [user.id]/> 
	</#list> 
</#list> 
<#list user_id as single_id> 
	P_add_user_to_lane(runtime_lane, single_id)
</#list> 

<#assign mail_id = "">
<#assign users_list = get_lane_users(pool_id, runtime_lane)>
<#list users_list as u>
	<#assign mail_id = mail_id + u.login + ",">
</#list>
${mail_id}

<#assign mail_id = "">
<#list recipients as r>
	<#assign users = get_lane_users(pool_id, r)>
	<#list users as u>
		<#assign mail_id = mail_id + u.login + ",">
	</#list>
</#list>
${mail_id}


<#assign mail_id = "">
<#--
<#assign users_list = get_lane_users(pool_id, 442272)>
-->
<#assign users_list = get_lane_users(127066, runtime_lane)>
<#list users_list as u>
	<#if mail_id == "">
		<#assign mail_id = u.login>
	<#else>
		<#assign mail_id = mail_id + "," + u.login>
	</#if>
</#list>
${mail_id}

