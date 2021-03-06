"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types = require("tns-core-modules/utils/types");
var common = require("./svg.common");
var svg_element_android_1 = require("./svg-element.android");
var http;
function ensureHttp() {
    if (!http) {
        http = require("http");
    }
}
global.moduleMerge(common, exports);
var utils;
function ensureUtils() {
    if (!utils) {
        utils = require("utils/utils");
    }
}
var fs;
function ensureFS() {
    if (!fs) {
        fs = require("file-system");
    }
}
var Sharp = com.pixplicity.sharp.Sharp;
var OnSvgElementListener = com.pixplicity.sharp.OnSvgElementListener;
var ImageSourceSVG = (function () {
    function ImageSourceSVG() {
    }
    ImageSourceSVG.prototype.loadFromResource = function (name) {
        this.nativeView = null;
        ensureUtils();
        var res = utils.ad.getApplicationContext().getResources();
        if (res) {
            var identifier = res.getIdentifier(name, 'drawable', utils.ad.getApplication().getPackageName());
            if (0 < identifier) {
                this.nativeView = new Sharp.loadResource(res, identifier);
            }
        }
        return this.nativeView != null;
    };
    ImageSourceSVG.prototype.fromResource = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromResource(name));
        });
    };
    ImageSourceSVG.prototype.loadFromFile = function (path) {
        ensureFS();
        var fileName = types.isString(path) ? path.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = fs.path.join(fs.knownFolders.currentApp().path, fileName.replace("~/", ""));
        }
        this.nativeView = new Sharp.loadInputStream(new java.io.FileInputStream(new java.io.File(fileName)));
        return this.nativeView != null;
    };
    ImageSourceSVG.prototype.fromFile = function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromFile(path));
        });
    };
    ImageSourceSVG.prototype.loadFromData = function (data) {
        this.nativeView = new Sharp.loadString(data);
        return this.nativeView != null;
    };
    ImageSourceSVG.prototype.fromData = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromData(data));
        });
    };
    ImageSourceSVG.prototype.loadFromBase64 = function (source) {
        var bytes = android.util.Base64.decode(source, android.util.Base64.DEFAULT);
        this.nativeView = new Sharp.loadString(new java.lang.String(bytes));
        return this.nativeView != null;
    };
    ImageSourceSVG.prototype.fromBase64 = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromBase64(data));
        });
    };
    ImageSourceSVG.prototype.loadFromUrl = function (url) {
        ensureHttp();
        var result = http.getString(url);
        return this.setNativeSource(new Sharp.loadString(result));
    };
    ImageSourceSVG.prototype.fromUrl = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromUrl(url));
        });
    };
    ImageSourceSVG.prototype.setNativeSource = function (source) {
        this.nativeView = source;
        return source != null;
    };
    ImageSourceSVG.prototype.saveToFile = function (path) {
        return false;
    };
    ImageSourceSVG.prototype.toBase64String = function (format) {
        if (!this.nativeView) {
            return null;
        }
        return android.util.Base64.encodeToString(format, android.util.Base64.DEFAULT);
    };
    Object.defineProperty(ImageSourceSVG.prototype, "height", {
        get: function () {
            if (this.nativeView) {
                return this.nativeView.getPicture().getHeight();
            }
            return NaN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageSourceSVG.prototype, "width", {
        get: function () {
            if (this.nativeView) {
                return this.nativeView.getPicture().getWidth();
            }
            return NaN;
        },
        enumerable: true,
        configurable: true
    });
    return ImageSourceSVG;
}());
exports.ImageSourceSVG = ImageSourceSVG;
var SVGImage = (function (_super) {
    __extends(SVGImage, _super);
    function SVGImage() {
        var _this = _super.call(this) || this;
        _this._elements = [];
        return _this;
    }
    SVGImage.prototype.createNativeView = function () {
        return new android.widget.ImageView(this._context);
    };
    Object.defineProperty(SVGImage.prototype, "android", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    SVGImage.prototype.tryToSetSvgProperties = function () {
        var _this = this;
        if (!this._svg) {
            return;
        }
        if (this._onSvgElement) {
            var self = this;
            this._svg.setOnElementListener(new OnSvgElementListener({
                onSvgElement: function (id, element, elementBounds, canvas, canvasBounds, paint) {
                    var elementView = new svg_element_android_1.SVGElement(id, paint);
                    self._elements.push(elementView);
                    self._addView(elementView);
                    elementView.onSvgElement();
                    return element;
                },
                onSvgStart: function () { },
                onSvgEnd: function () { },
                onSvgElementDrawn: function () { }
            }));
            this._svg.getSharpPicture(new Sharp.PictureCallback({
                onPictureReady: function (picture) {
                    _this._drawable = picture.getDrawable(_this.nativeView);
                    _this.nativeView.setImageDrawable(_this._drawable);
                }
            }));
        }
    };
    SVGImage.prototype._setNativeImage = function (nativeImage) {
        this._svg = nativeImage.nativeView;
        this.tryToSetSvgProperties();
    };
    SVGImage.prototype[common.imageSourceProperty.setNative] = function (value) {
        var image = value;
        if (!image || !image.nativeView) {
            return;
        }
        this._setNativeImage(image);
    };
    SVGImage.prototype._setOnSvgElement = function (onSvgElement) {
        this._onSvgElement = onSvgElement;
        this.tryToSetSvgProperties();
    };
    SVGImage.prototype[common.onSvgElementProperty.setNative] = function (value) {
        if (!value) {
            return;
        }
        this._setOnSvgElement(value);
    };
    return SVGImage;
}(common.SVGImage));
exports.SVGImage = SVGImage;
