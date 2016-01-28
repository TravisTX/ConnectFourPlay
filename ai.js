var util = require('./util');
var streakFinder = require('./streakFinder');

var ai = {
    decide: decide,
    findBottomMostAvailableRow: findBottomMostAvailableRow,
    simulateMove: simulateMove,
    simulateMoveRecursive: simulateMoveRecursive,
    chooseColumn: chooseColumn
};

/**
 * Returns an integer for which column to play
 */
function decide(field, playerNumber) {
    var num = chooseColumn(field, playerNumber);
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

// adds a weight to the center of the field
function centerWeight(col, colCount) {
    var weighting = 1;
    var center = (colCount - 1) / 2;
    return weighting * -1 * (Math.abs(center - col)) + 3;
}

function chooseColumn(field, selfPlayerNumber) {
    var initialDepth = 4;
    var colCount = field[0].length;
    var columnRanks = new Array(colCount);
    for (var col = 0; col < colCount; col++) {
        columnRanks[col] = simulateMoveRecursive(field, col, selfPlayerNumber, selfPlayerNumber, initialDepth) + centerWeight(col, colCount);
    }
    var bestColumn = columnRanks.indexOf(Math.max.apply(Math, columnRanks));
    util.log('columnRanks: ' + JSON.stringify(columnRanks));
    return bestColumn;
}

// todo: change input to an object, not list of parameters
function simulateMoveRecursive(originalField, col, selfPlayerNumber, playerNumber, depth) {
    if (originalField[0][col] !== 0) {
        // if the column is full, count it as a loss
        return (depth + 1) * -100;
    }
    var field = cloneField(originalField);

    var winner = simulateMove(field, col, playerNumber);

    if (winner !== undefined) {
        var rank = (depth + 1) * (playerNumber === selfPlayerNumber ? 100 : -100);
        return rank;
    }
    playerNumber = playerNumber === 1 ?  2 : 1;

    var result = 0;
    if (depth > 0) {
        for (var col2 = 0; col2 < field[0].length; col2++) {
            var rank = simulateMoveRecursive(field, col2, selfPlayerNumber, playerNumber, depth - 1);
            result += (rank / 10);
        }
    }
    return result;
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
