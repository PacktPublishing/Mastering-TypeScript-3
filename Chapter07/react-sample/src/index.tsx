import * as React from "react";
import * as ReactDOM from "react-dom";


import { ItemCollectionView, IClickableItem }
    from "./ReactApp";


let ClickableItemArray: IClickableItem[] = [
    { Id: 1, DisplayName: "firstItem" },
    { Id: 2, DisplayName: "secondItem" },
    { Id: 3, DisplayName: "thirdItem" },
];

ReactDOM.render(
    <ItemCollectionView items={ClickableItemArray}
    />,
    document.getElementById("app")
);


// SelectedItem={
//     { Id: 0, DisplayName: "None Selected " }

// }
