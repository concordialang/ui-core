"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
describe("sum", function () {
    it("sums two numbers", function () {
        expect(index_1.sum(1, 2)).toEqual(3);
    });
});
