const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Write your tests below:
  describe('title', () => {
    it('should be a string', () => {
      const badTitle = 3;
      const item = new Item({title: badTitle});
      assert.strictEqual(item.title, badTitle.toString())
    });

    it('is required', () => {
      const item = new Item({ title: '' });
      item.validateSync();
      assert.equal(item.errors.title.message, 'Path `title` is required.');
    });
  });

  describe('description', () => {
    it('should be a string', () => {
      const badDescription = 3;
      const item = new Item({description: badDescription});
      assert.strictEqual(item.description, badDescription.toString())
    });

    it('is required', () => {
      const item = new Item({ description: '' });
      item.validateSync();
      assert.equal(item.errors.description.message, 'Path `description` is required.');
    });
  });

  describe('imageUrl', () => {
    it('should be a string', () => {
      const badImageUrl = 3;
      const item = new Item({imageUrl: badImageUrl});
      assert.strictEqual(item.imageUrl, badImageUrl.toString())
    });

    it('is required', () => {
      const item = new Item({ imageUrl: '' });
      item.validateSync();
      assert.equal(item.errors.imageUrl.message, 'Path `imageUrl` is required.');
    });
  });


});
