const assert = require('chai').assert;

const Board = require('../../../src/Board/Board');

describe('src/Board/Board Diagonal Streaks : isWinningStreakOccurringAroundCell()', () => {

    it('should return false if no winning streak is formed', done => {
        const board = new Board(10);
        assert.equal(board.isWinningStreakOccurringAroundCell(1), false);
        done();
    });

    it('should return true if diagonal one top streak is formed', done => {
        const board = new Board(10);
        board.markCell(48, 'x');
        board.markCell(59, 'x');
        board.markCell(70, 'x');
        assert.equal(board.isWinningStreakOccurringAroundCell(70, 'x'), true);
        done();
    });

    it('should return true if diagonal one center Streak is formed', done => {
        const board = new Board(10);
        board.markCell(98, 'x');
        board.markCell(87, 'x');
        board.markCell(76, 'x');
        assert.equal(board.isWinningStreakOccurringAroundCell(76, 'x'), true);
        done();
    });

    it('should return true if diagonal one bottom streak is formed', done => {
        const board = new Board(10);
        board.markCell(55, 'x');
        board.markCell(77, 'x');
        board.markCell(66, 'x');
        assert.equal(board.isWinningStreakOccurringAroundCell(66, 'x'), true);
        done();
    });

    it('should return true if diagonal two top streak is formed', done => {
        const board = new Board(10);
        board.markCell(50, 'x');
        board.markCell(59, 'x');
        board.markCell(68, 'x');
        assert.equal(board.isWinningStreakOccurringAroundCell(68, 'x'), true);
        done();
    });

    it('should return true if diagonal two center Streak is formed', done => {
        const board = new Board(10);
        board.markCell(65, 'x');
        board.markCell(47, 'x');
        board.markCell(56, 'x');
        assert.equal(board.isWinningStreakOccurringAroundCell(56, 'x'), true);
        done();
    });

    it('should return true if diagonal two bottom streak is formed', done => {
        const board = new Board(10);
        board.markCell(93, 'x');
        board.markCell(84, 'x');
        board.markCell(75, 'x');
        assert.equal(board.isWinningStreakOccurringAroundCell(75, 'x'), true);
        done();
    });


});
