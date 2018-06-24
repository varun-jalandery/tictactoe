const util = require('util');
const Cell = require('./Cell');
const StreakCheckStraight = require('./StreakCheckStraight');
const StreakCheckDiagonal = require('./StreakCheckDiagonal');

class Board {
    constructor(size) {
        this.initBoard(size);
    }

    initBoard(size) {
        if (!this.isSizeValid(size)) {
            throw new Error(
                util.format('size is not valid, %s', JSON.stringify(size))
            );
        }
        this.size = parseInt(size, 10);
        this.cells = [];
        this.initCells();
        this.numberOfCells = Math.pow(this.size, 2);
        this.numberOfCellsOccupied = 0;
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

    isWinningStreakOccurringAroundCell(cellNumber, symbol) {
        if (cellNumber < 1 && cellNumber > this.numberOfCells) {
            return false;
        }
        const coordinate = this.getCellCoordinate(cellNumber);
        return (
            StreakCheckStraight.isWinningStreak(
                this.size,
                this.cells,
                coordinate,
                symbol
            ) ||
            StreakCheckDiagonal.isWinningStreak(
                this.size,
                this.cells,
                coordinate,
                symbol
            )
        );
    }

    getCell(cellNumber) {
        if (cellNumber > this.numberOfCells || cellNumber < 1) {
            return false;
        }
        const coordinate = this.getCellCoordinate(cellNumber);
        if (this.cells[coordinate.row] && this.cells[coordinate.col]) {
            return this.cells[coordinate.row][coordinate.col];
        }
        return false;
    }

    getCellNumber(rowNumber, columnNumber) {
        return this.size * rowNumber + columnNumber + 1;
    }

    getCellCoordinate(cellNumber) {
        return {
            row: Math.ceil(cellNumber / this.size) - 1,
            col: (cellNumber - 1) % this.size
        };
    }

    isSizeValid(size) {
        return !isNaN(size);
    }

    isBoardFull() {
        return this.numberOfCells <= this.numberOfCellsOccupied;
    }

    getNumberOfCells() {
        return this.numberOfCells;
    }

    getNumberOfCellsOccupied() {
        return this.numberOfCellsOccupied;
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
