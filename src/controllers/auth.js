const jwt = require('jsonwebtoken');
const config = require('../config');

class Auth {
  async login(ctx) {
    const { login, password } = ctx.request.body;

    let mockedLogin = config.login;
    let mockedPassword = config.password;

    if (!login || !password) {
      ctx.throw(400, {
        message: 'Authentication failed! Please check the request'
      });
    }

    if (login !== mockedLogin || password !== mockedPassword) {
      ctx.throw(403, {
        message: 'Incorrect login or password'
      });
    }

    const token = await jwt.sign({ login }, config.secret, {
      expiresIn: '24h'
    });

    ctx.body = {
      message: 'Authentication successful!',
      token: token
    };
  }
}

module.exports = new Auth();
