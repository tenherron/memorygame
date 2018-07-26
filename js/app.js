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
*/
let list = document.getElementsByClassName('deck')[0].childNodes;

const trackMoves = function() {
    for (let i = 0; i < list.length; i++){
        list[i].onclick = function() {
            let number = document.getElementsByClassName('number')[0].innerHTML;
            number++;
            document.getElementsByClassName('number')[0].innerHTML = number;};
    }
}; //end Add to counter call trackMoves()
 
// function GameOver() {
// //works but only when the page first loads, change line 130 to all children of the deck.
//     const card = document.querySelectorAll('.deck li');
//     const GameOver = card.innerHTML='match';
//     alert('game over try again?');
// }
// GameOver();

// function counter(){
//     let count = document.querySelectorAll('.match');
//     if (count.childElementCount > 0 ) {
//         //increment class = moves
//         console.log('count');
// }
    //increment and display counter after moves NOT MATCHES are detected.
    //how many moves?
    //pass in return CardArry from gettng a match.???
    //this should be a loop??
//}
//counter();
 
//SAMPLE FUNCTION CALL:https://www.tjvantoll.com/2013/03/14/better-ways-of-comparing-a-javascript-string-to-multiple-values/
/*if (fruit == 'banana' || fruit == 'lemon') {
    handleYellowFruit();
}*/
//1. read this https://ryanpcmcquen.org/javascript/2015/10/25/map-vs-foreach-vs-for.html
//2. Reset button?? https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_indexof_array

//let match = cardArray.filter(function(value, index, array) {return array.indexOf(value) == value;}); not working because it is empty??
//let match = cards.filter(function(value, index, array) {return array.indexOf(value) == index;}); --works
//let match = cards.filter(function(value, index, array) {return array.indexOf(value) == index;});