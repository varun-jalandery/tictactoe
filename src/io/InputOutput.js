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
            let output = '';
            this.writer.write(GameManager.getBoardDrawing());
            if (result === false) {
                output += gameFlow.getError();
            }
            if (GameManager.isGameComplete()) {
                this.writer.write(GameManager.getGame().getResults());
                process.exit(0);
            }
            output += gameFlow.getPrompt();
            this.writer.write(output + '\n');
        });
    }
}

module.exports = InputOutput;
