let Quiz = (function(){
   
   'use strict';

   let questions = [
           					  {question: "Which logo on a flag identifies a ship's crew as pirates?", 
           						choices: ["Bull", "Lion", "Skull & Crossbones", "Hammer & Sickle"], 
           						correctAnswer:2},
           						{question: "Which American state is nearest to the former Soviet Union?", 
           						choices: ["New York", "Alaska", "California"], 
           						correctAnswer:1},
           						{question: "What colour is a NYC taxi?", 
           						choices: ["Blue", "Green", "Yellow"], 
           						correctAnswer:2},
           						{question: "The equator passes through which of the following continents ?", 
           						choices: ["Africa", "Australia", "Europe", "North America"], 
           						correctAnswer:0}
   				         ];
   
   let currentQuestion = 0, score = 0, isSelected = false, correctSelected = 0, answerObj = {}, endScreen;
    
   let updateScoreObject = function(key, val, action) {
       if(action){
           answerObj[key] = Number(val);
       }else{
           delete answerObj[key];
       }
   };
   
   let getSelection = function() {
       var option = document.querySelector('input[type="radio"]:checked').id;
       return option;
   };

   let setCurrentQuestion = function(className) {
   		if(className.indexOf('but--next') > -1){
            updateScoreObject(currentQuestion, checkCorrect(getSelection()), 'add');
   			if(currentQuestion < questions.length) currentQuestion++;
   	   	}else{
            updateScoreObject(currentQuestion, checkCorrect(getSelection()));
   	   		if(currentQuestion > 0) currentQuestion--;
   	   	}

   	   	return currentQuestion;
   };

   let navigationHandler = function(e) {
   	   let whichBut;
       
       if(e.target.nodeName === 'BUTTON') {
           whichBut = setCurrentQuestion(e.target.className);
   	   }else if(e.target.nodeName == 'I') {
   	   	   whichBut = setCurrentQuestion(e.target.parentNode.className); 
   	   }else{
   	   		return;
   	   }

       if(whichBut === questions.length) {
           showScoreScreen();
       } else {
           createAndAppendDOMElements(whichBut);
   	       updateInput(whichBut+1);
       }
       
   };

   let checkCorrect = function(inputID) {
   	   return parseInt(inputID) === questions[currentQuestion].correctAnswer;
   };

   let setupListeners = function(el, fn) {
   	  let div = document.querySelector(el);
   	  div.addEventListener('click', fn);
   };

   let updateInput = function(current) {
   		let input = document.getElementById('progress');
   		input.value = current + '/' + questions.length;
   };

   let append = function(divToAppendTo, divToAppend) {
   		divToAppendTo.appendChild(divToAppend);
   }

   let createDOMEl = function(elToCreate) {
   		let el = document.createElement(elToCreate);
   		return el;
   };

   let calculateScore = function() {
      let total = 0;
      let arr = Object.keys(answerObj);
      let message = '';
      for(let z = 0; z<arr.length; z++) {
         total += answerObj[parseInt(arr[z])];
      }
      console.log(total);
      if(total === 0 || total === 1) {
        message = 'Sorry, better luck next time!\nYou scored ';
      }else if(total === questions.length){
        message = 'Amazing!\nYou scored ';
      }else{
        message = 'Nicely done!\nYou scored ';
      }
      return {
        total: total,
        mess: message
      };
   };
    
   let showScoreScreen = function() {
     let quizContainer = document.querySelector('.quiz-container');
   	 if(quizContainer.childNodes) quizContainer.removeChild(quizContainer.firstChild);

     let quizNav = document.querySelector('.quiz-navigation');
     quizNav.style.display = 'none';

     let quizReview = createDOMEl('div');
     quizReview.classList.add('quiz-review');
     
     let endScreenHeading = createDOMEl('h3');
     endScreenHeading.classList.add('quiz-total-heading');

     append(quizReview, endScreenHeading);
     append(quizContainer, quizReview);

     let total = calculateScore().total;
     let message = calculateScore().mess;
     console.log(total);
     endScreenHeading.textContent = message + total + '/' + questions.length;
     
   };

   let createAndAppendDOMElements = function (num) {
   	 let quizContainer = document.querySelector('.quiz-container');
   	 if(quizContainer.childNodes) quizContainer.removeChild(quizContainer.firstChild);
   	 
   	 let quizItem = createDOMEl('div');
   	 quizItem.classList.add('quiz-question');

   	 let quizQuestion = createDOMEl('legend');
   	 append(quizContainer, quizItem);
   	 append(quizItem, quizQuestion);
   	 quizQuestion.textContent = questions[num].question;

   	 for(let i = 0; i<questions[num].choices.length; i++){
   	 	let quizInput = createDOMEl('input');
   	 	let quizInputLabel = createDOMEl('label');
   	 	quizInput.id = i;
   	 	quizInput.setAttribute('type', 'radio');
   	 	quizInput.setAttribute('name', 'names');
        if(i === 0) quizInput.setAttribute('checked', 'checked');
   	 	quizInputLabel.setAttribute('for', i);
   	 	quizInputLabel.innerHTML = questions[num].choices[i];
   	 	append(quizItem, quizInput);
   	 	append(quizItem, quizInputLabel);
   	 }
   };

   let quiz = function(){
   		createAndAppendDOMElements(currentQuestion);
   		updateInput(currentQuestion+1);
   };

   let init = function(){
 		quiz();
 		setupListeners('.quiz-navigation', navigationHandler);
   };	

   return {
   		init: init
   };

})();

window.addEventListener('DOMContentLoaded', function(){
	Quiz.init();
});