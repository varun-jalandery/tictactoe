const Board = require('./Board');
const Player = require('./Player');

class Game {
    constructor() {
        this.currentPlayer = null;
        this.player1 = null;
        this.player2 = null;
        this.board = null;
    }

    setBoard(size) {
        this.board = new Board(size);
    }

    getBoard() {
        return this.board;
    }

    setPlayer(number, name) {
        switch (number) {
            case 1:
                this.player1 = new Player(number, name, 'x');
                this.currentPlayer = this.player1;
                break;

            case 2:
                this.player2 = new Player(number, name, 'o');
                break;

            default:
                break;
        }
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    switchPlayer() {
        if (this.getCurrentPlayer() === this.player1) {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
    }

    markCell(cellNumber) {
        const output = this.board.markCell(cellNumber, this.getCurrentPlayer().symbol);
        if (output === true) {
            return true;
        }
        return output;
    }
}

module.exports = Game;
