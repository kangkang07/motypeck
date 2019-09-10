"use strict";
var _this = this;
exports.__esModule = true;
// import mockjs from 'mockjs'
var numberPattens = [/(d*)[0-9]+/, /(d*)[0-9]+-(d*)[0-9]+/, /max/, /min/,];
var strDic = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
exports.randomSelect = function (arr) {
    var index = (Math.round(Math.random() * (arr.length - 1)));
    // console.log('random seelct,', index, arr, typeof arr)
    return arr[index];
};
exports.randomChar = function () {
    return exports.randomSelect(strDic);
};
exports.isNum = function (val) {
    return val !== '' && !isNaN(Number(val));
};
exports.isArray = function (val) {
    try {
        var r = JSON.parse(val);
        if (Array.isArray(r)) {
            return r;
        }
        return false;
    }
    catch (e) { }
    return false;
};
exports.makeNum = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
};
exports.makeDeci = function (min, max) {
    return;
};
exports.makeString = function (min, max) {
    if (!max)
        max = min;
    var end = Math.random() * (max - min) + min;
    var str = '';
    for (var i = 0; i < end; i++) {
        str += exports.randomChar();
    }
    return str;
};
exports.parseRange = function (exp) {
    var range = {
        range: [],
        type: ''
    };
    var arr = exp.split('-').map(function (d) {
        if (d.startsWith('d')) {
            range.type = 'digi';
            return Number(d.substr(1));
        }
        else if (exports.isNum(d)) {
            range.type = 'range';
            return Number(d);
        }
    });
    range.range = arr;
    return range;
};
exports.mockNumber = function (exp) {
    var intPart = function (part) {
        if (part.indexOf('-') > 0) {
            var range = exports.parseRange(part);
            var _a = range.range, min = _a[0], max = _a[1];
            if (range.type === 'range') {
                return exports.makeNum(min, max);
            }
            else { // digi
                return exports.makeNum(Math.pow(10, min - 1), Math.pow(10, max) - 1);
            }
        }
        else {
            if (part.startsWith('d')) {
                var digi = Number(part.substr(1));
                return exports.makeNum(Math.pow(10, digi - 1), Math.pow(10, digi) - 1);
            }
            else {
                return Number(part);
            }
        }
    };
    var deciPart = function (part) {
        var v = intPart(part);
        return Number('0.' + v.toString());
    };
    if (exp === 'max') {
        return Number.MAX_VALUE;
    }
    if (exp === 'min') {
        return Number.MIN_VALUE;
    }
    if (exp === 'max-inf') {
        return Number.POSITIVE_INFINITY;
    }
    if (exp === 'min-inf') {
        return Number.NEGATIVE_INFINITY;
    }
    if (exp.indexOf('.') > -1) {
        var arr = exp.split('.');
        return intPart(arr[0]) + deciPart(arr[1]);
    }
    else {
        return intPart(exp);
    }
};
exports.mockString = function (exp) {
    if (exports.isNum(exp)) {
        return exports.makeString(Number(exp));
    }
    else {
        var arr = exports.isArray(exp);
        if (arr !== false) {
            return exports.randomSelect(arr);
        }
        else if (exp.indexOf('-')) {
            var arr_1 = exp.split('-').map(function (d) { return Number(d); });
            return exports.makeString(arr_1[0], arr_1[1]);
        }
        else if (exp === 'email') {
        }
        else if (exp === 'name') {
        }
    }
};
exports.mockBool = function (exp) {
    var r = 0.5;
    if (exports.isNum(r)) {
        r = Number(r);
    }
    return Math.random() < r;
};
exports.mockTime = function (exp) {
    // if (exp === '') {
    return new Date();
    // }
};
exports.mockByExpression = function (exp, type) {
    // default exp
    if (exp === '') {
        exp = {
            number: 'd3-d5',
            string: '10'
        }[type] || '';
    }
    var value;
    if (exp.endsWith('[]')) {
        var range = [0, 5];
        var itemType = type.replace('[]', '');
        if (exp.indexOf('|')) {
            var _a = exp.split('|'), oriExp = _a[0], rangeExp = _a[1];
            range = exports.parseRange(rangeExp).range;
            exp = oriExp;
        }
        var arr = [];
        for (var i = 0; i < range[0] + Math.random() * (range[1] - range[0]); i++) {
            arr.push(_this.mockByExpression(exp, itemType));
        }
        value = arr;
    }
    if (exports.isArray(exp)) {
        value = exports.randomSelect(JSON.parse(exp));
    }
    else if (type === 'Date') {
        value = exports.mockTime(exp);
    }
    else if (type.endsWith('\'') && type.startsWith('\'') || type.endsWith('"') && type.startsWith('"') || type.endsWith('`') && type.startsWith('`')) {
        value = type;
    }
    else {
        type = type.toLowerCase();
        if (type === 'string') {
            value = exports.mockString(exp);
        }
        else if (type === 'number') {
            value = exports.mockNumber(exp);
        }
        else if (type === 'boolean') {
            value = exports.mockBool(exp);
        }
        else if (type === 'any') {
            value = '';
        }
        else if (type === 'null') {
            value = null;
        }
        else if (type === 'undefined') {
            value = undefined;
        }
        else if (!isNaN(Number(type))) {
            value = Number(type);
        }
    }
    // console.log(type, exp, value)
    return value;
};
