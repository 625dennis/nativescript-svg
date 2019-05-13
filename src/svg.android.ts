import svg = require("./svg");
import common = require("./svg.common");
import types = require("tns-core-modules/utils/types");
import * as utilsModule from "tns-core-modules/utils/utils";
import * as fileSystemModule from "tns-core-modules/file-system";
import * as httpModule from "tns-core-modules/http";

var http: typeof httpModule;
function ensureHttp() {
    if (!http) {
        http = require("http");
    }
}

global.moduleMerge(common, exports);

var utils: typeof utilsModule;
function ensureUtils() {
    if (!utils) {
        utils = require("utils/utils");
    }
}

var fs: typeof fileSystemModule;
function ensureFS() {
    if (!fs) {
        fs = require("file-system");
    }
}

declare var android: any;
declare var com: any;
declare var java: any;
declare var org: any;

var Sharp: any = com.pixplicity.sharp.Sharp;
var OnSvgElementListener: any = com.pixplicity.sharp.OnSvgElementListener;
var Paint: any = android.graphics.Paint;
var Color: any = android.graphics.Color;

export class ImageSourceSVG implements svg.ImageSourceSVG {
    private nativeView: any;

    public loadFromResource(name: string): boolean {
        this.nativeView = null;

        ensureUtils();

        var res = utils.ad.getApplicationContext().getResources();
        if (res) {
            var identifier: number = res.getIdentifier(name, 'drawable', utils.ad.getApplication().getPackageName());
            if (0 < identifier) {
                // Load SVG
                this.nativeView = new Sharp.loadResource(res, identifier);
            }
        }

        return this.nativeView != null;
    }

    public fromResource(name: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.loadFromResource(name));
        });
    }

    public loadFromFile(path: string): boolean {
        ensureFS();

        var fileName = types.isString(path) ? path.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = fs.path.join(fs.knownFolders.currentApp().path, fileName.replace("~/", ""));
        }

        this.nativeView = new Sharp.loadInputStream(new java.io.FileInputStream(new java.io.File(fileName)));
        console.log(this.nativeView)
        return this.nativeView != null;
    }

    public fromFile(path: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.loadFromFile(path));
        });
    }

    public loadFromData(data: any): boolean {
        this.nativeView = new Sharp.loadString(data);
        return this.nativeView != null;
    }

    public fromData(data: any): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.loadFromData(data));
        });
    }

    public loadFromBase64(source: string): boolean {
        var bytes = android.util.Base64.decode(source, android.util.Base64.DEFAULT);
        this.nativeView = new Sharp.loadString(new java.lang.String(bytes));
        return this.nativeView != null;
    }


    public fromBase64(data: any): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.loadFromBase64(data));
        });
    }

    public loadFromUrl(url: string): boolean {
        ensureHttp();
        var result = http.getString(url);
        return this.setNativeSource(new Sharp.loadString(result));
        //var httpUrl = new java.net.URL(url);
        //var urlConnection = httpUrl.openConnection();
        //return this.setNativeSource(new com.larvalabs.svgandroid.SVGParser.getSVGFromInputStream(urlConnection.getInputStream()));
    }

    public fromUrl(url: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.loadFromUrl(url));
        });
    }

    public setNativeSource(source: any): boolean {
        this.nativeView = source;
        return source != null;
    }

    public saveToFile(path: string): boolean {
        // TODO to be implemented
        return false;
    }

    public toBase64String(format: string): string {
        if (!this.nativeView) {
            return null;;
        }

        return android.util.Base64.encodeToString(format, android.util.Base64.DEFAULT);
    }

    get height(): number {
        if (this.nativeView) {
            return this.nativeView.getPitcture().getHeight();
        }

        return NaN;
    }

    get width(): number {
        if (this.nativeView) {
            return this.nativeView.getPitcture().getWidth();
        }

        return NaN;
    }
}

export class SVGImage extends common.SVGImage {
    private _drawable: android.graphics.drawable.PictureDrawable;
    private _svg: any;
    private _onSvgElement: any;

    constructor() {
        super();
    }

    public createNativeView() {
        return new org.nativescript.widgets.ImageView(this._context);
    }

    private tryToSetSvgProperties() {
      if(!this._svg) {
        return;
      }

      if(this._onSvgElement) {
        var onSvgElement = this._onSvgElement

        console.log('trying to set onSvgElement');
        console.log(this._svg.setOnElementListener);
        this._svg.setOnElementListener(new OnSvgElementListener({
          onSvgElement(id, element, elementBounds, canvas, canvasBounds, paint) {
            var newElementInfo = onSvgElement(id) || {};
            var { color } = newElementInfo;

            if(color && paint && paint.getStyle() == Paint.Style.FILL) {
              paint.setColor(Color.argb(color.a, color.r, color.g, color.b));
            }

            return element;
          },
          onSvgStart() {},
          onSvgEnd() {},
          onSvgElementDrawn() {}
        }));

        // this.nativeView.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
        // this._drawable = this._svg.getDrawable(this.nativeView);
        // this.nativeView.setImageDrawable(this._drawable);

        this._svg.getSharpPicture(new Sharp.PictureCallback({
          onPictureReady: picture => {
            this._drawable = picture.getDrawable(this.nativeView);
            this.nativeView.setImageDrawable(this._drawable);
          }
        }));
      }
    }

    public _setNativeImage(nativeImage: any) {
      console.log(Object.keys(nativeImage.nativeView));
        this._svg = nativeImage.nativeView;
        this.tryToSetSvgProperties();
    }

    [common.imageSourceProperty.setNative](value: any) {
        var image = <SVGImage>value;

        if (!image || !image.nativeView) {
            return;
        }

        this._setNativeImage(image);
    }

    public _setOnSvgElement(onSvgElement : any) {
      this._onSvgElement = onSvgElement;
      this.tryToSetSvgProperties();
    }

    [common.onSvgElementProperty.setNative](value : any) {
      console.log('onSvgElement', value);

      if(!value) {
        return;
      }

      this._setOnSvgElement(value);
    }
}
