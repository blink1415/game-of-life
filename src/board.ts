export class Cell {
    // Current and next status
    status: boolean;

    // This is used to keep track of the next status, so we can store this value without interfering with subsequent cells' calculation of next status
    next_status = false; 


    // Neighbouring cells
    neighbours: Cell[];

    constructor(P: number) {
        // Randomly sets starting value
        this.status = Math.random() > 1 - P;
        this.neighbours = [];
    }

    // Gets the status of the cell for the next frame
    nextStatus(): boolean {
        let alive_neighbours = this.countNeighbours();
        // A cell dies if it has fewer than 2 or more than 3 neighbours. It also stays dead if it only has 2 neighbours.
        return (
            (alive_neighbours == 2 && this.status) || // Any alive cell with two neighbours stay alive
            (alive_neighbours == 3)                   // All cells with three neighbours are alive the next frame, regardless of status
        );
    }

    countNeighbours() {
        let alive_neighbours = 0;

        // Counts number of alive neighbours
        this.neighbours.forEach(n => {
            if(n.status) {
                alive_neighbours++;
            }
        });

        return alive_neighbours;
    }
}


export class Board {
    // Dimensions
    w: number;
    h: number;

    // The board itself
    board: Cell[][];

    constructor(w: number, h: number) {
        this.w = w;
        this.h = h;
        this.board = [];
    }

    // Initializes the board with each cell having a random probability of starting alive
    initializeRandom(P: number) {
        for(let y = 0; y < this.h; y++) {
            this.board.push([]);
            for(let x = 0; x < this.w; x++) {
                // Makes a new cell
                this.board[y].push(new Cell(P));

                // Builds a neighbour relation between the new cell and the previous neighbouring cells
                if(x - 1 >= 0) {
                    this.board[y][x].neighbours.push(this.board[y][x - 1]);
                    this.board[y][x - 1].neighbours.push(this.board[y][x]);
                }
                if(y - 1 >= 0) {
                    this.board[y][x].neighbours.push(this.board[y - 1][x]);
                    this.board[y - 1][x].neighbours.push(this.board[y][x]);
                }
                if(x - 1 >= 0 && y - 1 >= 0) {
                    this.board[y][x].neighbours.push(this.board[y - 1][x - 1]);
                    this.board[y - 1][x - 1].neighbours.push(this.board[y][x]);
                }
            }
        }
    }

    // Returns a grid of dots and @s
    render(): string {
        let output = "";
        for(let y = 0; y < this.h; y++) {
            output += "\n";
            for(let x = 0; x < this.w; x++) {
                if(this.board[y][x].status){
                    // output += this.board[y][x].countNeighbours().toString();
                    output += "@";
                }
                else {
                    output += "·";
                }
            }
        }

        return output;
    }

    // Calculates and executes changes to advance a frame
    advanceFrame() {
        // Calculate each cell's next state
        for(let y = 0; y < this.h; y++) {
            for(let x = 0; x < this.w; x++) {
                this.board[y][x].next_status = this.board[y][x].nextStatus();
            }
        }
        // Change each cell to their next state
        for(let y = 0; y < this.h; y++) {
            for(let x = 0; x < this.w; x++) {
                this.board[y][x].status = this.board[y][x].next_status;
            }
        }
    }
}