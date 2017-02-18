// CONFIG
// =========================

// SPREADSHEETS
// =========================
// QUESTIONS URL
var JSONURL = 'https://spreadsheets.google.com/feeds/list/15F61SYuQZSnzpn-Ntdf6IqCVY_vcXwTKY42uYX8n7PU/1/public/basic?alt=json';
// RANKING URL
var JSONURLRANKING = 'https://spreadsheets.google.com/feeds/list/15F61SYuQZSnzpn-Ntdf6IqCVY_vcXwTKY42uYX8n7PU/2/public/basic?alt=json';
// SUBJECTS URL
var JSONSUBJECTS = 'https://spreadsheets.google.com/feeds/list/15F61SYuQZSnzpn-Ntdf6IqCVY_vcXwTKY42uYX8n7PU/3/public/basic?alt=json';
// PROFILE URL
var JSONUSER = false;
// GENERAL BADGES URL
var JSONBADGESGENERAL = false;
// SPECIAL BADGES URL
var JSONBADGESSPECIAL = false;

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
