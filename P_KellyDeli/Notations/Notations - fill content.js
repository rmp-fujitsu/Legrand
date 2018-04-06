// ======================================
//  fill content.js
// ======================================

var info_title_notify = ${P_quoted(i18n("info_title_notify", "Information"))};
var btn_ok = ${P_quoted(i18n("btn_ok", "OK"))};

// retrieve data from "KD - Evaluation" process
var content_value = JSON.parse(RMPApplication.get("my_json"));
$("#id_number_detail").val (content_value.FUJITSU_NUMBER);
$("#id_contract_detail").val (content_value.CUSTOMER_CONTRACT);
$("#id_opened_detail").val (content_value.OPENED_DATE);
$("#id_priority_detail").val (content_value.PRIORITY);
$("#id_state_detail").val (content_value.STATUS);
$("#id_closed_detail").val (content_value.CLOSURE_DATE);
$("#id_short_description_detail").val (content_value.SHORT_DESCRIPTION);
$("#id_description_detail").val (content_value.DESCRIPTION);
$("#id_affiliate_detail").val (content_value.affiliate + "/" + content_value.LOCATION_CODE);
$("#id_contract_detail").val (content_value.company);

fillSatisfaction();

function fillSatisfaction()
{
    RMPApplication.debug("begin fillSatisfaction");
    // not yet evaluated & ticket status: solved or closed
    $("#id_rowSatisfaction").addClass("bkg-light-blue");
    $("#id_rowSatisfaction").show();
    $("#id_rating").show();
    $("#id_divHeartRating").show();
    $("#id_divComment").show();
    $("#id_comment").val ("");
    $("#id_comment").prop('readonly', false);
    $("#id_divSendEval").show();

    $("#id_heartRating").on(
        'change', function () {
            var selectedNote = $(this).val(); 
            // console.log('selectedNote: ' + selectedNote);
            setNotationValue(selectedNote);
    });
    RMPApplication.debug("end fillSatisfaction");
}

function setNotationValue(note)
{
    RMPApplication.debug("begin setNotationValue");
    RMPApplication.set("notation", note);
    RMPApplication.debug("end setNotationValue");
}

function check_eval(note, comments)
{
    RMPApplication.debug("begin check_eval");
    if ((parseInt(note) >= 1) && (parseInt(note) <= 3)) {
        // comment is mandatory for note <= 3
        if (isEmpty(comments)) {
            var title_dialog_empty = ${P_quoted(i18n("title_dialog_empty", "Commentaire obligatoire"))};
            var content_dialog_empty = ${P_quoted(i18n("content_dialog_empty", "Toute note inférieure à 3 doit être accompagnée d'un commentaire!"))};
            dialog_error(title_dialog_empty, content_dialog_empty, btn_ok);
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}