import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('/src/app/app.component.spec.ts : AppComponent ', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;

    }));

    it('should create the app', () => {
        expect(app).toBeTruthy();
    });

    it('should set the Title property', () => {
        expect(app.Title).toBe('Please select :');
    });

    it('should set the SelectedItem property', () => {
        expect(app.SelectedItem.Id).toBe(0);
        expect(app.SelectedItem.DisplayName).toBe('None selected');
    });

    it("should set the items property to an array", () => {
        expect(app.items.length).toBe(3);
        for (let item of app.items) {
            expect(item.DisplayName).toContain("Item");
        }
    });

    it("should render 0 - none selected to the DOM", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const domElement = fixture.debugElement.nativeElement;

            let selectedItemDiv = domElement.querySelector("#selectedItemText");
            expect(selectedItemDiv).toBeTruthy();
            expect(selectedItemDiv.innerHTML).toContain('0 - None selected');
        });
    });

    it("should render 3 buttons to the DOM", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const domElement = fixture.debugElement.nativeElement;

            let selectedItemDiv = domElement.querySelector("ul");

            let buttons = selectedItemDiv.querySelectorAll('div > button');
            expect(buttons.length).toBe(3);

            for (let button of buttons) {
                expect(button.innerHTML).toContain('Item');
            }

        });
    });

    it("should render a boostrap form-group to the DOM", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const domElement = fixture.debugElement.nativeElement;

            let formInput = domElement.querySelector(".form-group input");

            expect(formInput.value).toBe(`Your Name`);
        });
    });

    it("should render an Angular formGroup to the DOM", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const domElement = fixture.debugElement.nativeElement;

            let rfFormInput = domElement.querySelector("form input");

            expect(rfFormInput.value).toBe(`RF Input`);
        });
    });

    it("should set a value on the form, and click submit", () => {
        let submitSpy = spyOn(app, 'onSubmit');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const domElement = fixture.debugElement.nativeElement;

            let formInput = domElement.querySelector(".form-group input");

            expect(formInput.value).toBe(`Your Name`);
            formInput.value = 'Updated Value';

            let submitButton = domElement.querySelector('#submit-button-button');
            expect(submitButton).toBeTruthy();
            submitButton.click();

            expect(submitSpy).toHaveBeenCalled();
        });
    });

    it("should set a value on the reactive form, and click submit", () => {
        let submitSpy = spyOn(app, 'onSubmitRf');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const formGroup = app.reactiveFormGroup;
            expect(formGroup).toBeTruthy();
            expect(formGroup.value.nameInput).toBe('RF Input');

            formGroup.controls['nameInput'].setValue('Updated RF Value');

            const domElement = fixture.debugElement.nativeElement;

            let submitButton = domElement.querySelector('#rf-submit-button');
            expect(submitButton).toBeTruthy();
            submitButton.click();


            expect(submitSpy).toHaveBeenCalled();
        });
    });

});
