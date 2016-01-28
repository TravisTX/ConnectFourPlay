var readline = require('readline');
var util = require('./util');
var ai = require('./ai');

var bot = {
    options: {},
    game: {},

    command_action: command_action,
    command_settings: command_settings,
    command_update: command_update,
    run: run
}
module.exports = bot;

/**
 * Respond to action command
 * @param Array data
 */
function command_action(data) {
    var selfPlayerNumber = parseInt(this.options.your_botid);
    var num = ai.decide(this.game.field, selfPlayerNumber);
    return 'place_disc ' + num;
};

/**
 * Respond to settings command
 * @param Array data
 */
function command_settings(data) {
    var key = data[0],
        value = data[1];

    // set key to value
    this.options[key] = value;
};

/**
 * Respond to update command
 * @param Array data
 */
function command_update(data) {
    if (data[0] === 'game' && data[1] === 'round') {
        this.game.round = data[2];
    }
    if (data[0] === 'game' && data[1] === 'field') {
        this.game.field = parseField(data[2]);
    }
};

function parseField(fieldString) {
    var field = fieldString.split(';');
    for (var i = 0; i < field.length; i++) {
        field[i] = field[i].split(',');
        field[i] = field[i].map(function(item) {
            return parseInt(item);
        });
    }
    return field;
};

function run () {
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

            // get the input command
            command = lineParts.shift();

            // invoke command if function exists and pass the data along
            // then return response if exists

            if ('command_' + command in bot) {
                response = bot['command_' + command](lineParts);

                if (response && 0 < response.length) {
                    process.stdout.write(response + '\n');
                }
            } else {
                util.log('Unable to execute command: ' + command + ', with data: ' + lineParts + '\n');
            }
        }
    });

    io.on('close', function () {
        process.exit(0);
    });
};
