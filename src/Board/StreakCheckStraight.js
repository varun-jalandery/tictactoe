class StreakCheckStraight {

    static isWinningStreak(boardSize, cells, coordinate, symbol, streakLength = 3) {
        return StreakCheckStraight.isWinningStreakStraight(boardSize, cells, coordinate, symbol, 'row', streakLength)
            || StreakCheckStraight.isWinningStreakStraight(boardSize, cells, coordinate, symbol, 'col', streakLength);
    }

    static isWinningStreakStraight(boardSize, cells, coordinate, symbol, orientation, streakLength) {
        let rowOffset = 0;
        let colOffset = 0;
        if (orientation === 'row') {
            rowOffset = 1;
        } else {
            colOffset = 1;
        }
        let result = false;
        const isLeftTopStreakPossible =
            coordinate[orientation] >= streakLength - 1;
        const isCenterStreakPossible =
            coordinate[orientation] >= 1 &&
            coordinate[orientation] < boardSize - 1;
        const isRightBottomStreakPossible =
            coordinate[orientation] <= boardSize - streakLength;

        if (isLeftTopStreakPossible) {
            result = [
                cells[coordinate.row][coordinate.col].value,
                cells[coordinate.row - rowOffset][
                coordinate.col - colOffset
                    ].value,
                cells[coordinate.row - 2 * rowOffset][
                coordinate.col - 2 * colOffset
                    ].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isCenterStreakPossible) {
            result = [
                cells[coordinate.row][coordinate.col].value,
                cells[coordinate.row - rowOffset][
                coordinate.col - colOffset
                    ].value,
                cells[coordinate.row + rowOffset][
                coordinate.col + colOffset
                    ].value
            ].every(val => val == symbol);
        }
        if (result) return result;

        if (isRightBottomStreakPossible) {
            result = [
                cells[coordinate.row][coordinate.col].value,
                cells[coordinate.row + rowOffset][
                coordinate.col + colOffset
                    ].value,
                cells[coordinate.row + 2 * rowOffset][
                coordinate.col + 2 * colOffset
                    ].value
            ].every(val => val == symbol);
        }
        return result;
    }

}

module.exports = StreakCheckStraight;