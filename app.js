// Get Elementes from index.html and store in variables
const letterbutton = document.querySelector('#alphabet')
const buttons = document.querySelectorAll('#alphabet button')
const hintButton = document.getElementById('hint')
const startButton = document.getElementById('play-again')
const triesLeft = document.querySelector('#tries-left')
const phraseUl = document.querySelector('#word-guess ul')
const subject = document.getElementById('subject')
const hintDiv = document.querySelector('.hint-div')
const hangmanPic = document.getElementById('hangmanPic')
const gameArea = document.querySelector('.game-play-area')
const startPage = document.getElementById('startPage')

// Declare variablels to be used in setting game up
let hangmanTries = 6
let hangmanAttepmts = 0
let objectArray = []
const array = []
let chosenTitle;
let chosenHint;

//Functions for getting category, object, array, and displaying page
function randomObject(arr) {
    const i = Math.floor(Math.random() * arr.length)
    const object = arr[i]
    console.log(object)
    return object
}

function setupGame() {
    gameArea.style.display = 'none'
    startPage.style.display = 'block'
    objectArray = []
}

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
    const chosenObject = randomObject(objectArray)
    console.log(chosenObject.title)
    const wordArray = Array.from(chosenObject.title)
    addPhraseToDisplay(wordArray, chosenObject.category)
    chosenTitle = wordArray
    chosenHint = chosenObject.hint
}
console.log(chosenTitle)

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


function displayLetters(letter) {
    const elementsLi = document.getElementsByClassName('letter')
    for (let i = 0; i < elementsLi.length; i++) {
        const li = elementsLi[i]
        if(li.textContent.toLocaleLowerCase() === letter) {
            li.classList.add('show')
        }
    }
}

function checkWin() {
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');

    if(letter.length === show.length) {
        alert("You Win!!")
    } else if(hangmanAttepmts === 6) {
        alert("You Lost!")
        console.log(buttons)
        buttons.forEach(button => {
            button.disabled = true
        })
    }
}

// Add Event listeners for button on click
startButton.addEventListener('click', (e) => {
    let child = phraseUl.lastElementChild
    while(child) {
        phraseUl.removeChild(child)
        child = phraseUl.lastElementChild
    }
    setupGame()
})

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

hintButton.addEventListener('click', (e) => {
    hintDiv.innerHTML = chosenHint
})

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