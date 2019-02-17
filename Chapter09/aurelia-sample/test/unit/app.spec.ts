import { App } from '../../src/app';
import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';

describe('/test/unit/app.spec.ts : App tests', () => {
    let app: App;

    beforeAll(() => {
        app = new App();
    });

    it('should set Title property ', () => {
        expect(app.Title).toBe('Please select :');
    });

    it('has a property named items', function () {
        expect(app.items).toBeDefined();
    });
    it('has an array of clickable items', function () {
        expect(app.items.length).toBe(3);
    });
    it('sets SelectedItem property in constructor', function () {
        expect(app.SelectedItem).toBeDefined();
    });
    it('sets SelectedItem.Id to 0', function () {
        expect(app.SelectedItem.Id).toBe(0);
    });
    it('sets currentElement.displayName to none', function () {
        expect(app.SelectedItem.DisplayName).toBe('None selected');
    });
    it('sets Name property to Your Name', function () {
        expect(app.Name).toBe('Your Name');
    });

});

describe('/test/unit/app.spec.ts : App rendering tests', () => {
    var app: any;
    // note  ^^^ cannot use App must be any

    beforeEach(() => {
        app = StageComponent.withResources('app')
            .inView(`
                <h1>` + '${Title}' + `</h1>
                <ul>
                <div repeat.for="item of items" click.delegate="onItemClicked(item)">
                <button style="margin: 5px;" class="btn btn-primary">`
                + '${item.DisplayName}' + `</button>
                </div>
                </ul>

                <div>
                Selected Item : ` + '${SelectedItem.Id} - ${SelectedItem.DisplayName}' + `
                </div>

                <div class="form-group">
                <label for="inputName">Name :</label>
                <input type="text" class="form-control \
                    input-name" id="inputName" value.bind="Name" />
                </div>

                <button id="submit-button-button" class="submit-button" 
                    click.delegate="onSubmitClicked()">Submit</button>
                `)
            .boundTo(new App());
    });

    afterEach(() => {
        app.dispose();
    });


    it('should render Title property', (done) => {
        app.create(bootstrap).then(() => {
            const titleElement = document.querySelector("h1");
            expect(titleElement).toBeDefined();
            expect(titleElement.innerHTML).toContain('Please select :');
            done();
        }).catch(e => {
            console.log(`error : ${e}`);
        });
    });

    it('should render buttons', function (done) {
        app.create(bootstrap).then(function () {
            let ulItemList = document.querySelectorAll(
                'ul > div > button');
            expect(ulItemList).toBeDefined();
            expect(ulItemList.length).toBe(3);
            for (var i = 0; i < ulItemList.length; i++) {
                var itemElement = ulItemList[i];
                expect(itemElement.innerHTML).toContain('Item');
            }
            done();
        }).catch(e => {
            console.log(`error : ${e}`);
        });
    });

    it('should render form with input element', function (done) {
        app.create(bootstrap).then(function () {
            let formGroup = document.querySelector(
                '.form-group');
            let inputElement = formGroup.querySelector('input')
            expect(inputElement.value).toBe('Your Name');
            let submitButton = document.querySelector('#submit-button-button');
            expect(submitButton.innerHTML).toBe('Submit');
            done();
        }).catch(e => {
            console.log(`error : ${e}`);
        });
    });


});



