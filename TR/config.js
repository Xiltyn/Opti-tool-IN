// CONFIG
// =========================

// SPREADSHEETS
// =========================
// QUESTIONS URL
var JSONURL = 'https://spreadsheets.google.com/feeds/list/1LNMd_143KQ8grQKUu4U4m4VqlyeKns09Eg97xiTAKR4/1/public/basic?alt=json';
// RANKING URL
var JSONURLRANKING = 'https://spreadsheets.google.com/feeds/list/1LNMd_143KQ8grQKUu4U4m4VqlyeKns09Eg97xiTAKR4/2/public/basic?alt=json';
// SUBJECTS URL
var JSONSUBJECTS = 'https://spreadsheets.google.com/feeds/list/1LNMd_143KQ8grQKUu4U4m4VqlyeKns09Eg97xiTAKR4/3/public/basic?alt=json';
// PROFILE URL
var JSONUSER = 'https://spreadsheets.google.com/feeds/list/1uh_cW5AEoyCMxg30FlPq57nuSuWdaYc7LYHA0ZYUTVE/1/public/basic?alt=json';
// GENERAL BADGES URL
var JSONBADGESGENERAL = 'https://spreadsheets.google.com/feeds/list/1uh_cW5AEoyCMxg30FlPq57nuSuWdaYc7LYHA0ZYUTVE/2/public/basic?alt=json';
// SPECIAL BADGES URL
var JSONBADGESSPECIAL = 'https://spreadsheets.google.com/feeds/list/1uh_cW5AEoyCMxg30FlPq57nuSuWdaYc7LYHA0ZYUTVE/3/public/basic?alt=json';

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
