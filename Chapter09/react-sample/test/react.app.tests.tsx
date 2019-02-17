import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactTestUtils from "react-dom/test-utils";

import { ItemView, ItemCollectionView, ClickableItemArray } from '../src/ReactApp';

describe('/test/react.app.tests.tsx : ArrayView tests', () => {

    let renderer: any;

    beforeEach(() => {
        renderer = ReactTestUtils.renderIntoDocument(
            <ItemCollectionView items={ClickableItemArray} />
        );
    });

    it('should render Title property', () => {
        let domNode = ReactDOM.findDOMNode(renderer) as Element;
        let title = domNode.querySelector("h1") as Element;
        expect(title.textContent).toBe('Please select:');
    });

    it('should render SelectedItem property', () => {
        let domNode = ReactDOM.findDOMNode(renderer) as Element;
        let selectedItem = domNode.querySelector("#selectedItem") as Element;
        expect(selectedItem.innerHTML).toContain("0 -None Selected");
    });

    it('should find three buttons', () => {
        let domNode = ReactDOM.findDOMNode(renderer) as Element;
        let ulElement = domNode.querySelector("ul") as Element;
        let buttons = ulElement.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;

        expect(buttons.length).toBe(3);
        for (let i = 0; i < buttons.length; i++) {
            expect(buttons[i].textContent).toContain("Item");
        }

    });

    // HTMLElementTagNameMap

it('should render a form with default value ', () => {
    let domNode = ReactDOM.findDOMNode(renderer) as Element;
    let form = domNode.querySelector("form") as Element;
    expect(form).toBeTruthy();

    let label = form.querySelector("label")!;
    expect(label.innerHTML).toContain("Name :");

    let input = form.querySelector("input")!;
    expect(input.value).toBe('Your Name');
});

    it('should update SelectedItem when button is clicked', () => {

        let button = ReactTestUtils.scryRenderedDOMComponentsWithTag(renderer, 'button');
        ReactTestUtils.Simulate.click(button[0]);

        let domNode = ReactDOM.findDOMNode(renderer) as Element;
        let selectedItem = domNode.querySelector("#selectedItem") as Element;
        expect(selectedItem.innerHTML).toContain("1 -firstItem");

    });

    it('should update form value', () => {

        let domNode = ReactDOM.findDOMNode(renderer) as Element;
        let form = domNode.querySelector("form") as Element;
        expect(form).toBeTruthy();

        let input = form.querySelector("input")!;
        input.value = 'updatedInputValue';


        ReactTestUtils.Simulate.change(input);

        expect(renderer.state.inputName).toBe('updatedInputValue');

    });

    it('should trigger onSubmit when form is submitted', () => {

        let spy = spyOn(ItemCollectionView.prototype, 'onSubmit');

        let testRenderer = ReactTestUtils.renderIntoDocument(
            <ItemCollectionView items={ClickableItemArray} />
        ) as any;

        let formForSubmit = ReactTestUtils.findRenderedDOMComponentWithTag(testRenderer, 'form');
        ReactTestUtils.Simulate.submit(formForSubmit);

        expect(spy).toHaveBeenCalled();
    });

    it('should trigger onSubmit when button is clicked', () => {
        let spy = spyOn(ItemCollectionView.prototype, 'onSubmit');

        let testRenderer = ReactTestUtils.renderIntoDocument(
            <ItemCollectionView items={ClickableItemArray} />
        ) as any;

        let button = ReactTestUtils.scryRenderedDOMComponentsWithTag(testRenderer, 'button');
        ReactTestUtils.Simulate.submit(button[3]);

        console.log(`after calling submit form`);
        expect(spy).toHaveBeenCalled();

    });




});