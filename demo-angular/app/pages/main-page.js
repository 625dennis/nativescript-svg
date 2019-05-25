"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var MainPage = /** @class */ (function () {
    function MainPage(_page) {
        var _this = this;
        this._page = _page;
        this.setColor = function (id) {
            console.log('id', id);
            if (id === 'nativescript-icon') {
                return {
                    color: { a: 255, r: 0, g: 255, b: 128 }
                };
            }
        };
        this._page.on("loaded", function () {
            console.log(_this.svg.nativeElement);
            console.log(_this.svg.nativeElement.nativeView);
        });
    }
    MainPage.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild('svg'),
        __metadata("design:type", core_1.ElementRef)
    ], MainPage.prototype, "svg", void 0);
    MainPage = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./main-page.html",
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], MainPage);
    return MainPage;
}());
exports.MainPage = MainPage;
