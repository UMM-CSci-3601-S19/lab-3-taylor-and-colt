import {TodoPage} from './todo-list.po';
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

describe('Todo list', () => {

    let page: TodoPage;

    beforeEach(() => {
        page = new TodoPage();
    });

    it('should get and highlight Todo Name attribute ', () => {
        page.navigateTo();
        expect(page.getTodoTitle()).toEqual('Todos');
    });

    it('Tests owner filter', () => {
        page.navigateTo();
        page.typeAName("t");
        expect(page.getUniqueTodo("todoMatBody")).toEqual("Pariatur ea et incididunt tempor eu voluptate laborum irure cupidatat adipisicing. Consequat occaecat consectetur qui culpa dolor.");
        page.backspace();
        page.typeAName("Blanche")
        expect(page.getUniqueTodo("todoMatBody")).toEqual("In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.");
    });

    it('Tests multiple element filter, first with 1 element, then 2, then 3', () => {
      page.navigateTo();
      page.typeABody("Ullamco");
      expect(page.getUniqueTodo("todoMatBody")).toEqual("Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.");
      page.typeAName("Blanche")
      expect(page.getUniqueTodo("todoMatBody")).toEqual("Aliqua esse aliqua veniam id nisi ea. Ullamco Lorem ex aliqua aliquip cupidatat incididunt reprehenderit voluptate ad nisi elit dolore laboris.");
      page.typeAStatus("true")
      expect(page.getUniqueTodo("todoMatBody")).toEqual("Aliqua ut proident sunt minim. Sunt cupidatat ullamco reprehenderit sit Lorem.");
      page.typeACategory("groceries")
      expect(page.getUniqueTodo("todoMatBody")).toEqual("Aliqua esse aliqua veniam id nisi ea. Ullamco Lorem ex aliqua aliquip cupidatat incididunt reprehenderit voluptate ad nisi elit dolore laboris.");


    });
})

      //  expect(page.getUniqueTodo("stokesclayton@momentia.com")).toEqual("Stokes Clayton");

       // expect(page.getUniqueTodo("merrillparker@escenta.com")).toEqual("Merrill Parker");

