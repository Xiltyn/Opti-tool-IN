// CONFIG
// =========================

// SPREADSHEETS
// =========================
// QUESTIONS URL
var JSONURL = 'https://spreadsheets.google.com/feeds/list/1xK4ObxlPpA1C8LkFS8i6X45fFPBCo_Q32U4TE0dvyUs/1/public/basic?alt=json';
// RANKING URL
var JSONURLRANKING = 'https://spreadsheets.google.com/feeds/list/1xK4ObxlPpA1C8LkFS8i6X45fFPBCo_Q32U4TE0dvyUs/2/public/basic?alt=json';
// SUBJECTS URL
var JSONSUBJECTS = 'https://spreadsheets.google.com/feeds/list/1xK4ObxlPpA1C8LkFS8i6X45fFPBCo_Q32U4TE0dvyUs/3/public/basic?alt=json';
// PROFILE URL
var JSONUSER;
// GENERAL BADGES URL
var JSONBADGESGENERAL;
// SPECIAL BADGES URL
var JSONBADGESSPECIAL;

// HIDE APPROVED ANSWERS LOGIC CONGIG


function hideApproved(element) {
    var $approved1;
    var $approved2;
    var $approvedQuestion;
    $questionListElements = element;


    // console.log($questionListElements);

    $questionListElements.each(function(item) {
        // console.log($approved1);
        // console.log($approved2)
        if ($(this).hasClass('aged')) {
            $(this).hide();

        };
    });
}
