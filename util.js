var util = {};

util.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

util.log = function(message) {
    process.stderr.write(message + '\n');
};

util.logField = function(field) {
    var colCount = field[0].length;
    drawFieldLine(colCount);
    for (var row = 0; row < field.length; row++) {
        process.stderr.write(' │ ');
        for (var col = 0; col < field[row].length; col++) {
            var char = field[row][col];
            if (char === 0) {
                char = ' ';
            }
            if (char === 1) {
                char = '1';
            }
            if (char === 2) {
                char = '2';
            }
            process.stderr.write(char + ' │ ');
        }
        process.stderr.write('\n');
        drawFieldLine(colCount);
    }
}

function drawFieldLine(colCount) {
    process.stderr.write(' ├─');
    for (var i = 0; i < colCount - 1; i++) {
        process.stderr.write('──┼─');
    }
    process.stderr.write('──┤');
    process.stderr.write('\n');
}

module.exports = util;
