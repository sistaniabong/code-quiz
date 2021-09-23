var mainEl = document.querySelector("main");
var listScores = document.createElement("ol");
listScores.className = "ol-scores";
var h3Result = document.createElement("h3");
var pResult = document.createElement("p");


// fucntion to display scores when the user is redirected to View Highscores
function displayScores(){
    
    h3Result.textContent = "Here is your score(s):";
    mainEl.append(h3Result);
    // for loop to diplay list of scores and initials
    var scores = JSON.parse(localStorage.getItem('studentGrades'));
    if (scores !== null){
        for (var i=0; i<scores.length;i++){
            var score = document.createElement("li");
            score.className = "list-scores";
            score.textContent = scores[i].initials + ' - ' + scores[i].score;
            listScores.append(score);
    }
        mainEl.append(listScores);
    }else{
        pResult.textContent = "No scores available";
        mainEl.append(pResult);
    }


}
// call displayScores to render scores
displayScores();

