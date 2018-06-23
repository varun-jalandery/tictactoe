const GameManager = require('../GameManager');

class BaseCommand {
    constructor(isOneTimeCommand) {
        this.gameManager = GameManager;
        this.isOneTmCmd = isOneTimeCommand;
        this.next = null;
        this.prompt = null;
        this.error = null;
    }

    setNext(next) {
        this.next = next;
    }

    setPrompt(prompt) {
        this.prompt = prompt;
    }

    getPrompt() {
        return this.prompt;
    }

    getError() {
        const error = this.error;
        this.error = null;
        return error;
    }

    isOneTimeCommand() {
        return this.isOneTmCmd;
    }

    isBoardToBeDrawn() {
        return false;
    }
}

module.exports = BaseCommand;
