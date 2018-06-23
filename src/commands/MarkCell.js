const util = require('util');
const BaseCommand = require('./BaseCommand');

class MarkCell extends BaseCommand {
    constructor() {
        super(false);
    }

    execute(input) {
        console.log('MarkCell.execute()');
        if (!this.isValidInput(input)) {
            console.log('MarkCell.execute() Input is invalid');
            return false;
        }
        console.log('commands/MarkCell input is valid');
        const output = this.gameManager.getGame().markCell(parseInt(input, 10));
        console.log('Output of Game.markCell()', output);
        if (output === true) {
            this.gameManager.getGame().switchPlayer();
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
}

module.exports = MarkCell;
