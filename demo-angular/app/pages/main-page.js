"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var MainPage = (function () {
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
    return MainPage;
}());
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
exports.MainPage = MainPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLGlEQUFnRDtBQU9oRCxJQUFhLFFBQVE7SUFZbkIsa0JBQW9CLEtBQVc7UUFBL0IsaUJBS0M7UUFMbUIsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQVYvQixhQUFRLEdBQUcsVUFBQSxFQUFFO1lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFdEIsRUFBRSxDQUFBLENBQUMsRUFBRSxLQUFLLG1CQUFtQixDQUFDLENBQUMsQ0FBQztnQkFDOUIsTUFBTSxDQUFDO29CQUNMLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7aUJBQ3hDLENBQUM7WUFDSixDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBR0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELDJCQUFRLEdBQVI7SUFDQSxDQUFDO0lBTUgsZUFBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUF6Qm1CO0lBQWpCLGdCQUFTLENBQUMsS0FBSyxDQUFDOzhCQUFLLGlCQUFVO3FDQUFDO0FBRHRCLFFBQVE7SUFMcEIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsa0JBQWtCO0tBQ2hDLENBQUM7cUNBYTJCLFdBQUk7R0FacEIsUUFBUSxDQTBCcEI7QUExQlksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogXCIuL21haW4tcGFnZS5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYWluUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQFZpZXdDaGlsZCgnc3ZnJykgc3ZnOkVsZW1lbnRSZWY7XHJcbiAgc2V0Q29sb3IgPSBpZCA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnaWQnLCBpZCk7XHJcblxyXG4gICAgaWYoaWQgPT09ICduYXRpdmVzY3JpcHQtaWNvbicpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2xvcjogeyBhOiAyNTUsIHI6IDAsIGc6IDI1NSwgYjogMTI4IH1cclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2U6IFBhZ2UpIHtcclxuICAgIHRoaXMuX3BhZ2Uub24oXCJsb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnN2Zy5uYXRpdmVFbGVtZW50KVxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnN2Zy5uYXRpdmVFbGVtZW50Lm5hdGl2ZVZpZXcpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gIH1cclxuXHJcbiAgLy8gbmdBZnRlclZpZXdJbml0KCkge1xyXG4gIC8vICAgLy8gY29uc29sZS5kaXIodGhpcy5zdmcubmF0aXZlRWxlbWVudCwgeyBkZXB0aDogMSB9KTtcclxuICAvLyAgIGNvbnNvbGUubG9nKE9iamVjdC5rZXlzKHRoaXMuc3ZnLm5hdGl2ZUVsZW1lbnQpKTtcclxuICAvLyB9XHJcbn1cclxuIl19