const Game = require('./Game');

const game = new Game();

class GameManager {
    static getGame() {
        return game;
    }
}
module.exports = GameManager;
