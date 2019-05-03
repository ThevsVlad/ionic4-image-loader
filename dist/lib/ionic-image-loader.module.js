var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicImageLoaderComponent } from './ionic-image-loader.component';
import { ImageLoaderConfigService } from './services/image-loader-config.service';
import { ImageLoaderService } from './services/image-loader.service';
var IonicImageLoader = /** @class */ (function () {
    function IonicImageLoader() {
    }
    IonicImageLoader_1 = IonicImageLoader;
    IonicImageLoader.forRoot = function () {
        return {
            ngModule: IonicImageLoader_1,
            providers: [
                ImageLoaderConfigService,
                ImageLoaderService,
                File,
            ],
        };
    };
    var IonicImageLoader_1;
    IonicImageLoader = IonicImageLoader_1 = __decorate([
        NgModule({
            imports: [
                IonicModule,
                HttpClientModule,
                CommonModule,
            ],
            declarations: [IonicImageLoaderComponent],
            exports: [IonicImageLoaderComponent],
        })
    ], IonicImageLoader);
    return IonicImageLoader;
}());
export { IonicImageLoader };
//# sourceMappingURL=ionic-image-loader.module.js.map