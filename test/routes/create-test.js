const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('GET', () => {
    it('renders empty input fields', async () => {
      const response = await request(app)
        .get('/items/create');

      assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
    });
  });

  describe('POST', () => {
    it('creates a new item in the database', async () => {
      const newItem = buildItemObject();
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(newItem);
      const createdItem = await Item.findOne(newItem);
      assert.isOk(createdItem, 'item not found in the database');
    });

    it('redirects to /', async () => {
      const newItem = buildItemObject();
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(newItem);
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });

    it('request with no title should display an error', async () => {
      const badItem = {
        description: 'description',
        imageUrl: 'imageUrl'
      };
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(badItem);
      const items = await Item.find({});
      assert.equal(items.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });

    it('request with no description should display an error', async () => {
      const badItem = {
        title: 'title',
        imageUrl: 'imageUrl'
      };
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(badItem);
      const items = await Item.find({});
      assert.equal(items.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });


    it('request with no imageUrl should display an error', async () => {
      const badItem = {
        title: 'title',
        description: 'description',
      };
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(badItem);
      const items = await Item.find({});
      assert.equal(items.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });

  });
});
