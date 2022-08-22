//unordered list where the player’s guessed letters will appear
const guessedLetterList = document.querySelector(".guessed-letters");
// button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
//text input where the player will guess a letter.
const textInput = document.querySelector(".letter");
//empty paragraph where the word in progress will appear.
const inProgress = document.querySelector(".word-in-progress");
//paragraph where the remaining guesses will display.
const remainingGuess = document.querySelector(".remaining");
//span inside the paragraph where the remaining guesses will display.
const spanParagraph = document.querySelector(".remaining span");
//empty paragraph where messages will appear when the player guesses a letter.
const guessMessage = document.querySelector(".message");
//hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");
//test word until I fetch words from hosted file
const word = "magnolia";

//create another global variable called guessedLetters with an empty array. This array will contain all the letters the player guesses
const guessedLetters = [];

//placeholder for each letter
const placeHolder = function (word) {
    //Create and name a function to update the paragraph’s innerText for the “words-in-progress” element with circle symbols (●) to represent each letter in the word. 
    //You’ll need to use an array and then join it back to a string using the .join("") method
    const placeHolderLetter = [];
    for(const letter of word){
        //shows the value magnolia in the console.log
        //console.log(letter);
        //adding to the string of magnolia
        placeHolderLetter.push("●");
    }
    //joining the in progress text to the new placeholder letter array
    inProgress.innerText = placeHolderLetter.join("");
};
//Call the function and pass it the word variable
placeHolder(word);

//adding an event listener for the button
guessButton.addEventListener("click", function (e) {
    //Because you’re working with a form, you want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page. To prevent this reloading behavior, add this line of code at the top of the callback function
    e.preventDefault();
    //Create and name a variable to capture the value of the input
    const letterInput = textInput.value;
    //Log out the value of the variable capturing the input
    //console.log(letterInput);
    
    //empty the text of the guess message element.
    guessMessage.innerText = "";

    //call the function you made that checks the input, originally i just put validateInput(),and pass it the input value created above, letterInput, as an argument
    //Save the result of this function call to a variable by placing it as the value of a new variable you create
    const goodResult = validateInput(letterInput);
    //*Make sure that the variable mapped to the result of the function validates that the player’s input is returning a letter (as opposed to “undefined”)*

    if (goodResult){
        //If it’s returning a letter, pass it as an argument to your makeGuess function
        makeGuess(letterInput);
    }
    //Then, empty the value of the input, You should see the letter you enter into the input field in the console when the Guess button is clicked. 
    textInput.value = "";
});

//Create a Function to Check Player’s Input
const validateInput = function (input) {
    //create a variable for the accepted letter sequence: const acceptedLetter = /[a-zA-Z]/. Now your code uses a regular expression to ensure the player inputs a letter
    const acceptedLetter = /[a-zA-Z]/;
    //First, check if the input is empty
    if (input === ""){
        guessMessage.innerText = `Please Enter A Letter`;
        //Then, check if the player has entered more than one letter
    } else if (input > 1){
        guessMessage.innerText = `Please Enter One Letter At A Time. No numbers or symbols.`;
        //check if they’ve entered a character that doesn’t match the regular expression pattern by using .match()
    } else if (!input.match(acceptedLetter)){
        guessMessage.innerText = `Must enter a letter only. No numbers or symbols.`;
        //If all the other conditions aren’t met, the input is a letter, which is what you’re looking for! Return the input.
    } else {
        return input;
    }
};

//Create a Function to Capture Input
const makeGuess = function (letterInput) {
    //JavaScript is case sensitive, so it sees uppercase and lowercase letters as different characters. The easiest way to handle case-sensitivity is to convert all letters to one casing. We recommend converting your letter parameter to uppercase
    letterInput = letterInput.toUpperCase();
    //If the player already guessed the same letter, update the message to inform the player try again
    if (guessedLetters.includes(letterInput)){
        guessMessage.innerText = "You've already guessed this letter. Please try again, friend!";
    } else {
        //If they haven’t guessed that letter before, add the letter to the guessedLetters array by using the push() method
        guessedLetters.push(letterInput);
        console.log(guessedLetters);
        //inside the else statement in makeGuess 
        updatedGuessedLetters();
        //needed to pass the guessedLetters as an argument in order for the letters to show in the dot area
        updateWordProgress(guessedLetters);
    }
};

//Create a Function to Show the Guessed Letters
//Create and name a function to update the page with the letters the player guesses
const updatedGuessedLetters = function () {
    //Empty the innerHTML of the unordered list where the player’s guessed letters will display using the variable created at the beginning not the inputs
  guessedLetterList.innerHTML = ""; 
  //Create a new list item for each letter inside your guessedLetters array 
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    //needed to add the below in order for the letters to appear
    li.innerText = letter;
    //add it to the unordered list
    guessedLetterList.append(li);
  }
};

//Create a Function to Update the Word in Progress
const updateWordProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    //You’ll want to create a new array with the updated characters 
    const showWord = [];
    for (const letter of wordArray){
        //to check if the wordArray contains any letter from the guessedLetters you use the includes method
        if (guessedLetters.includes(letter)){
            //If it does contain any of the letters, update the circle symbol with the correct letter
            showWord.push(letter.toUpperCase());
        } else {
            //if not, make sure it shows a circle
            showWord.push("●");
        }
    }
    // use join() to join the empty paragraph with class word-in-progress with the new created showWord array to update where the word in progress will appear
    inProgress.innerText = showWord.join("");
    //At the bottom of the function that updates the word in progress, call this function to check if the player has won
    guessCheckWin();
};

//Create a Function to Check If the Player Won
//Create a function to check if the player successfully guessed the word and won
const guessCheckWin = function () {
    //verifying if their word in progress matches the word they should guess
    if (word.toUpperCase() === inProgress.innerText)  {
        //If the player has won, add the “win” class to the empty guessMesage paragraph where messages appear when they guess the letter
      guessMessage.classList.add("win");
      //update the paragraph’s contents
      guessMessage.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
  };