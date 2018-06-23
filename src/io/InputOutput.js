const readline = require('readline');
const GameManager = require('../GameManager');
const GameFlow = require('../GameFlow');
const gameFlow = new GameFlow();

class InputOutput {
    constructor() {
        this.setReader();
        this.setWriter();
    }

    setWriter() {
        this.writer = process.stdout;
        this.writer.write(gameFlow.getPrompt() + '\n');
    }

    setReader() {
        const reader = readline.createInterface({
            input: process.stdin
        });
        reader.on('line', input => {
            const result = gameFlow.execute(input);
            this.writer.write(GameManager.getBoardDrawing());
            if (result === false) {
                this.writer.write(gameFlow.getError() + '\n');
            }

            this.writer.write(gameFlow.getPrompt() + '\n');
        });
    }
}

module.exports = InputOutput;
