var util = require('./util');

var ai = {
    decide: decide
};

/**
 * Returns an integer for which column to play
 */
function decide(playerNumber, field) {
    var num = util.randomInt(0, 6);
    return num;
}


module.exports = ai;
