var expect = require('chai').expect;
var ai = require('../ai');

describe('ai', function() {
    describe('findBottomMostAvailableRow', function() {
        it('should find bottom-most available slot', function(done) {
            field = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0],
                [1, 1, 1, 0, 1, 0, 1],
                [2, 1, 1, 1, 2, 0, 1],
            ];
            var result = ai.findBottomMostAvailableRow(field, 1);
            expect(result).to.equal(1);
            done();
        });

        it('should find bottom-most available when its at the top', function(done) {
            field = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0],
                [1, 1, 1, 0, 1, 0, 1],
                [2, 1, 1, 1, 2, 0, 1],
            ];
            var result = ai.findBottomMostAvailableRow(field, 1);
            expect(result).to.equal(0);
            done();
        });

        it('should find bottom-most available when there is none', function(done) {
            field = [
                [0, 1, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0],
                [1, 1, 1, 0, 1, 0, 1],
                [2, 1, 1, 1, 2, 0, 1],
            ];
            var result = ai.findBottomMostAvailableRow(field, 1);
            expect(result).to.equal(undefined);
            done();
        });

        it('should find bottom-most available when its at the bottom', function(done) {
            field = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 1, 0, 1],
                [2, 0, 1, 1, 2, 0, 1],
            ];
            var result = ai.findBottomMostAvailableRow(field, 1);
            expect(result).to.equal(5);
            done();
        });
    });

    describe('chooseColumn', function() {
        it('should select a column that blocks the opponent', function(done) {
            field = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 2, 0, 0, 0],
                [0, 0, 0, 2, 0, 0, 0],
                [0, 0, 2, 2, 0, 0, 0],
            ];
            var result = ai.chooseColumn(field, 1);
            expect(result).to.equal(4);
            done();
        });
        it('should choose center column at start of game', function(done) {
            field = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ];
            var result = ai.chooseColumn(field, 1);
            expect(result).to.equal(3);
            done();
        });
        it('should behave at end of game', function(done) {
            field = [
                [0, 0, 0, 0, 0, 0, 0],
                [2, 1, 2, 1, 2, 1, 2],
                [1, 2, 1, 2, 1, 2, 1],
                [1, 2, 1, 2, 1, 2, 1],
                [2, 1, 2, 1, 2, 1, 2],
                [1, 2, 1, 2, 1, 2, 1],
            ];
            var result = ai.chooseColumn(field, 1);
            expect(result).to.equal(3);
            done();
        });

        it('should find the win', function(done) {
            field = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 2, 0, 0, 0],
                [0, 0, 1, 2, 0, 0, 0],
                [0, 0, 2, 1, 2, 0, 0],
                [0, 1, 1, 1, 2, 0, 2]
            ];
            var result = ai.decide(field, 1);
            expect(result).to.equal(0);
            done();
        });
    });
});
