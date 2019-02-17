class ScreenViewApp {
    start() {
        let itemCollection =
            new ItemCollection(ClickableItems);

        let collectionItemViewModel = new ItemCollectionViewModel({
            Title: "Please select :",
            SelectedItem: {
                Id: 0, DisplayName: 'None Selected:'
            },
            Name: "Your Name"
        });

        let itemCollectionView = new ItemCollectionView(
            {
                model: collectionItemViewModel
            }, itemCollection
        );

        $(`#pageLayoutRegion`).html(
            itemCollectionView.render().el
        );
    }
}

class EventBus {
    static Bus = _.extend({}, Backbone.Events);
}