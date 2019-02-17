interface IClickableItem {
    DisplayName: string;
    Id: number;
}

// export class SelectedItem {
//   Id: number;
//   DisplayName: string;
// }

// ^^ Note that this causes a blank page


export class App {
    Title = 'Please select :';
    SelectedItem: IClickableItem =
        { Id: 0, DisplayName: "None selected" };
    Name = 'Your Name';

    items: IClickableItem[] = ([
        { Id: 1, DisplayName: "firstItem" },
        { Id: 2, DisplayName: "secondItem" },
        { Id: 3, DisplayName: "thirdItem" },
    ]);

    onItemClicked(event: IClickableItem) {
        this.SelectedItem = event;
    }

    onSubmitClicked() {
        console.log(`onSubmitClicked : Name : ${this.Name}`)
    }
}


