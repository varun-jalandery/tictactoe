class StreakCheckDiagnol {

    static isWinningStreak(cells, coordinate, symbol, streakLength = 3) {
        return StreakCheckDiagnol.isWinningStreakInDiagnolOne(cells, coordinate, symbol, streakLength)
            || StreakCheckDiagnol.isWinningStreakInDiagnolTwo(cells, coordinate, symbol, streakLength);
    }

    static isWinningStreakInDiagnolOne(cells, coordinate, symbol, streakLength) {
        let result = false;
        const isDownStreakPossible =
            coordinate.row <= this.size - streakLength &&
            coordinate.col <= this.size - streakLength;
        const isTopStreakPossible =
            coordinate.row >= streakLength - 1 &&
            coordinate.col >= streakLength - 1;
        const isCenterStreakPossible =
            coordinate.col > 0 &&
            coordinate.row > 0 &&
            coordinate.col < this.size - 1 &&
            coordinate.row < this.size - 1;

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

    static isWinningStreakInDiagnolTwo(cells, coordinate, symbol, streakLength) {
        let result = false;
        const isDownStreakPossible =
            coordinate.col >= streakLength - 1 &&
            coordinate.row <= this.size - streakLength;
        const isTopStreakPossible =
            coordinate.col <= this.size - streakLength &&
            coordinate.row >= streakLength - 1;
        const isCenterStreakPossible =
            coordinate.row > 0 &&
            coordinate.row < this.size - 1 &&
            coordinate.col > 0 &&
            coordinate.col < this.size - 1;

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

module.exports = StreakCheckDiagnol;