populateTicketDetails();

// =====================================================
// Retrieve informations coming from SNOW notification
// =====================================================
function populateTicketDetails()
{
    RMPApplication.debug("begin populateTicketDetails");

    var content_value = JSON.parse(RMPApplication.get("my_json"));
    
    $("#id_number_detail").val (content_value.FUJITSU_NUMBER);
    $("#id_contract_detail").val (content_value.CUSTOMER_CONTRACT);
    $("#id_opened_detail").val (content_value.OPENED_DATE);
    $("#id_priority_detail").val (content_value.PRIORITY);
    $("#id_state_detail").val (content_value.STATUS);
    $("#id_closed_detail").val (content_value.CLOSURE_DATE);
    $("#id_short_description_detail").val (content_value.SHORT_DESCRIPTION);
    $("#id_description_detail").val (content_value.DESCRIPTION);
    $("#id_affiliate_detail").val (content_value.LOCATION_CODE + "/"+ content_value.affiliate);
    $("#id_contract_detail").val (content_value.company);

    fillSatisfaction();

    RMPApplication.debug("end populateTicketDetails");
}

// ==========================================
// Show satisfaction areas under conditions
// ==========================================
function fillSatisfaction()
{
    RMPApplication.debug("begin fillSatisfaction");
    // already_evaluated = true
    if (already_evaluated) {                             // already evaluated

        $("#id_divEvaluation").show();
        $("#id_evaluation").rating('update', note);
        $("#id_evaluation").rating('refresh', {readonly: true});
        $("#id_divEvalComment").show();
        $("#id_evalComment").val (evalComment);
        $("#id_evalComment").attr('readonly', 'readonly');
        $("#id_rowSatisfaction").hide();
        $("#id_divSendEval").hide();
            // $("#id_rating").hide();
            // $("#id_divHeartRating").hide();
            // $("#id_divComment").hide();
            // $("#id_divSendEval").hide();
        console.log("fivllSatisfaction: already_evaluated");

    } else {             // not yet evaluated & ticket status: solved or closed

        $("#id_rowSatisfaction").addClass("bkg-light-blue");
        $("#id_rowSatisfaction").show();
        $("#id_divHeartRating").show();
        $("#id_rating").show();
        $("#id_divComment").show();
        $("#id_comment").val ("");
        $("#id_comment").prop('readonly', false);
        $("#id_divSendEval").show();
        $("#id_sendEval").show();
        $("#id_divEvaluation").hide();
        $("#id_divEvalComment").hide();
        console.log("fillSatisfaction: NOT yet evaluated");
    }

    RMPApplication.debug("end fillSatisfaction");
}

// ==================================
// Get notation value from user input
// ==================================
function setNotationValue(note)
{
    RMPApplication.debug("begin setNotationValue");
	$("#id_selectedNotation").val(note);
    RMPApplication.debug("end setNotationValue");
}