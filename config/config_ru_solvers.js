// CONFIG
// =========================

// SPREADSHEETS
// =========================
// QUESTIONS URL
var JSONURL = 'https://spreadsheets.google.com/feeds/list/1NHTsrc7fBwQNCZuP4lWIAjCOHk7VusGPlqnhO3KYc98/1/public/basic?alt=json';
// RANKING URL
var JSONURLRANKING = 'https://spreadsheets.google.com/feeds/list/1NHTsrc7fBwQNCZuP4lWIAjCOHk7VusGPlqnhO3KYc98/2/public/basic?alt=json';
// SUBJECTS URL
var JSONSUBJECTS = 'https://spreadsheets.google.com/feeds/list/1NHTsrc7fBwQNCZuP4lWIAjCOHk7VusGPlqnhO3KYc98/3/public/basic?alt=json';
// PROFILE URL
var JSONUSER = 'https://spreadsheets.google.com/feeds/list/1IlIFE6Pw_A0aPH3fuU_MvTGSNaofwXhnVxHohQDtWS4/1/public/basic?alt=json';
// GENERAL BADGES URL
var JSONBADGESGENERAL = 'https://spreadsheets.google.com/feeds/list/1IlIFE6Pw_A0aPH3fuU_MvTGSNaofwXhnVxHohQDtWS4/2/public/basic?alt=json';
// SPECIAL BADGES URL
var JSONBADGESSPECIAL = 'https://spreadsheets.google.com/feeds/list/1IlIFE6Pw_A0aPH3fuU_MvTGSNaofwXhnVxHohQDtWS4/3/public/basic?alt=json';

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
