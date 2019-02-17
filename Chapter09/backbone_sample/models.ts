interface IClickableItem {
    DisplayName: string;
    Id: number;
}

let ClickableItems: IClickableItem[] = ([
    { Id: 1, DisplayName: "firstItem" },
    { Id: 2, DisplayName: "secondItem" },
    { Id: 3, DisplayName: "thirdItem" },
]);

class ItemModel extends Backbone.Model
    implements IClickableItem {
    get Id() {
        return this.get('Id');
    }
    set Id(value: number) {
        this.set('Id', value);
    }
    get DisplayName() {
        return this.get('DisplayName');
    }
    set DisplayName(value: string) {
        this.set('DisplayName', value);
    }
    constructor(input: IClickableItem) {
        super();
        this.set(input);
    }
}

class ItemCollection extends Backbone.Collection<ItemModel> {
    model = ItemModel;
}

interface IItemCollectionViewModel {
    Title: string;
    SelectedItem: IClickableItem;
    Name: string;
}

class ItemCollectionViewModel extends Backbone.Model
    implements IItemCollectionViewModel {

    get Title() {
        return this.get('Title');
    }
    set Title(value: string) {
        this.set('Title', value);
    }
    get SelectedItem() {
        return this.get('SelectedItem');
    }
    set SelectedItem(value: IClickableItem) {
        this.set('SelectedItem', value);
    }
    set Name(value: string) {
        this.set('Name', value);
    }
    get Name() {
        return this.get('Name');
    }

    constructor(input?: IItemCollectionViewModel) {
        super();
        this.set(input);
    }
}