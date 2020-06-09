const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let updateScore = 0;

//Get a random time figure between the minimum and maximum value given
function randomTimes(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//Grabs whatever is passed (in this case, all the holes as a NODElist) and returns a random hole from it

function randomHole(holes) {
    //IDX gets a random number between 1 and 6 as the length of holes is 6 as it has 6 elements
    const idx = Math.floor(Math.random() * holes.length);

    //hole has assigned to it a randomly indexed hole each time, as it has idx on the end (which will be between 1 and 6) and returns the 
    //hole that matches that index
    const hole = holes[idx];

    //If the next hole is the same as the hole that appeared when we ran before, using recursion just run the function again
    if (hole === lastHole) {
        console.log(' Repeat');
        return randomHole(holes);
    }

    //lastHole stores the current run hole, so that when the function is next run, it has the previous hole stored (see above)
    lastHole = hole;
    return hole;
}

function peep() {
    //assign a random time to TIME and assign a random hole to HOLE each time this function runs
    const time = randomTimes(20, 1000);
    const hole = randomHole(holes);

    //Add the 'up' class to the hole in question, which makes the mole pop up with CSS
    hole.classList.add('up');

    //Timeout === do something AFTER a certain amount of time. In this case, remove the up class after a random time from the 
    //TIME variable, which will make the mole go down again
    setTimeout(() => {
        hole.classList.remove('up')
        //If the timeUp variable is set to the opposite (true), stop running the peep() function. Otherwise, run peep (recursion)
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    //Reset scoreboard
    scoreBoard.textContent = 0;
    //Make sure timeUp is reset to false so the game can start
    timeUp = false;
    //Run the game with peep
    peep();
    //Reset previous score
    updateScore = 0;
    //After 10 seconds, turn timeUp to true to stop the game after 10 seconds!! The 'game over' code
    setTimeout(() => timeUp = true, 10000);
}

//Everytime you successfully catch a mole by clicking on it, it goes down and a point is added to the scoreboard
function bonk(e) {
    console.log(e);
    //The anti-cheat code! Stops any unauthentic clicks from counting
    if (!e.isTrusted) return;
    //Increase score by 1
    updateScore++;
    //Remove the up class from the clicked mole making it go back down
    this.classList.remove('up');
    //Update the scoreboard with the new score value
    scoreBoard.textContent = updateScore;
}

//Add event listener to each mole and run the bonk function when clicked
moles.forEach(mole => mole.addEventListener('click', bonk));





//MY ATTEMPT
// let interval;
// let randomDownInterval = Math.floor(Math.random() * 600) + 100;
// let randomUpInterval = Math.floor(Math.random() * 900) + 300;
// let score = document.querySelector('.score');
// let updateScore = 0;
// let timeOut = 0;
// let gameCounter = 10;

// function startGame() {
//     let timer = setInterval(function () {
//         gameCounter -= 1;
//     }, 1000);

//     if (gameCounter == 0) {
//         clearInterval(timer);
//     }

//     holes.forEach(hole => {
//         setInterval(moleUp, randomUpInterval);
//         setInterval(moleDown, randomDownInterval);
//     })
// }


// function moleUp() {
//     holes.forEach(hole => {
//         hole.classList.add('up');
//     })
// }

// moles.forEach(mole => {
//     mole.addEventListener('click', function () {
//         updateScore += 1;
//         score.textContent = updateScore;
//     })
// })

// function moleDown() {
//     holes.forEach(mole => {
//         mole.classList.remove('up');
//     });
// }
