var readline = require('readline');
var util = require('./util');

var Bot = function () {

    if (false === (this instanceof Bot)) {
        return new Bot();
    }

    // initialize options object
    this.options = {};

    this.game = {};
}

/**
 * Respond to settings command
 * @param Array data
 */
Bot.prototype.settings = function (data) {
    var key = data[0],
        value = data[1];

    // set key to value
    this.options[key] = value;
};

/**
 * Respond to update command
 * @param Array data
 */
Bot.prototype.update = function (data) {
    if (data[0] === 'game' && data[1] === 'round') {
        this.game.round = data[2];
    }
    if (data[0] === 'game' && data[1] === 'field') {
        // update game field 0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,0,0;1,0,0,0,0,0,1
        // todo: split
        this.game.field = data[2];
    }
};

/**
 * Respond to action command
 * @param Array data
 */
Bot.prototype.action = function (data) {
    var num = util.randomInt(0, 6);
    process.stdout.write('place_disc ' + num + '\n');
};

Bot.prototype.run = function () {

    var io = readline.createInterface(process.stdin, process.stdout);

    io.on('line', function (data) {
        var line,
            lines,
            lineParts,
            command,
            response;

        // stop if line doesn't contain anything
        if (data.length === 0) {
            return;
        }

        lines = data.trim().split('\n');

        while (0 < lines.length) {

            line = lines.shift().trim();
            lineParts = line.split(" ")

            // stop if lineParts doesn't contain anything
            if (lineParts.length === 0) {
                return;
            }

            // get the input command and convert to camel case
            command = lineParts.shift();

            // invoke command if function exists and pass the data along
            // then return response if exists
            if (command in bot) {
                response = bot[command](lineParts);

                if (response && 0 < response.length) {
                    process.stdout.write(response + '\n');
                }
            } else {
                process.stderr.write('Unable to execute command: ' + command + ', with data: ' + lineParts + '\n');
            }
        }
    });

    io.on('close', function () {
        process.exit(0);
    });
};

/**
 * Initialize bot
 * __main__
 */
bot = new Bot();
bot.run();
