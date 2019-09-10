"use strict";
exports.__esModule = true;
var expParser_1 = require("./expParser");
var lg = console.log;
test('random select', function () {
    var set = new Set();
    for (var i = 0; i < 20; i++) {
        set.add(expParser_1.randomSelect([2, 4, 5, '32', '243']));
    }
    // 这里只是大概率会成功
    expect(set.size).toBeGreaterThan(3);
});
test('random char', function () {
    var set = new Set();
    for (var i = 0; i < 10; i++) {
        set.add(expParser_1.randomChar());
    }
    expect(set.size).toBeGreaterThan(8);
});
test('check if a string is an array json', function () {
    expect(expParser_1.isArray('[]')).toBeTruthy();
    expect(expParser_1.isArray('{}')).toBeFalsy();
    expect(expParser_1.isArray('()')).toBeFalsy();
    expect(expParser_1.isArray('[aaa]')).toBeFalsy();
    expect(expParser_1.isArray('[2,4,"234"]')).toBeTruthy();
});
test('make number', function () {
    for (var i = 0; i < 100; i++) {
        var v = expParser_1.makeNum(40, 80);
        expect(v).toBeLessThanOrEqual(80);
        expect(v).toBeGreaterThanOrEqual(40);
        var v2 = expParser_1.makeNum(44, 44);
        expect(v2).toEqual(44);
    }
});
test('make string', function () {
    for (var i = 0; i < 100; i++) {
        var n = expParser_1.makeNum(1, 100);
        var n2 = expParser_1.makeNum(101, 101);
        var s = expParser_1.makeString(n);
        expect(s.length).toEqual(n);
        s = expParser_1.makeString(n, n2);
        expect(s.length).toBeLessThanOrEqual(n2);
        expect(s.length).toBeGreaterThanOrEqual(n);
    }
});
describe('mock number', function () {
    test('const number', function () {
        expect(expParser_1.mockNumber('3')).toEqual(3);
    });
    test('n-m', function () {
        var v = expParser_1.mockNumber('3-10');
        expect(v).toBeGreaterThanOrEqual(3);
        expect(v).toBeLessThanOrEqual(10);
    });
    test('digi', function () {
        var v = expParser_1.mockNumber('d3');
        expect(v).toBeGreaterThanOrEqual(100);
        expect(v).toBeLessThan(999);
        v = expParser_1.mockNumber('d4');
        expect(v % 10000).toEqual(v);
    });
    test('digi range', function () {
        var hc1 = 0, hc2 = 0, hc3 = 0;
        // 由于低位的数字出现几率较低，因此循环1000次
        for (var i = 0; i < 1000; i++) {
            var v = expParser_1.mockNumber('d3-d5');
            expect(v).toBeGreaterThanOrEqual(100);
            expect(v).toBeLessThan(99999);
            if (v < 1000)
                hc1++;
            else if (v < 10000) {
                hc2++;
            }
            else {
                hc3++;
            }
        }
        expect(hc1).toBeGreaterThan(0);
        expect(hc2).toBeGreaterThan(0);
        expect(hc3).toBeGreaterThan(0);
    });
    test('decimal', function () {
        for (var i = 0; i < 10; i++) {
            var v = expParser_1.mockNumber('3.d3');
            expect(v).toBeGreaterThan(3);
            expect(v).toBeLessThan(4);
        }
    });
    test('other consts', function () {
        expect(expParser_1.mockNumber('min')).toBe(Number.MIN_VALUE);
        expect(expParser_1.mockNumber('max')).toBe(Number.MAX_VALUE);
        expect(expParser_1.mockNumber('max-inf')).toBe(Number.POSITIVE_INFINITY);
        expect(expParser_1.mockNumber('min-inf')).toBe(Number.NEGATIVE_INFINITY);
    });
});
describe('mock string', function () {
    test('ramdom', function () {
        var v1 = expParser_1.mockString(5);
        var v2 = expParser_1.mockString(5);
        expect(v1).not.toEqual(v2);
    });
    test('length', function () {
        expect(expParser_1.mockString('4').length).toBe(4);
    });
    test('length range', function () {
        var v = expParser_1.mockString('10-20');
        expect(v.length).toBeGreaterThanOrEqual(10);
        expect(v.length).toBeLessThanOrEqual(20);
    });
});
