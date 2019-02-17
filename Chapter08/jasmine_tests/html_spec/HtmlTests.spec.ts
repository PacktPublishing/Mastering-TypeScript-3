describe("simple HTML test", () => {
    it("should pass", () => {
        expect(true).toBeTruthy();
    });
});

class ModifyDomElement {
    setHtml() {
        let elem = $('#my_div');
        elem.html('<p>Hello World</p>');
    }
}

describe("fixture tests", () => {
    it("should modify a dom element", () => {
        setFixtures('<div id="my_div"></div>');
        let modifyDom = new ModifyDomElement();
        modifyDom.setHtml();
        var modifiedDomElement = $('#my_div');
        expect(modifiedDomElement.length).toBeGreaterThan(0);
        expect(modifiedDomElement.html()).toContain("Hello");
    });
});

describe("click event tests", () => {
    it("should trigger an onclick DOM event", () => {
        setFixtures(`
            <script>
            function handle_my_click_div_clicked() { 
                // do nothing at this time
            }
            </script>        
            <div id='my_click_div'
                onclick='handle_my_click_div_clicked()'>
            Click Here</div>`
        );
        var clickEventSpy = spyOnEvent('#my_click_div', 'click');
        $('#my_click_div').click();
        expect(clickEventSpy).toHaveBeenTriggered();
    });
});

