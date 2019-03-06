const { app } = require('../src/index');
const expect = require('expect');
const supertest = require('supertest');

const fakeData = require('./fakeData');
const request = supertest(app.callback());
const Product = require('../src/models/product');

const config = require('../src/config');

describe('Products', () => {
  beforeEach(fakeData);

  describe('GET /product/list', () => {
    it('Должно вернуть список всех продуктов', done => {
      request
        .get('/product/list')
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.length).toBe(3);
          done();
        });
    });
  });

  describe('GET /product/:id', () => {
    it('Должно вернуть один продукт по id', done => {
      Product.findOne({ title: 'Test product 1' })
        .then(product => {
          request
            .get(`/product/${product._id}`)
            .expect(200)
            .end((err, res) => {
              if (err) done(err);
              expect(res.body._id + '').toBe(product._id + '');
              done();
            });
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe('POST /product', () => {
    it('Если не передать jwt token должно вернуть код 401', done => {
      request
        .post('/product')
        .send({
          title: 'Test product 4',
          description: 'Test description 4',
          price: 123,
          url: 'test.ru',
          images: [{ url: 'image.ru', alt: 'test img' }],
          specifications: { 'test key': 'test value' },
          producer: { name: 'Test producer' },
          category: 'Test category',
          tags: ['Test tag']
        })
        .expect(401)
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });

    it('Должно записать продукт в базу данных', done => {
      request
        .post('/login')
        .send({ login: config.login, password: config.password })
        .end((err, res) => {
          if (err) done(err);
          request
            .post('/product')
            .set('Authorization', `Bearer ${res.body.token}`)
            .send({
              title: 'Test product 4',
              description: 'Test description 4',
              price: 123,
              url: 'test.ru',
              images: [{ url: 'image.ru', alt: 'test img' }],
              specifications: { 'test key': 'test value' },
              producer: { name: 'Test producer' },
              category: 'Test category',
              tags: ['Test tag']
            })
            .expect(200)
            .end((err, res) => {
              if (err) done(err);

              expect(res.body.msg).toBe('product created success');

              Product.findOne({ title: 'Test product 4' })
                .then(product => {
                  expect(product.title).toBe('Test product 4');
                  done();
                })
                .catch(err => done(err));
            });
        });
    });
  });

  describe('PUT /product', () => {
    it('Если не передать jwt token должно вернуть код 401', done => {
      Product.findOne({ title: 'Test product 1' })
        .then(product => {
          request
            .put(`/product/${product._id}`)
            .send({
              title: 'Test product 4',
              description: 'Test description 4'
            })
            .expect(401)
            .end((err, res) => {
              if (err) done(err);
              done();
            });
        })
        .catch(err => done(err));
    });

    it('Должно перезаписать продукт в базе данных', done => {
      Product.findOne({ title: 'Test product 1' })
        .then(product => {
          request
            .post('/login')
            .send({ login: config.login, password: config.password })
            .end((err, res) => {
              if (err) done(err);
              request
                .put(`/product/${product._id}`)
                .set('Authorization', `Bearer ${res.body.token}`)
                .send({
                  title: 'Test product 4',
                  description: 'Test description 4'
                })
                .expect(200)
                .end((err, res) => {
                  if (err) done(err);

                  expect(res.body.msg).toBe('product updated success');

                  Product.findOne({ title: 'Test product 4' })
                    .then(product => {
                      expect(product.title).toBe('Test product 4');
                      done();
                    })
                    .catch(err => done(err));
                });
            });
        })
        .catch(err => done(err));
    });
  });

  describe('DELETE /product', () => {
    it('Если не передать jwt token должно вернуть код 401', done => {
      Product.findOne({ title: 'Test product 1' })
        .then(product => {
          request
            .delete(`/product/${product._id}`)
            .expect(401)
            .end((err, res) => {
              if (err) done(err);
              done();
            });
        })
        .catch(err => done(err));
    });

    it('Должно удалить продукт из базы данных', done => {
      Product.findOne({ title: 'Test product 1' })
        .then(product => {
          request
            .post('/login')
            .send({ login: config.login, password: config.password })
            .end((err, res) => {
              if (err) done(err);
              request
                .delete(`/product/${product._id}`)
                .set('Authorization', `Bearer ${res.body.token}`)
                .expect(200)
                .end((err, res) => {
                  if (err) done(err);

                  expect(res.body.msg).toBe('product deleted success');

                  Product.findOne({ title: 'Test product 1' })
                    .then(product => {
                      expect(product).toBeFalsy;
                      done();
                    })
                    .catch(err => done(err));
                });
            });
        })
        .catch(err => done(err));
    });
  });

  describe('GET /search', () => {
    it('Должно найти продукт по полю title', done => {
      request
        .get('/search?query=titlesearch')
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.length).toBe(1);
          expect(res.body[0].title).toBe('Test product 2 titlesearch');
          done();
        });
    });

    it('Должно найти продукт по полю description', done => {
      request
        .get('/search?query=descriptionsearch')
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.length).toBe(1);
          expect(res.body[0].title).toBe('Test product 1');
          done();
        });
    });

    it('Должно найти продукт по полю category', done => {
      request
        .get('/search?query=categorysearch')
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.length).toBe(1);
          expect(res.body[0].title).toBe('Test product 3');
          done();
        });
    });
  });
});
