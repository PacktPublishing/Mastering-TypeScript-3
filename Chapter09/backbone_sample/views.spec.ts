describe("views.spec.ts : ItemView tests", () => {
    let itemModel: ItemModel;

    beforeEach(() => {
        jasmine.getFixtures().fixturesPath = "./";
        loadFixtures("views.spec.html");
        itemModel = new ItemModel({
            Id: 10,
            DisplayName: "testDisplayName"
        });
    });


    it("should render an ItemView correctly", () => {
        let itemView = new ItemView({ model: itemModel });
        let renderedHtml = itemView.render().el;
        expect(renderedHtml.innerHTML).toContain(
            `<button style="margin: 5px;" class="btn btn-primary">`);
        expect(renderedHtml.innerHTML).toContain(
            `testDisplayName`);
        expect(renderedHtml.innerHTML).toContain(
            `</button>`);
    });


    it("should trigger onClicked event", () => {
        // this is neccessary because the events are in the constructor.
        let clickSpy = spyOn(ItemView.prototype, 'onClicked');
        let itemView = new ItemView({ model: itemModel });
        itemView.render();
        let itemButton = itemView.$el.find(`button`).trigger('click');
        expect(clickSpy).toHaveBeenCalled();
    });

    it("should trigger an event bus event", () => {
        let eventTriggered = false;
        EventBus.Bus.on("item_clicked", () => {
            eventTriggered = true;
        });
        let itemView = new ItemView({ model: itemModel });
        itemView.render();
        let itemButton = itemView.$el.find(`button`).trigger('click');

        expect(eventTriggered).toBeTruthy();

    });

});

describe("views.spec.ts : ItemCollectionView tests", () => {
    let renderedHtml: JQuery<HTMLElement>;
    let submitSpy: jasmine.Spy;
    let itemCollectionView: ItemCollectionView;
    beforeEach(() => {

        jasmine.getFixtures().fixturesPath = "./";
        loadFixtures("views.spec.html");

        let itemCollection = new ItemCollection(ClickableItems);

        let collectionViewModel = new ItemCollectionViewModel({
            Title: "testItemCollection Title",
            SelectedItem: {
                Id: 10, DisplayName: "testSelecteItemDisplayName"
            },
            Name: "testName"
        });

        submitSpy = spyOn(ItemCollectionView.prototype
            , 'submitClick').and.callThrough();
        itemCollectionView = new ItemCollectionView({
            model: collectionViewModel
        }, itemCollection);

        renderedHtml = itemCollectionView.render().$el;

    });

    it("should render <h1> tag correctly", () => {
        let h1Tag = renderedHtml.find('h1');
        expect(h1Tag.html()).toContain('testItemCollection Title');
    });

    it("should render id=ulRegions correctly", () => {
        let ulRegions = renderedHtml.find('#ulRegions');
        let buttons = ulRegions.find('button');

        expect(buttons.length).toBe(3, 'should find 3 buttons');
        let firstButton = buttons[0].innerHTML;

        expect(firstButton).toContain('firstItem');
    });

    it("should render selectedItem correctly", () => {
        let selectedItem = renderedHtml.find('#selectedItem');

        expect(selectedItem.html()).toContain('testSelecteItemDisplayName');
    });

    it("should find form-group", () => {
        let formGroup = renderedHtml.find('.form-group');
        expect(formGroup.length).toBeGreaterThan(0, 'could not find form-group');
    });

    it("should find form-group label", () => {
        let formGroup = renderedHtml.find('.form-group');
        let label = formGroup.find('label');
        expect(label.length).toBeGreaterThan(0, 'could not find form-group label');
        expect(label.html()).toContain('Name :');
    });

    it("should find form-group input with value", () => {
        let formGroup = renderedHtml.find('.form-group');
        let input = formGroup.find('input');
        expect(input.length).toBeGreaterThan(0, 'could not find form-group label');
        expect(input.attr('value')).toContain('testName');
    });

    it("should enter text into input and submit the form", () => {
        let formGroup = renderedHtml.find('.form-group');
        let input = formGroup.find('input');
        expect(input.length).toBeGreaterThan(0, 'could not find form-group label');
        // simulate input into the control
        input.val('test');
        // find and click on the submit button
        let submit = renderedHtml.find('#submit-button-button');
        expect(submit.length).toBe(1, 'could not find submit button');
        submit.click();
        // check that the submitClicked function was called
        expect(submitSpy).toHaveBeenCalled();
        // check that the property was updated.
        expect(itemCollectionView.inputNameValue).toBe('test');
    });

});