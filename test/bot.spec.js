var expect = require('chai').expect;
var bot = require('../bot');

describe('bot', function () {
    describe('command_settings', function() {
        it('should insert a setting', function (done) {
            bot.command_settings(['settingkey', 'settingValue']);
            expect(bot.options.settingkey).to.equal('settingValue');
            done();
        });

        it('should update a setting', function (done) {
            bot.command_settings(['settingkey', 'settingValue1']);
            bot.command_settings(['settingkey', 'settingValue2']);
            expect(bot.options.settingkey).to.equal('settingValue2');
            done();
        });
    });

    describe('command_update', function() {
        it('should update round', function (done) {
            bot.command_update(['game', 'round', '5']);
            expect(bot.game.round).to.equal('5');
            done();
        });

        it('should update field', function (done) {
            bot.command_update(['game', 'field', '0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,2,0;0,1,0,0,0,1,0;2,1,0,2,1,1,0;2,1,2,1,2,2,0']);
            expect(bot.game.field.length).to.equal(6);
            expect(bot.game.field[0].length).to.equal(7);
            expect(bot.game.field[5][6]).to.equal(0);
            expect(bot.game.field[5][5]).to.equal(2);
            done();
        });
    });
});
