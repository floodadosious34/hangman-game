// Get Elementes from index.html and store in variables
const letterbutton = document.querySelector('#alphabet')
const buttons = document.querySelectorAll('#alphabet button')
const hintButton = document.getElementById('hint')
const startButton = document.getElementById('play-again')
const triesLeft = document.querySelector('#tries-left')
const phraseUl = document.querySelector('#word-guess ul')
const subject = document.getElementById('subject')
const hintDiv = document.querySelector('.hint-div')
const hangManBox = document.querySelector('.hangman-box')
const hangmanPic = document.getElementById('hangmanPic')
const gameArea = document.querySelector('.game-play-area')
const startPage = document.getElementById('startPage')
const winnerPage = document.getElementById('winner')
const loserPage = document.getElementById('lost')

// Declare variablels to be used in setting game up
let hangmanTries = 6
let hangmanAttepmts = 0
let objectArray = []
let array = []
let chosenTitle;
let chosenHint;

//Functions for getting category, object, array, and displaying page

//tandomObject takes an array, and returns a random object out of it.
function randomObject(arr) {
    const i = Math.floor(Math.random() * arr.length)
    const object = arr[i]
    console.log(object)
    return object
}

//setupGanme resets all gameplay elements and arrays.
function setupGame() {
    gameArea.style.display = 'none'
    startPage.style.display = 'block'
    winnerPage.style.display = 'none'
    loserPage.style.display = 'none'
    hangManBox.style.display = 'block'
    objectArray = []
    array = []
}

// startGame displays game area and enables all letter buttons.
function startGame() {
    gameArea.style.display = 'block'
    startPage.style.display = 'none'
    hangmanTries = 6
    hangmanAttepmts = 0
    hangmanPic.src = `./images/${hangmanAttepmts}.jpg`
    hintDiv.innerHTML = ''
    triesLeft.innerHTML = `Tries left: ${hangmanTries}`
    buttons.forEach(button => {
        button.disabled = false
    })
    
    //randomObject gets the random object out of the array that was selected by catergory.
    const chosenObject = randomObject(objectArray)
    console.log(chosenObject.title)
    
    //gets the title out of the object and converts it to an array to add tot he display.
    const wordArray = Array.from(chosenObject.title)
    addPhraseToDisplay(wordArray, chosenObject.category)
    chosenTitle = wordArray
    chosenHint = chosenObject.hint
}
console.log(chosenTitle)

// addPhraseToDisplay takes two arguments. arr is an array that is containig the letter of the selected word.
// arr2 is the catergory value of the object. These are displayed in the game play area.
function addPhraseToDisplay(arr, arr2) {
    arr.forEach(item => {
        let letter = document.createTextNode(item);
        let li = document.createElement('li');
        li.append(letter);
        phraseUl.append(li);
    
        if (li.textContent === " ") {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
        return li
    })
    subject.innerHTML = `Catergory: ${arr2}`  
};

// displayLetters displays the correctly chosen letters that are gussed by the player.
function displayLetters(letter) {
    const elementsLi = document.getElementsByClassName('letter')
    for (let i = 0; i < elementsLi.length; i++) {
        const li = elementsLi[i]
        if(li.textContent.toLocaleLowerCase() === letter) {
            li.classList.add('show')
        }
    }
}

//checkWin checks if the correctly chosen letters match the letters to the hidden word.
//they are checked by the letter and show class that were added to each letter. 
function checkWin() {
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');

    if(letter.length === show.length) {
        alert("You Win!!")
        winOrLost(winnerPage)
    } else if(hangmanAttepmts === 6) {
        alert("You Lost!")
        winOrLost(loserPage)
    }
}

//winOrLost displays win or lost block and disables buttons
function winOrLost(a) {
    buttons.forEach(button => {
        button.disabled = true
    })
    a.style.display = 'block'
    hangManBox.style.display = 'none'
}

// Add Event listeners for button on click

//This is the play again button that will remove the letters from the
//previous chosen word and restatrt the game. 
startButton.addEventListener('click', (e) => {
    let child = phraseUl.lastElementChild
    while(child) {
        phraseUl.removeChild(child)
        child = phraseUl.lastElementChild
    }
    setupGame()
})

//This is the function for when a catergory is first selected at the beginning of game play.
//It searches through the array of objects and creates a new array that holds th object with matching catergories.
startPage.addEventListener('click', (e) => {
    let category = e.target.innerHTML
    console.log(category)
    wordsObject.forEach(object => {
        if(category === object.category) {
            objectArray.push(object)
        }
    })
    console.log(objectArray)
    startGame()
})

//Hint button that reveals the hint on the page.
hintButton.addEventListener('click', (e) => {
    hintDiv.innerHTML = chosenHint
})

//function that fires when a letter from the alphabet is clicked on.
//It will check if the selected letter in found in the array of the randomly selected word.
letterbutton.addEventListener('click', (e) => {
    const letter = e.target.innerHTML.toLowerCase()
    console.log(letter)
    chosenTitle.forEach(digit => {
        digit = digit.toLowerCase()
        if(letter === digit) {
            console.log(digit)
            displayLetters(letter)
            array.push(digit)
            console.log(array)
        } else {
            console.log(digit.toUpperCase())
        }
    })
    //If the array of the word does not contain the chosen letter, the tries disply will be updated.
    if(!array.includes(letter)) {
        hangmanAttepmts++
        hangmanPic.src = `./images/${hangmanAttepmts}.jpg`

        hangmanTries--
        triesLeft.innerHTML = `Tries left: ${hangmanTries}`
    }
    checkWin()
})

//Call game setup on a initial page load
setupGame()