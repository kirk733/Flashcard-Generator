// Variable declaration
var BasicCard = require('./BasicCard');
var ClozeCard = require('./ClozeCard');
var inquirer = require('inquirer');
var fs = require('fs');

// Ask user what they would like to do
inquirer.prompt([
		    {
				type: "list",
				message: "Please pick your option?",
				choices: ["Create Basic Card", "Create Cloze Card", "Basic Card Quiz", "Cloze Card Quiz"],
				name: "userChoice"
		    },
		]).then(function(userChoice) {
        if (inquirerResponse. === "Create Basic Card"){
          createBasicCard();
        } 
        else if(inquirerResponse.userChoice === "Create Cloze Card"){
          createClozeCard();
        } 
        else if(inquirerResponse.userChoice === "Take Basic Card Quiz"){
          basicQuiz();
        } 
        else if(inquirerResponse.userChoice === "Take Cloze Card Quiz"){
          clozeQuiz();
        }
    })