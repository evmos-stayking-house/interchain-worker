"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigNumMultipliedByNumber = exports.bigNumDividedByNumber = void 0;
const bignumber_js_1 = require("bignumber.js");
const bigNumDividedByNumber = (x, y) => {
    return new bignumber_js_1.default(x).div(new bignumber_js_1.default(y)).toNumber();
};
exports.bigNumDividedByNumber = bigNumDividedByNumber;
const bigNumMultipliedByNumber = (x, y) => {
    return new bignumber_js_1.default(x).multipliedBy(new bignumber_js_1.default(y)).toFixed(0);
};
exports.bigNumMultipliedByNumber = bigNumMultipliedByNumber;
//# sourceMappingURL=index.js.map