// CONFIG
// ============================================

    // SPREADSHEETS
    // ========================================

        // QUESTIONS URL
        var JSONURL = 'https://spreadsheets.google.com/feeds/list/1oiAp1Rcgz3qQKdwJf30v7cDJdG8oihXUhqQDWxpSebM/1/public/basic?alt=json';
        // RANKING URL
        var JSONURLRANKING = 'https://spreadsheets.google.com/feeds/list/1oiAp1Rcgz3qQKdwJf30v7cDJdG8oihXUhqQDWxpSebM/2/public/basic?alt=json';
        // SUBJECTS URL
        var JSONSUBJECTS = 'https://spreadsheets.google.com/feeds/list/1oiAp1Rcgz3qQKdwJf30v7cDJdG8oihXUhqQDWxpSebM/3/public/basic?alt=json';
        // PROFILE URL
        var JSONUSER = 'https://spreadsheets.google.com/feeds/list/1g_RCrLq21BkES-l5CRuhL0h0vFRZyCGgx_typdtJiCs/1/public/basic?alt=json';
        // GENERAL BADGES URL
        var JSONBADGESGENERAL = 'https://spreadsheets.google.com/feeds/list/1g_RCrLq21BkES-l5CRuhL0h0vFRZyCGgx_typdtJiCs/2/public/basic?alt=json';
        // SPECIAL BADGES URL
        var JSONBADGESSPECIAL = 'https://spreadsheets.google.com/feeds/list/1g_RCrLq21BkES-l5CRuhL0h0vFRZyCGgx_typdtJiCs/3/public/basic?alt=json';

    // HIDE APPROVED ANSWERS LOGIC CONGIG
    // ========================================

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

    function flyHigh() {
      var $priorityQuestions = $('.flyHigh');

      $priorityQuestions.css('color', '#ff8073')
                        .css('font-weight', '800')
                        .css("list-style-image", "url('css/assets/img/bullet-peach.gif')");
    }
