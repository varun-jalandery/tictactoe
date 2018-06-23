const util = require('util');
const Cell = require('./Cell');

const STREAK_LENGTH = 3;

class Board {
    constructor(size) {
        this.initBoard(size);
    }

    initBoard(size) {
        if (!this.isSizeValid(size)) {
            throw new Error(
                util.formar('size is not valid, %s', JSON.stringify(size))
            );
        }
        this.size = parseInt(size, 10);
        this.cells = [];
        this.initCells();
        this.numberOfCells = Math.pow(this.size, 2);
        this.numberOfCellsOccupied = 0;
    }

    isSizeValid(size) {
        return !isNaN(size);
    }

    initCells() {
        for (let rowNum = 0; rowNum < this.size; rowNum++) {
            for (let colNum = 0; colNum < this.size; colNum++) {
                if (!this.cells[rowNum]) {
                    this.cells[rowNum] = [];
                }
                this.cells[rowNum][colNum] = new Cell(
                    this.getCellNumber(rowNum, colNum)
                );
            }
        }
    }

    getCell(cellNumber) {
        if (cellNumber > this.numberOfCells || cellNumber < 1) {
            return false;
        }
        const rowNum = Math.ceil(cellNumber / this.size) - 1;
        const colNum = (cellNumber - 1) % this.size;
        if (this.cells[rowNum] && this.cells[colNum]) {
            return this.cells[rowNum][colNum];
        }
        return false;
    }

    markCell(cellNumber, symbol) {
        const cell = this.getCell(cellNumber);
        if (cell === false) {
            return util.format('No such cell number : %s', cellNumber);
        }
        if (!cell.isAvailable()) {
            return util.format(
                'Cell number : %s is already marked',
                cellNumber
            );
        }
        cell.setSymbol(symbol);
        this.numberOfCellsOccupied += 1;
        return true;
    }

    getCellNumber(rowNumber, columnNumber) {
        return this.size * rowNumber + columnNumber + 1;
    }

    isBoardFull() {
        return this.numberOfCells <= this.numberOfCellsOccupied;
    }

    isWinningStreakOccurringAroundCell(cellNumber) {
        return false;
    }

    getBoardDrawing() {
        const pad = function(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width
                ? n
                : new Array(width - n.length + 1).join(z) + n;
        };
        let str = '\n\n';
        const padLength = this.numberOfCells.toString().length;
        for (let rowNum = 0; rowNum < this.size; rowNum++) {
            for (let colNum = 0; colNum < this.size; colNum++) {
                const value = this.cells[rowNum][colNum].value;
                str += pad(value, padLength, ' ');
                if (colNum < this.size - 1) {
                    str += ' | ';
                }
            }
            str += '\n';
            if (rowNum < this.size - 1) {
                str +=
                    '-'.repeat(this.size * (padLength + 3) - padLength) + '\n';
            }
        }
        return str + '\n\n';
    }
}

module.exports = Board;
