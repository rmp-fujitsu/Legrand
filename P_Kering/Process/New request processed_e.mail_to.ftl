<#assign mode = "${P_mode}">
<#assign notification_step = "notif_new_request">
<#assign destinataires_to = "new_request_email_to">
<#assign my_pattern>
    {"notification_step": "${notification_step}"}
    {"destinataires_to": "${destinataires_to}"}
</#assign>
<#assign result>
    ${load_object(my_pattern, "notifications")}
</#assign>

<#if mode = "LIVE">
    <#assign destinataires_to = "${result.live_email_to?eval}">
<#elseif mode = "ACCEPTANCE">
    <#assign destinataires_to = "${result.acceptance_email_to?eval}">
<#elseif mode = "TEST">
    <#-- assign destinataires_to = "${user}"> -->
    <#assign destinataires_to = "issindou.t+kering_email_to@gmail.com">
</#if>

<#assign destinataires = "${destinataires_to}">
${destinataires}