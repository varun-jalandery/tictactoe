const EnterPlayerName = require('./commands/EnterPlayerName');
const EnterBoardSize = require('./commands/EnterBoardSize');
const MarkCell = require('./commands/MarkCell');

class GameFlow {
    constructor() {
        this.currentStep = null;
        this.initFlow();
    }

    initFlow() {
        const enterYourNamePlayer1 = new EnterPlayerName(1);

        //set first step
        this.currentStep = enterYourNamePlayer1;

        const enterYourNamePlayer2 = new EnterPlayerName(2);
        const enterBoardSize = new EnterBoardSize();
        const markCell = new MarkCell();
        markCell.setPrompt("%s, choose a box to place an '%s' into:");

        enterYourNamePlayer1.setPrompt('Enter name for Player 1:');
        enterYourNamePlayer1.setNext(enterYourNamePlayer2);

        enterYourNamePlayer2.setPrompt('Enter name for Player 2:');
        enterYourNamePlayer2.setNext(enterBoardSize);

        enterBoardSize.setPrompt('Enter board size:');
        enterBoardSize.setNext(markCell);
    }

    execute(input) {
        let output = this.getCurrentStep().execute(input);
        if (output !== false && this.currentStep.isOneTimeCommand()) {
            this.currentStep = this.getCurrentStep().next;
        }
        return output;
    }

    getCurrentStep() {
        return this.currentStep;
    }

    getError() {
        return this.getCurrentStep().getError();
    }

    getPrompt() {
        return this.getCurrentStep().getPrompt();
    }

}

module.exports = GameFlow;
