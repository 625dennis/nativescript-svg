"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var Paint = android.graphics.Paint;
exports.fillProperty = new view_1.CssProperty({
    name: 'fill',
    cssName: 'fill',
    defaultValue: new view_1.Color('#0000FF'),
    valueConverter: function (v) { return new view_1.Color(v); }
});
var SVGElement = (function (_super) {
    __extends(SVGElement, _super);
    function SVGElement(id, paint) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.paint = paint;
        return _this;
    }
    SVGElement.prototype.onSvgElement = function () {
        if (this.fill && this.paint && this.paint.getStyle() == Paint.Style.FILL) {
            this.paint.setColor(this.fill.argb);
        }
    };
    Object.defineProperty(SVGElement.prototype, "fill", {
        get: function () {
            return this.style.fill;
        },
        set: function (value) {
            this.style.fill = value;
        },
        enumerable: true,
        configurable: true
    });
    return SVGElement;
}(view_1.View));
exports.SVGElement = SVGElement;
exports.fillProperty.register(view_1.Style);
