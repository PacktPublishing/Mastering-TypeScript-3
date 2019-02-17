class MyClass {
    public render(divId: string, text: string) {
        var el: HTMLElement | null = document.getElementById(divId);
        if (el) {
            el.innerText = text;
        }
    }
}

window.onload = () => {
    var myClass = new MyClass();
    myClass.render("content", "Hello World");
    console.log(`test`);
}