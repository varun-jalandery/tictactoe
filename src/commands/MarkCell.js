const util = require('util');
const BaseCommand = require('./BaseCommand');

class MarkCell extends BaseCommand {
    constructor() {
        super(false);
    }

    execute(input) {
        if (!this.isValidInput(input)) {
            return false;
        }
        const output = this.gameManager.getGame().markCell(parseInt(input, 10));
        if (output === true) {
            return true;
        }
        this.error = output;
        return false;
    }

    isValidInput(input) {
        if (isNaN(input)) {
            this.error = 'Please enter a valid number';
            return false;
        }
        return true;
    }

    getPrompt() {
        const currentPlayer = this.gameManager.getGame().getCurrentPlayer();
        return util.format(
            super.getPrompt(),
            currentPlayer.name,
            currentPlayer.symbol
        );
    }

    isBoardToBeDrawn() {
        return true;
    }
}

module.exports = MarkCell;
