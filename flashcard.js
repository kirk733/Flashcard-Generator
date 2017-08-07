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
			          createBasicCard(); //calling create basic card function
			        }
			        else if(inquirerResponse.userChoice === "Create Cloze Card"){
			          console.log("Let's make a Cloze Card")
								createClozeCard(); //calling create cloze card function
			        }
			        else if(inquirerResponse.userChoice === "Basic Card Quiz"){
			         console.log("Let's take the Basic Card Quiz")
							 basicQuiz(); //calling basic quiz function
			        }
			        else if(inquirerResponse.userChoice === "Cloze Card Quiz"){
			          console.log("Let's take a Cloze Card Quiz")
							clozeQuiz(); // calling cloze quiz function
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
							//new constructor
			        var basicCard = new BasicCard(inquirerResponse.front, inquirerResponse.back);
							//writing to file
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

			// Function to create cloze  cards /////////////////////////////////////////////////////
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
						//new constructor
			        var clozeCard = new ClozeCard(inquirerResponse.text, inquirerResponse.cloze);

							//writing to file
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
					//reading file
			    fs.readFile("basicCardlog.txt", function(err, data){
			      if(err) throw err;
			      var basicQuizArray = data.toString().split(",");
			      var basicQuizArrayFront = [];
			      var basicQuizArrayBack = [];
						// how many basic cards
						basicCardCount = ((basicQuizArray.length - 1)/2 -1)
						console.log(basicCardCount)
						//fill the array
						for(var i = 0; i < basicQuizArray.length; i+=2){
								basicQuizArrayFront.push(basicQuizArray[i].slice(1,basicQuizArray[i].length));
								}
						//fill the array
						for(var i = 1; i < basicQuizArray.length; i+=2){
							basicQuizArrayBack.push(basicQuizArray[i].slice(0,basicQuizArray[i].length-1));
						}
						nextCard(basicCardCount)

						//bring card for quiz
						function nextCard(basicCardCount){
						      inquirer.prompt([
						      		    {
						      				name: "basic_flashcard_question",
						      				message: basicQuizArrayFront[basicCardCount],
						      		    },
						      		]).then(function(inquirerResponse){
						              if ('"back"'+":"+'"'+inquirerResponse.basic_flashcard_question+'"' == basicQuizArrayBack[basicCardCount]){
						                console.log("Correct!");
														questionUser();
						              } else {
														yourResponse = '"back"'+":"+'"'+inquirerResponse.basic_flashcard_question+'"'
						                console.log("Wrong! Because your response " + yourResponse + " did not match " + basicQuizArrayBack[basicCardCount]);
														questionUser();
													}
												})
											}

							//ask user if they want another card
						function questionUser() {
												inquirer.prompt([
																{
																type: "list",
																message: "You want to try the next card?",
																choices: ["Yes", "No"],
																name: "userChoice"
																},
														]).then(function(inquirerResponse) {
																if (inquirerResponse.userChoice === "Yes"){
																	basicCardCount--
																	if(basicCardCount < 0){
																		console.log("No more cards! Quiz over!")
																	}
																	else {
																	nextCard(basicCardCount);
																	}
																}
																else if(inquirerResponse.userChoice === "No"){
																	console.log("Quiz is over")

																}
														})

													}//here
						    })
						}


			// Function cloze quiz /////////////////////////////////////////////////////
			var clozeQuiz = function(){
				  //read file
			    fs.readFile("clozeCardlog.txt", function(err, data){
			      if(err) throw err;
			      var clozeQuizArray = data.toString().split(",");
			      var clozeQuizArrayFront = [];
			      var clozeQuizArrayBack = [];
						//how many cards in the file
						clozeCardCount = ((clozeQuizArray.length - 1)/3 -1)
						//fill array
						for(var i = 2; i < clozeQuizArray.length; i+=3){
								clozeQuizArrayFront.push(clozeQuizArray[i].slice(0,clozeQuizArray[i].length-1));
								}
						//fill array
						for(var i = 0; i < clozeQuizArray.length; i+=3){
							clozeQuizArrayBack.push(clozeQuizArray[i].slice(1,clozeQuizArray[i].length));
						}
						nextCard(clozeCardCount)

					//present the next card
					function nextCard(clozeCardCount){
					      inquirer.prompt([
					      		    {
					      				name: "cloze_flashcard_question",
					      				message: clozeQuizArrayFront[clozeCardCount],
					      		    },
					      		]).then(function(inquirerResponse){
					              if ('"cloze"'+":"+'"'+inquirerResponse.cloze_flashcard_question+'"' == clozeQuizArrayBack[clozeCardCount]){
					                console.log("Correct!");
													questionUser();
					              } else {
													yourResponse = '"cloze"'+":"+'"'+inquirerResponse.cloze_flashcard_question+'"'
					                console.log("Wrong! Because your response " + yourResponse + " did not match " + clozeQuizArrayBack[clozeCardCount]);
													questionUser();
												}
											})
										}

					//ask user if they want another card
					function questionUser() {
											inquirer.prompt([
															{
															type: "list",
															message: "You want to try the next card?",
															choices: ["Yes", "No"],
															name: "userChoice"
															},
													]).then(function(inquirerResponse) {
															if (inquirerResponse.userChoice === "Yes"){
																clozeCardCount--
																if(clozeCardCount < 0){
																	console.log("No more cards! Quiz over!")
																}
																else {
																nextCard(clozeCardCount);
																}
															}
															else if(inquirerResponse.userChoice === "No"){
																console.log("Quiz is over")

															}
													})

												}//here
					    })
					}
