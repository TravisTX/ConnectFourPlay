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

    describe('simulateMoveRecursive', function() {
        it('should not mess with the original field', function(done) {
            field = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ];
            var result = ai.simulateMoveRecursive(field, 5, 1, 0);
            expect(field[5][5]).to.equal(0);
            done();
        });

        it('should find simulated win', function(done) {
            field = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 1, 0],
            ];
            var result = ai.simulateMoveRecursive(field, 5, 1, 0);
            expect(result).to.equal(1);
            done();
        });

        it('should find simulated win for player 2', function(done) {
            field = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 1, 0],
                [0, 0, 0, 2, 1, 2, 0],
                [0, 0, 2, 1, 1, 1, 0],
            ];
            var result = ai.simulateMoveRecursive(field, 5, 2, 0);
            expect(result).to.equal(2);
            done();
        });

        it('should return undefined if no win was found', function(done) {
            field = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 1, 0],
                [0, 0, 0, 2, 1, 2, 0],
                [0, 0, 2, 1, 1, 1, 0],
            ];
            var result = ai.simulateMoveRecursive(field, 1, 1, 0);
            expect(result).to.equal(undefined);
            done();
        });

        it.only('should find deep simulated win', function(done) {
            field = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 2, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0],
                [0, 0, 2, 2, 0, 0, 0],
            ];
            var result = ai.simulateMoveRecursive(field, 3, 1, 5);
            expect(result).to.equal(1);
            done();
        });
    });
});
