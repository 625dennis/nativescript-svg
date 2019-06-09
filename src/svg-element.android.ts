import { View, Style, CssProperty, Color } from "tns-core-modules/ui/core/view";

import Paint = android.graphics.Paint;

export const fillProperty = new CssProperty<Style, Color>({
  name: 'fill',
  cssName: 'fill',
  defaultValue: new Color('#0000FF'),
  valueConverter: v => new Color(v)
});

export class SVGElement extends View {
  private paint: Paint;

  constructor(id: string, paint: Paint) {
    super();

    this.id = id;
    this.paint = paint;
  }

  onSvgElement(): void {
    if(this.fill && this.paint && this.paint.getStyle() == Paint.Style.FILL) {
      this.paint.setColor(this.fill.argb);
    }
  }

  get fill(): Color {
    return this.style.fill;
  }

  set fill(value: Color) {
    this.style.fill = value;
  }
}

declare module "tns-core-modules/ui/styling/style" {
  interface Style {
    fill: Color;
  }
}

fillProperty.register(Style);
