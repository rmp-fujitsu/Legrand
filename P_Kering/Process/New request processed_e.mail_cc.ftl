<#assign mode = "${P_mode}">
<#assign notification_step = "notif_new_request">
<#assign destinataires_cc = "new_request_email_cc">
<#assign my_pattern>
    {"notification_step": "${notification_step}"}
    {"destinataires_cc": "${destinataires_cc}"}
</#assign>
<#assign result>
    ${load_object(my_pattern, "notifications")}
</#assign>

<#if mode = "LIVE">
    <#assign destinataires_cc = "${result.live_email_cc?eval}">
<#elseif mode = "ACCEPTANCE">
    <#assign destinataires_cc = "${result.acceptance_email_cc?eval}">
<#elseif mode = "TEST">
    <#-- assign destinataires_cc = "${user}"> -->
    <#assign destinataires_cc = "issindou.t+kering_email_cc@gmail.com">
</#if>

<#assign destinataires = "${destinataires_cc}">
${destinataires}