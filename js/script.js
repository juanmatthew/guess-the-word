const guessedLetterList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const guessSpanParagraph = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

//Add an Async Function
const getWord = async function () {
    const wordData = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await wordData.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    //console.log(wordArray);
    placeHolder(word);
};

getWord();

//placeholder for each letter
const placeHolder = function (word) {
    const placeHolderLetter = [];
    for (const letter of word) {
        console.log(letter);
        placeHolderLetter.push("●");
    }
    inProgress.innerText = placeHolderLetter.join("");
};



//adding an event listener for the button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    guessMessage.innerText = "";
    const letterInput = textInput.value;
    const goodResult = validateInput(letterInput);

    if (goodResult) {
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
        guessRemaining(letterInput);
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


//Create a Function to Count Guesses Remaining
const guessRemaining = function (letterInput) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(letterInput)){
        guessMessage.innerText = `Sorry Friend, the word doesn't contain ${letterInput}!`;
        remainingGuesses -= 1;
    } else {
        guessMessage.innerText = `Great Job! The letter ${letterInput} is in this word!`;
    }

    if (remainingGuesses === 0){
        guessMessage.innerText = `You have no more guesses,Friend!  The word was ✨${word.toUpperCase()}✨ Game Over!👾 `;
        startOver();
    } else if (remainingGuesses === 1){
        guessSpanParagraph.innerText = `${remainingGuesses} guess`;
    } else {
        guessSpanParagraph.innerText = ` ${remainingGuesses} guesses`;
    }
};


//Create a Function to Check If the Player Won
const guessCheckWin = function () {
  if (word.toUpperCase() === inProgress.innerText)  {
    guessMessage.classList.add("win");
    guessMessage.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;

    startOver();
  }
};

const startOver = function () {
  guessButton.classList.add("hide");  
  remainingGuess.classList.add("hide");
  guessedLetterList.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
   guessMessage.classList.remove("win");
   guessMessage.innerText="";
   guessedLetterList.innerHTML = "";
   remainingGuesses = 8;
   guessedLetters = [];
   guessSpanParagraph.innerText = `${remainingGuesses} guesses`;

   guessButton.classList.remove("hide");  
   remainingGuess.classList.remove("hide");
   guessedLetterList.classList.remove("hide");
   playAgainButton.classList.add("hide");

   getWord();
});
