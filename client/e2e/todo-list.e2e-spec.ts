import {TodoPage} from './user-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
    let args = arguments;

    // queue 100ms wait between test
    //This delay is only put here so that you can watch the browser do its' thing.
    //If you're tired of it taking long you can remove this call
    origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(100);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};

describe('User list', () => {
    let page: TodoPage;

    beforeEach(() => {
        page = new TodoPage();
    });

    it('should get and highlight User Name attribute ', () => {
        page.navigateTo();
        expect(page.getTodoTitle()).toEqual('Todos');
    });

    it('should type something in filter name box and check that it returned correct element', () => {
        page.navigateTo();
        page.typeAName("t");
        expect(page.getUniqueUser("kittypage@surelogic.com")).toEqual("Kitty Page");
        page.backspace();
        page.typeAName("lynn")
        expect(page.getUniqueUser("lynnferguson@niquent.com")).toEqual("Lynn Ferguson");
    });

    it('should click on the age 27 times and return 3 elements', () => {
        page.navigateTo();
        page.getUserByAge();
        for (let i = 0; i < 27; i++) {
            page.selectUpKey();
        }

        expect(page.getUniqueUser("stokesclayton@momentia.com")).toEqual("Stokes Clayton");

        expect(page.getUniqueUser("merrillparker@escenta.com")).toEqual("Merrill Parker");

    });
});
