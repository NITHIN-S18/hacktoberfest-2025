const randomNumber= parseInt((Math.random()*100)+1);
const submit= document.querySelector(".submit");
const userInput= document.querySelector("#number");
const guesses= document.querySelector(".attempts");
const lastGuess= document.querySelector(".lastGuess span");
const lowOrHigh = document.querySelector(".lowOrHigh");

let prevGuess=[];
let numGuess=0;
let playGame= true;
if (playGame){
    submit.addEventListener('click',function (e){
        e.preventDefault();
        let guess=parseInt(userInput.value);
        validateGuess(guess);
    })
};


function validateGuess(guess){
    if(isNaN(guess)){
        alert("Please enter a valid input");
    }
    else if(guess<1){
        alert("Enter between 1-100");
    }
    else if(guess>100){
        alert("Enter between 1-100");
    }
    else{
        prevGuess.push(guess);
        displayGuess(guess);
        checkGuess(guess);
    }
};
function checkGuess(guess){
    if (guess === randomNumber){
        displayMessage('Congrats! You guessed it right');
    }
    else if (guess<randomNumber){
        displayMessage('Try higher numbers!');
    }
    else if (guess>randomNumber){
        displayMessage('Try lower numbers!');
    }
};
function displayGuess(guess){
    userInput.value='';
    numGuess++;
    guesses.textContent=`Guess Attempts:${numGuess}`;
    lastGuess.textContent = `${guess}`;
};
function displayMessage(message){
    lowOrHigh.innerHTML=`<h2>${message}</h2>`;
};