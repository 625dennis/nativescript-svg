"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var svg_1 = require("../svg");
exports.default = {
    install: function (Vue, options) {
        console.log('installing SVGImage');
        Vue.registerElement('SVGImage', function () { return svg_1.SVGImage; });
    }
};
