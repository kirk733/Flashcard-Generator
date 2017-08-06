// Variable declaration
var BasicCard = require('./BasicCard');
var ClozeCard = require('./ClozeCard');
var inquirer = require('inquirer');
var fs = require('fs');

// Ask user what they would like to do /////////////////////////////////////////////
inquirer.prompt([
		    {
				type: "list",
				message: "Please pick your option?",
				choices: ["Create Basic Card", "Create Cloze Card", "Basic Card Quiz", "Cloze Card Quiz"],
				name: "userChoice"
		    },
		]).then(function(inquirerResponse) {
        if (inquirerResponse.userChoice === "Create Basic Card"){
          console.log("Let's make a Basic Card")
          createBasicCard();
        }
        else if(inquirerResponse.userChoice === "Create Cloze Card"){
          console.log("Let's make a Cloze Card")
					createClozeCard();
        }
        else if(inquirerResponse.userChoice === "Basic Card Quiz"){
         console.log("Let's take the Basic Card Quiz")
				 basicQuiz();
        }
        else if(inquirerResponse.userChoice === "Cloze Card Quiz"){
          console.log("Let's take a Cloze Card Quiz")

        }
    })

// Function to create basic cards /////////////////////////////////////////////////////
var createBasicCard = function () {
    inquirer.prompt([
      {
        name: "front",
        message: "What do you want to display on the front of the card?"
      },
      {
        name: "back",
        message: "What do you want to display on the back of the card?"
      }
    ]).then(function(inquirerResponse){
        var basicCard = new BasicCard(inquirerResponse.front, inquirerResponse.back);

        fs.appendFile("basicCardlog.txt", "" + JSON.stringify(basicCard) + ",", function(error) {
          if (error){
          return console.log(error);
          }
        })
        console.log(basicCard.front);
        console.log(basicCard.back);

				inquirer.prompt([
						    {
								type: "list",
								message: "Would you like to make another card?",
								choices: ["Yes", "No"],
								name: "userChoice"
						    },
						]).then(function(inquirerResponse) {
				        if (inquirerResponse.userChoice === "Yes"){
				          console.log("Making Another Card")
				          createBasicCard();
				        }
				        else if(inquirerResponse.userChoice === "No"){
				          console.log("Thanks for Making Cards")

				        }
				    })
    })
}

// Function to cloze basic cards /////////////////////////////////////////////////////
var createClozeCard = function () {
    inquirer.prompt([
      {
        name: "cloze",
        message: "What is the cloze word or words?"
      },
      {
        name: "text",
        message: "What is the cloze text?"
      }
    ]).then(function(inquirerResponse){
        var clozeCard = new ClozeCard(inquirerResponse.text, inquirerResponse.cloze);

        fs.appendFile("clozeCardlog.txt", "" + JSON.stringify(clozeCard) + ",", function(error) {
          if (error){
          return console.log(error);
          }
        })
        console.log(clozeCard.partial);
        console.log(clozeCard.cloze);

				inquirer.prompt([
								{
								type: "list",
								message: "Would you like to make another card?",
								choices: ["Yes", "No"],
								name: "userChoice"
								},
						]).then(function(inquirerResponse) {
								if (inquirerResponse.userChoice === "Yes"){
									console.log("Making Another Card")
									createClozeCard();
								}
								else if(inquirerResponse.userChoice === "No"){
									console.log("Thanks for Making Cards")

								}
						})
    })
}

// Function basic quiz /////////////////////////////////////////////////////
var basicQuiz = function(){
    fs.readFile("basicCardlog.txt", function(err, data){
      if(err) throw err;
      var basicQuizArray = data.toString().split(",");
      var basicQuizArrayFront = [];
      var basicQuizArrayBack = [];
			console.log(basicQuizArray);

      inquirer
        .prompt([
      		    {
      				name: "basic_flashcard_question",
      				message: basicQuizArrayFront[0],
      		    },
      		]).then(function(inquirerResponse){
              if ('"back"'+":"+'"'+inquirerResponse.basic_flashcard_question+'"' == basicQuizArrayBack[0]){
                console.log("Correct!");
              } else {
                console.log("Wrong! " + basicQuizArrayBack[0]);
              }
          })
    })
}
