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
            row: Math.ceil(cellNumber / this.size) - 1,
            col: (cellNumber - 1) % this.size
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
        if (this.checkStraightStreaks(cellNumber, symbol, 'row')) {
            return true;
        }
        if (this.checkStraightStreaks(cellNumber, symbol, 'col')) {
            return true;
        }

        if (this.checkDiagnalOne(cellNumber, symbol)) {
            return true;
        }

        return this.checkDiagnalTwo(cellNumber, symbol);
    }

    checkStraightStreaks(cellNumber, symbol, orientation) {
        let rowOffset = 0;
        let colOffset = 0;
        if (orientation === 'row') {
            rowOffset = 1;
        } else {
            colOffset = 1;
        }
        let result = false;
        const coordinate = this.getCoordinate(cellNumber);
        const isLeftTopStreakPossible =
            coordinate[orientation] >= STREAK_LENGTH - 1;
        const isCenterStreakPossible =
            coordinate[orientation] >= 1 &&
            coordinate[orientation] < this.size - 1;
        const isRightBottomStreakPossible =
            coordinate[orientation] <= this.size - STREAK_LENGTH;

        if (isLeftTopStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row - rowOffset][
                    coordinate.col - colOffset
                ].value,
                this.cells[coordinate.row - 2 * rowOffset][
                    coordinate.col - 2 * colOffset
                ].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isCenterStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row - rowOffset][
                    coordinate.col - colOffset
                ].value,
                this.cells[coordinate.row + rowOffset][
                    coordinate.col + colOffset
                ].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isRightBottomStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row + rowOffset][
                    coordinate.col + colOffset
                ].value,
                this.cells[coordinate.row + 2 * rowOffset][
                    coordinate.col + 2 * colOffset
                ].value
            ].every(val => val == symbol);
        }
        return result;
    }

    checkDiagnalOne(cellNumber, symbol) {
        let result = false;
        const coordinate = this.getCoordinate(cellNumber);
        const isDownStreakPossible =
            coordinate.row <= this.size - STREAK_LENGTH &&
            coordinate.col <= this.size - STREAK_LENGTH;
        const isTopStreakPossible =
            coordinate.row >= STREAK_LENGTH - 1 &&
            coordinate.col >= STREAK_LENGTH - 1;
        const isCenterStreakPossible =
            coordinate.col > 0 &&
            coordinate.row > 0 &&
            coordinate.col < this.size - 1 &&
            coordinate.row < this.size - 1;

        if (isDownStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row + 1][coordinate.col + 1].value,
                this.cells[coordinate.row + 2][coordinate.col + 2].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isTopStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row - 1][coordinate.col - 1].value,
                this.cells[coordinate.row - 2][coordinate.col - 2].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isCenterStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row + 1][coordinate.col + 1].value,
                this.cells[coordinate.row - 1][coordinate.col - 1].value
            ].every(val => val == symbol);
        }
        return result;
    }

    checkDiagnalTwo(cellNumber, symbol) {
        let result = false;
        const coordinate = this.getCoordinate(cellNumber);

        const isDownStreakPossible =
            coordinate.col >= STREAK_LENGTH - 1 &&
            coordinate.row <= this.size - STREAK_LENGTH;
        const isTopStreakPossible =
            coordinate.col <= this.size - STREAK_LENGTH &&
            coordinate.row >= STREAK_LENGTH - 1;
        const isCenterStreakPossible =
            coordinate.row > 0 &&
            coordinate.row < this.size - 1 &&
            coordinate.col > 0 &&
            coordinate.col < this.size - 1;

        if (isDownStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row + 1][coordinate.col - 1].value,
                this.cells[coordinate.row + 2][coordinate.col - 2].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isTopStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row - 1][coordinate.col + 1].value,
                this.cells[coordinate.row - 2][coordinate.col + 2].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isCenterStreakPossible) {
            result = [
                this.cells[coordinate.row][coordinate.col].value,
                this.cells[coordinate.row + 1][coordinate.col - 1].value,
                this.cells[coordinate.row - 1][coordinate.col + 1].value
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
