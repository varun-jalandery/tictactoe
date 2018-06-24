const assert = require('chai').assert;

const Board = require('../../../src/Board/Board');
const StreakCheckStraight = require('../../../src/Board/StreakCheckStraight');

describe('src/Board/StreakCheckStraight : isWinningStreak()', () => {

    it('should return false if no winning streak is formed', done => {
        const board = new Board(10);
        board.markCell(41, 'x');
        board.markCell(42, 'x');
        board.markCell(32, 'x');
        assert.equal(
            StreakCheckStraight.isWinningStreak(10, board.cells, board.getCellCoordinate(32), 'x'),
            false
        );
        done();
    });

    it('should return true if left streak is formed', done => {
        const board = new Board(10);
        board.markCell(41, 'x');
        board.markCell(42, 'x');
        board.markCell(43, 'x');
        assert.equal(
            StreakCheckStraight.isWinningStreak(10, board.cells, board.getCellCoordinate(43), 'x'),
            true,
            'cells 41,42,43 is a winning streak'
        );
        done();
    });

    it('should return true if horizontal center Streak is formed', done => {
        const board = new Board(10);
        board.markCell(76, 'x');
        board.markCell(78, 'x');
        board.markCell(77, 'x');
        assert.equal(
            StreakCheckStraight.isWinningStreak(10, board.cells, board.getCellCoordinate(77), 'x'),
            true,
            'cells 76,78,77 is a winning streak'
        );
        done();
    });

    it('should return true if right streak is formed', done => {
        const board = new Board(10);
        board.markCell(36, 'x');
        board.markCell(35, 'x');
        board.markCell(34, 'x');
        assert.equal(
            StreakCheckStraight.isWinningStreak(10, board.cells, board.getCellCoordinate(34), 'x'),
            true,
            'cells 36,35,34 is a winning streak'
        );
        done();
    });

    it('should return true if top streak is formed', done => {
        const board = new Board(10);
        board.markCell(5, 'x');
        board.markCell(15, 'x');
        board.markCell(25, 'x');
        assert.equal(
            StreakCheckStraight.isWinningStreak(10, board.cells, board.getCellCoordinate(25), 'x'),
            true,
            'cells 5,15,25 is a winning streak'
        );
        done();
    });

    it('should return true if vertical center Streak is formed', done => {
        const board = new Board(10);
        board.markCell(80, 'x');
        board.markCell(100, 'x');
        board.markCell(90, 'x');
        assert.equal(
            StreakCheckStraight.isWinningStreak(10, board.cells, board.getCellCoordinate(90), 'x'),
            true,
            'cells 80,100,90 is a winning streak'
        );
        done();
    });

    it('should return true if bottom streak is formed', done => {
        const board = new Board(10);
        board.markCell(91, 'x');
        board.markCell(81, 'x');
        board.markCell(71, 'x');
        assert.equal(
            StreakCheckStraight.isWinningStreak(10, board.cells, board.getCellCoordinate(71), 'x'),
            true,
            'cells 91,81,71 is a winning streak'
        );
        done();
    });

});
