(function($, _) {

	var JSONURL = 'https://spreadsheets.google.com/feeds/list/1oiAp1Rcgz3qQKdwJf30v7cDJdG8oihXUhqQDWxpSebM/1/public/basic?alt=json';
	var JSONURLRANKING = 'https://spreadsheets.google.com/feeds/list/1oiAp1Rcgz3qQKdwJf30v7cDJdG8oihXUhqQDWxpSebM/2/public/basic?alt=json';
	var $search = $('#search');
	var $questionList = $('#questionList');
	var $rankingList = $('#rankingList');
	var $rankingListWeekly = $('#rankingListWeekly');
	var $questionListElements;
	var $questions;
	var $questionsArray;
	var $distance;
	var rankingTab;

// HTML CODE TEMPLATES (placeholder code :: <%= PLACEHOLDER_NAME %>)

	var $templateQuestions = _.template('<li class="json-question all <%= sub_id %> <%= aged %>"><%= content %><div class="json-answer--wrapper json-answer--hidden"><a href="<%= link %>" class="json-link" target="_blank"><h3 class="json-header <%= approve_1 %>">Answer 1</h3><p class="json-answer"><%= answer_1 %></p></a><a href="<%= link %>" class="json-link" target="_blank"><h3 class="json-header <%= approve_2 %>">Answer 2</h3><p class="json-answer"><%= answer_2 %></p></a></div></li>');
	var $templateRanking = _.template('<li><div class="ranking-element"><a href="http://eodev.com/profil/<%=user_name%>-<%= user_id %>" target="_blank"><%= user_name %><div class="number"><%= answers_count %></div></a></div></li>');
	var $templateRankingWeekly = _.template('<li><div class="ranking-element"><a href="http://eodev.com/profil/<%=user_name%>-<%= user_id %>" target="_blank"><%= user_name %><div class="number"><%= answers_count_weekly %></div></a></div></li>');

	function parseResponse(data){
	    var rows = [];
	    var cells = data.feed.entry;

			try {
				for (var i = 0; i < cells.length; i++){
		        var rowObj = {};
		        rowObj.timestamp = cells[i].title.$t;
		        var rowCols = cells[i].content.$t.split(', content');
		        for (var j = 0; j < rowCols.length; j++){
		            var keyVal = rowCols[j].split(':');
								if (keyVal[1]) {
									rowObj[keyVal[0].trim()] = keyVal[1].trim();
								}
		        }
		        rows.push(rowObj);
		    }
			} catch (exception) {
				showError();
				console.log('Whoooooops!');
			}

			return rows;
	}
	function parseRanking(data){
	    var rows = [];
	    var cells = data.feed.entry;

			try {
		    for (var i = 0; i < cells.length; i++){
		        var rowObj = {};
		        rowObj.timestamp = cells[i].title.$t;
		        var rowCols = cells[i].content.$t.split(',');
		        for (var j = 0; j < rowCols.length; j++) {
		            var keyVal = rowCols[j].split(':');
								if (keyVal[1]) {
									rowObj[keyVal[0].trim()] = keyVal[1].trim();
								}
		        }
		        rows.push(rowObj);
					}
				} catch (exception) {
					showError();
					console.log('Whoooooops!');
	    	}
	    return rows;
		}


	function renderQuestions(questionsData) {
		var questions = parseResponse(questionsData);
		// console.log(typeof questions);
		// console.log(questions);
		var $fragment = $(document.createDocumentFragment());

// ASSIGNING ATTRIBUTES TO PLACEHOLDERS IN THE TEMPLATE
		questions.forEach(function(question) {
			$fragment.append($templateQuestions({
				content: question.contentquestion,
				link: question.timestamp,
				answer_1: question.answer1,
				answer_2: question.answer2,
				approve_1: question.approve1,
				approve_2: question.approve2,
				sub_id: question.subjectname,
				aged: question.aged,
			}));
		});

		$questionList.append($fragment);
		$questions = $questionList.find(".json-question");
		$questionsArray = Array.prototype.slice.call($questions);


		$questionListElements = $questionList.children('li');
		$questionListElements.on('click', onQuestionClick);

		showFirstAnswer();
		toggleSubjects();
		hideApproved();
		preLoaded();
	}

	// function displayMatches(event) {
	// 	var phrase = event.currentTarget.value.toLowerCase();
	//
	// 	$.each($questionList.children(), function(key, value) {
	// 		var $question = $(value);
	// 		var content = $question.html();
	//
	// 		if (content.toLowerCase().indexOf(phrase) >= 0 ) {
	// 			$question.show();
	// 		} else {
	// 			$question.hide();
	// 		}
	// 	});
	// }

	function onQuestionClick() {
			var $answer = $(this).find('.json-answer--wrapper');
			var	$question = $(this);

			$questionListElements.find('.json-answer--wrapper').slideUp(700);
			$answer.slideDown(700);

			function toggleColor() {
				if ($("li").hasClass('js-li--blue')) {
					$('li').removeClass('js-li--blue');
				}
			}
			toggleColor();
			$question.toggleClass('js-li--blue');
	}

	function showFirstAnswer() {
		var $header = $('li').first();

		$questionListElements.first().find('.json-answer--wrapper').show();
		$header.addClass('js-li--blue');
	}

	function toggleSubjects() {

		var $buttons = $(".mint-button-secondary");
		var order = 0;

		$buttons.on('click', function() {
			displayQuestionFromSubject($(this).data('subject'));
			hideApproved();
		});

	}

	function displayQuestionFromSubject(subject) {
		$questions.hide();
		$questionsArray.forEach(function(question) {
			if ($(question).hasClass(subject)) {
				$(question).show();
			}
		});
	}
	function renderRanking(rankingData) {
		var ranking = parseRanking(rankingData);
		var rankingWeekly = parseRanking(rankingData);

		// console.log(ranking);
		function sortRankingGeneral() {
			ranking.sort(function(a, b) {
				var answerCountA = parseInt(a.answerscount,10);
				var answerCountB = parseInt(b.answerscount,10);

				if (answerCountA > answerCountB) {
					return -1;
				}
				if (answerCountA < answerCountB) {
					return 1;
				}
				return 0;
			});
		}

		function sortRankingWeekly() {
			rankingWeekly.sort(function(a, b) {
				var answerCountA = parseInt(a.answerscountweekly,10);
				var answerCountB = parseInt(b.answerscountweekly,10);

				if (answerCountA > answerCountB) {
					return -1;
				}
				if (answerCountA < answerCountB) {
					return 1;
				}
				return 0;
			});
		}

	  sortRankingGeneral();
		sortRankingWeekly();

		var $fragment = $(document.createDocumentFragment());
		var $fragmentWeekly = $(document.createDocumentFragment());

		ranking.forEach(function(item) {
			$fragment.append($templateRanking({
				user_name: item.timestamp,
				answers_count: item.answerscount,
				user_id: item.userid,
			}));
		});
		$rankingList.append($fragment);

		rankingWeekly.forEach(function(item) {
			$fragmentWeekly.append($templateRankingWeekly({
				user_name: item.timestamp,
				answers_count_weekly: item.answerscountweekly,
				user_id: item.userid,
			}));
		});
		$rankingListWeekly.append($fragmentWeekly);

		distanceTop();

	}

	function hideApproved() {
		var $approved1;
		var $approved2;
		var $approvedQuestion;
		var $questionListElementsArray = Array.prototype.slice.call($questionListElements);

		// console.log($questionListElements.find('h3:nth-child(1)'));

			$questionListElements.each(function(item) {
			$approved1 = $(this).find('h3').eq(0);
			$approved2 = $(this).find('h3').eq(1);
			// console.log($approved1);
			// console.log($approved2)
			if (($approved1.hasClass('approved') && $approved2.hasClass('approved')) || ($approved1.hasClass('approved') && $(this).hasClass('aged')) ) {
				$(this).hide();

			};
		})
	}

	function distanceTop() {
		var scrollTop = $(window).scrollTop(),
    $rankingOffset = $('#ranking').offset().top,
		$distanceRanking = $rankingOffset - 20;
    $ranking = ($distanceRanking - scrollTop);

		var $scrollRanking = $(window).scroll(function(){
	    if ( $scrollRanking.scrollTop() > $ranking ) {
	        $('#ranking').css({
						"position":"fixed"
					});
	    } else {
				$('#ranking').css({
					"position":"absolute"
				});
    	}
		});
		// console.log($ranking);
	}

	function openHelp() {
		var $button = $('#help-button');
		var $all = $('html');

		$button.on('click', function() {
			$('#blackout, #help').fadeIn(300);
		});
		$(document).click(function(event) {
    if(!$(event.target).closest('#help, #help-button').length &&
     !$(event.target).is('#help')) {
      if($('#help, #help-button').is(":visible")) {
          $('#help, #blackout').fadeOut(300)
      }
    }
	});
		// console.log($button);
	}

	function openMenu() {
		var $button = $('#subjects-button');
		var $subjectsMenu = $('.subjects-menu')

		$button.on('click', function() {
			if ($subjectsMenu.hasClass('subjects-menu--unfold')) {
					$subjectsMenu.removeClass('subjects-menu--unfold');
			} else {
				$subjectsMenu.addClass('subjects-menu--unfold');
			}
		});
		// console.log($button);
	}

	function openRankingMobile() {
		var $button = $('#ranking-button');
		var $ranking = $('#ranking');

		$button.on('click', function() {
			if ($ranking.hasClass('ranking-open')) {
				$ranking.removeClass('ranking-open');
				$button.removeClass('ranking-open--button');
			} else {
				$ranking.addClass('ranking-open');
				$button.addClass('ranking-open--button');
			}
		});
		// console.log($button);
	}

	function preLoaded() {
		$('#preloader').delay(500).fadeOut('slow',function() {
			$('#preloader').remove();
			// console.log('消えちゃった！');
		});
		$questionList.addClass('animated fadeInUpBig');
	};

	function showError() {
		var $renderError = $('#render-error');

		$renderError.fadeIn(300);
	}

	function rankingTabs() {
		$('.mint-tabs').on('click', '.mint-tabs__tab', function () {
					$(this).siblings('.mint-tabs__tab--active').removeClass('mint-tabs__tab--active').end().addClass('mint-tabs__tab--active');
			});
	}

	function rankingTabsToggle() {
		$rankingTab = $('.mint-tabs__tab');
		$rankingWrapper = $('.ranking-wrapper');

		$rankingTab.each(function() {

			// console.log(this);

			$(this).on('click', function() {
				if ($(this).data('ranking') == 'general') {
					$rankingList.fadeOut(300).fadeIn(300);
					$rankingListWeekly.fadeIn(300).fadeOut(300)
					// console.log($rankingList);
				} else {
					$rankingList.fadeIn(300).fadeOut(300);
					$rankingListWeekly.fadeOut(300).fadeIn(300)
					// console.log($rankingListWeekly);
				}
				console.log('tabbed!');
			})
		});

	}



	// $.getJSON( "questions.json", renderQuestions);

	$.ajax({
      url:JSONURLRANKING,
      success: renderRanking
  });
	$.ajax({
      url:JSONURL,
      success: renderQuestions
  });

	openHelp();
	openMenu();
	openRankingMobile();
	rankingTabs();
	rankingTabsToggle();

	// $search.on('keyup', _.debounce(displayMatches, 200));


})(window.$, window._);
