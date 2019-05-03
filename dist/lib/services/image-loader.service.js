var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform } from '@ionic/angular';
import { fromEvent, Subject } from 'rxjs';
import { filter, first, take } from 'rxjs/operators';
import { ImageLoaderConfigService } from './image-loader-config.service';
import * as i0 from "@angular/core";
import * as i1 from "./image-loader-config.service";
import * as i2 from "@ionic-native/file/ngx/index";
import * as i3 from "@angular/common/http";
import * as i4 from "@ionic/angular";
import * as i5 from "@ionic-native/ionic-webview/ngx/index";
var EXTENSIONS = ['jpg', 'png', 'jpeg', 'gif', 'svg', 'tiff'];
var ImageLoaderService = /** @class */ (function () {
    function ImageLoaderService(config, file, http, platform, webview) {
        var _this = this;
        this.config = config;
        this.file = file;
        this.http = http;
        this.platform = platform;
        this.webview = webview;
        /**
         * Indicates if the cache service is ready.
         * When the cache service isn't ready, images are loaded via browser instead.
         */
        this.isCacheReady = false;
        /**
         * Indicates if this service is initialized.
         * This service is initialized once all the setup is done.
         */
        this.isInit = false;
        this.initPromise = new Promise(function (resolve) { return _this.initPromiseResolve = resolve; });
        this.lockSubject = new Subject();
        this.lock$ = this.lockSubject.asObservable();
        /**
         * Number of concurrent requests allowed
         */
        this.concurrency = 5;
        /**
         * Queue items
         */
        this.queue = [];
        this.processing = 0;
        /**
         * Fast accessible Object for currently processing items
         */
        this.currentlyProcessing = {};
        this.cacheIndex = [];
        this.currentCacheSize = 0;
        this.indexed = false;
        this.lockedCallsQueue = [];
        if (!platform.is('cordova')) {
            // we are running on a browser, or using livereload
            // plugin will not function in this case
            this.isInit = true;
            this.throwWarning('You are running on a browser or using livereload, IonicImageLoader will not function, falling back to browser loading.');
            this.initPromiseResolve();
        }
        else {
            fromEvent(document, 'deviceready')
                .pipe(first())
                .subscribe(function (res) {
                if (_this.nativeAvailable) {
                    _this.initCache();
                }
                else {
                    // we are running on a browser, or using livereload
                    // plugin will not function in this case
                    _this.isInit = true;
                    _this.initPromiseResolve();
                    _this.throwWarning('You are running on a browser or using livereload, IonicImageLoader will not function, falling back to browser loading.');
                }
            });
        }
    }
    Object.defineProperty(ImageLoaderService.prototype, "nativeAvailable", {
        get: function () {
            return File.installed();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderService.prototype, "isCacheSpaceExceeded", {
        get: function () {
            return (this.config.maxCacheSize > -1 &&
                this.currentCacheSize > this.config.maxCacheSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderService.prototype, "isWKWebView", {
        get: function () {
            return (this.platform.is('ios') &&
                window.webkit &&
                window.webkit.messageHandlers);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderService.prototype, "isIonicWKWebView", {
        get: function () {
            return (
            //  Important: isWKWebview && isIonicWKWebview must be mutually excluse.
            //  Otherwise the logic for copying to tmp under IOS will fail.
            (this.platform.is('android') && this.webview) ||
                (this.platform.is('android')) && (location.host === 'localhost:8080') ||
                window.LiveReload);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderService.prototype, "isDevServer", {
        get: function () {
            return window['IonicDevServer'] !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderService.prototype, "canProcess", {
        /**
         * Check if we can process more items in the queue
         */
        get: function () {
            return this.queue.length > 0 && this.processing < this.concurrency;
        },
        enumerable: true,
        configurable: true
    });
    ImageLoaderService.prototype.ready = function () {
        return this.initPromise;
    };
    /**
     * Preload an image
     * @param imageUrl Image URL
     * @returns returns a promise that resolves with the cached image URL
     */
    ImageLoaderService.prototype.preload = function (imageUrl) {
        return this.getImagePath(imageUrl);
    };
    ImageLoaderService.prototype.getFileCacheDirectory = function () {
        if (this.config.cacheDirectoryType === 'data') {
            return this.file.dataDirectory;
        }
        else if (this.config.cacheDirectoryType === 'external') {
            return this.platform.is('android') ? this.file.externalDataDirectory : this.file.documentsDirectory;
        }
        return this.file.cacheDirectory;
    };
    /**
     * Clears cache of a single image
     * @param imageUrl Image URL
     */
    ImageLoaderService.prototype.clearImageCache = function (imageUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('cordova')) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        this.runLocked(function () { return __awaiter(_this, void 0, void 0, function () {
                            var fileName, route, err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        fileName = this.createFileName(imageUrl);
                                        route = this.getFileCacheDirectory() + this.config.cacheDirectoryName;
                                        // pause any operations
                                        this.isInit = false;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 5, , 6]);
                                        return [4 /*yield*/, this.file.removeFile(route, fileName)];
                                    case 2:
                                        _a.sent();
                                        if (!(this.isWKWebView && !this.isIonicWKWebView)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this.file.removeFile(this.file.tempDirectory + this.config.cacheDirectoryName, fileName)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [3 /*break*/, 6];
                                    case 5:
                                        err_1 = _a.sent();
                                        this.throwError(err_1);
                                        return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/, this.initCache(true)];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Clears the cache
     */
    ImageLoaderService.prototype.clearCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('cordova')) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        this.runLocked(function () { return __awaiter(_this, void 0, void 0, function () {
                            var err_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, this.file.removeRecursively(this.getFileCacheDirectory(), this.config.cacheDirectoryName)];
                                    case 1:
                                        _a.sent();
                                        if (this.isWKWebView && !this.isIonicWKWebView) {
                                            // also clear the temp files
                                            try {
                                                this.file.removeRecursively(this.file.tempDirectory, this.config.cacheDirectoryName);
                                            }
                                            catch (err) {
                                                // Noop catch. Removing the tempDirectory might fail,
                                                // as it is not persistent.
                                            }
                                        }
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_2 = _a.sent();
                                        this.throwError(err_2);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/, this.initCache(true)];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets the filesystem path of an image.
     * This will return the remote path if anything goes wrong or if the cache service isn't ready yet.
     * @param imageUrl The remote URL of the image
     * @returns Returns a promise that will always resolve with an image URL
     */
    ImageLoaderService.prototype.getImagePath = function (imageUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof imageUrl !== 'string' || imageUrl.length <= 0) {
                            throw new Error('The image url provided was empty or invalid.');
                        }
                        return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        if (!this.isCacheReady) {
                            this.throwWarning('The cache system is not running. Images will be loaded by your browser instead.');
                            return [2 /*return*/, imageUrl];
                        }
                        if (this.isImageUrlRelative(imageUrl)) {
                            return [2 /*return*/, imageUrl];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.getCachedImagePath(imageUrl)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        err_3 = _a.sent();
                        // image doesn't exist in cache, lets fetch it and save it
                        return [2 /*return*/, this.addItemToQueue(imageUrl)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ImageLoaderService.prototype.processLockedQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLockedState()];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/];
                        }
                        if (!(this.lockedCallsQueue.length > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.setLockedState(true)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.lockedCallsQueue.slice(0, 1)[0]()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_4 = _a.sent();
                        console.log('Error running locked function: ', err_4);
                        return [3 /*break*/, 6];
                    case 6: return [4 /*yield*/, this.setLockedState(false)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, this.processLockedQueue()];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ImageLoaderService.prototype.getLockedState = function () {
        return this.lock$
            .pipe(take(1))
            .toPromise();
    };
    ImageLoaderService.prototype.awaitUnlocked = function () {
        return this.lock$
            .pipe(filter(function (locked) { return !!locked; }), take(1))
            .toPromise();
    };
    ImageLoaderService.prototype.setLockedState = function (locked) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.lockSubject.next(locked);
                return [2 /*return*/];
            });
        });
    };
    ImageLoaderService.prototype.runLocked = function (fn) {
        this.lockedCallsQueue.push(fn);
        this.processLockedQueue();
    };
    /**
     * Returns if an imageUrl is an relative path
     * @param imageUrl
     */
    ImageLoaderService.prototype.isImageUrlRelative = function (imageUrl) {
        return !/^(https?|file):\/\/\/?/i.test(imageUrl);
    };
    /**
     * Add an item to the queue
     * @param imageUrl
     * @param resolve
     * @param reject
     */
    ImageLoaderService.prototype.addItemToQueue = function (imageUrl, resolve, reject) {
        var p;
        if (!resolve && !reject) {
            p = new Promise(function (res, rej) {
                resolve = res;
                reject = rej;
            });
        }
        else {
            resolve = resolve || (function () {
            });
            reject = reject || (function () {
            });
        }
        this.queue.push({
            imageUrl: imageUrl,
            resolve: resolve,
            reject: reject,
        });
        this.processQueue();
        return p;
    };
    /**
     * Processes one item from the queue
     */
    ImageLoaderService.prototype.processQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentItem, done, error, localUrl, err_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // make sure we can process items first
                        if (!this.canProcess) {
                            return [2 /*return*/];
                        }
                        // increase the processing number
                        this.processing++;
                        currentItem = this.queue.splice(0, 1)[0];
                        done = function () {
                            _this.processing--;
                            _this.processQueue();
                            // only delete if it's the last/unique occurrence in the queue
                            if (_this.currentlyProcessing[currentItem.imageUrl] !== undefined && !_this.currentlyInQueue(currentItem.imageUrl)) {
                                delete _this.currentlyProcessing[currentItem.imageUrl];
                            }
                        };
                        error = function (e) {
                            currentItem.reject();
                            _this.throwError(e);
                            done();
                        };
                        if (!(this.currentlyProcessing[currentItem.imageUrl] !== undefined)) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        // Prevented same Image from loading at the same time
                        return [4 /*yield*/, this.currentlyProcessing[currentItem.imageUrl]];
                    case 2:
                        // Prevented same Image from loading at the same time
                        _a.sent();
                        return [4 /*yield*/, this.getCachedImagePath(currentItem.imageUrl)];
                    case 3:
                        localUrl = _a.sent();
                        currentItem.resolve(localUrl);
                        done();
                        return [3 /*break*/, 5];
                    case 4:
                        err_5 = _a.sent();
                        error(err_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                    case 6:
                        this.currentlyProcessing[currentItem.imageUrl] = (function () { return __awaiter(_this, void 0, void 0, function () {
                            var localDir, fileName, data, file, localUrl, err_6;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        // process more items concurrently if we can
                                        if (this.canProcess) {
                                            this.processQueue();
                                        }
                                        localDir = this.getFileCacheDirectory() + this.config.cacheDirectoryName + '/';
                                        fileName = this.createFileName(currentItem.imageUrl);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 6, , 7]);
                                        return [4 /*yield*/, this.http.get(currentItem.imageUrl, {
                                                responseType: 'blob',
                                                headers: this.config.httpHeaders,
                                            }).toPromise()];
                                    case 2:
                                        data = _a.sent();
                                        return [4 /*yield*/, this.file.writeFile(localDir, fileName, data, { replace: true })];
                                    case 3:
                                        file = _a.sent();
                                        if (this.isCacheSpaceExceeded) {
                                            this.maintainCacheSize();
                                        }
                                        return [4 /*yield*/, this.addFileToIndex(file)];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, this.getCachedImagePath(currentItem.imageUrl)];
                                    case 5:
                                        localUrl = _a.sent();
                                        currentItem.resolve(localUrl);
                                        done();
                                        this.maintainCacheSize();
                                        return [3 /*break*/, 7];
                                    case 6:
                                        err_6 = _a.sent();
                                        error(err_6);
                                        throw err_6;
                                    case 7: return [2 /*return*/];
                                }
                            });
                        }); })();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Search if the url is currently in the queue
     * @param imageUrl Image url to search
     */
    ImageLoaderService.prototype.currentlyInQueue = function (imageUrl) {
        return this.queue.some(function (item) { return item.imageUrl === imageUrl; });
    };
    /**
     * Initialize the cache service
     * @param [replace] Whether to replace the cache directory if it already exists
     */
    ImageLoaderService.prototype.initCache = function (replace) {
        return __awaiter(this, void 0, void 0, function () {
            var err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.concurrency = this.config.concurrency;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.createCacheDirectory(replace)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.indexCache()];
                    case 3:
                        _a.sent();
                        this.isCacheReady = true;
                        return [3 /*break*/, 5];
                    case 4:
                        err_7 = _a.sent();
                        this.throwError(err_7);
                        return [3 /*break*/, 5];
                    case 5:
                        this.isInit = true;
                        this.initPromiseResolve();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Adds a file to index.
     * Also deletes any files if they are older than the set maximum cache age.
     * @param file FileEntry to index
     */
    ImageLoaderService.prototype.addFileToIndex = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) { return file.getMetadata(resolve, reject); })];
                    case 1:
                        metadata = _a.sent();
                        if (this.config.maxCacheAge > -1 &&
                            Date.now() - metadata.modificationTime.getTime() >
                                this.config.maxCacheAge) {
                            // file age exceeds maximum cache age
                            return [2 /*return*/, this.removeFile(file.name)];
                        }
                        else {
                            // file age doesn't exceed maximum cache age, or maximum cache age isn't set
                            this.currentCacheSize += metadata.size;
                            // add item to index
                            this.cacheIndex.push({
                                name: file.name,
                                modificationTime: metadata.modificationTime,
                                size: metadata.size,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Indexes the cache if necessary
     */
    ImageLoaderService.prototype.indexCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cacheIndex = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.file.listDir(this.getFileCacheDirectory(), this.config.cacheDirectoryName)];
                    case 2:
                        files = _a.sent();
                        return [4 /*yield*/, Promise.all(files.map(this.addFileToIndex.bind(this)))];
                    case 3:
                        _a.sent();
                        // Sort items by date. Most recent to oldest.
                        this.cacheIndex = this.cacheIndex.sort(function (a, b) { return (a > b ? -1 : a < b ? 1 : 0); });
                        this.indexed = true;
                        return [3 /*break*/, 5];
                    case 4:
                        err_8 = _a.sent();
                        this.throwError(err_8);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method runs every time a new file is added.
     * It checks the cache size and ensures that it doesn't exceed the maximum cache size set in the config.
     * If the limit is reached, it will delete old images to create free space.
     */
    ImageLoaderService.prototype.maintainCacheSize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var maintain_1;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.config.maxCacheSize > -1 && this.indexed) {
                    maintain_1 = function () { return __awaiter(_this, void 0, void 0, function () {
                        var file, err_9;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(this.currentCacheSize > this.config.maxCacheSize)) return [3 /*break*/, 5];
                                    file = this.cacheIndex.splice(0, 1)[0];
                                    if (typeof file === 'undefined') {
                                        return [2 /*return*/, maintain_1()];
                                    }
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.removeFile(file.name)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_9 = _a.sent();
                                    return [3 /*break*/, 4];
                                case 4:
                                    this.currentCacheSize -= file.size;
                                    return [2 /*return*/, maintain_1()];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); };
                    return [2 /*return*/, maintain_1()];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Remove a file
     * @param file The name of the file to remove
     */
    ImageLoaderService.prototype.removeFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.file.removeFile(this.getFileCacheDirectory() + this.config.cacheDirectoryName, file)];
                    case 1:
                        _a.sent();
                        if (this.isWKWebView && !this.isIonicWKWebView) {
                            try {
                                return [2 /*return*/, this.file.removeFile(this.file.tempDirectory + this.config.cacheDirectoryName, file)];
                            }
                            catch (err) {
                                // Noop catch. Removing the files from tempDirectory might fail, as it is not persistent.
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the local path of a previously cached image if exists
     * @param url The remote URL of the image
     * @returns Returns a promise that resolves with the local path if exists, or rejects if doesn't exist
     */
    ImageLoaderService.prototype.getCachedImagePath = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName, dirPath, tempDirPath, fileEntry, base64, tempFileEntry, err_10, tempFileEntry, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        if (!this.isCacheReady) {
                            throw new Error('Cache is not ready');
                        }
                        // if we're running with livereload, ignore cache and call the resource from it's URL
                        if (this.isDevServer) {
                            return [2 /*return*/, url];
                        }
                        fileName = this.createFileName(url);
                        dirPath = this.getFileCacheDirectory() + this.config.cacheDirectoryName, tempDirPath = this.file.tempDirectory + this.config.cacheDirectoryName;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 12, , 13]);
                        return [4 /*yield*/, this.file.resolveLocalFilesystemUrl(dirPath + '/' + fileName)];
                    case 3:
                        fileEntry = _a.sent();
                        if (!(this.config.imageReturnType === 'base64')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.file.readAsDataURL(dirPath, fileName)];
                    case 4:
                        base64 = _a.sent();
                        return [2 /*return*/, base64.replace('data:null', 'data:*/*')];
                    case 5:
                        if (this.config.imageReturnType !== 'uri') {
                            return [2 /*return*/];
                        }
                        _a.label = 6;
                    case 6:
                        // now check if iOS device & using WKWebView Engine.
                        // in this case only the tempDirectory is accessible,
                        // therefore the file needs to be copied into that directory first!
                        if (this.isIonicWKWebView) {
                            return [2 /*return*/, this.normalizeUrl(fileEntry)];
                        }
                        if (!this.isWKWebView) {
                            // return native path
                            return [2 /*return*/, fileEntry.nativeURL];
                        }
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 11]);
                        return [4 /*yield*/, this.file.resolveLocalFilesystemUrl(tempDirPath + '/' + fileName)];
                    case 8:
                        tempFileEntry = _a.sent();
                        // file exists in temp directory
                        // return native path
                        return [2 /*return*/, this.normalizeUrl(tempFileEntry)];
                    case 9:
                        err_10 = _a.sent();
                        return [4 /*yield*/, this.file
                                .copyFile(dirPath, fileName, tempDirPath, fileName)];
                    case 10:
                        tempFileEntry = _a.sent();
                        // now the file exists in the temp directory
                        // return native path
                        return [2 /*return*/, this.normalizeUrl(tempFileEntry)];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        err_11 = _a.sent();
                        throw new Error('File does not exist');
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Normalizes the image uri to a version that can be loaded in the webview
     * @param fileEntry the FileEntry of the image file
     * @returns the normalized Url
     */
    ImageLoaderService.prototype.normalizeUrl = function (fileEntry) {
        // Use Ionic normalizeUrl to generate the right URL for Ionic WKWebView
        if (Ionic && typeof Ionic.normalizeURL === 'function') {
            return Ionic.normalizeURL(fileEntry.nativeURL);
        }
        // use new webview function to do the trick
        if (this.webview) {
            return this.webview.convertFileSrc(fileEntry.nativeURL);
        }
        return fileEntry.nativeURL;
    };
    /**
     * Throws a console error if debug mode is enabled
     * @param args Error message
     */
    ImageLoaderService.prototype.throwError = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.config.debugMode) {
            args.unshift('ImageLoader Error: ');
            console.error.apply(console, args);
        }
    };
    /**
     * Throws a console warning if debug mode is enabled
     * @param args Error message
     */
    ImageLoaderService.prototype.throwWarning = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.config.debugMode) {
            args.unshift('ImageLoader Warning: ');
            console.warn.apply(console, args);
        }
    };
    /**
     * Check if the cache directory exists
     * @param directory The directory to check. Either this.file.tempDirectory or this.getFileCacheDirectory()
     * @returns Returns a promise that resolves if exists, and rejects if it doesn't
     */
    ImageLoaderService.prototype.cacheDirectoryExists = function (directory) {
        return this.file.checkDir(directory, this.config.cacheDirectoryName);
    };
    /**
     * Create the cache directories
     * @param replace override directory if exists
     * @returns Returns a promise that resolves if the directories were created, and rejects on error
     */
    ImageLoaderService.prototype.createCacheDirectory = function (replace) {
        var _this = this;
        if (replace === void 0) { replace = false; }
        var cacheDirectoryPromise, tempDirectoryPromise;
        if (replace) {
            // create or replace the cache directory
            cacheDirectoryPromise = this.file.createDir(this.getFileCacheDirectory(), this.config.cacheDirectoryName, replace);
        }
        else {
            // check if the cache directory exists.
            // if it does not exist create it!
            cacheDirectoryPromise = this.cacheDirectoryExists(this.getFileCacheDirectory())
                .catch(function () { return _this.file.createDir(_this.getFileCacheDirectory(), _this.config.cacheDirectoryName, false); });
        }
        if (this.isWKWebView && !this.isIonicWKWebView) {
            if (replace) {
                // create or replace the temp directory
                tempDirectoryPromise = this.file.createDir(this.file.tempDirectory, this.config.cacheDirectoryName, replace);
            }
            else {
                // check if the temp directory exists.
                // if it does not exist create it!
                tempDirectoryPromise = this.cacheDirectoryExists(this.file.tempDirectory).catch(function () {
                    return _this.file.createDir(_this.file.tempDirectory, _this.config.cacheDirectoryName, false);
                });
            }
        }
        else {
            tempDirectoryPromise = Promise.resolve();
        }
        return Promise.all([cacheDirectoryPromise, tempDirectoryPromise]);
    };
    /**
     * Creates a unique file name out of the URL
     * @param url URL of the file
     * @returns Unique file name
     */
    ImageLoaderService.prototype.createFileName = function (url) {
        // hash the url to get a unique file name
        return (this.hashString(url).toString() +
            (this.config.fileNameCachedWithExtension
                ? this.getExtensionFromUrl(url)
                : ''));
    };
    /**
     * Converts a string to a unique 32-bit int
     * @param string string to hash
     * @returns 32-bit int
     */
    ImageLoaderService.prototype.hashString = function (string) {
        var hash = 0, char;
        if (string.length === 0) {
            return hash;
        }
        for (var i = 0; i < string.length; i++) {
            char = string.charCodeAt(i);
            // tslint:disable-next-line
            hash = (hash << 5) - hash + char;
            // tslint:disable-next-line
            hash = hash & hash;
        }
        return hash;
    };
    /**
     * Extract extension from filename or url
     *
     * @param url
     * @returns
     *
     * Not always will url's contain a valid image extention. We'll check if any valid extention is supplied.
     * If not, we will use the default.
     */
    ImageLoaderService.prototype.getExtensionFromUrl = function (url) {
        var urlWitoutParams = url.split(/\#|\?/)[0];
        var ext = (urlWitoutParams.substr((~-urlWitoutParams.lastIndexOf('.') >>> 0) + 1) || '').toLowerCase();
        return (EXTENSIONS.indexOf(ext) >= 0 ? ext : this.config.fallbackFileNameCachedExtension);
    };
    ImageLoaderService.ngInjectableDef = i0.defineInjectable({ factory: function ImageLoaderService_Factory() { return new ImageLoaderService(i0.inject(i1.ImageLoaderConfigService), i0.inject(i2.File), i0.inject(i3.HttpClient), i0.inject(i4.Platform), i0.inject(i5.WebView)); }, token: ImageLoaderService, providedIn: "root" });
    ImageLoaderService = __decorate([
        Injectable({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [ImageLoaderConfigService,
            File,
            HttpClient,
            Platform,
            WebView])
    ], ImageLoaderService);
    return ImageLoaderService;
}());
export { ImageLoaderService };
//# sourceMappingURL=image-loader.service.js.map