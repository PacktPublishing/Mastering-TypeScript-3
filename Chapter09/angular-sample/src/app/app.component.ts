import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

export class ClickableItem {
    DisplayName: string;
    Id: number;
}

let ClickableItemArray: ClickableItem[] = [
    { Id: 1, DisplayName: "firstItem" },
    { Id: 2, DisplayName: "secondItem" },
    { Id: 3, DisplayName: "thirdItem" }
]

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    Title = 'Please select :';
    items = ClickableItemArray;
    Name = 'Your Name';

    reactiveFormGroup: FormGroup;

    SelectedItem: ClickableItem =
        { Id: 0, DisplayName: "None selected" };

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.reactiveFormGroup = this.formBuilder.group({
            nameInput: new FormControl({})
        });

        this.reactiveFormGroup.reset({
            nameInput: 'RF Input'
        });
    }

    onItemClicked(item: ClickableItem) {
        this.SelectedItem = item;
    }
    onSubmit() {
        console.log(`onSubmit : Name : ${this.Name}`);
    }

    onSubmitRf() {
        console.log(`onSubmitRf : nameInput : 
            ${this.reactiveFormGroup.value.nameInput} `);
    }
}
