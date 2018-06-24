const assert = require('chai').assert;

const Board = require('../../../src/Board/Board');
const StreakCheckDiagonal = require('../../../src/Board/StreakCheckDiagonal');

describe('src/Board/StreakCheckStraight', () => {
    it('should return false if no winning streak is formed', done => {
        const board = new Board(10);
        board.markCell(48, 'x');
        board.markCell(59, 'x');
        board.markCell(49, 'x');
        assert.equal(
            StreakCheckDiagonal.isWinningStreak(
                10,
                board.cells,
                board.getCellCoordinate(49),
                'x'
            ),
            false
        );
        done();
    });

    it('should return true if diagonal one top streak is formed', done => {
        const board = new Board(10);
        board.markCell(48, 'x');
        board.markCell(59, 'x');
        board.markCell(70, 'x');
        assert.equal(
            StreakCheckDiagonal.isWinningStreak(
                10,
                board.cells,
                board.getCellCoordinate(70),
                'x'
            ),
            true,
            'cells 48,59,70 is a winning streak'
        );
        done();
    });

    it('should return true if diagonal one center Streak is formed', done => {
        const board = new Board(10);
        board.markCell(98, 'x');
        board.markCell(87, 'x');
        board.markCell(76, 'x');
        assert.equal(
            StreakCheckDiagonal.isWinningStreak(
                10,
                board.cells,
                board.getCellCoordinate(76),
                'x'
            ),
            true,
            'cells 98,87,76 is a winning streak'
        );
        done();
    });

    it('should return true if diagonal one bottom streak is formed', done => {
        const board = new Board(10);
        board.markCell(55, 'x');
        board.markCell(77, 'x');
        board.markCell(66, 'x');
        assert.equal(
            StreakCheckDiagonal.isWinningStreak(
                10,
                board.cells,
                board.getCellCoordinate(66),
                'x'
            ),
            true,
            'cells 55,77,66 is a winning streak'
        );
        done();
    });

    it('should return true if diagonal two top streak is formed', done => {
        const board = new Board(10);
        board.markCell(50, 'x');
        board.markCell(59, 'x');
        board.markCell(68, 'x');
        assert.equal(
            StreakCheckDiagonal.isWinningStreak(
                10,
                board.cells,
                board.getCellCoordinate(68),
                'x'
            ),
            true,
            'cells 50,59,68 is a winning streak'
        );
        done();
    });

    it('should return true if diagonal two center Streak is formed', done => {
        const board = new Board(10);
        board.markCell(65, 'x');
        board.markCell(47, 'x');
        board.markCell(56, 'x');
        assert.equal(
            StreakCheckDiagonal.isWinningStreak(
                10,
                board.cells,
                board.getCellCoordinate(56),
                'x'
            ),
            true,
            'cells 65,47,56 is a winning streak'
        );
        done();
    });

    it('should return true if diagonal two bottom streak is formed', done => {
        const board = new Board(10);
        board.markCell(93, 'x');
        board.markCell(84, 'x');
        board.markCell(75, 'x');
        assert.equal(
            StreakCheckDiagonal.isWinningStreak(
                10,
                board.cells,
                board.getCellCoordinate(75),
                'x'
            ),
            true,
            'cells 93,84,75 is a winning streak'
        );
        done();
    });
});
