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
const guessSpanParagraph = document.querySelector(".remaining span");
//empty paragraph where messages will appear when the player guesses a letter.
const guessMessage = document.querySelector(".message");
//hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

//had to change const to let in order for the remaining guesses to work correctly

//test word until I fetch words from hosted file
//Reassign the value of the existing word global variable to this new random word. This means you should also now declare the global word variable with let instead of const.
let word = "magnolia";

//The value 8 is the maximum number of guesses the player can make. You can decrease or increase this value to make the game harder or easier for the player! Hint: The value of the remainingGuesses variable will change over time.
let remainingGuesses = 8;

//create another global variable called guessedLetters with an empty array. This array will contain all the letters the player guesses
const guessedLetters = [];

const getWord = async function () {
    const wordData = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    //use word here instead of data just as we used the word student and name in the last exercise
    const words = await wordData.text();
    //You know how to grab a random element from an array, now you’ll grab a random word. To select a random word, you’ll need first to transform the data you fetched into an array. Each word is separated by a newline (line break), so this is the delimiter you’ll use to create the array:
    const wordArray = words.split("\n");
    //To grab a random word from the file, create a variable to pull a random index from the wordArray
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    //pull out a random word from the array and remove any extra whitespace around the word using the trim() method
    word = wordArray[randomIndex].trim();
    //console.log(wordArray);
    //Call the placeholder function you created previously at the bottom of the function. Pass it in the variable holding your random word
    placeHolder(word);
};
getWord();


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
//placeHolder(word);

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
        //before the call to the function that will update the word in progress, call your new function to update the remaining guesses and pass it the letter that the player guessed as an argument
        guessRemaining(guess);
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

//Create a Function to Count Guesses Remaining
//Create and name a new function that will accept the guess input as a parameter
const guessRemaining = function (guess) {
    //In the function, grab the word and make it uppercase. Because the player’s guess is uppercase, making the word they’re guessing uppercase will compare letters with the same casing.
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)){
        // If it doesn’t include the letter from guess, let the player know that the word doesn’t contain the letter and use template literal to specify the number
        guessMessage.innerText = `Sorry Friend, the word doesn't contain ${guess}!`;
        //subtract 1 from their remainingGuesses
        remainingGuesses -= 1;
    } else {
        guessMessage.innerText = `Great Job! The letter ${guess} is in this word!`
    }

    if (remainingGuesses === 0){
        //If they have no guesses remaining, update the message to say the game is over and what the word is.
        guessMessage.innerText = `You have no more guesses,Friend! The word was ✨${word.toUpperCase()}✨ Game Over!👾 `
    } else if (remainingGuesses === 1){
        //If they have 1 guess, update the span inside the paragraph where the remaining guesses will display to tell the player they have one guess remaining
        guessSpanParagraph.innerText = `${remainingGuesses} guess`;
    } else {
        //If they have more than one guess, update the same span element to tell them the number of guesses remaining
        guessSpanParagraph.innerText = `${remainingGuesses} guesses`
    }
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


      startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");  
    remainingGuess.classList.add("hide");
    guessedLetterList.classList.add("hide");
    //Use the startOver function to show the button to play again.
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    guessMessage.classList.remove("win");
    //Empty the message text and the unordered list where the guessed letters appear
    guessMessage.innerText="";
    guessedLetterList.innerHTML = "";
    remainingGuesses = 8;
    //Set your guessedLetter global variable back to an empty array
    guessedLetters = [];
    //Populate the text of the span inside the paragraph where the remaining guesses display with the new amount of guesses
    guessSpanParagraph.innerText = `${remainingGuesses} guesses`;
 
    getWord();
    //Show the Guess button, the paragraph with remaining guesses, and the guessed letters once more. Hide the Play Again button
    guessButton.classList.remove("hide");  
    remainingGuess.classList.remove("hide");
    guessedLetterList.classList.remove("hide");
    playAgainButton.classList.add("hide");
 
    
});