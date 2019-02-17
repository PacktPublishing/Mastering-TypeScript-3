
import * as React from 'react';
import * as _ from 'underscore';


export let ClickableItemArray: IClickableItem[] = [
    { Id: 1, DisplayName: "firstItem" },
    { Id: 2, DisplayName: "secondItem" },
    { Id: 3, DisplayName: "thirdItem" },
];

export class ItemModel {
    DisplayName: string = "";
    Id: number = 0;
    onItemClicked(item: ItemModel) { }
}

export class ItemView
    extends React.Component<ItemModel, {}> {
    constructor(input: ItemModel) {
        super(input);
        this.handleClick =
            this.handleClick.bind(this);
    }

    // refer to StandardLonghandProperties< > definition file
    render() {
        return (
            <div>
                <button className="btn btn-primary"
                    style={{ "marginBottom": "5px" }}
                    onClick={this.handleClick}>
                    {this.props.DisplayName}
                </button>
            </div>
        );
    }
    handleClick() {
        this.props.onItemClicked(this.props);
    }
}

export interface IClickableItem {
    Id: number;
    DisplayName: string;
}

export interface IItemCollectionViewProps {
    title: string,
    items: IClickableItem[],
    SelectedItem: IClickableItem;
    // Name: string;
};

type StringProps<T> = {
    [key: string]: any;
}

type StringPropsTest<T> = {
    [P in keyof T]: T[P];
    // [x: string] : T;
}
// note could use Partial<T> as well.

export class ItemCollectionView extends
    React.Component<
    IItemCollectionViewProps, // internal properties
    StringProps<{ inputName: string }> // state properties
    > {
    // SelectedItem: IClickableItem;
    // ^^ properties cannot be included like this.

    static defaultProps = {
        title: "Please select:",
        SelectedItem: { Id: 0, DisplayName: "None Selected" }
    };
    // ^^ static props

    constructor(input: IItemCollectionViewProps) {
        super(input);

        this.state = { inputName: 'Your Name' };

        this.itemSelected = this.itemSelected.bind(this);
        // ^^ this is functionally equivalent to below :
        // _.bindAll(this, 'itemSelected');

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    render() {
        let _this = this;

        let buttonNodes =
            this.props.items.map(function (item, key) {
                return (
                    <ItemView key={key}
                        onItemClicked={_this.itemSelected}
                        {...item}
                    />
                );
            });

        return <div>
            <h1>{this.props.title}</h1>
            <ul>
                {buttonNodes}
            </ul>
            <div id="selectedItem">Selected Item :
            {this.props.SelectedItem.Id} -
            {this.props.SelectedItem.DisplayName}</div>

            <form onSubmit={this.onSubmit} >
                <div className="form-group">
                    <label>Name :</label>
                    <input type="text"
                        className="form-control"
                        name="inputName"
                        value={this.state.inputName}
                        onChange={this.onChange}
                    />
                </div>
                <button className="submit-button" type="submit" value="Submit">Submit</button>
            </form>

        </div>



            ;
    }
    itemSelected(item: IClickableItem) {
        console.log(`itemSelected : ${item.Id}`);
        this.props.SelectedItem.Id = item.Id;
        this.props.SelectedItem.DisplayName = item.DisplayName;

        this.setState({});
    }
    onChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(`onChange : ${event.target.value}`);
        let valueName = event.target.name;
        this.setState({ [valueName]: event.target.value });
    }

    onSubmit(e: React.FormEvent) {
        console.log(`>> button clicked`);
        console.log(`>> onSubmit : state : ${this.state.inputName}`);
        e.preventDefault();
    }
}
