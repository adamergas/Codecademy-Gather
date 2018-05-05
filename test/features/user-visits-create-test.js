const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:
describe('user visits create page', () => {
  describe('posts a new item', () => {
    it('and renders the new item', () => {
      const item = buildItemObject();
      browser.url('/items/create');

      browser.setValue('#title-input', item.title);
      browser.setValue('#description-input', item.description);
      browser.setValue('#imageUrl-input', item.imageUrl);
      browser.click('#submit-button');

      assert.include(browser.getText('body'), item.title);
      assert.include(browser.getAttribute('body img', 'src'), item.imageUrl);
    });
  });
});
