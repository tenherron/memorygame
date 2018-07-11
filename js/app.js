/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
const cardList = document.querySelectorAll('.deck li');
let cardArray = [];

cardList.forEach(function(card) {
    card.addEventListener('click', function(event) {
        
        //console.log("card", cardArray.length);
        //flip the card i/o
        cardArray.push(card);
        card.classList.add('open', 'show');
//only show two cards at a time
        if (cardArray.length == 2) {
        //flip the card i/o in 1 second
            setTimeout(function() {
                cardArray.forEach(function(card) {  
                    card.classList.remove('open','show');
                }); 
                cardArray = []; //empty the array
            }, 1000);       
        }  
    });  

});





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */