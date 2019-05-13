import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";

@Component({
  selector: "ns-items",
  moduleId: module.id,
  templateUrl: "./main-page.html",
})
export class MainPage implements OnInit {
  @ViewChild('svg') svg:ElementRef;
  setColor = id => {
    console.log('id', id);

    if(id === 'nativescript-icon') {
      return {
        color: { a: 255, r: 0, g: 255, b: 128 }
      };
    }
  }

  constructor(private _page: Page) {
    this._page.on("loaded", () => {
      console.log(this.svg.nativeElement)
      console.log(this.svg.nativeElement.nativeView);
    })
  }

  ngOnInit(): void {
  }

  // ngAfterViewInit() {
  //   // console.dir(this.svg.nativeElement, { depth: 1 });
  //   console.log(Object.keys(this.svg.nativeElement));
  // }
}
