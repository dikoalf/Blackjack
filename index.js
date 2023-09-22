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

let cardsEl = document.getElementById("cards")
let sumEl = document.getElementById("sum")
let messageEl = document.getElementById("message")
let playerEl = document.getElementById("player")

function startGame() {
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    sum = firstCard + secondCard
    cards = [firstCard, secondCard]
    isAlive = true
    hasBlackjack = false
    
    renderCards()
    blackJackCalculation()
    chipsCalculation()
}

function renderCards() {
    let cardsText = ""
    let cardImg = ""
    let number = 0

    for (let index = 0; index < cards.length; index++) {
        if(cards[index] == 10) {
            number = Math.floor(Math.random() * 3) + 1
            cardImg = '<img src="assets/card' + cards[index]+ '(' + number + ').png" class="card">'
        } else {
            cardImg = '<img src="assets/card' + cards[index]+ '.png" class="card">'
        }

        cardsText += cardImg
    }

    cardsEl.innerHTML = cardsText
    sumEl.textContent = "Sum : " + sum
}

function newCard() {
    if(isAlive) {
        let card = getRandomCard()
        cards.push(card)
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

    if (number == 1) {
        number = 11
    } else if(number >= 11 && number <= 13) {
        number = 10
    }

    return number
}