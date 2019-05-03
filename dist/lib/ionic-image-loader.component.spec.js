import { async, TestBed } from '@angular/core/testing';
import { IonicImageLoaderComponent } from './ionic-image-loader.component';
describe('IonicImageLoaderComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [IonicImageLoaderComponent],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(IonicImageLoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ionic-image-loader.component.spec.js.map