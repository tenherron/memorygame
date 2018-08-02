/*
 * Create a list that holds all of your cards
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
 
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 *   - reference https://www.bbntimes.com/en/technology/the-power-of-javascript-template-literals
 *   - reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */
 
// Display cards dynamically in a <li>
function allCards(makeCard) {
    return `<li class="card"><i class="fa ${makeCard}"></i></li>`;
}
// Create a group of cards
function makeDeck() {
    shuffle(cards);
    const cardList = document.querySelector('.deck');
    let cardTemplate = cards.map(function(cards) {
        return allCards(cards);
    });
    cardList.innerHTML = cardTemplate.join('');
}
makeDeck();
 
// Shuffle function from http://stackoverflow.com/a/2450976
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
/* Get all cards 
*   - reference http://www.nickang.com/add-event-listener-for-loop-problem-in-javascript/
*   - reference https://developer.mozilla.org/en-US/docs/Web/API/EventListener
*   - reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length
*   - reference https://www.youtube.com/watch?v=_rUH-sEs68Y
*/
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 */ 
const cardList = document.querySelectorAll('.deck li');
let cardArray = [];
 
addCards();

function addCards() {
    cardList.forEach(function(card) {
    card.addEventListener('click', function(event) {
        if (!card.classList.contains('open') && !card.classList.contains('show')) {
            cardArray.push(card);
            card.classList.add('open', 'show');
            
            //only show two cards at a time and compare the string array output
            checkMatches();
        };//end if       
 
    });//end listener  
     
});//end get cardList loop
}//end addCards function

/*
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
I need a loop for this.
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

function checkMatches() {
    if (cardArray.length == 2) {
            const presentChoice = cardArray[0]; //user 1 of 2 matches
            const pastChoice = cardArray[1]; //user 2 of 2 matches
 
            //see if cards match
            if (presentChoice.innerHTML === pastChoice.innerHTML) {
            //if match add match class   
            presentChoice.classList.add('match');
            pastChoice.classList.add('match');
            } 
            //flip the card i/o in 1 second
                setTimeout(function() {
                    cardArray.forEach(function(card) {  
                        card.classList.remove('open','show');
                    }); 
                    cardArray = []; //empty the array
                }, 1000); 
            }//end if cardArray.length match    
    //track moves
    trackMoves();
} //end checkMatches

// Add to counter call trackMoves()
/* reference:https://stackoverflow.com/questions/41683145/image-click-counter-event-listener-issues
/* reference: SEE EXAMPLE 20 -https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation!
/* reference: Event listener with anonymous function.
/* reference: Parent function example works- https://www.kirupa.com/html5/handling_events_for_many_elements.htm
/* reference: Switch literals https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/
*/
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
    //ADD IF STATEMENT IF NUMBER == BLAHBLAH CALL GAME OVER
}; //end trackMoves()

//showProgress - add stars based on # of matches
function showProgress() {
    if (document.getElementsByClassName('match').length == 4) {
        document.querySelector('.stars').innerHTML = str.repeat(1);
    } else if (document.getElementsByClassName('match').length == 8) {
        document.querySelector('.stars').innerHTML = str.repeat(2);
    } else if (document.getElementsByClassName('match').length == 12) {
        document.querySelector('.stars').innerHTML = str.repeat(3);
    } else if (document.getElementsByClassName('match').length == 16) { 
        document.querySelector('.stars').innerHTML = str.repeat(4);
    } else {
    // "default"
    }//end makeStar
}
 
// restart() the game
//Calling anonymous function
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
//you need to call an annonymous function: http://esbueno.noahstokes.com/post/77292606977/self-executing-anonymous-functions-or-how-to-write
//https://stackoverflow.com/questions/13412675/how-can-i-call-an-anonymous-function-from-inside-itself-in-javascript
//https://stackoverflow.com/questions/13013621/javascript-self-calling-anonymous-function-for-scope-closure
//https://stackoverflow.com/questions/8583548/calling-a-javascript-anonymous-function-right-when-its-declared-doesnt-work
//YOUR EXACT PROBLEM CARD RETURNS A LIST OF ELEMENTS:https://stackoverflow.com/questions/48142642/beginner-getting-addeventlistener-is-not-a-function-no-jquery
function restart() {
    const cards = document.getElementsByClassName('card');
    document.getElementsByClassName('number')[0].innerHTML= 0; //reset counter
    document.querySelector('.stars').innerHTML = '';//reset star progress
    document.querySelector('.deck').innerHTML = '';//remove cards
    makeDeck();
    for(var i=0; i < cards.length; i++) {
        cards[i].onclick = function(event)
        {
            addCards(cards);
        }
    }     
}  
// function GameOver() {
// //works but only when the page first loads, change line 130 to all children of the deck.
//     const card = document.querySelectorAll('.deck li');
//     const GameOver = card.innerHTML='match';
//     alert('game over try again?');
// }
// GameOver();