var words = ["Dil Chahta Hai","Kapoor & Sons","Taare Zameen Par","Gangs of Wasseypur","House of Secrets","House of Cards","The Walking Dead","Alice in Borderland","Kabhi Alvida Naa Kehna","The Vampire Diaries","The Adam Project","The Theory of Everything","Interstellar","Laapataa Ladies","Young Sheldon","Yeh Jawaani Hai Deewani","The Notebook","The Conjuring","The Girl on the Train","Murder Mubarak","Never Have I Ever","Humpty Sharma Ki Dulhania","Chor Nikal Ke Bhaga","Gangubai Kathiawadi","Jurassic World","Madagascar","The Good Doctor","Emily in Paris","The Girl Next Door","Black Warrant","The Railway Men","Gully Boy","Mission Majnu","Bajrangi Bhaijaan","Lucky Bhaskar","Bhool Bhulaiyaa","Kho Gaye Hum Kahan","The Fame Game","Kaala Paani","Death Note","Delhi Crime","Yeh Kaali Kaali Aankhein"
];
var buttons = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var score = 0;
var tries = [];
var mystery;
var randNum;
var chosenWord;
var wordStatus = null;
var correctWords = 0;
var failed = 0;
var usedWords = []; // Array to store used words
 // Track the number of wrong guesses

// Generate a random word or phrase
function generateWord() {
    // If all words have been used, reset the usedWords array
    if (usedWords.length === words.length) {
        usedWords = [];
    }

    // Loop to find an unused word
    do {
        randNum = Math.floor(Math.random() * words.length);
        chosenWord = words[randNum].toUpperCase();
    } while (usedWords.includes(chosenWord));

    // Mark the word as used
    usedWords.push(chosenWord);
}


// Start the Game
function Start() {
    generateWord();
    resetCanvas();
    tries = [];
    failed = 0; // Reset fail count

    // Show / for spaces
    mystery = chosenWord.replace(/ /g, '/').replace(/[A-Z]/g, '_ ');
    console.log(chosenWord);

    buttons.forEach(letter => {
        var kb = document.getElementById(letter);
        if (kb) {
            kb.disabled = false;
            kb.style.backgroundColor = "#ed1b76"; // Reset button color (Dark Pink)
        }
    });

    document.getElementById("display1").value = mystery;
    document.getElementById("display2").value = "";
    document.getElementById("score").value = score;
    document.getElementById("correctGuesses").value = correctWords;
    document.getElementById("fails").value = failed; // Reset fails display
}


function toggleMovieName() {
    var movieDiv = document.getElementById("movieNameDiv");
    var button = document.querySelector(".toggle-button");

    if (movieDiv.style.display === "none" || movieDiv.style.display === "") {
        movieDiv.style.display = "block";
        movieDiv.textContent = chosenWord;
        button.textContent = "Hide";
    } else {
        movieDiv.style.display = "none";
        movieDiv.textContent = "";
        button.textContent = "Show";
    }
}


// Handle user guesses
function handleGuess(str) {
    if (tries.indexOf(str) === -1) {
        tries.push(str);
        document.getElementById("display2").value += str + " ";
        var button = document.getElementById(str);
        button.style.backgroundColor = "#037a76"; // Dark Teal for used letters
        button.disabled = true;
        
        if (chosenWord.includes(str)) {
            guessedWord();
            checkIfGameWon();
        } else {
            failed++; // Increment fails for incorrect guesses
            updateFails(); // Update fails display
        }
    }
}

// Reveal guessed letters and maintain /
function guessedWord() {
    wordStatus = chosenWord.split('').map(letter => {
        if (letter === ' ') {
            return '/'; // Display / for spaces
        } else {
            return tries.includes(letter) ? letter.toLowerCase() : "_ ";
        }
    }).join('');
    document.getElementById('display1').value = wordStatus;
}

// Check if the player won the game
function checkIfGameWon() {
    if (wordStatus.replace(/\//g, ' ') === chosenWord.toLowerCase()) {
        score++;
        correctWords++;
        buttons.forEach(letter => {
            var kb = document.getElementById(letter);
            if (kb) {
                kb.disabled = true;
                kb.style.backgroundColor = "#249f9c"; // Change to Green
            }
        });
        updateScore();
        document.getElementById("display2").value = "You won!";
        document.getElementById("correctGuesses").value = correctWords;
    }
}
function handleGuess(str) {
    if (tries.indexOf(str) === -1) {
        tries.push(str);
        document.getElementById("display2").value += str + " ";
        var button = document.getElementById(str);

        if (chosenWord.includes(str)) {
            button.classList.add("correct-guess");
            button.disabled = true;
            guessedWord();
            checkIfGameWon();
        } else {
            button.classList.add("wrong-guess");
            button.disabled = true;
            failed++; // Increment fails for incorrect guesses
            updateFails(); // Update fails display
        }
    }
}
function Start() {
    generateWord();
    resetCanvas();
    mystery = chosenWord.replace(/[A-Z]/g, letter => letter === ' ' ? '/' : '_ ');
    console.log(chosenWord);
    tries = [];
    failed = 0;

    buttons.forEach(letter => {
        var kb = document.getElementById(letter);
        if (kb) {
            kb.disabled = false;
            kb.style.backgroundColor = "#ffffff"; // Reset to White background
            kb.style.color = "#000000"; // Reset to Black text color
            kb.classList.remove("correct-guess", "wrong-guess"); // Remove color classes
        }
    });

    document.getElementById("display1").value = mystery;
    document.getElementById("display2").value = "";
    document.getElementById("score").value = score;
    document.getElementById("fails").value = failed;
    document.getElementById("correctGuesses").value = correctWords;
}

// Update fails display
function updateFails() {
    document.getElementById("fails").value = failed;
}

// Update score display
function updateScore() {
    document.getElementById("score").value = score;
}

// Clear the canvas for a new game
function resetCanvas() {
    var canvas = document.querySelector("canvas");
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}
