/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "../../../../node_modules/@ionic/angular/dist/core.ngfactory";
import * as i2 from "@ionic/angular";
import * as i3 from "@angular/common";
import * as i4 from "./ionic-image-loader.component";
import * as i5 from "./services/image-loader.service";
import * as i6 from "./services/image-loader-config.service";
var styles_IonicImageLoaderComponent = ["ion-spinner[_ngcontent-%COMP%] { float: none; margin-left: auto; margin-right: auto; display: block; }"];
var RenderType_IonicImageLoaderComponent = i0.ɵcrt({ encapsulation: 0, styles: styles_IonicImageLoaderComponent, data: {} });
export { RenderType_IonicImageLoaderComponent as RenderType_IonicImageLoaderComponent };
function View_IonicImageLoaderComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "ion-spinner", [], null, null, null, i1.View_ɵcl_0, i1.RenderType_ɵcl)), i0.ɵdid(1, 49152, null, 0, i2.ɵcl, [i0.ChangeDetectorRef, i0.ElementRef], { color: [0, "color"], name: [1, "name"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.spinnerColor; var currVal_1 = _co.spinnerName; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
export function View_IonicImageLoaderComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵand(16777216, null, null, 1, null, View_IonicImageLoaderComponent_1)), i0.ɵdid(1, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), i0.ɵncd(null, 0)], function (_ck, _v) { var _co = _v.component; var currVal_0 = ((_co.spinner && _co.isLoading) && !_co.fallbackAsPlaceholder); _ck(_v, 1, 0, currVal_0); }, null); }
export function View_IonicImageLoaderComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "img-loader", [], null, null, null, View_IonicImageLoaderComponent_0, RenderType_IonicImageLoaderComponent)), i0.ɵdid(1, 114688, null, 0, i4.IonicImageLoaderComponent, [i0.ElementRef, i0.Renderer2, i5.ImageLoaderService, i6.ImageLoaderConfigService], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var IonicImageLoaderComponentNgFactory = i0.ɵccf("img-loader", i4.IonicImageLoaderComponent, View_IonicImageLoaderComponent_Host_0, { fallbackUrl: "fallbackUrl", spinner: "spinner", fallbackAsPlaceholder: "fallbackAsPlaceholder", imgAttributes: "imgAttributes", cache: "cache", width: "width", height: "height", display: "display", backgroundSize: "backgroundSize", backgroundRepeat: "backgroundRepeat", spinnerName: "spinnerName", spinnerColor: "spinnerColor", useImg: "useImg", noCache: "noCache", src: "src" }, { load: "load" }, ["*"]);
export { IonicImageLoaderComponentNgFactory as IonicImageLoaderComponentNgFactory };
//# sourceMappingURL=ionic-image-loader.component.ngfactory.js.map