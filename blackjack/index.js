//PART 1
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS = ['♠', '♥', '♣', '♦'];

const CARD_MODEL = document.createElement('div');
CARD_MODEL.classList.add('card');

const DEALER = document.getElementById('dealer');
const PLAYER = document.getElementById('player');
const HIT_BUTTON = document.getElementById('hit-button');
const PASS_BUTTON = document.getElementById('pass-button');
const BUTTON_CONTAINER = document.getElementById('button-container');
const NOTICE = document.getElementById('notice');
const NEXT_HAND_BUTTON = document.getElementById('next-hand-button');

let allDecks = [];
let dealerHand = [];
let playerHand = []; 
//deck of cards - 52 13*4
//shuffle several decks
//select a card (random)
//deal hands to dealer and player
//*hide one of dealers cards
//give the option to hit or pass
// - if hit add card
// - if pass let dealer play
//determine the winner
//deal the next hand

const createDeck = ()=>{
    const deck = [];
    SUITS.forEach((suit) => {
        VALUES.forEach((value) => {
            const card = value + suit;
            deck.push(card);
        });
    });
    return deck;
}

const shuffleDecks = (num) => {
    for(let i = 0; i < num; i++) {
        const newDeck = createDeck();
        allDecks = [...allDecks, ...newDeck];
    }
} 

const selectRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * allDecks.length);
    const card = allDecks[randomIndex];
    allDecks.splice(randomIndex, 1);
    console.log(randomIndex);
    return card;
}

// PART 2

const clearHands = () => {
    while (DEALER.children.length > 0) {
        DEALER.children[0].remove();
    }

    while(PLAYER.children.length > 0) {
        PLAYER.children[0].remove()
    }
    return true;
}


const dealHands = ()=>{
    clearHands();
    dealerHand = [selectRandomCard(), selectRandomCard()];
    dealerHand.forEach((card, index)=>{
        const newCard = CARD_MODEL.cloneNode(true);
        newCard.innerHTML = card;
        if (index === 0) {
            newCard.innerHTML = '';
            newCard.style.backgroundColor = 'green';
        } else {
            newCard.innerHTML = card;
        }
        if (card[card.length - 1] === SUITS[1]){
            newCard.setAttribute('data-red', true);
        } else if (card[card.length - 1] === SUITS[3]) {
            newCard.setAttribute('data-red', true);
        } else if (card[card.length - 1] === SUITS[0]) {
            newCard.setAttribute('data-red', false);
        } else if (card[card.length - 1] === SUITS[2]) {
            newCard.setAttribute('data-red', false);
        }
        DEALER.append(newCard);
    });
    playerHand = [selectRandomCard(), selectRandomCard()];
    playerHand.forEach((card)=>{
        const newCard = CARD_MODEL.cloneNode(true);
        newCard.innerHTML = card;
        if (card[card.length - 1] === SUITS[1]){
            newCard.setAttribute('data-red', true);
        } else if (card[card.length - 1] === SUITS[3]) {
            newCard.setAttribute('data-red', true);
        } else if (card[card.length - 1] === SUITS[0]) {
            newCard.setAttribute('data-red', false);
        } else if (card[card.length - 1] === SUITS[2]) {
            newCard.setAttribute('data-red', false);
        }
        PLAYER.append(newCard);
    });
}

// PART 3

const calcValue = (hand)=>{
    let value = 0;
    let hasAce = 0;
    hand.forEach((card) => {
        if (card.length === 2) {
            if (card[0] === 'A') {
                hasAce += 1;
            } else { 
                if (card[0] === 'K' || card[0] === 'Q' || card[0] === 'J') {
                    value += 10;
                } else {
                    value += parseInt(card[0]);
                }
            }
        } else {
            value += 10;
        }
    });

    while(hasAce > 0) {
        if (value + 11 > 21) {
            value += 1;
        } else {
            value += 11;
        }
        hasAce--;
    }
    return value;
}

const hitPlayer = () => {
    const newCard = selectRandomCard();
    playerHand.push(newCard);
    const newCardNode = CARD_MODEL.cloneNode(true);
    newCardNode.innerHTML = newCard;
    if (newCard[newCard.length - 1] === SUITS[1]){
        newCardNode.setAttribute('data-red', true);
    } else if (newCard[newCard.length - 1] === SUITS[3]) {
        newCardNode.setAttribute('data-red', true);
    } else if (newCard[newCard.length - 1] === SUITS[0]) {
        newCardNode.setAttribute('data-red', false);
    } else if (newCard[newCard.length - 1] === SUITS[2]) {
        newCardNode.setAttribute('data-red', false);
    }
    PLAYER.append(newCardNode);
    const handValue = calcValue(playerHand);
    if (handValue > 21) {
        decideWinner();
    }
}

// PART 4
const decideWinner = async()=>{
    let dealerValue = await calcValue(dealerHand);
    let playerValue = await calcValue(playerHand);

    alert(`Dealer has ${dealerValue}, you have ${playerValue}.`);
    if ((dealerValue > playerValue) && (playerValue <= 21 && dealerValue <= 21))  {
        alert('Dealer wins');
    } else if ((dealerValue <= playerValue) && (playerValue <= 21 && dealerValue <= 21)) {
        alert('Player wins');
    } else if (dealerValue <= 21 && playerValue > 21) {
        alert('Player busts. Dealer wins.');
    } else if (playerValue <= 21 && dealerValue > 21) {
        alert('Dealer busts. Player wins');
    }
}

const hitDealer = async() => {
    //flip green card
    const hiddenCard = DEALER.children[0];
    hiddenCard.style.backgroundColor = '';
    hiddenCard.innerHTML = dealerHand[0];
    //calc hand value
    let handValue = await calcValue(dealerHand);
    if (handValue < 16) {
        let newCard = selectRandomCard();
        dealerHand.push(newCard);
        const newCardNode = CARD_MODEL.cloneNode(true);
        newCardNode.innerHTML = newCard;
        if (newCard[newCard.length - 1] === SUITS[1]){
            newCardNode.setAttribute('data-red', true);
        } else if (newCard[newCard.length - 1] === SUITS[3]) {
            newCardNode.setAttribute('data-red', true);
        } else if (newCard[newCard.length - 1] === SUITS[0]) {
            newCardNode.setAttribute('data-red', false);
        } else if (newCard[newCard.length - 1] === SUITS[2]) {
            newCardNode.setAttribute('data-red', false);
        }
        handValue = await calcValue(dealerHand);
        DEALER.append(newCardNode);
    }

    if (handValue < 16) {
        hitDealer();
    } else {
        decideWinner();
    }
}
    // hand value < 16 - hit (add card)
    // value = 21 dealer wins
    // value > 21 dealer bust
    //else decide winner
HIT_BUTTON.addEventListener('click', hitPlayer);
PASS_BUTTON.addEventListener('click', hitDealer);
NEXT_HAND_BUTTON.addEventListener('click', dealHands);
// addeventlistener button
// if the player > 21 bust
// if the player has < 21 hit pass
// what the value of the hand is

shuffleDecks(5);

dealHands();