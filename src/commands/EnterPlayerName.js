const BaseCommand = require('./BaseCommand');

class EnterPlayerName extends BaseCommand {
    constructor(playerNumber) {
        super(true);
        this.playerNumber = playerNumber;
    }

    execute(input) {
        if (!this.isValidInput(input)) {
            return false;
        }
        this.gameManager.getGame().setPlayer(this.playerNumber, input);
        return true;
    }

    isValidInput(input) {
        if (!input && typeof input !== 'string') {
            this.error = 'Please enter a valid name.';
            return false;
        }
        return true;
    }
}
module.exports = EnterPlayerName;
