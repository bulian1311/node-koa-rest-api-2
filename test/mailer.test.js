// const { app } = require('../src/index');
// const expect = require('expect');
// const supertest = require('supertest');
// const request = supertest(app.callback());

// describe('Mailer', () => {
//   describe('POST /cart', () => {
//     it('Должено отправлять данные пользователя на необходимый email', done => {
//       request
//         .post('/cart')
//         .send({
//           cart: {
//             totalPrice: 0,
//             items: [
//               { count: 1, product: { price: 123, title: 'Test product' } }
//             ]
//           },
//           user: {
//             firstName: 'Test user',
//             phone: '888888888',
//             email: 'nikolay1311@yandex.ru',
//             lastName: 'Test user'
//           }
//         })
//         .expect(200)
//         .end((err, res) => {
//           if (err) done(err);
//           expect(res.body.msg).toBe('success');
//           done();
//         });
//     });
//   });

//   describe('POST /message', () => {
//     it('Должно отправлять сообщение на необходимый email', done => {
//       request
//         .post('/message')
//         .send({
//           user: {
//             firstName: 'Test user',
//             lastName: 'Test user',
//             phone: '888888888',
//             email: 'nikolay1311@yandex.ru',
//             message: 'Тестовое сообщение'
//           }
//         })
//         .expect(200)
//         .end((err, res) => {
//           if (err) done(err);
//           expect(res.body.msg).toBe('success');
//           done();
//         });
//     });
//   });
// });
