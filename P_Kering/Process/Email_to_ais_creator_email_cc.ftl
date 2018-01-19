<#assign mode = "${P_mode}">
<#if mode = "TEST">
    <#assign notification_step = "notif_test_mode">
<#else>
    <#assign notification_step = "notif_ais_creator">
</#if>

<#assign my_pattern>
    {"notification_step": "${notification_step}"}
</#assign>
<#assign destinataires_cc = []>
<#list list_objects(my_pattern, "notifications") as x>
    <#if mode = "LIVE">
        <#assign destinataires_cc = "${x.live_email_cc?eval}">
    <#elseif mode = "ACCEPTANCE">
        <#assign destinataires_cc = "${x.acceptance_email_cc?eval}">
    <#elseif mode = "TEST">
        <#assign destinataires_cc = "">
    </#if>
</#list>

<#assign destinataires = "${destinataires_cc}">
${destinataires}