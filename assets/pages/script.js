var mainEl = document.querySelector("main");
var listScores = document.createElement("ol");
listScores.className = "ol-scores";
var h3Result = document.createElement("h3");
var pResult = document.createElement("p");

function displayScores(){
    // for loop to diplay list of scores and initials
    h3Result.textContent = "Here is your score(s):";
    mainEl.append(h3Result);

    var scores = JSON.parse(localStorage.getItem('studentGrades'));
    console.log(scores);
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
displayScores();

