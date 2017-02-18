var reviewedQuestions = [];

  function postToGoogle(a, b) {

    blockspring.runParsed("append-to-google-spreadsheet", {
      "file_id": "18u36ddchqJtV5FQuI55KUQfcVq1qCq5P6Obdb43tXx8",
      "worksheet_id": 1621441572,
      "values": JSON.parse("[[\"" + a + "\",\"" + b + "\"]]")
    },
    {
      "api_key": "br_43826_885f90cfe5b4b161e62bde45f5513223dba12434"
    },
    function(res){
      // console.log(res.params);
    })
  }

  function validateQuestion() {
    var $question = $('.json-question');
    // var $btn = $('.validation-btn--hole');

    $question.each(function() {
      var $th = $(this);
      var $btnVal = $th.find('.validation-btn');
      var $btnDel = $th.find('.deletion-btn');
      var thisId = $th.data('id');

      $btnVal.one('click', function() {
        postToGoogle(thisId, 'approved');
        console.log('posted reviewed question ID');
      })
      $btnDel.one('click', function() {
        postToGoogle(thisId, 'removed');
        console.log('posted deleted question ID');
      })

    })
  }

  function parseValidation(data) {
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
          console.log('Whoooooops!');
      }
      return rows;
  }

  // AJAX deprecated call
  // ==========================================================::||:>
  $.when($.ajax(JSONVALIDATION)).then(success, failure);

  // Callback function called when objects are successfully loaded
  // ==========================================================::||:>
  function success(success) {
    returnValidatedQuestions(success);
  }

  // Callback function called when objects fail to be loaded
  // ==========================================================::||:>
  function failure() {
    console.log('Validation fuckup');
  }

  function returnValidatedQuestions(data) {
    var questions = parseValidation(data);
    var question;

    questions.forEach(function(question) {
      reviewedQuestions.push(question.unique);
    });

    // console.log(questionArray);
  }

  function markReviewed() {
    var $btnVal = $('.validation-btn');
    var $btnDel = $('.deletion-btn');

    reviewedQuestions.forEach(function(int) {
      var reviewed = $('.' + int)

      reviewed.addClass('reviewed-el')
              .data('reviewed', 'true');
    })

    $btnVal.on('click', function() {
      $th = $(this);
      $parentQuestion = $th.parent('.json-question');

      console.log($parentQuestion);
      $parentQuestion.addClass('reviewed-el');
      $th.addClass('approved')
          .html('Answer(s) approved');
    })

    $btnDel.on('click', function() {
      $th = $(this);
      $parentQuestion = $th.parent('.json-question');

      console.log($parentQuestion);
      $parentQuestion.addClass('reviewed-el');
      $th.addClass('deleted')
          .html('Answer(s) deleted');
    })

    $btns.each(function(event) {
      $th = $(this);
      $parentQuestion = $th.parent('.json-question');

      if ($parentQuestion.data('reviewed') == 'true') {
        $th.addClass('reviewed')
            .html('Reviewed');
      }
    })
  }
