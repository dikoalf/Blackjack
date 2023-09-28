let sum = 0
let cards = []
let hasBlackjack =  false
let isAlive = false
let message = ""

//object
let player = {
    name : "Player One",
    chips : 0
}

const cardsEl = document.getElementById("cards")
const sumEl = document.getElementById("sum")
const messageEl = document.getElementById("message")
const playerEl = document.getElementById("player")

function startGame() {
    cards = []
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    sum = firstCard + secondCard
    isAlive = true
    hasBlackjack = false
    
    renderCards()
    blackJackCalculation()
    chipsCalculation()
}

function renderCards() {
    let cardsText = ""
    let cardImg = ""

    for (let index = 0; index < cards.length; index++) {
        cardImg = '<img src="assets/card' + cards[index]+ '.png" class="card">'

        cardsText += cardImg
    }

    cardsEl.innerHTML = cardsText
    sumEl.textContent = "Sum : " + sum
}

function newCard() {
    if(isAlive) {
        let card = getRandomCard()
        sum += card

        renderCards()
        blackJackCalculation()
    }
}

function blackJackCalculation()
{
    if (sum <= 20) {
        message ="Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got blackjack!"
        hasBlackjack = true
        isAlive = false
        
        chipsCalculation()
    } else {
        message ="You're out of the game"
        isAlive = false
    }

    messageEl.textContent = message
}

function chipsCalculation()
{
    let chipsText = player.name + " : $"

    if(hasBlackjack)
    {
        player.chips += 100
    }

    playerEl.textContent = chipsText + player.chips
    hasBlackjack = false
}

function getRandomCard() {
    let number = Math.floor(Math.random() * 13) + 1
    let cardNumber = 0;

    if (number == 1) {
        number = 11
    } else if(number >= 11 && number <= 13) {
        number = 10
    }

    if (number == 10) {
        let tempNumber = Math.floor(Math.random() * 3) + 1
        cardNumber = number + '(' + tempNumber + ')'
    } else {
        cardNumber = number
    }
    
    cards.push(cardNumber)

    return number
}