function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.choice = function(selectedAns) {
    if(this.questions[this.questionIndex].answer == selectedAns){
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.getAnswers =  function(value){
    var position =  this.questions[value].answer;
    return this.questions[value].options[position];
}

Quiz.prototype.isOver = function() {
    return this.questionIndex === this.questions.length;
}

