const correctAnswerIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG7HVtoF91KK85ZKPlBL0wzdW8URDpziD2PRsFZm4awGyD2BS-";
const wrongAnswerIcon= "http://ppcplans.com/wp-content/uploads/2011/09/negative_keywords-man.jpg";
const warningIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa7WP9E3LDA10kP2Rk2enw-_kjI-iJd4kny8yH2kTrPR8hgrwtBg";

let questionCounter1 = 0;
let score1 = 0;
let questionsCount1;

let questionCounter2 = 0;
let score2 = 0;
let questionsCount2;

let ans1;
let userOpr1;
let userRange1;

let ans2;
let userOpr2;
let userRange2;

let operator = {
    0 : "+",
    1 : "-",
    2 : "*",
    3 : "/" 
 };

function handleStartClick(){
	$('.js-start-button1').on('click',function(event){
        console.log("handleStartClick() ran");
        if($('#numOfQues1').val()<3 || $('#numOfQues1').val()>30 ){
            $('#errorMsg').text('Please Enter Question beteeen 3 and 30').show();
        }
        else if($('#range1').val()<=0 || $('#numOfQues1').val()==''){
            $('#errorMsg').text('Please Enter range greater than 0').show();
        }
        else{
            questionsCount1 = $('#numOfQues1').val();
            userRange1 = $('#range1').val();
            userOpr1 = $('#opr1').val();
            $('#errorMsg').hide();
            $('.progress-section1').show();
            $('.start-section1').hide();
            $('.end-section1').hide();
            $('.quiz-box1').fadeIn("slow");
            renderQuizBox(0);
        }
		 

    });
    
    $('.js-start-button2').on('click',function(event){
        console.log("handleStartClick() ran");
        if($('#numOfQues2').val()<3 || $('#numOfQues2').val()>20 ){
            $('#errorMsg').show();
        }
        else{
            questionsCount2 = $('#numOfQues2').val();
            userRange2 = $('#range2').val();
            userOpr2 = $('#opr2').val();
            $('#errorMsg').hide();
            $('.progress-section2').show();
            $('.start-section2').hide();
            $('.end-section2').hide();
            $('.quiz-box2').fadeIn("slow");
            renderQuizBox(1);
        }
		 

	});
}

// This function displays the quizz box with the question, options, 
// score and question count
function renderQuizBox(type){
  renderQuestionCount(type);
  renderQuestion(type);
  renderScore(type);
}
function renderScore(type){
    if (type == 0){
        $(".progress-section1 .score-card1").text(`${score1}/${questionsCount1}`);
    }
    else{
        $(".progress-section2 .score-card2").text(`${score2}/${questionsCount2}`);
    }
}
function renderQuestionCount(type){
    if (type == 0){
        $(".progress-section1 .question-count1").text(`Question ${questionCounter1+1} of ${questionsCount1}`);
    }
    else{
        $(".progress-section2 .question-count2").text(`Question ${questionCounter2+1} of ${questionsCount2}`);
    }

}

// This function renders a new question
function renderQuestion(type){
    if(type == 0){
        let opr;
        if(userOpr1 == -1){
            opr = Math.floor(Math.random() * 4);
        }
        else{
            opr = userOpr1;
        }
        let c = parseInt(userRange1);
        let a = Math.floor(Math.random() * c)+1;
        let b = Math.floor(Math.random() * c)+1;
        ans1 = doOperation(a,b,opr);
        //console.log(userRange);
        $("#ques1").text(`${questionCounter1+1}. Solve ${a} ${operator[opr]} ${b}`);
    }
    else{
        let opr;
        if(userOpr2 == -1){
            opr = Math.floor(Math.random() * 4);
        }
        else{
            opr = userOpr2;
        }
        let c = parseInt(userRange2);
        let a = Math.floor(Math.random() * c)+1;
        let b = Math.floor(Math.random() * c)+1;
        ans2 = doOperation(a,b,opr);
        //console.log(userRange);
        $("#ques2").text(`${questionCounter2+1}. Solve ${a} ${operator[opr]} ${b}`);
    }
  
}

function doOperation(first,second,opr){
    if(opr == 0)
        return first+second;
    else if(opr == 1)
        return first-second;
    else if(opr == 2)
        return first*second;
    else if(opr == 3)
        return first/second;
    
}

function handleSubmitAnswer(){
  $('.js-submit-button1').on('click',function(event){
    console.log("handleSubmitAnswer() ran");
    let selectedOption = $('#answer1').val();
    if(selectedOption === undefined) {
       displayPopup(false, selectedOption);
    }
    else{
     //reset radio button
     $('#answer1').val('');
     checkAnswer(0,selectedOption);
    }
 });

 $('.js-submit-button2').on('click',function(event){
    console.log("handleSubmitAnswer() ran");
    let selectedOption = $('#answer2').val();
    if(selectedOption === undefined) {
       displayPopup(false, selectedOption);
    }
    else{
     //reset radio button
     $('#answer2').val('');
     checkAnswer(1, selectedOption);
    }
 });
}


