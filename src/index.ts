import {Board, Cell} from "./board";

// Constants
const width = 100;
const height = 50;

const starting_probability = 0.3;

const framerate = 3;

var board: Board;

// Setup function is run once
function setup() {
    board = new Board(width, height);
    board.initializeRandom(starting_probability);
}

// Draw function is run every frame
function draw() {
    board.advanceFrame();
    console.clear();
    console.log(board.render());
}


// Function for looping any other function on a set timer
function loop(f: () => any, i: number) {
    f();
    setTimeout(loop, i, f, i);
}

function main() {
    setup();
    loop(draw, 1000 / framerate);
}







main();
