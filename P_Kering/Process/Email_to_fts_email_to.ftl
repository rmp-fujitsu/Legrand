<#assign mode = "${P_mode}">
<#if mode = "TEST">
    <#assign notification_step = "notif_test_mode">
<#else>
    <#assign notification_step = "notif_fts">
</#if>

<#assign my_pattern>
    {"notification_step": "${notification_step}"}
</#assign>
<#assign destinataires_to = []>
<#list list_objects(my_pattern, "notifications") as x>
    <#if mode = "LIVE">
        <#assign destinataires_to = "${x.live_email_to?eval}">
    <#elseif mode = "ACCEPTANCE">
        <#assign destinataires_to = "${x.acceptance_email_to?eval}">
    <#elseif mode = "TEST">
        <#assign destinataires_to = x.test_email_to>
    </#if>
</#list>

<#assign destinataires = "${destinataires_to}">
${destinataires}