// This function checks whether the answer selected by the
// user is correct or not
function checkAnswer(type, selected){
    if (type == 0){
        if(Math.round(selected * 100) === Math.round(ans1 * 100)){
            score1++;
            displayPopup(0,true, ans1);
          } 
          else{
           displayPopup(0,false, ans1);
          }
    }
    else{
        if(Math.round(selected * 100) === Math.round(ans2 * 100)){
            score2++;
            displayPopup(1,true, ans2);
          } 
          else{
           displayPopup(1,false, ans2);
          }
    }
}

//This function gives feedback to the user whether 
//the option selected in correct or wrong. 
//It also alerts the user if no option is selected
function displayPopup(type,statusFlag, answer){
    if(type == 0){
        $('.feedback-section1').show();
        if(statusFlag){
            $(".popup-box1 img").attr("src",correctAnswerIcon);
            $(".popup-box1 #popup-text").text("You are right!");
            $(".popup-box1").show();
        }
        else{
            if(answer === undefined) {
                questionCounter--;
                $(".popup-box1 img").attr("src",warningIcon);
                $(".popup-box1 #popup-text").text('Please select an option');
            }
            else{
                $(".popup-box1 img").attr("src",wrongAnswerIcon);
                $(".popup-box1 #popup-text").text(`Sorry, the correct answer was: ${answer}`);
            }
        }
        $(".popup-box1").show();
    }
    else{
        $('.feedback-section2').show();
        if(statusFlag){
            $(".popup-box2 img").attr("src",correctAnswerIcon);
            $(".popup-box2 #popup-text").text("You are right!");
            $(".popup-box2").show();
        }
        else{
            if(answer === undefined) {
                questionCounter--;
                $(".popup-box2 img").attr("src",warningIcon);
                $(".popup-box2 #popup-text").text('Please select an option');
            }
            else{
                $(".popup-box2 img").attr("src",wrongAnswerIcon);
                $(".popup-box2 #popup-text").text(`Sorry, the correct answer was: ${answer}`);
            }
        }
        $(".popup-box2").show();
    }
}

//This function will proceed to the next question or display the final score
//based on the question count.
function handlePopupClose(){
  $('.js-close-button1').on('click', function(event){
    console.log("handlePopupClose() ran");
    $('.popup-box1').hide();
    $('.feedback-section1').hide();
    $('.quiz-box1').hide().fadeIn();
    questionCounter1++;
    if(questionCounter1 < questionsCount1) {
       $('.quiz-box1').fadeIn();
       renderQuizBox(0);
    }
    else{
      $('.quiz-box1').hide();
      displayFinalScore(0);
    }
  });

  $('.js-close-button2').on('click', function(event){
    console.log("handlePopupClose() ran");
    $('.popup-box2').hide();
    $('.feedback-section2').hide();
    $('.quiz-box2').hide().fadeIn();
    questionCounter2++;
    if(questionCounter2 < questionsCount2) {
       $('.quiz-box2').fadeIn();
       renderQuizBox(1);
    }
    else{
      $('.quiz-box2').hide();
      displayFinalScore(1);
    }
  });
}

//This function displays the final score once the quiz is completed
function displayFinalScore(type){
    if(type == 0){
        $('.end-section1').fadeIn(1000);
        $('.end-section1 h4').text(`Your Score is: ${score1}/${questionsCount1}`);
        $('.correct .count' ).text(score1);
        $('.wrong .count').text(questionsCount1 - score1);
        resetQuiz(0);
    }
    else{
        $('.end-section2').fadeIn(1000);
        $('.end-section2 h4').text(`Your Score is: ${score2}/${questionsCount2}`);
        $('.correct .count' ).text(score2);
        $('.wrong .count').text(questionsCount2 - score2);
        resetQuiz(1);
    }
}

//This function resets the questions and score
function resetQuiz(type){
    if(type == 0){
        questionCounter1 = 0;
        score1 = 0;
    }
    else{
        questionCounter2 = 0;
        score2 = 0;
    }
}

//This function will start over the quiz
function handleStartOver(){
  $('.js-startover-button1').on('click',function(event){
    console.log("handleStartOver() ran");
    $('.end-section1').hide();
    $('.quiz-box1').fadeIn();
    renderQuizBox(0);
  });
  $('.js-startover-button2').on('click',function(event){
    console.log("handleStartOver() ran");
    $('.end-section2').hide();
    $('.quiz-box2').fadeIn();
    renderQuizBox(1);
  });
}

function init(){
  $('.end-section1').hide();
  $('.progress-section1').hide();
  $('.quiz-box1').hide();
  $('.feedback-section1').hide();
  $('.end-section2').hide();
  $('.progress-section2').hide();
  $('.quiz-box2').hide();
  $('.feedback-section2').hide();
  handleStartClick();
  handleSubmitAnswer();
  handlePopupClose();
  handleStartOver()
}
$(init());
