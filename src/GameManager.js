const Game = require('./Game');

const game = new Game();

class GameManager {
    static getGame() {
        return game;
    }

    static getBoardDrawing() {
        const board = GameManager.getGame().getBoard();
        if (board) {
            return board.getBoardDrawing();
        }
        return '';
    }

    static isGameComplete() {
        return game.isGameComplete();
    }
}
module.exports = GameManager;
