const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let previousHole;

//Get random time to be applied to moles popping up

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//pick a random hole for every time a mole pops up
function randomHole(holes) {
    const index = Math.round(Math.random() * holes.length)

    const hole = holes[index];

    if (hole === previousHole) {
        return randomHole(holes);
    }

    previousHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(50, 2000);
    const hole = randomHole(holes);
    hole.classList.add('up');
}
