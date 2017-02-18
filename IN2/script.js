(function($, _) {

    // GLOBAL VARIABLES
    // ===================================================================::|>
    var $questionList = $('#questionList');
    var $rankingList = $('.rankingList');
    var $profileWrapper = $('.profile-wrapper');
		var $subjectsList = $('.subjects-menu');
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

    // TEMPALTES
    // ===================================================================::|>
    var $templateQuestions = _.template($('#templateQuestions').html());
    var $templateRanking = _.template($('#templateRanking').html());
    // var $templateRankingWeekly = _.template($('#templateRankingWeekly').html());
		var $templateSubjects = _.template($('#templateSubjects').html());
    var $templateProfile = _.template($('#templateProfile').html());
    var $templateBadgesGeneral = _.template($('#templateBadgesGeneral').html());
    var $templateBadgesSpecial = _.template($('#templateBadgesSpecial').html());


    // DATA PARSING
    // ===================================================================::|>
    // QUESTION LIST
    // ===================================================================::|>
    function parseResponse(data) {
        var rows = [];
        var cells = data.feed.entry;

        try {
            for (var i = 0; i < cells.length; i++) {
                var rowObj = {};
                rowObj.timestamp = cells[i].title.$t;
                var rowCols = cells[i].content.$t.split(', content');
                for (var j = 0; j < rowCols.length; j++) {
                    var keyVal = rowCols[j].split(': ');
                    if (keyVal[1]) {
                        rowObj[keyVal[0].trim()] = keyVal[1].trim();
                    }
                }
                rows.push(rowObj);
            }
        } catch (exception) {
            showError();
            console.log('Questions\' data could not be loaded');
        }
        return rows;
    }

    // RANKING
    // ===================================================================::|>
    function parseRanking(data) {
        var rows = [];
        var cells = data.feed.entry;

        try {
            for (var i = 0; i < cells.length; i++) {
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
            console.log('Rankings\' data could not be loaded');
        }
        return rows;
    }

		// SUBJECTS
		// ===================================================================::|>
		function parseSubjects(data) {
				var rows = [];
				var cells = data.feed.entry;

				try {
						for (var i = 0; i < cells.length; i++) {
								var rowObj = {};
								rowObj.timestamp = cells[i].title.$t;
								var rowCols = cells[i].content.$t.split(', subject');
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
						console.log('Subjects\' data could not be loaded');
				}
				return rows;
		}

    // PROFILE
    // ===================================================================::|>
    function parseProfile(data) {
        var rows = [];
        var cells = data.feed.entry;

        try {
            for (var i = 0; i < cells.length; i++) {
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
            console.log('Profiles\' data could not be loaded');
        }
        return rows;
    }

    // DATA RENDERING
    // ===================================================================::|>
    // QUESTION LIST
    // ===================================================================::|>
    function renderQuestions(questionsData) {
        var questions = parseResponse(questionsData);
        var $fragment = $(document.createDocumentFragment());
        // console.log(typeof questions);
        // console.log(questions[0].now);

        // ASSIGNING ATTRIBUTES TO PLACEHOLDERS IN THE TEMPLATE
        // ===============================================================::|>
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
                level: question.class,
                id: question.questionid,
            }));
        });

				$questions = $questionList.find(".json-question");
				$questionsArray = Array.prototype.slice.call($questions);


        // LAST UPDATE
        // ===============================================================::|>
        var lastUpdatePlaceholder = $('#content');
        lastUpdatePlaceholder.prepend("<div class='last-update'>Last updated at: <strong>" + questions[0].now + " </strong>CET</div>");

        $questionList.append($fragment);

        // DEPENDABLE FUNCTIONS
        // ===============================================================::|>
        $.when($.ajax(JSONBADGESGENERAL)).then(myFunc, myFailure);

        function myFunc() {
            randomizeQuestions();
            toggleTasks();
            preLoaded();
            validateQuestion();
            markReviewed();
        }

        function myFailure(arg1, arg2) {
            console.log('fail', arg1, arg2);
        }

				$.when($.ajax(JSONSUBJECTS)).then(subSuccess, subFail);

				function subSuccess(success) {
					renderSubjects(success);
					toggleSubjects();
					questionsLeft();
				}

				function subFail() {
					console.log('Shit!');
				}
        flyHigh();

    }

    // RANKING
    // ===================================================================::|>
    function renderRanking(rankingData) {
        var data = parseRanking(rankingData);
        var dataWeekly = parseRanking(rankingData);
        var dataAppr = parseRanking(rankingData);
        var dataApprWeekly = parseRanking(rankingData);

        function sortRankingGeneral() {
            data.sort(function(a, b) {
                var answerCountA = parseInt(a.answerscount, 10);
                var answerCountB = parseInt(b.answerscount, 10);

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
            dataWeekly.sort(function(a, b) {
                var answerCountA = parseInt(a.answerscountweekly, 10);
                var answerCountB = parseInt(b.answerscountweekly, 10);

                if (answerCountA > answerCountB) {
                    return -1;
                }
                if (answerCountA < answerCountB) {
                    return 1;
                }
                return 0;
            });
        }

        function sortRankingApprGeneral() {
            dataAppr.sort(function(a, b) {
                var answerCountA = parseInt(a.approvalscount, 10);
                var answerCountB = parseInt(b.approvalscount, 10);

                if (answerCountA > answerCountB) {
                    return -1;
                }
                if (answerCountA < answerCountB) {
                    return 1;
                }
                return 0;
            });
        }

        function sortRankingApprWeekly() {
            dataApprWeekly.sort(function(a, b) {
                var answerCountA = parseInt(a.approvalscountweekly, 10);
                var answerCountB = parseInt(b.approvalscountweekly, 10);

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
        sortRankingApprGeneral();
        sortRankingApprWeekly();

        var $fragment = $(document.createDocumentFragment());
        var $fragmentWeekly = $(document.createDocumentFragment());
        var $fragmentAppr = $(document.createDocumentFragment());
        var $fragmentApprWeekly = $(document.createDocumentFragment());

        data.forEach(function(item) {
          $fragment.append($templateRanking({
              user_name: item.timestamp,
              answers_count: item.answerscount,
              user_id: item.userid,
          }));
        });

        dataWeekly.forEach(function(item) {
          $fragmentWeekly.append($templateRanking({
              user_name: item.timestamp,
              answers_count: item.answerscountweekly,
              user_id: item.userid,
          }));
        });

        dataAppr.forEach(function(item) {
          $fragmentAppr.append($templateRanking({
              user_name: item.timestamp,
              answers_count: item.approvalscount,
              user_id: item.userid,
          }));
        });

        dataApprWeekly.forEach(function(item) {
          $fragmentApprWeekly.append($templateRanking({
              user_name: item.timestamp,
              answers_count: item.approvalscountweekly,
              user_id: item.userid,
          }));
        });


        function appendRankings() {
          var $rankingWrapper = $('.rankingList');

          if ($rankingWrapper !== null) {
            $rankingWrapper.each(function() {
              var $th = $(this);
              var category = $th.data('cat');
              var type = $th.data('type');
              var object = parseValid(category, type);

              $th.append(object);

              function parseValid(cat, type) {
                if (cat == 'answering' && type == 'general') {
                  return $fragment
                } else if (cat == 'answering' && type == 'weekly') {
                  return $fragmentWeekly
                } else if (cat == 'approval' && type == 'general') {
                  return $fragmentAppr
                } else if (cat == 'approval' && type == 'weekly') {
                  return $fragmentApprWeekly
                }
              }
            })
          } else {
            return
          }
        }
        appendRankings();

        function distanceTop() {
            var scrollTop = $(window).scrollTop(),
                $rankingOffset = $('#ranking').offset().top,
                $distanceRanking = $rankingOffset - 20;
            $ranking = ($distanceRanking - scrollTop);

            var $scrollRanking = $(window).scroll(function() {
                if ($scrollRanking.scrollTop() > $ranking) {
                    $('#ranking').css({
                        "position": "fixed"
                    });
                } else {
                    $('#ranking').css({
                        "position": "absolute"
                    });
                }
            });
        }

        distanceTop();
    }

		// SUBJECTS
    // ===================================================================::|>
		function renderSubjects(subjectsData) {
			var subjects = parseSubjects(subjectsData);
			var $fragment = $(document.createDocumentFragment());
			// console.log(subjectsData);

			subjects.forEach(function(item) {
					$fragment.append($templateSubjects({
							name: item.timestamp,
							id: item.subjectid
					}));
			});

			$subjectsList.append($fragment);
		}

    // PROFILE
    // ===================================================================::|>
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
                badge_16: profile.badge16,
                badge_17: profile.badge17,
                badge_18: profile.badge18,
            }));
        });
        $profileWrapper.append($profile);

				function appendBadges() {
		        $badgesGeneralWrapper = $('.badges-wrapper--general');
		        $badgesSpecialWrapper = $('.badges-wrapper--special');

		        if ($badgesGeneralWrapper.load()) {
		            $.when($.ajax(JSONBADGESGENERAL)).then(generalSuccess, fail);
		            $.when($.ajax(JSONBADGESSPECIAL)).then(specialSuccess, fail);
		        }
		    }

		    function specialSuccess(successSpecial) {
		        renderBadgesSpecial(successSpecial);
						dimBadges();
		    }


		    function generalSuccess(successGeneral) {
		        renderBadgesGeneral(successGeneral);
		        dimBadges();
						toggleBadges();
		        openProfile();
		    }

		    function fail(arg1, arg2) {
		        console.log('fail', arg1, arg2);
		    }

				function dimBadges() {
		        $badgesGeneralWrapper = $('.badges-wrapper--general');
		        $badges = $('.badge');

		        $badges.each(function() {

		            // console.log('this badge', this);

		            var badgesArr = $(this).closest('.badges').data('badgeid').split(',');
		            // console.log('this array', badgesArr);
		            if (badgesArr.indexOf($(this).data('id')) > -1) {} else {
		                $(this).addClass('badge-dim');
		            }
		        });
		    }

        appendBadges();
    }

    // BADGES GENERAL
    // ===================================================================::|>
    function renderBadgesGeneral(profileData) {
        var profileElements = parseProfile(profileData);
        var $badgesGeneral = $(document.createDocumentFragment());

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
        return $badgesGeneral
    }

    // BADGES SPECIAL
    // ===================================================================::|>
    function renderBadgesSpecial(profileData) {
        var profileElements = parseProfile(profileData);
        var $badgesSpecial = $(document.createDocumentFragment());

        profileElements.forEach(function(badges) {
            $badgesSpecial.append($templateBadgesSpecial({
                badge_id: badges.timestamp,
                badge_name: badges.profilebadgename,
                badge_description: badges.badgedescription,
                badge_metric: badges.badgereward,
                requirements: badges.requirements
            }));
        });
        $badgesSpecialWrapper.append($badgesSpecial);
        return $badgesSpecial
    }

		// OPERATIONAL
    // ===================================================================::|>
    function toggleTasks() {
      $questionListElements = $questionList.children('li');

      $questionListElements.on('click', function() {
  		    var $answer = $(this).find('.json-answer--wrapper');
  		    var $question = $(this);

  		    $questionListElements.find('.json-answer--wrapper').slideUp(700);
  		    $answer.slideDown(700);

  		    function toggleColor() {
  		        if ($("li").hasClass('js-li--blue')) {
  		            $('li').removeClass('js-li--blue');
  		        }
  		    }
  		    toggleColor();
  		    $question.toggleClass('js-li--blue');
  		});
    }

		function toggleSubjects() {
		    var $buttons = $(".mint-button-secondary");
		    var order = 0;
		    var chosenClass = "all-classes";
				$questions = $questionList.find(".json-question");
				$questionsArray = Array.prototype.slice.call($questions);

		    $('select').on('change', function() {
		        chosenClass = $(this).val();
		        console.log(chosenClass);
		    });

		    $buttons.on('click', function() {
		        displayQuestionFromSubject($(this).data('subject-id'), chosenClass);
		        hideApproved($questionList.children('li'));
		    });
		}

		function displayQuestionFromSubject(subject, level) {
		    console.log(subject, level);
		    $questions.hide();
		    $questionsArray.forEach(function(question) {
		        if ($(question).hasClass(subject) && $(question).hasClass(level)) {
		            $(question).show();
		        }
		    });
		}



		function openHelp() {
		    var $button = $('#help-button');
		    var $all = $('html');

		    $button.on('click', function() {
		        $('#blackout, #help').fadeIn(300);
		    });
		    $(document).click(function(event) {
		        if (!$(event.target).closest('#help, #help-button').length &&
		            !$(event.target).is('#help')) {
		            if ($('#help, #help-button').is(":visible")) {
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
		    $('#preloader').delay(500).fadeOut('slow', function() {
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
		    $('.mint-tabs').on('click', '.mint-tabs__tab', function() {
		        $(this).siblings('.mint-tabs__tab--active')
                   .removeClass('mint-tabs__tab--active').end()
                   .addClass('mint-tabs__tab--active');
		    });
		}

		function rankingTabsToggle() {
		    $rankingTab = $('.mint-tabs__tab');

		    $rankingTab.each(function() {

            // var activeCategory = checkCategory();
            // var activeType = checkType();

            function checkCategory() {
              var activeTab = $('.select-cat option').filter(':selected').text().toLowerCase();
              return activeTab;
            }

            function checkType() {
              var activeType = $('.mint-tabs__tab').not('.mint-tabs__tab--active').data('ranking');
              return activeType
            }

		        $(this).on('click', function() {
              var $th = $(this);
              activeCategory = checkCategory();
              activeType = checkType();

              if ($th.hasClass('mint-tabs__tab--active')) {
                return
              }

              $rankingList.fadeOut(300);

              $rankingList.each(function(e) {
                var $th = $(this);
                var $thCat = $th.data('cat');
                var $thType = $th.data('type');

                // console.log($thCat + " " + $thType);



                if ($thCat == activeCategory && $thType == activeType) {
                  $th.fadeIn(300);
                  // console.log($th);
                  // console.log($thCat + " " + $thType);
                } else {
                  return
                }
              })
		        })
		    });

		}
		function openProfile() {
		    var $rankingUser = $('.ranking-user');
		    var $profile = $('#profile');
		    var $profileUser = $('.profile-wrapper--hole');
		    var $profileButton = $('#profile-btn');

		    $rankingUser.on('click', function() {
		        console.log($profileUser.filter('.' + userId));
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
		    var $buttons = $('.subjects-menu').find('button');
		    var $options = $('.sg-select__element').find('option');

		    // count amount of questions from each subject
		    // and add it as data to every button
		    $.each($buttons, function(key, button) {
		        var subjectId = $(button).data('subject-id');
		        var amount = $('.' + subjectId).not('.aged').length;
		        $(button).data('amount', amount);
		    });

		    $buttons.on('mouseenter', showAmount);
		    $buttons.on('mouseleave', showSubjectName);

		    $.each($options, function(option) {
		        $(option).append($(this).not('.aged').length);
		    })
		}

		function showAmount(event) {
		    var $button = $(event.currentTarget);
		    var number = $button.data('amount');

		    $button.find('.mint-button-secondary__hole').text(number);
		}

		function showSubjectName(event) {
		    var $button = $(event.currentTarget);
		    var subjectName = $button.data('subject-name');

		    $button.find('.mint-button-secondary__hole').text(subjectName);
		}

		function randomizeQuestions() {
		    $('#questionList').randomize('li');
        hideApproved($questionList.children('li'));
		    console.log('Randomize!');
		}

		function toggleBadges() {
			var $button = $('.sg-button-secondary');
			var $generalBadges = $('.general');
			var $specialBadges = $('.special');

			$button.on('click', function() {
				if ($(this).data('type') == "general") {
					$specialBadges.fadeOut("slow");
					$generalBadges.fadeIn("slow");
				} else {
					$generalBadges.fadeOut("slow");
					$specialBadges.fadeIn("slow");
				}
				$button.removeClass('sg-button-secondary-active');
				console.log('clicked!');
			})
		}

		// AJAX
		// ===================================================================::|>
    $.ajax({
        url: JSONURLRANKING,
        success: renderRanking,
    });
    $.ajax({
        url: JSONURL,
        success: renderQuestions
    });
    $.ajax({
        url: JSONUSER,
        success: renderProfile
    });

    openHelp();
    openMenu();
    openRankingMobile();
    rankingTabs();
    rankingTabsToggle();

})(window.$, window._);
