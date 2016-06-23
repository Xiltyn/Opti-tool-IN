(function($, _) {

	var JSONURL = 'https://spreadsheets.google.com/feeds/list/1oiAp1Rcgz3qQKdwJf30v7cDJdG8oihXUhqQDWxpSebM/1/public/basic?alt=json';
	var JSONURLRANKING = 'https://spreadsheets.google.com/feeds/list/1oiAp1Rcgz3qQKdwJf30v7cDJdG8oihXUhqQDWxpSebM/2/public/basic?alt=json';
  var JSONUSER = 'https://spreadsheets.google.com/feeds/list/1g_RCrLq21BkES-l5CRuhL0h0vFRZyCGgx_typdtJiCs/1/public/basic?alt=json';
  var JSONBADGESGENERAL = 'https://spreadsheets.google.com/feeds/list/1g_RCrLq21BkES-l5CRuhL0h0vFRZyCGgx_typdtJiCs/2/public/basic?alt=json';
  // var JSONBADGESSPECIAL = 'https://spreadsheets.google.com/feeds/list/1g_RCrLq21BkES-l5CRuhL0h0vFRZyCGgx_typdtJiCs/3/public/basic?alt=json';
	var $questionList = $('#questionList');
	var $rankingList = $('#rankingList');
	var $rankingListWeekly = $('#rankingListWeekly');
  var $profileWrapper = $('.profile-wrapper');
  var $badgesGeneralWrapper;
  var $badgesSpecialWrapper;
  var $badges;
	var $badgesArray;
  var $badgesSpecial;
	var $questionListElements;
	var $questions;
	var $questionsArray;
	var $distance;
	var rankingTab;

// HTML CODE TEMPLATES (placeholder code :: <%= PLACEHOLDER_NAME %>)

	var $templateQuestions = _.template('<li class="json-question all <%= sub_id %> <%= aged %>"><%= content %><div class="json-answer--wrapper json-answer--hidden"><a href="<%= link %>" class="json-link" target="_blank"><h3 class="json-header <%= approve_1 %>">Answer 1</h3><p class="json-answer"><%= answer_1 %></p></a><a href="<%= link %>" class="json-link" target="_blank"><h3 class="json-header <%= approve_2 %>">Answer 2</h3><p class="json-answer"><%= answer_2 %></p></a></div></li>');
	var $templateRanking = _.template('<li><div class="ranking-element"><a class="ranking-user" data-userId=<%= user_id %>><%= user_name %><div class="number"><%= answers_count %></div></a></div></li>');
	var $templateRankingWeekly = _.template('<li><div class="ranking-element"><a class="ranking-user" data-userId=<%= user_id %>><%= user_name %><div class="number"><%= answers_count_weekly %></div></a></div></li>');
  var $templateProfile = _.template ('<div class="profile-wrapper--hole <%= user_id %>"><div class="profile-user"><div class="avatar"><img src="https://<%= user_avatar %>" alt="avatar" /></div><div class="user-info" data-userid="<%= user_id %>"><h3 class="username"><a href="http://www.brainly.in/profile/user-<%= user_id %>"><%= user_name %></a></h3><h4 class="rank"><%= user_rank %></h4></div><div class="user-titles"><h3>Titles</h3><ul class="titles"><li><%= user_title_1 %></li><li><%= user_title_2 %></li><li><%= user_title_3 %></li></ul></div></div><div class="profile-achievements"><h2>Achievements</h2><div class="badges" data-badgeId="<%= badge_011 %>,<%= badge_012 %>,<%= badge_013 %>,<%= badge_021 %>,<%= badge_022 %>,<%= badge_023 %>,<%= badge_031 %>,<%= badge_032 %>,<%= badge_033 %>,<%= badge_04 %>,<%= badge_05 %>,<%= badge_06 %>,<%= badge_07 %>,<%= badge_08 %>,<%= badge_09 %>,<%= badge_10 %>,<%= badge_11 %>,<%= badge_12 %>,<%= badge_13 %>,<%= badge_14 %>,<%= badge_15 %>"><div class="general"><ul class="badges-wrapper badges-wrapper--general"></ul></div></div>');
	var $templateProfileBoth = _.template ('<div class="profile-user"><div class="avatar"><img src="https://<%= user_avatar %>" alt="avatar" /></div><div class="user-info" data-userid="<%= user_id %>"><h3 class="username"><a href="http://www.brainly.in/profile/user-<%= user_id %>"><%= user_name %></a></h3><h4 class="rank"><%= user_rank %></h4></div><div class="user-titles"><h3>Titles</h3><ul class="titles"><li><%= user_title_1 %></li><li><%= user_title_2 %></li><li><%= user_title_3 %></li></ul></div></div><div class="profile-achievements"><h2>Achievements</h2><div class="badges" data-badgeId="<%= badge_011 %>,<%= badge_012 %>,<%= badge_013 %>,<%= badge_021 %>,<%= badge_022 %>,<%= badge_023 %>,<%= badge_031 %>,<%= badge_032 %>,<%= badge_033 %>,<%= badge_04 %>,<%= badge_05 %>,<%= badge_06 %>,<%= badge_07 %>,<%= badge_08 %>,<%= badge_09 %>,<%= badge_10 %>,<%= badge_11 %>,<%= badge_12 %>,<%= badge_13 %>,<%= badge_14 %>,<%= badge_15 %>"><div class="general"><h3>General</h3><ul class="badges-wrapper badges-wrapper--general"></ul></div><div class="special"><h3>Special</h3><ul class="badges-wrapper badges-wrapper--special"></ul></div>');
  var $templateBadgesGeneral = _.template ('<li class="badges-item"><div class="badge rookie" data-id="<%= badge_id %>1"><img src="css/assets/img/badges/<%= badge_id %>1.png" alt="<%= badge_name %>" /></div><div class="badge zealot" data-id="<%= badge_id %>2"><img src="css/assets/img/badges/<%= badge_id %>2.png" alt="<%= badge_name %>" /></div><div class="badge master" data-id="<%= badge_id %>3"><img src="css/assets/img/badges/<%= badge_id %>3.png" alt="<%= badge_name %>" /></div><div class="description"><h3><%= badge_name %></h3><p><%= badge_description %></p><div class="based-on"><%= badge_metric %></div><h2>Requirements</h2><div class="requirements"><div class="element rookie"><h3>rookie</h3><p><%= req_rookie %></p></div><div class="element disciple"><h3>disciple</h3><p><%= req_disciple %></p></div><div class="element master"><h3>master</h3><p><%= req_master %></p></div></div></div></li>');
  // var $templateBadgesSpecial = _.template ('<li class="badges-item"><div class="badge" data-id="<%= badge_id %>"><img src="css/assets/img/badges/<%= badge_id %>.png" alt="" /></div><div class="description"><h3><%= badge_name %></h3><p><%= badge_description %></p></div></li>');

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
			// console.log($approved1);
			// console.log($approved2)
			if ($(this).hasClass('aged')) {
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
				// console.log('tabbed!');
			})
		});

	}

  // =========================
  // ======== PROFILE ========
  // =========================

  function parseProfile(data){
	    var rows = [];
	    var cells = data.feed.entry;

			try {
		    for (var i = 0; i < cells.length; i++){
		        var rowObj = {};
		        rowObj.timestamp = cells[i].title.$t;
		        var rowCols = cells[i].content.$t.split(', profile');
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

    function renderProfile(profileData) {
  		var profileElements = parseProfile(profileData);
  		var $profile = $(document.createDocumentFragment());

      // console.log(profileElements);
  // ASSIGNING ATTRIBUTES TO PLACEHOLDERS IN THE TEMPLATE
  		profileElements.forEach(function(profile) {
  			$profile.append($templateProfile({
  				user_id: profile.timestamp,
  				user_name: profile.profileusername,
  				user_rank: profile.userrank,
  				user_title_1: profile.usertitle1,
  				user_title_2: profile.usertitle2,
  				user_title_3: profile.usertitle3,
  				user_avatar: profile.useravatar,
          badge_011: profile.badge011,
          badge_012: profile.badge012,
          badge_013: profile.badge013,
          badge_021: profile.badge021,
          badge_022: profile.badge022,
          badge_023: profile.badge023,
          badge_031: profile.badge031,
          badge_032: profile.badge032,
          badge_033: profile.badge033,
          badge_04: profile.badge04,
          badge_05: profile.badge05,
          badge_06: profile.badge06,
          badge_07: profile.badge07,
          badge_08: profile.badge08,
          badge_09: profile.badge09,
          badge_10: profile.badge10,
          badge_11: profile.badge11,
          badge_12: profile.badge12,
          badge_13: profile.badge13,
          badge_14: profile.badge14,
          badge_15: profile.badge15,
  			}));
  		});
  		$profileWrapper.append($profile);

      appendBadges();
    }

    function renderBadgesGeneral(profileData) {
      var profileElements = parseProfile(profileData);
      var $badgesGeneral = $(document.createDocumentFragment());

      // console.log(profileElements);

      // General badges render
      // =======================================================|>
      profileElements.forEach(function(badges) {
  			$badgesGeneral.append($templateBadgesGeneral({
  				badge_id: badges.timestamp,
  				badge_name: badges.profilebadgename,
  				badge_description: badges.badgedescription,
          badge_metric: badges.badgereward1,
          req_rookie: badges.rookie,
					req_disciple: badges.disciple,
					req_master: badges.master,
  			}));
  		});
      $badgesGeneralWrapper.append($badgesGeneral);
			// dimBadges();
      return $badgesGeneral

    }

    function appendBadges() {
      $badgesGeneralWrapper = $('.badges-wrapper--general');
      // $badgesSpecialWrapper = $('.badges-wrapper--special');

      if ($badgesGeneralWrapper.load()) {
				$.when($.ajax(JSONBADGESGENERAL) ).then( myFunc, myFailure );
      }
    }

		function myFunc(succesGeneral) {
			// renderBadgesSpecial(succesSpecial[0]);
			renderBadgesGeneral(succesGeneral);
			dimBadges();
			openProfile();
			questionsLeft();
		}

		function myFailure(arg1, arg2) {
			console.log('fail', arg1, arg2);
		}

    function dimBadges() {
			$badgesGeneralWrapper = $('.badges-wrapper--general');
			$badges = $('.badge');

			$badges.each(function() {

				// console.log('this badge', this);

				var badgesArr = $(this).closest('.badges').data('badgeid').split(',');
				// console.log('this array', badgesArr);
				if (badgesArr.indexOf($(this).data('id')) > -1) {
				} else {
					$(this).addClass('badge-dim');
				}
			});
		}

		function openProfile() {
			var $rankingUser = $('.ranking-user');
			var $profile = $('#profile');
			var $profileUser = $('.profile-wrapper--hole');
			var $profileButton = $('#profile-btn');

			$rankingUser.on('click', function() {
				// console.log('does it work?');
        var userId = $(this).data('userid');
        var $userProfile = $profileUser.filter('.' + userId);

        $profileUser.fadeOut(200);
        $profile.fadeIn(200, function() {
            $userProfile.fadeIn(200);
        });
    	});

			$profileButton.on('click', function() {
				$profile.fadeOut(200);
			});
		}

		function questionsLeft() {
			$buttons = $('.subjects-menu').find('button')
			var previousText;

			$buttons.on({
				mouseenter: function () {
					previousText = $(this).text();
			 		$(this).html(" (" + $("." + $(this).data('subject')).not('.aged').length + ")")
				},
				mouseleave: function () {
					$(this).html(previousText)
				}
			});
		}



	$.ajax({
      url:JSONURLRANKING,
      success: renderRanking
  });
	$.ajax({
      url:JSONURL,
      success: renderQuestions
  });
	$.ajax({
			url:JSONUSER,
			success: renderProfile
	});




	openHelp();
	openMenu();
	openRankingMobile();
	rankingTabs();
	rankingTabsToggle();




})(window.$, window._);
