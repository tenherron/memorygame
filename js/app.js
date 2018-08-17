/* CREATE A LIST -  that holds all of your cards
 */
 
const cards = [
'fa-diamond',
'fa-diamond', 
'fa-paper-plane-o',
'fa-paper-plane-o', 
'fa-anchor', 
'fa-anchor',
'fa-bolt', 
'fa-bolt',
'fa-cube',
'fa-cube', 
'fa-leaf',
'fa-leaf', 
'fa-bicycle',
'fa-bicycle', 
'fa-bomb',
'fa-bomb'];

// Global variable a card container
const cardContainer = document.querySelector('.deck');

// Global variable to hold cards
let cardArray = [];

/* MAKE DECK
 */
 
// Display cards dynamically in a <li> adding the card's HTML to the page
function allCards(makeCard) {
    return `<li class="card"><i class="fa ${makeCard}"></i></li>`;
}

// Add each card's HTML to the page and shuffle the array
function makeDeck() {
    shuffle(cards);
    let cardTemplate = cards.map(function(cards) {
        return allCards(cards);
    });
    cardContainer.innerHTML = cardTemplate.join('');
}
makeDeck();
 
// Shuffle the card array when called 
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
 
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
 
    return array;
}

/* GET ALL CARDS 
*/

// Display cards by setting up an event listener and then checkMatches when cards are flipped.
cardContainer.addEventListener('click', function (event) {
    const card = event.target;
    if (!card.classList.contains('open') && !card.classList.contains('show')) {
       displayCard(card); //displayCard() called
    }
})

function displayCard(card) {
    cardArray.push(card);
    card.classList.add('open', 'show');
    checkMatches(); //compare cards
} 

// Check Matches 2 at a time and increment the counter to display a final score later.
function checkMatches() {
    if (cardArray.length == 2) {
            const presentChoice = cardArray[0]; //user 1 of 2 matches
            const pastChoice = cardArray[1]; //user 2 of 2 matches
 
            //see if cards match
            if (presentChoice.innerHTML === pastChoice.innerHTML) {
            //if match add match class   
            presentChoice.classList.add('match');
            pastChoice.classList.add('match');

            cardArray = []; //empty the array - I ADDED THIS ON 8/16
            } 
            //flip the card i/o in 1 second
                setTimeout(function() {
                    cardArray.forEach(function(card) {  
                        card.classList.remove('open','show');
                    }); 
                    cardArray = []; //empty the array
                }, 400); 
            }//end if cardArray.length match   
    //track moves
    trackMoves();
} //end checkMatches

// Add to counter call trackMoves()
let list = document.getElementsByClassName('deck')[0].childNodes;
const str = '<li><i class="fa fa-star"></i></li>';

const trackMoves = function() {
    for (let i = 0; i < list.length; i++){
        list[i].onclick = function() {
            let number = document.getElementsByClassName('number')[0].innerHTML;
            number++;
            document.getElementsByClassName('number')[0].innerHTML = number;
            //showProgress
            showProgress();
        }; //end.onclick
    } //end for loop 
    if (document.getElementsByClassName('number')[0].innerHTML == 32) {
        gameOver();
    }
}; //end trackMoves()

// showProgress - add stars based on # of matches
function showProgress() {
    if (document.getElementsByClassName('match').length == 4) {
        document.querySelector('.stars').innerHTML = str.repeat(1);
    } else if (document.getElementsByClassName('match').length == 8) {
        document.querySelector('.stars').innerHTML = str.repeat(2);
    } else if (document.getElementsByClassName('match').length == 12) {
        document.querySelector('.stars').innerHTML = str.repeat(3);
    } else if (document.getElementsByClassName('match').length == 16) { 
        document.querySelector('.stars').innerHTML = str.repeat(4);
        youWin();
    } else {
    // "default"
    }//end makeStar
}//end showProgress()
 
/* ENDING THE GAME 
*/

// restart() the game
function restart() {
    document.getElementsByClassName('number')[0].innerHTML= 0; //reset counter
    document.querySelector('.stars').innerHTML = '';//reset star progress
    cardContainer.innerHTML = '';//remove cards
    makeDeck();//add cards
    resetCards();//resets click event
}

// Reset the cards in the deck - otherwise you loose the card click event.
function resetCards() {
    const cardList = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}

// GameOver - 2 options - tryAgain() or youWin().
function gameOver() {
    tryAgain();
    finalScore();
    restart();
}

// Try Again
function tryAgain() {
    const modal = document.querySelector('#modal1');
    if (modal.classList.contains('showModal')) {
        modal.classList.remove('showModal');
    } else {
        modal.classList.add('showModal');
    }
}

// Winner
function youWin() {
    const modal = document.querySelector('#modal2');
    if (modal.classList.contains('showModal')) {
        modal.classList.remove('showModal');
    } else {
        modal.classList.add('showModal');
    }
}

// Show final score on modal
function finalScore() {
    const star = document.querySelector('.stars').innerHTML;
    const score = document.getElementsByClassName('number')[0].innerHTML;
    if (document.querySelector('#modal1')) {
    document.querySelector('.modal-body').innerHTML = 
    `<p>So sorry!</p> <p>There are only 32 moves available. 
    Here are your stats: <br/> Stars Earned: ${star}  <br/> Score: ${score}</p>`
    } else if (document.querySelector('#modal2')){
    document.querySelector('.modal-body').innerHTML = 
    `<p>I am doing a happy dance,<br/> cause you <strong>WIN</strong>!</p><p> 
    Here are your stats: <br/> Stars Earned: ${star}  <br/> Score: ${score}</p>`
    }
}