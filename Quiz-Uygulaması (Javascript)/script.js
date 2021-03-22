function Question(text,choices,answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

// Question prototype
Question.prototype.checkAnswer = function(answer){
    return this.answer === answer;
}

// Quiz Constructor
function Quiz(questions)
{
    this.questions = questions ;
    this.score = 0;
    this.questionsIndex = 0;
}

// Quiz Prototype
Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionsIndex];
}

// Quiz isFinish 
Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionsIndex;
}

// Quiz guess

Quiz.prototype.guess = function(answer){
    var question = this.getQuestion();
    
    if(question.checkAnswer(answer))
    {
        this.score++;
    }
    this.questionsIndex++;
}
var q1 = new Question("What's the best programming language ?",
["C#","Javascript","Phyton","Asp.net"],"Javascript");

var q2 = new Question("What's the most popular language ?",
["C#","Javascript","Phyton","Asp.net"],"Javascript");

var q3 = new Question("What's the best modern programming language ?",
["C#","Javascript","Phyton","Asp.net"],"Javascript");

var questions = [q1,q2,q3];

// Start Quiz

var quiz = new Quiz(questions);

loadQuestion();
function loadQuestion(){
    if(quiz.isFinish()){
       showScore();
       document.querySelector('#progress').innerHTML
    = 'Question is ended ! ';
    }else{
        var question = quiz.getQuestion();
        var choices = question.choices; 
        document.querySelector('#question').textContent = question.text;
        for(var i=0;i<choices.length;i++)
        {
            var element = document.querySelector('#choice'+i);
            element.innerHTML = choices[i];
            guess('btn'+i,choices[i]);
        }
        showProgress();
    }
}


function guess(id,guess){

    var btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion();
    }

}


function showScore(){
    var html = `<h2>Score</h2><hr><h4>${quiz.score}</h4>`;
    document.querySelector('.card-body').innerHTML = html;
}

var sayac=0;

function showProgress(){
    sayac++;
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionsIndex+1;
    document.querySelector('#progress').innerHTML
    = 'Question '+questionNumber+' of '+totalQuestion;
}
