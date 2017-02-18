// CONFIG
// =========================

// SPREADSHEETS
// =========================
// QUESTIONS URL
var JSONURL = 'https://spreadsheets.google.com/feeds/list/1c48Hb69qSmBFKjOle7JEa4M2lUM8Papd1oD5cJGJCvE/1/public/basic?alt=json';
// RANKING URL
var JSONURLRANKING = 'https://spreadsheets.google.com/feeds/list/1c48Hb69qSmBFKjOle7JEa4M2lUM8Papd1oD5cJGJCvE/2/public/basic?alt=json';
// SUBJECTS URL
var JSONSUBJECTS = 'https://spreadsheets.google.com/feeds/list/1c48Hb69qSmBFKjOle7JEa4M2lUM8Papd1oD5cJGJCvE/3/public/basic?alt=json';
// PROFILE URL
var JSONUSER = 'https://spreadsheets.google.com/feeds/list/1BcsleCuy4XC0Sg2T1-wovSPqGU3eJRYB7dZ2UyIMGks/1/public/basic?alt=json';
// GENERAL BADGES URL
var JSONBADGESGENERAL = 'https://spreadsheets.google.com/feeds/list/1BcsleCuy4XC0Sg2T1-wovSPqGU3eJRYB7dZ2UyIMGks/2/public/basic?alt=json';
// SPECIAL BADGES URL
var JSONBADGESSPECIAL = 'https://spreadsheets.google.com/feeds/list/1BcsleCuy4XC0Sg2T1-wovSPqGU3eJRYB7dZ2UyIMGks/3/public/basic?alt=json';

// HIDE APPROVED ANSWERS LOGIC CONGIG


function hideApproved(element) {
    var $approved1;
    var $approved2;
    var $approvedQuestion;
    $questionListElements = element;


    console.log($questionListElements);

    $questionListElements.each(function(item) {
        // console.log($approved1);
        // console.log($approved2)
        if ($(this).hasClass('aged')) {
            $(this).hide();

        };
    });
}
