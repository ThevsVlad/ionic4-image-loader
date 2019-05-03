var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var ImageLoaderConfigService = /** @class */ (function () {
    function ImageLoaderConfigService() {
        this.debugMode = false;
        this.spinnerEnabled = true;
        this.fallbackAsPlaceholder = false;
        this.backgroundSize = 'contain';
        this.backgroundRepeat = 'no-repeat';
        this.display = 'block';
        this.width = '100%';
        this.height = '100%';
        this.useImg = false;
        this.concurrency = 5;
        this.maxCacheSize = -1;
        this.maxCacheAge = -1;
        this.imageReturnType = 'uri';
        // Must be default 'true' for the new WebView to show images
        this.fileNameCachedWithExtension = true;
        this.fallbackFileNameCachedExtension = '.jpg';
        this.cacheDirectoryType = 'cache';
        this._cacheDirectoryName = 'image-loader-cache';
    }
    Object.defineProperty(ImageLoaderConfigService.prototype, "cacheDirectoryName", {
        get: function () {
            return this._cacheDirectoryName;
        },
        set: function (name) {
            name.replace(/\W/g, '');
            this._cacheDirectoryName = name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Enables debug mode to receive console logs, errors, warnings
     */
    ImageLoaderConfigService.prototype.enableDebugMode = function () {
        this.debugMode = true;
    };
    /**
     * Enable/Disable the spinner by default. Defaults to true.
     * @param enable set to true to enable
     */
    ImageLoaderConfigService.prototype.enableSpinner = function (enable) {
        this.spinnerEnabled = enable;
    };
    /**
     * Enable/Disable the fallback image as placeholder instead of the spinner. Defaults to false.
     * @param enable set to true to enable
     */
    ImageLoaderConfigService.prototype.enableFallbackAsPlaceholder = function (enable) {
        this.fallbackAsPlaceholder = enable;
    };
    /**
     * Sets the cache directory name. Defaults to 'image-loader-cache'
     * @param name name of directory
     */
    ImageLoaderConfigService.prototype.setCacheDirectoryName = function (name) {
        this.cacheDirectoryName = name;
    };
    /**
     * Set default height for images that are not using <img> tag
     * @param height height
     */
    ImageLoaderConfigService.prototype.setHeight = function (height) {
        this.height = height;
    };
    /**
     * Set default width for images that are not using <img> tag
     * @param width Width
     */
    ImageLoaderConfigService.prototype.setWidth = function (width) {
        this.width = width;
    };
    /**
     * Enable display mode for images that are not using <img> tag
     * @param display Display mode
     */
    ImageLoaderConfigService.prototype.setDisplay = function (display) {
        this.display = display;
    };
    /**
     * Use <img> tag by default
     * @param use set to true to use <img> tag by default
     */
    ImageLoaderConfigService.prototype.useImageTag = function (use) {
        this.useImg = use;
    };
    /**
     * Set default background size for images that are not using <img> tag
     * @param backgroundSize Background size
     */
    ImageLoaderConfigService.prototype.setBackgroundSize = function (backgroundSize) {
        this.backgroundSize = backgroundSize;
    };
    /**
     * Set background repeat for images that are not using <img> tag
     * @param backgroundRepeat Background repeat
     */
    ImageLoaderConfigService.prototype.setBackgroundRepeat = function (backgroundRepeat) {
        this.backgroundRepeat = backgroundRepeat;
    };
    /**
     * Set fallback URL to use when image src is undefined or did not resolve.
     * This image will not be cached. This should ideally be a locally saved image.
     * @param fallbackUrl The remote or local URL of the image
     */
    ImageLoaderConfigService.prototype.setFallbackUrl = function (fallbackUrl) {
        this.fallbackUrl = fallbackUrl;
    };
    /**
     * Set the maximum number of allowed connections at the same time.
     * @param concurrency
     */
    ImageLoaderConfigService.prototype.setConcurrency = function (concurrency) {
        this.concurrency = concurrency;
    };
    /**
     * Sets the maximum allowed cache size
     * @param cacheSize Cache size in bytes
     */
    ImageLoaderConfigService.prototype.setMaximumCacheSize = function (cacheSize) {
        this.maxCacheSize = cacheSize;
    };
    /**
     * Sets the maximum allowed cache age
     * @param cacheAge Maximum cache age in milliseconds
     */
    ImageLoaderConfigService.prototype.setMaximumCacheAge = function (cacheAge) {
        this.maxCacheAge = cacheAge;
    };
    /**
     * Set the return type of cached images
     * @param imageReturnType The return type; either 'base64' or 'uri'
     */
    ImageLoaderConfigService.prototype.setImageReturnType = function (imageReturnType) {
        this.imageReturnType = imageReturnType;
    };
    /**
     * Set the default spinner name
     * @param name
     */
    ImageLoaderConfigService.prototype.setSpinnerName = function (name) {
        this.spinnerName = name;
    };
    /**
     * Set the default spinner color
     * @param color
     */
    ImageLoaderConfigService.prototype.setSpinnerColor = function (color) {
        this.spinnerColor = color;
    };
    /**
     * Set headers options for the HttpClient transfers.
     * @param headers
     */
    ImageLoaderConfigService.prototype.setHttpHeaders = function (headers) {
        this.httpHeaders = headers;
    };
    /**
     * Set options for the FileTransfer plugin
     * @param options
     * @deprecated FileTransfer plugin removed.
     */
    ImageLoaderConfigService.prototype.setFileTransferOptions = function (options) {
        // do nothing, plugin deprecated.
    };
    /**
     * Enable/Disable the save filename of cached images with extension.  Defaults to false.
     * @param enable set to true to enable
     */
    ImageLoaderConfigService.prototype.setFileNameCachedWithExtension = function (enable) {
        this.fileNameCachedWithExtension = enable;
    };
    /**
     * Set fallback extension filename of cached images.  Defaults to '.jpg'.
     * @param extension fallback extension (e.x .jpg)
     */
    ImageLoaderConfigService.prototype.setFallbackFileNameCachedExtension = function (extension) {
        this.fallbackFileNameCachedExtension = extension;
    };
    ImageLoaderConfigService.ngInjectableDef = i0.defineInjectable({ factory: function ImageLoaderConfigService_Factory() { return new ImageLoaderConfigService(); }, token: ImageLoaderConfigService, providedIn: "root" });
    ImageLoaderConfigService = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], ImageLoaderConfigService);
    return ImageLoaderConfigService;
}());
export { ImageLoaderConfigService };
//# sourceMappingURL=image-loader-config.service.js.map