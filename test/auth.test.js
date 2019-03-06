const { app } = require('../src/index');
const expect = require('expect');
const supertest = require('supertest');
const request = supertest(app.callback());
const config = require('../src/config');

describe('Auth tests', () => {
  describe('GET /login', () => {
    it('Должно вернуть jwt token.', done => {
      request
        .post('/login')
        .send({ login: config.login, password: config.password })
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.message).toBe('Authentication successful!');
          expect(res.body.token).toBeTruthy();
          done();
        });
    });

    it('Если не передать параметры должно вернуть ошибку 400', done => {
      request
        .post('/login')
        .expect(400)
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });

    it('Если передать неверный логин или пароль должно вернуть ошибку 403', done => {
      request
        .post('/login')
        .send({ login: 'someLogin', password: 'somePassword' })
        .expect(403)
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });
  });
});
