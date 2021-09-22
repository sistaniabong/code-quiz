var main = document.querySelector("main");
var startButton = document.querySelector(".start-button");
var timerDisplay = document.querySelector(".timer-display");
var headerIntro = document.querySelector("header");



var questionEl = document.createElement("div"); // creat div element for the question and choices
questionEl.className = "choices-btn-group"; // add class to the div element

var h2QuestEl = document.createElement("h2"); // create h1 element for the question

// create div element for the status of each answer
var resultFooter = document.createElement("div");
resultFooter.className = "result-footer"; 


// create elements for the result page 
var resultEl = document.createElement("div");
resultEl.className = "result";
var h3Result = document.createElement("h3");
var pResult = document.createElement("p");
var iniButt = document.createElement("button");

// ul for scores
var listScores = document.createElement("ol");
listScores.className = "ol-scores";

// set up vars
var isFinished = false;
var chosenQuestion;
var options = {};


// set up some questions array that consists of question objects
var questions = [
    {
        question : "Inside which HTML element do we put the JavaScript?",
        choices : {
            0 : "<scripting>",
            1 : "<javascript>",
            2 : "<script>",
            3 : "<js>"
        },
        correctAns : 2
    },
    {
        question : "How do you write 'Hello World' in an alert box?",
        choices : {
            0 : "msg('Hello World')",
            1 : "alertBox('Hello World')",
            2 : "msgBox('Hello World')",
            3 : "alert('Hello World')"
        },
        correctAns : 3
    },
    {
        question : "How do you create a function in JavaScript?",
        choices : {
            0 : "function:myFunction()",
            1 : "function myFunction()",
            2 : "function = myFunction()"
        },
        correctAns : 1
    },
    {
        question : "How do you call a function named 'myFunction'?",
        choices : {
            0 : "call function myFunction()",
            1 : "myFunction()",
            2 : "call myFunction()"
        },
        correctAns : 1
    },
    {
        question : "How to write an IF statement in JavaScript?",
        choices : {
            0 : "if i= 5 then",
            1 : "if i==5 then",
            2 : "if (i==5)",
            3 : "if i=5"
        },
        correctAns : 2
    }
];



// function to render the questions
var questionCount = 0;
function renderQuestion(){

    // checking if there's any question left
    if (questions[questionCount] === undefined){
        // if all questions have been answered, set the isFinished stasus to true
        isFinished = true;
        return;
    }else{
        // go to the next question
        chosenQuestion = questions[questionCount];
    }

    // persist the result footer for 500ms on the next question page
    if (document.getElementsByClassName("result-footer")[0] !== undefined){
        setTimeout(function(){ 
            document.getElementsByClassName("result-footer")[0].style.display="none";
        }, 500);
    }
    main.appendChild(questionEl); // appending the question element inside main
    h2QuestEl.textContent = chosenQuestion.question; //appending the question to the h2

    questionEl.appendChild(h2QuestEl); //appending h2 element inside div element

    console.log('Question chosen: ' + chosenQuestion.question);
    options = chosenQuestion.choices //getting the multiplechoices for the question
    // loop through the choices and create a button for each choice and append them to div element, questionEl
    for (i=0; i<Object.keys(options).length;i++){
        // var li = document.createElement("li");
        var butt = document.createElement("button");
        butt.setAttribute("data-index", i);
        butt.className = "choice-button";
        butt.textContent = options[i];
        // butt.addEventListener("click",checkAnswers);
        questionEl.append(butt);
    }
    questionCount++;
}


// function to render the score
function renderScore(){
    // resetting the page
    main.innerHTML = "";

    // adding content to the score page
    h3Result.textContent = "You have completed the quiz!";
    pResult.textContent = "Your score is " + timeLeft;

    var initialInput = document.createElement("input");
    initialInput.setAttribute("id","myInitial")
    initialInput.setAttribute("value", "Enter your initial here...")
    

    iniButt.className = "initials-button";
    iniButt.textContent = "Submit";

    resultEl.append(h3Result);
    resultEl.append(pResult);
    resultEl.append(initialInput);
    resultEl.append(iniButt);
    main.appendChild(resultEl); 
}




// Function startGame() to start the timer and call the function that render the question
var timeLeft = 60;

function startGame(){
    // disable the start button when the timer is still going
    isFinished = false
    headerIntro.style.display = "none";

    renderQuestion();

    var timeInterval = setInterval(function(){
        timeLeft--;

        timerDisplay.textContent = timeLeft;

        // Check is the time has run out or if all the questions have been answered
        if (isFinished || timeLeft === 0){
            clearInterval(timeInterval);
            renderScore(); // call renderScore() to display the score and submit initials

        }
    }, 1000);
    
}


function checkAnswers(answer){
    console.log('correct answer: ' + chosenQuestion.correctAns);

    if (answer !== null){
        if (chosenQuestion.correctAns == answer){
            console.log('You are CORRECT!');
            resultFooter.textContent = 'You are CORRECT!';
            main.appendChild(resultFooter);
        }else {
            //if not correct substract 15sec from timeLeft and assign timeLeft 
            timeLeft -= 15;
            resultFooter.textContent = 'You are WRONG!';
            main.appendChild(resultFooter);
        };
        questionEl.innerHTML = "";
    };
};

// function to set score in localStorage 
// QUESTION: do we need to store and display more than one scores?
function setScores (initials){
    resultEl.innerHTML = "";
    

    const scores = (() => {
        const studentGrades = localStorage.getItem('studentGrades');
        return studentGrades === null ? []: JSON.parse(studentGrades);
      })();

    scores.push({"initials":initials,"score":timeLeft})
    
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("studentGrades", JSON.stringify(scores));

    // call a function that displays score
    displayScores();

}

function displayScores(){
    h3Result.textContent = "Here is your score(s):";
    resultEl.append(h3Result);

    var scores = JSON.parse(localStorage.getItem('studentGrades'));
    console.log(scores);
    if (scores !== null){
    for (var i=0; i<scores.length;i++){
        var score = document.createElement("li");
        score.className = "list-scores";
        score.textContent = scores[i].initials + ' - ' + scores[i].score;
        listScores.append(score);
    }
    resultEl.append(listScores);
    }else{
        pResult.textContent = "No scores available";
        resultEl.append(pResult);
    }


    var backButt = document.createElement("button");
    backButt.textContent = "Restart";
    backButt.className = "buttons-display-scores";
    backButt.addEventListener("click", function(){
        location.reload();
    })

    var clearButt = document.createElement("button");
    clearButt.textContent = "Clear Scores";
    clearButt.className = "buttons-display-scores";
    clearButt.addEventListener("click", function(){
        localStorage.clear();
        listScores.textContent = "";
    })
    resultEl.append(backButt, clearButt);
}






// add event listener that listen for which choice the user chooses
document.addEventListener("click",function(event){
    if(event.target && event.target.className== 'choice-button'){
        var chosenAns = event.target.getAttribute("data-index");
        console.log('chosen_answer:' + chosenAns);
        checkAnswers(chosenAns);
        renderQuestion();
    }   
});


// add event listener that listen for the user to submit the initial
document.addEventListener("click",function(event){
    if(event.target && event.target.className== 'initials-button'){
        var initials = document.getElementById("myInitial").value;
        console.log('myInitials: ' + initials);
        setScores(initials);
    }   
});


// add event listener that kicks off the quiz when a click occurs in the start button
startButton.addEventListener("click",startGame);


