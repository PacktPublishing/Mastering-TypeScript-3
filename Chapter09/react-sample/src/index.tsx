import * as React from "react";
import * as ReactDOM from "react-dom";


import { ItemCollectionView, IClickableItem, ClickableItemArray }
    from "./ReactApp";

ReactDOM.render(
    <ItemCollectionView items={ClickableItemArray}
    />,
    document.getElementById("app")
);
