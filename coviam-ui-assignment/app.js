(function () {
    
    const url = 'https://cdn.rawgit.com/santosh-suresh/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json';

    //defining global variables
    var questionSet = {};
    var quiz;
    var selectedAns;
    var lastId = undefined;
    var error = undefined;
    var answers = [];
    var td = [];

    getData();    // get the data from api and store it in questionset var which is inturn sent to Quiz constructor

    //takes the data and displays it on screen using question index
    function displayQuestions(){
        var container = document.getElementById("container");
        var question = container.getElementsByClassName("question")[0];
        var options = container.getElementsByClassName("options")[0];
        var heading = document.getElementById("container-heading");
        //show questions
        heading.innerHTML = "Question "+(quiz.questionIndex +1)+" of 8";
        question.innerHTML = quiz.getQuestionIndex().text;
        //show options
        var options = quiz.getQuestionIndex().options;
        for(var i = 0 ; i< options.length ; i++){
            var option = document.getElementById("opt" +i);
            option.innerHTML = options[i];
        }
    }

    function getData(){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                questionSet = JSON.parse(xmlHttp.responseText);
                quiz = new Quiz(questionSet);
                displayQuestions();
            }
        }
        xmlHttp.open("GET", url, true); // true for asynchronous 
        xmlHttp.send();
    }

    //for showing the score on last page
    function showScore(){
        var lastPage = document.getElementById("lastPage");
        lastPage.classList.remove('hide');
        var element = document.getElementById("score");
        element.innerHTML ="You have given "+quiz.score + " correct answers";
        for (var i=0 ; i <questionSet.length ; i++){
            answers[i]= quiz.getAnswers(i);
            td[i+i+1] = document.getElementsByTagName("td")[i+i+1];
            td[i+i+1].innerHTML = answers[i];
        }  
    }

    //selected options and for focusing on current answer 
    function selectOption(id, optionValue){
        selectedAns = optionValue;
        document.getElementById("error").innerHTML =  "";
        var element = document.getElementById(id);
        if(element.style.backgroundColor != "#5cb85c"){
            element.style.backgroundColor = "#5cb85c";
            if(lastId){
                if(lastId != id){   
                var lastElement = document.getElementById(lastId);
                lastElement.style.backgroundColor = "#337ab7";
                }
            }
        }
        storeLastId(id); //for storing the last id , that is used to restore back to its default state
    }

    function storeLastId(id){
        lastId = id
    }


    function newQuestion(param){
        error = document.getElementById("error");
        if(param == "next" && selectedAns != null){
            error.innerHTML =  "";
            quiz.choice(selectedAns);
            checkAndDisplayData(); // for checking if the the quiz is over if not display data
        }
        else{
            error.innerHTML = "Please select an option";
        }
    }

    function checkAndDisplayData(){
        selectedAns = undefined;
        var lastElement = document.getElementById(lastId);
        lastElement.style.backgroundColor = "#337ab7";
        if(quiz.isOver()){
        document.getElementById("container-heading").innerHTML = "";
        document.getElementById("question-set").innerHTML = "";
        document.getElementById("options").innerHTML = "";
        document.getElementById("footer").classList.add('hide')
        showScore();
        }else{
            displayQuestions();
            lastId = undefined;
        }
    }
})();