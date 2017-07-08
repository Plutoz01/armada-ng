import { browser, by, element } from 'protractor';

export class ArmadaNgPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ar-root h1')).getText();
  }
}
