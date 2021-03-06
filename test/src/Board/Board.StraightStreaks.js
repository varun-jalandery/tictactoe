const assert = require('chai').assert;

const Board = require('../../../src/Board/Board');

describe('src/Board/Board - Check Straight Streaks : isWinningStreakOccurringAroundCell()', () => {
    it('should return false if no winning streak is formed', done => {
        const board = new Board(10);
        assert.equal(board.isWinningStreakOccurringAroundCell(1), false);
        done();
    });

    it('should return true if left streak is formed', done => {
        const board = new Board(10);
        board.markCell(41, 'x');
        board.markCell(42, 'x');
        board.markCell(43, 'x');
        assert.equal(
            board.isWinningStreakOccurringAroundCell(43, 'x'),
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
            board.isWinningStreakOccurringAroundCell(77, 'x'),
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
            board.isWinningStreakOccurringAroundCell(34, 'x'),
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
            board.isWinningStreakOccurringAroundCell(25, 'x'),
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
            board.isWinningStreakOccurringAroundCell(90, 'x'),
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
            board.isWinningStreakOccurringAroundCell(71, 'x'),
            true,
            'cells 91,81,71 is a winning streak'
        );
        done();
    });
});
