const assert = require('chai').assert;

const Game = require('../../src/Game');
const Board = require('../../src/Board/Board');
const Player = require('../../src/Player');

let game = null;

describe('src/Game', () => {

    beforeEach(() => {
        game = new Game();
        game.setBoard(10);
        game.setPlayer(1, 'Alice');
        game.setPlayer(2, 'Bob');
    });

    it('getCurrentPlayer()', done => {
        assert.equal(game.getCurrentPlayer().name, 'Alice', 'getCurrentPlayer() should return Alice');
        done();
    });

    it('switchPlayer()', done => {
        game.switchPlayer();
        assert.equal(game.getCurrentPlayer().name, 'Bob', 'switchPlayer() should switch current player to Bob');
        done();
    });

    it('markCell()', done => {
        game.markCell(1);
        assert.equal(game.getBoard().getCell(1).getValue(), 'x', 'Cell 1 should have value x because Alice is current player whose symbol is x');

        game.markCell(14);
        assert.equal(game.getBoard().getCell(14).getValue(), 'o', 'Cell 14 should have value o because Bob is current player whose symbol is o');
        done();
    });

    it('isGameComplete() should return false for incomplete game', done => {
        assert.equal(game.isGameComplete(), false);
        done();
    });

    it('isGameComplete() should return true for complete game', done => {
        // completely fill the board of size 10
        for (let i = 1; i <= 100; i++) {
            game.markCell(i);
        }
        assert.equal(game.isGameComplete(), true);
        done();
    });

    it('isGameComplete() should return true if any player is winning', done => {
        game.markCell(1);
        game.markCell(10);
        game.markCell(2);
        game.markCell(20);
        game.markCell(3);
        assert.equal(game.isGameComplete(), true);
        done();
    });


    it('getResults() should return empty string for incomplete game', done => {


        assert.equal(game.getResults(), '', true);
        done();
    });

    it('getResults() should return winning player name and symbol in results ', done => {
        game.markCell(1);
        game.markCell(10);
        game.markCell(2);
        game.markCell(20);
        game.markCell(3);
        assert.equal(game.getResults(), 'Player Alice has won with symbol x\n', true);
        done();
    });


});
