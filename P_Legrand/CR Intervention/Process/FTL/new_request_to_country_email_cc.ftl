<#assign mode = "${P_mode}">
<#assign destinataires_recipient = "">
<#--  Règle spéciale pour le mode "TEST"  -->
<#if mode != "TEST">
    <#-----------   Modifier la ligne ci-dessous   ------------>
    <#assign notification_step = "notif_new_request_to_country">
    <#-----------   Modifier la ligne ci-dessus    ------------>
<#else>
    <#assign notification_step = "notif_test_mode">
</#if>
<#--  On traite les informations de notifications du pays sélectionné, récupérées en collection  -->
<#assign notif_country = notif_country>
<#--  On traite le tableau d'objets  -->
<#list notif_country as x>
    <#assign x_step = x.notification_step>
    <#--  On recherche précisément un type de notification  -->
    <#if x_step == "${notification_step}">
        <#-----------   Modifier le bloc ci-dessous   ------------>
        <#if mode == "LIVE">
            <#assign destinataires = x.live_email_cc>
        <#elseif mode == "ACCEPTANCE">
            <#assign destinataires = "">
        <#elseif mode == "TEST">
            <#assign destinataires = "">
        </#if>
        <#-----------   Modifier le bloc ci-dessus    ------------>
    </#if>
</#list>
<#--  On traite la notification récupérée en évaluant les variables si elles existent  -->
<#if destinataires != "">
    <#assign destinataires_list = destinataires?split(',')>
    <#assign email = "">
    <#list destinataires_list as item>
        <#assign result = "">
        <#if item[0] == "$">
            <#assign n_item = '"' + item + '"'>
            <#assign result = n_item?eval>
        <#else>
            <#assign result = item>
        </#if>
        <#if email == "">
            <#assign email = result>
        <#else>
            <#assign email = email + "," + result>
        </#if>
    </#list>
    <#assign destinataires_recipient = email>
</#if>
<#assign destinataires = "${destinataires_recipient}">
${destinataires}