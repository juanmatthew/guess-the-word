const guessedLetterList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const spanParagraph = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

//placeholder for each letter
const placeHolder = function (word) {
    const placeHolderLetter = [];
    for(const letter of word){
        console.log(letter);
        placeHolderLetter.push("●");
    }
    inProgress.innerText = placeHolderLetter.join("");
};

placeHolder(word);

//adding an event listener for the button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    guessMessage.innerText = "";
    const letterInput = textInput.value;
    const goodResult = validateInput(letterInput);

    if (goodResult){
        makeGuess(letterInput);
    }
    textInput.value = "";
});

//Create a Function to Check Player’s Input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === ""){
        guessMessage.innerText = `Please Enter A Letter`;
    } else if (input > 1){
        guessMessage.innerText = `Please Enter One Letter At A Time. No numbers or symbols.`;
    } else if (!input.match(acceptedLetter)){
        guessMessage.innerText = `Must enter a letter only. No numbers or symbols.`;
    } else {
        return input;
    }
};

//Create a Function to Capture Input
const makeGuess = function (letterInput) {
    letterInput = letterInput.toUpperCase();
    if (guessedLetters.includes(letterInput)){
        guessMessage.innerText = "You've already guessed this letter. Please try again, friend!";
    } else {
        guessedLetters.push(letterInput);
        console.log(guessedLetters);
        updatedGuessedLetters();
        updateWordProgress(guessedLetters);
    }
};

//Create a Function to Show the Guessed Letters
const updatedGuessedLetters = function () {
  guessedLetterList.innerHTML = ""; 
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLetterList.append(li);
  }
};

//Create a Function to Update the Word in Progress
const updateWordProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showWord = [];
    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            showWord.push(letter.toUpperCase());
        } else {
            showWord.push("●");
        }
    }
    inProgress.innerText = showWord.join("");
    guessCheckWin();
};

//Create a Function to Check If the Player Won
const guessCheckWin = function () {
  if (word.toUpperCase() === inProgress.innerText)  {
    guessMessage.classList.add("win");
    guessMessage.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
  }
};