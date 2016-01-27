var util = require('./util');
var streakFinder = require('./streakFinder');

var ai = {
    decide: decide,
    findBottomMostAvailableRow: findBottomMostAvailableRow,
    simulateMove: simulateMove,
    simulateMoveRecursive: simulateMoveRecursive
};

/**
 * Returns an integer for which column to play
 */
function decide(playerNumber, field) {
    var num = util.randomInt(0, 6);
    return num;
}

function cloneField(originalField) {
    var field = new Array(originalField.length);
    for (var row = 0; row < originalField.length; row++) {
        var newRow = new Array(originalField[row].length);
        field[row] = newRow;
        for(var col = 0; col < originalField[row].length; col++) {
            newRow[col] = originalField[row][col];
        }
    }
    return field;
}

// has side effects!
function simulateMove(field, col, playerNumber) {
    var row = findBottomMostAvailableRow(field, col);
    if (row === undefined) {
        return undefined;
    }
    field[row][col] = playerNumber;
    var winner = streakFinder.findStreak(field, 4);
    return winner;
}

function simulateMoveRecursive(originalField, col, playerNumber, depth) {
    var field = cloneField(originalField);

    var winner = simulateMove(field, col, playerNumber);

    if (winner !== undefined) {
        util.logField(field);
        return winner;
    }
    playerNumber = playerNumber === 1 ?  2 : 1;

    if (depth > 0) {
        for (var col2 = 0; col2 < field[0].length; col2++) {
            var winner = simulateMoveRecursive(field, col2, playerNumber, depth - 1);
            if (winner !== undefined) {
                return winner;
            }
        }
    }
    return undefined;
}

function findBottomMostAvailableRow(field, col) {
    var bottomPos = field.map(function(row) {
        return row[col];
    }).reduce(function(previousValue, currentValue, currentIndex) {
        if (currentValue === 0) {
            previousValue = currentIndex;
        }
        return previousValue;
    }, undefined);
    return bottomPos;
}


module.exports = ai;
