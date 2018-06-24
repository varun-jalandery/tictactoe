const assert = require('chai').assert;
const expect = require('chai').expect;

const Board = require('../../../src/Board/Board');

describe('src/Board/Board', () => {

    it('Board of size 5 should be constructed with 25 cells', done => {
        const board = new Board(5);
        assert.equal(board.getNumberOfCells(), 25, 'getNumberOfCells() should return 25');
        done();
    });

    it('Board should not be constructed with illegal size', done => {
        expect(() => new Board('ILLEGAL_SIZE')).to.throw('size is not valid, "ILLEGAL_SIZE"')
        done();
    });

    it('Newly constructed board should have cells serially valued', done => {
        const boardSize = 5;
        const board = new Board(boardSize);
        let serialCounter = 0;
        for (let rowNum = 0; rowNum < boardSize; rowNum++) {
            for (let colNum = 0; colNum < boardSize; colNum++) {
                ++serialCounter;
                assert.equal(
                    board.cells[rowNum][colNum].value,
                    serialCounter,
                    `cell[${rowNum}][${colNum}] should have value ${serialCounter}`);
            }
        }
        done();
    });

    it('getCellCoordinate() should return correct coordinates', done => {
        const board = new Board(5);

        let coordinate = board.getCellCoordinate(1);
        assert.equal(coordinate.row, 0, 'cell number 1 should have row equal to 1');
        assert.equal(coordinate.col, 0, 'cell number 1 should have col equal to 1');

        coordinate = board.getCellCoordinate(14);
        assert.equal(coordinate.row, 2, 'cell number 14 should have row equal to 2');
        assert.equal(coordinate.col, 3, 'cell number 14 should have row equal to 3');

        coordinate = board.getCellCoordinate(25);
        assert.equal(coordinate.row, 4, 'cell number 25 should have row equal to 4');
        assert.equal(coordinate.col, 4, 'cell number 25 should have row equal to 4');

        done();
    });


    it('getCellNumber() should return correct cellNumber', done => {
        const board = new Board(5);
        let cellNumber = board.getCellNumber(0, 0);
        assert.equal(cellNumber, 1, 'row 0, col 0 should return cell number 1');

        cellNumber = board.getCellNumber(2, 3);
        assert.equal(cellNumber, 14, 'row 2, col 3 should return cell number 14');

        cellNumber = board.getCellNumber(4, 4);
        assert.equal(cellNumber, 25, 'row 4, col 4 should return cell number 25');

        done();
    });

    it('getCell() should return the correct cell', done => {
       const board = new Board(5);
       const cellOne = board.getCell(1);
       const cellFifteen = board.getCell(15);

       assert.equal(cellOne.getValue(), 1), 'cell[0][0] should have value 1';
       assert.equal(cellFifteen.getValue(), 15, 'cell[2][4] should have value 15');
       assert.equal(board.getCell(26), false, 'cell 26 does not exist and getCell() should return false');
       done();
    });

    it('markCell() should mark cells correctly', done => {
        const board = new Board(5);
        assert.equal(board.markCell(1, 'x'), true, 'markCell(1) should return true');
        assert.equal(board.markCell(14, 'o'), true, 'markCell(1) should return true');
        assert.equal(board.markCell(25, 'x'), true, 'markCell(1) should return true');

        assert.equal(board.markCell(26, 'x'), 'No such cell number : 26', 'markCell(26) should not mark non-existing cells');
        assert.equal(board.markCell(25, 'x'), 'Cell number : 25 is already marked', 'markCell(25) should not mark occupied cells');

        assert.equal(board.getCell(1).getValue(), 'x', 'cell 1 should have symbol x');
        assert.equal(board.getCell(14).getValue(), 'o', 'cell 1 should have symbol o');
        assert.equal(board.getCell(25).getValue(), 'x', 'cell 1 should have symbol x');
        done();
    });

    it('isBoardFull() should return true if all cells have been occupied by players', done => {
        const board = new Board(3);
        // completely fill the board with x and o alternately
        for (let i = 1; i <= 9; i++) {
            board.markCell(i, i % 2 === 0 ? 'x': 'o');
        }
        assert.equal(board.isBoardFull(), true, '3x3 board should be full after 9 moves.');
        done();
    });

    it('getNumberOfCellsOccupied() should return n after n moves', done => {
        const board = new Board(3);
        // fill the board with 7 moves with x and 0 alternately
        for (let i = 1; i <= 7; i++) {
            board.markCell(i, i % 2 === 0 ? 'x': 'o');
        }
        assert.equal(board.getNumberOfCellsOccupied(), 7, 'After seven moves, number of occupied cells should be 7');
        done();
    });

});
