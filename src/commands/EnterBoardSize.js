const BaseCommand = require('./BaseCommand');

class EnterBoardSize extends BaseCommand {
    constructor() {
        super(true);
    }

    execute(input) {
        if (!this.isValidInput(input)) {
            return false;
        }
        this.gameManager.getGame().setBoard(parseInt(input));
        return true;
    }

    isValidInput(input) {
        if (isNaN(input)) {
            this.error = 'Please enter a valid number.';
            return false;
        }
        return true;
    }
}
module.exports = EnterBoardSize;
