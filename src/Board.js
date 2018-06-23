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
                util.format('size is not valid, %s', JSON.stringify(size))
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
        const coordinate = this.getCoordinate(cellNumber);
        if (this.cells[coordinate.row] && this.cells[coordinate.col]) {
            return this.cells[coordinate.row][coordinate.col];
        }
        return false;
    }

    getCoordinate(cellNumber) {
        return {
            row : Math.ceil(cellNumber / this.size) - 1,
            col : (cellNumber - 1) % this.size
        };
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

    isWinningStreakOccurringAroundCell(cellNumber, symbol) {
        if (cellNumber < 1 && cellNumber > this.numberOfCells) {
            return false;
        }
        return this.checkStreaks(cellNumber, symbol);
    }

    checkStreaks(cellNumber, symbol) {
        if(this.checkRowStreaks(cellNumber, symbol)) {
            return true;
        }
        return this.checkColStreaks(cellNumber, symbol);
    }

    checkRowStreaks(cellNumber, symbol) {
        let result = false;
        const coordinate = this.getCoordinate(cellNumber);
        const isLeftStreakPossible = coordinate.col >= STREAK_LENGTH - 1;
        const isCenterStreakPossible = coordinate.col >= 1 && coordinate.col < this.size - 1;
        const isRightStreakPossible = coordinate.col <= this.size - STREAK_LENGTH;

        if (isLeftStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row][coordinate.col - 1].value,
                this.cells[coordinate.row][coordinate.col - 2].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isCenterStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row][coordinate.col - 1].value,
                this.cells[coordinate.row][coordinate.col + 1].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isRightStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row][coordinate.col + 1].value,
                this.cells[coordinate.row][coordinate.col + 2].value
            ].every(val => val == symbol);
        }
        return result;
    }

    checkColStreaks(cellNumber, symbol) {
        let result = false;
        const coordinate = this.getCoordinate(cellNumber);
        const isTopStreakPossible = coordinate.row >= STREAK_LENGTH - 1;
        const isCenterStreakPossible = coordinate.row >= 1 && coordinate.row < this.size - 1;
        const isBottomStreakPossible = coordinate.row <= this.size - STREAK_LENGTH;

        if (isTopStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row - 1][coordinate.col].value,
                this.cells[coordinate.row - 2][coordinate.col].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isCenterStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row - 1][coordinate.col].value,
                this.cells[coordinate.row + 1][coordinate.col].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isBottomStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row + 1][coordinate.col].value,
                this.cells[coordinate.row + 2][coordinate.col].value
            ].every(val => val == symbol);
        }
        return result;
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
