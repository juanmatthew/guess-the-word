//unordered list where the player’s guessed letters will appear
const guessedLetter = document.querySelector(".guessed-letters");
// button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
//text input where the player will guess a letter.
const textInput = document.querySelector(".letter");
//empty paragraph where the word in progress will appear.
const inProgress = document.querySelector(".word-in-progress");
//paragraph where the remaining guesses will display.
const remainingGuess = document.querySelector(".remaining");
//span inside the paragraph where the remaining guesses will display.
const spanParagraph = document.querySelector("p span");
//empty paragraph where messages will appear when the player guesses a letter.
const guessMessage = document.querySelector(".message");
//hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");
//test word until I fetch words from hosted file
const word = "magnolia";

//placeholder for each letter
const placeHolder = function () {
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
}
//Call the function and pass it the word variable
placeHolder(word);

//adding an event listener for the button
guessButton.addEventListener("click", function (e) {
    //Because you’re working with a form, you want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page. To prevent this reloading behavior, add this line of code at the top of the callback function
    e.preventDefault();
    //Create and name a variable to capture the value of the input
    const input = textInput.value;
    //Log out the value of the variable capturing the input
    console.log(input);
    //Then, empty the value of the input, You should see the letter you enter into the input field in the console when the Guess button is clicked. 
    textInput.value = "";
});