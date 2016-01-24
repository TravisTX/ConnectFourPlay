var util = require('./util');

var streakFinder = {
    findStreak: findStreak
};

var directions = [
    { row: 1, col: 0 }, // horizontal
    { row: 0, col: 1 }, // vertical
    { row: 1, col: 1 }, // diag down
    { row: 1, col: -1 } // diag up
];

// return player number if there are anny streaks of `target` length
function findStreak(field, target) {
    var rowCount = field.length;
    var colCount = field[0].length;
    for (var rowNum = 0; rowNum < rowCount; rowNum++) {
        for (var colNum = 0; colNum < colCount; colNum++) {
            if (field[rowNum][colNum] === 0) {
                continue;
            }
            // if the starting piece is a player piece, see if there are any streaks originating here
            var result = findStreakFromStartingPont(field, target, rowNum, colNum);
            if (result) {
                return field[rowNum][colNum];
            }
        }
    }
}

function findStreakFromStartingPont(field, target, startRow, startCol) {
    for (var i = 0; i < directions.length; i++) {
        var streakFound = findStreakFromStartingPontByDirection(field, target, startRow, startCol, directions[i]);
        if (streakFound) {
            return true;
        }
    }
    return false;
}

function findStreakFromStartingPontByDirection(field, target, startRow, startCol, direction) {
    var startPiece = field[startRow][startCol];

    for (var i = 0; i < target; i++) {
        var row = startRow + (i * direction.row);
        var col = startCol + (i * direction.col);
        if (row >= field.length || col >= field[0].length) {
            // bounds checking
            return false;
        }
        if (field[row][col] !== startPiece) {
            // c-c-c-combo breaker
            return false;
        }
    }
    // found x in a row!
    return true;
}

module.exports = streakFinder;
