class StreakCheckDiagonal {

    static isWinningStreak(boardSize, cells, coordinate, symbol, streakLength = 3) {
        return StreakCheckDiagonal.isWinningStreakInDiagnolOne(boardSize, cells, coordinate, symbol, streakLength)
            || StreakCheckDiagonal.isWinningStreakInDiagnolTwo(boardSize, cells, coordinate, symbol, streakLength);
    }

    static isWinningStreakInDiagnolOne(boardSize, cells, coordinate, symbol, streakLength) {
        let result = false;
        const isDownStreakPossible =
            coordinate.row <= boardSize - streakLength &&
            coordinate.col <= boardSize - streakLength;
        const isTopStreakPossible =
            coordinate.row >= streakLength - 1 &&
            coordinate.col >= streakLength - 1;
        const isCenterStreakPossible =
            coordinate.col > 0 &&
            coordinate.row > 0 &&
            coordinate.col < boardSize - 1 &&
            coordinate.row < boardSize - 1;

        if (isDownStreakPossible) {
            result = [
                cells[coordinate.row][coordinate.col].value,
                cells[coordinate.row + 1][coordinate.col + 1].value,
                cells[coordinate.row + 2][coordinate.col + 2].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isTopStreakPossible) {
            result = [
                cells[coordinate.row][coordinate.col].value,
                cells[coordinate.row - 1][coordinate.col - 1].value,
                cells[coordinate.row - 2][coordinate.col - 2].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isCenterStreakPossible) {
            result = [
                cells[coordinate.row][coordinate.col].value,
                cells[coordinate.row + 1][coordinate.col + 1].value,
                cells[coordinate.row - 1][coordinate.col - 1].value
            ].every(val => val == symbol);
        }
        return result;
    }

    static isWinningStreakInDiagnolTwo(boardSize, cells, coordinate, symbol, streakLength) {
        let result = false;
        const isDownStreakPossible =
            coordinate.col >= streakLength - 1 &&
            coordinate.row <= boardSize - streakLength;
        const isTopStreakPossible =
            coordinate.col <= boardSize - streakLength &&
            coordinate.row >= streakLength - 1;
        const isCenterStreakPossible =
            coordinate.row > 0 &&
            coordinate.row < boardSize - 1 &&
            coordinate.col > 0 &&
            coordinate.col < boardSize - 1;

        if (isDownStreakPossible) {
            result = [
                cells[coordinate.row][coordinate.col].value,
                cells[coordinate.row + 1][coordinate.col - 1].value,
                cells[coordinate.row + 2][coordinate.col - 2].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isTopStreakPossible) {
            result = [
                cells[coordinate.row][coordinate.col].value,
                cells[coordinate.row - 1][coordinate.col + 1].value,
                cells[coordinate.row - 2][coordinate.col + 2].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isCenterStreakPossible) {
            result = [
                cells[coordinate.row][coordinate.col].value,
                cells[coordinate.row + 1][coordinate.col - 1].value,
                cells[coordinate.row - 1][coordinate.col + 1].value
            ].every(val => val == symbol);
        }
        return result;
    }


}

module.exports = StreakCheckDiagonal;