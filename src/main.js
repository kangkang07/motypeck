"use strict";
/**
 * 先不考虑多维数组、定长数组
 */
exports.__esModule = true;
var ts_morph_1 = require("ts-morph");
var expParser_1 = require("./expParser");
var path = require('path');
// const mockjs = require('mockjs')
// import mockjs from 'mockjs'
// const Project = require('ts-morph').Project
var TsMock = /** @class */ (function () {
    function TsMock(filePath) {
        this.project = new ts_morph_1.Project();
        if (filePath) {
            this.addFile(filePath);
        }
    }
    TsMock.prototype.addFile = function (filePath) {
        this.filePath = filePath;
        this.project.addExistingSourceFile(filePath);
        this.file = this.project.getSourceFile(this.filePath);
    };
    TsMock.prototype.mock = function (typeName) {
        var it = this.file.getInterface(typeName);
        if (!it) {
            it = this.file.getClass(typeName);
        }
        if (!it) {
            throw 'type not found';
        }
        var props = it.getProperties();
        var mockObj = {};
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var p = props_1[_i];
            var pName = p.getName();
            var jsDocs = p.getJsDocs();
            var type = p.getType().getText();
            if (type.indexOf('|') > -1) {
                var arr = type.split('|').filter(function (t) { return t !== ''; });
                type = expParser_1.randomSelect(arr); // 随机取一个
            }
            var mockExp = '';
            jsDocs.forEach(function (d) {
                // console.log(d.getInnerText())
            });
            if (jsDocs && jsDocs[0]) {
                var doc = jsDocs[0].getInnerText();
                if (doc.trim().indexOf('@mock ') === 0) {
                    mockExp = doc.substr(5).trim();
                }
            }
            var value = expParser_1.mockByExpression(mockExp, type);
            mockObj[pName] = value;
            // console.log(mockExp, type, value)
        }
        return mockObj;
    };
    return TsMock;
}());
exports["default"] = TsMock;
var mock = new TsMock();
console.log(__dirname);
mock.addFile(__dirname + '/models.ts');
var res = mock.mock('ITest');
console.log(res);
