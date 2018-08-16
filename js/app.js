//Create a list that holds all of your cards
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
/* 
 * MAKE DECK
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

// cards.addEventListener('click', function() {
//     console.log('Success!');});
//document.getElementsByTagName returns a NodeList of DOM elements. 
//Each element has an addEventListener function, but the array doesn't have one.

// cards.forEach(card => card.addEventListener('click', function(event) {
//         displayCard(); 
//         })); //end event listener


// //Loop over it:

// function displayCard2 (){
//     var cards = document.getElementsByTagName('card');
//     for (var i=0;i<aTags.length;i++){
//         addEvent(aTags[i], 'click', alertWinner);
//     }
// }

// Display cards by setting up an event listener and then checkMatches when cards are flipped.
///--- I don't think I need this anymore const cardList = document.querySelectorAll('.deck li'); 

cardContainer.addEventListener('click', function (event) {
    const clickTarget = event.target;
    if (!clickTarget.classList.contains('open') && !clickTarget.classList.contains('show')) {
       displayCard(clickTarget); //displayCard() called
    }
})

function displayCard(clickTarget) {
 //console.log('i am a card!');
    cardArray.push(clickTarget);
    clickTarget.classList.add('open', 'show');
    checkMatches(); //compare cards
} 

// function displayCard() {
//     cardList.forEach(function(card) {
//         card.addEventListener('click', function(event) {
//             if (!card.classList.contains('open') && !card.classList.contains('show')) {
//             cardArray.push(card);
//             card.classList.add('open', 'show');
//             checkMatches(); //compare cards
//             } 
//         }); //end event listener
//     });//end loop over cardlist

// } //end displayCard()
// displayCard();

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
        youWin();
    } else {
    // "default"
    }//end makeStar
}
 
//restart() the game
function restart() {
    document.getElementsByClassName('number')[0].innerHTML= 0; //reset counter
    document.querySelector('.stars').innerHTML = '';//reset star progress
    cardContainer.innerHTML = '';//remove cards
    makeDeck();//add cards

///PROBLEM EVENT HANDLER IS ERASED SO I AM UNABLE TO RUN DISPLAY CARD I THINK DUE TO SCOPING.
}

//gameOver - 2 parameters - Try Again or Winner

function gameOver(){
    getModal();
}

//Try Again
function getModal() {
    const modal = document.querySelector('#modal1');
    if (modal.classList.contains('showModal')) {
        modal.classList.remove('showModal');
    } else {
        modal.classList.add('showModal');
    }
}
//Winner
function youWin(){
    const modal = document.querySelector('#modal2');
    if (modal.classList.contains('showModal')) {
        modal.classList.remove('showModal');
    } else {
        modal.classList.add('showModal');
    }
}

    ///get rid of lines 48 through 160 then tyr code again from RS website and then assign a variable to the displayCard function. and call the variable from the event handleer.

    // const cards = document.querySelectorAll('li.card');//get card node list
    // Array.from(cards)
    // .forEach(addEvent)
    // function addEvent(cards) {
    //     cards.addEventListener('click', displayCard, false)

    //     if (!card.classList.contains('open') && !card.classList.contains('show')) {
    //     cardArray.push(card);
    //     card.classList.add('open', 'show');
    //     checkMatches(); //compare cards
    //     } 

    //     } //end event reassignment


    //cardArray = [];----------->placeholder I don't think this is needed.

    //Issue with event handler after calling displayCard() below. 
    //The event listener are loss when the HTML table is rebulit.
    //https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    //***eventListener.handleEvent(event);
    //does not work - card.onclick = displayCard;
//}//end restart ();

    // 

// cardList.forEach(function(card) {
//         if (!card.classList.contains('open') && !card.classList.contains('show')) {
//             cardArray.push(card);
//             if(cardArray.length == 2){
//              card.classList.add('open', 'show');
//             const presentChoice = cardArray[0]; //user 1 of 2 matches
//             const pastChoice = cardArray[1]; //user 2 of 2 matches 
//             }
                      
//             //only show two cards at a time and compare the string array output
//             checkMatches();

//         };//end if       
     
// });//end get cardList loop 
    
    // const cards = document.querySelectorAll('li.card');//get card node list
    // Array.from(cards)
    // .forEach(addEvent)
    // function addEvent(cards) {
    //     cards.addEventListener('click', callback)
    //         callback(addIcons);
    //      //callback
    //     }
    // }; 
   
    // function addEventListenerByClass(className, event, fn) {
        
    //     for(var i=0; i < cards.length; i++) {
    //     cards[i].addEventListener(event, fn, true);
    //     }//add event listener back to cards
    // }
    // addEventListenerByClass('card', 'click', addIcons);
 

/* REFERENCES:
 * MAKE DECK
 *   - reference https://www.bbntimes.com/en/technology/the-power-of-javascript-template-literals
 *   - reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 
 *   GET ALL MOVES
 *   - reference http://www.nickang.com/add-event-listener-for-loop-problem-in-javascript/
 *   - reference https://developer.mozilla.org/en-US/docs/Web/API/EventListener
 *   - reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length
 *   - reference https://www.youtube.com/watch?v=_rUH-sEs68Y

 * SHUFFLE FUNCTIONS
 *   - reference // Shuffle function from http://stackoverflow.com/a/2450976
 
 * TRACK MOVES
 *   - reference:https://stackoverflow.com/questions/41683145/image-click-counter-event-listener-issues
 *   - reference: SEE EXAMPLE 20 -https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation!
 *   - reference: Event listener with anonymous function.
 *   - reference: Parent function example works- https://www.kirupa.com/html5/handling_events_for_many_elements.htm
 *   - reference: Switch literals https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/

 * RESTART
 *   - Calling anonymous function
 *   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
 *   - you need to call an annonymous function: http://esbueno.noahstokes.com/post/77292606977/self-executing-anonymous-functions-or-how-to-write
 *   - https://stackoverflow.com/questions/13412675/how-can-i-call-an-anonymous-function-from-inside-itself-in-javascript
 *   - https://stackoverflow.com/questions/13013621/javascript-self-calling-anonymous-function-for-scope-closure
 *   - https://stackoverflow.com/questions/8583548/calling-a-javascript-anonymous-function-right-when-its-declared-doesnt-work
 *   - YOUR EXACT PROBLEM CARD RETURNS A LIST OF ELEMENTS:https://stackoverflow.com/questions/48142642/beginner-getting-addeventlistener-is-not-a-function-no-jquery
 *   - Try this, turn the nodelist back into an array by using Array.from or Array.of and the try to call addIcons. Top you are using an array at the bottom it is a node list that looks like an array.
 *   - See this reference for solution - YES! https://stackoverflow.com/questions/12362256/addeventlistener-on-nodelist
 *   - see this reference also about using callback to call an anonymous function. http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/
 *   - https://www.jstips.co/en/javascript/passing-arguments-to-callback-functions/
 */