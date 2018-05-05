const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits single item view', () => {
  describe('and can', () => {
    it('view the description of the selected item', () => {
      const item = buildItemObject();
      item._id = 'myId';

      browser.url('/items/create');
      browser.setValue('#title-input', item.title);
      browser.setValue('#description-input', item.description);
      browser.setValue('#imageUrl-input', item.imageUrl);
      browser.click('#submit-button');

      browser.click('.item-card a');

      assert.include(browser.getText('body'), item.description);
    });
  })
});
