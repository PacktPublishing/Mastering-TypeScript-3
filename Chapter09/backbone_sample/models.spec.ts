describe("models.spec.ts : ItemModel tests", () => {
    let itemModel: ItemModel;

    beforeEach(() => {
        itemModel = new ItemModel(
            { Id: 10, DisplayName: "testDisplayName" }
        );
    });

    it("should assign an Id property", () => {
        expect(itemModel.Id).toEqual(10, "Id property");
    });

    it("should assign a DisplayName property", () => {
        expect(itemModel.DisplayName).toEqual("testDisplayName");
    });

    it("should call set an Id property", () => {
        itemModel.Id = -10;
        expect(itemModel.Id).toBe(-10);
    });

    it("should call set on a DisplayName property ", () => {
        itemModel.DisplayName = "updatedDisplayName";
        expect(itemModel.DisplayName).toBe("updatedDisplayName");
    });

    it("should update the Id property when calling calling set", () => {
        itemModel.set('Id', 99);
        expect(itemModel.Id).toBe(99);
    })

    it("should update the DisplayName property when calling set", () => {
        itemModel.set('DisplayName', 'setDisplayName');
        expect(itemModel.DisplayName).toBe('setDisplayName');
    });

});

describe("model.spec.ts : ItemCollectionViewModel tests", () => {
    let itemCollectionViewModel: ItemCollectionViewModel;
    beforeEach(() => {
        itemCollectionViewModel = new ItemCollectionViewModel({
            Title: "testTitle",
            SelectedItem: {
                Id: 10,
                DisplayName: "testDisplayName"
            },
            Name: "testName"
        });
    });

    it("should set the Title property", () => {
        expect(itemCollectionViewModel.Title).toBe("testTitle");
    });
    it("should set the SelectedItem.Id property", () => {
        expect(itemCollectionViewModel.SelectedItem.Id).toBe(10);
    });
    it("should set the SelectedItem.DisplayName property", () => {
        expect(itemCollectionViewModel.SelectedItem.DisplayName)
            .toBe("testDisplayName");
    });
    it("should set the Name property", () => {
        expect(itemCollectionViewModel.Name).toBe("testName");
    });

});
