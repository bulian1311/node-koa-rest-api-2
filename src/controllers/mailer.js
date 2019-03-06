const nodemailer = require('nodemailer');
const config = require('../config');

class Mailer {
  sendCartMail(ctx) {
    const { cart, user } = ctx.request.body;

    if (!cart || !user) {
      ctx.body = { error: 'not have parameters' };
      return;
    }

    const transporter = nodemailer.createTransport(config.mailer);
    let userText = `
      <h3>Заказчик:</h3>
      <p><b>Имя:</b> ${user.firstName}</p>
      <p><b>Фамилия:</b> ${user.lastName}</p>
      <p><b>Телефон:</b> ${user.phone}</p>
      <p><b>Email:</b> ${user.email}</p>
      <p><b>Город:</b> ${user.city}</p>
      <hr>
    `;
    let cartText = `
      <h3>Заказ: </h3>
      <p><b>Общая стоимость: </b>${cart.totalPrice}</p>
      `;
    cart.items.forEach(item => {
      cartText =
        cartText +
        `<p><b>${item.product.title}</b></p>
        <p>Колличество: ${item.count}</p>
        <p>Цена: ${item.product.price}</p>
        `;
    });

    transporter.sendMail(
      {
        from: 'info@magmer.ru',
        to: user.email,
        subject: 'Заказ принят',
        text: 'Ваш заказ принят на обработку.'
      },
      err => {
        if (err) {
          ctx.body = { error: err.message };
        }
      }
    );

    transporter.sendMail(
      {
        from: 'info@magmer.ru',
        to: 'info@magmer.ru',
        subject: 'Поступил новый заказ',
        html: '<h1>Поступил новый заказ!</h1><hr>' + userText + cartText
      },
      err => {
        if (err) {
          ctx.body = { error: err.message };
        }
      }
    );

    ctx.body = { msg: 'success' };
  }

  sendMessageMail(ctx) {
    const { user } = ctx.request.body;

    if (!user) {
      ctx.body = { error: 'not have parameters' };
      return;
    }

    const transporter = nodemailer.createTransport(config.mailer);
    let userText = `
      <h3>Заказчик:</h3>
      <p><b>Имя:</b> ${user.firstName}</p>
      <p><b>Фамилия:</b> ${user.lastName}</p>
      <p><b>Телефон:</b> ${user.phone}</p>
      <p><b>Email:</b> ${user.email}</p>
      <p><b>Город:</b> ${user.city}</p>
      <hr>
      <p><b>Сообщение:</b> ${user.message}</p>
    `;

    transporter.sendMail(
      {
        from: 'info@magmer.ru',
        to: user.email,
        subject: 'Спасибо за обратную связь',
        text:
          'Спасибо за обратную связь. Ваше сообщение приято и отправлено на обработку.'
      },
      err => {
        if (err) {
          ctx.body = { error: err.message };
        }
      }
    );

    transporter.sendMail(
      {
        from: 'info@magmer.ru',
        to: 'info@magmer.ru',
        subject: 'Поступило новое сообщение',
        html: '<h1>Поступило новое сообщение!</h1><hr>' + userText
      },
      err => {
        if (err) {
          ctx.body = { error: err.message };
        }
      }
    );
    ctx.body = { msg: 'success' };
  }
}

module.exports = new Mailer();
