var expect = require('chai').expect;
var streakFinder = require('../streakFinder');

describe('streakFinder', function() {
    describe('findStreak', function() {
        it('should return undefined if there is not 4 in a row', function(done) {
            field = [
                [0, 1, 1, 1, 2, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ]
            var result = streakFinder.findStreak(field, 4);
            expect(result).to.equal(undefined);
            done();
        });

        it('should return winner for horizontal wins', function(done) {
            field = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ]
            var result = streakFinder.findStreak(field, 4);
            expect(result).to.equal(1);
            done();
        });

        it('should return winner for horizontal wins test 2', function(done) {
            field = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ]
            var result = streakFinder.findStreak(field, 4);
            expect(result).to.equal(1);
            done();
        });

        it('should return winner for vertical wins', function(done) {
            field = [
                [0, 0, 1, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0],
                [1, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ]
            var result = streakFinder.findStreak(field, 4);
            expect(result).to.equal(1);
            done();
        });

        it('should return winner for diagonal wins', function(done) {
            field = [
                [0, 0, 1, 0, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0],
                [1, 0, 1, 0, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ]
            var result = streakFinder.findStreak(field, 4);
            expect(result).to.equal(1);
            done();
        });

        it('should return winner for diagonal wins test 2', function(done) {
            field = [
                [0, 0, 1, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0],
                [1, 0, 1, 1, 0, 2, 1],
                [0, 0, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0],
            ]
            var result = streakFinder.findStreak(field, 4);
            expect(result).to.equal(1);
            done();
        });
    });
});
