module.exports = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || '4000',

  mongo_db:
    process.env.MONGO_DB ||
    'mongodb://bulian1311:bulian1311@ds016108.mlab.com:16108/magmer',
  mongo_db_test:
    'mongodb://bulian1311:bulian1311@ds026018.mlab.com:26018/magmer-test',

  secret: process.env.SECRET || 'MagMerTheBest',
  login: process.env.LOGIN || 'user',
  password: process.env.PASSWORD || 'pasword',

  mailer: {
    service: 'Yandex',
    auth: {
      user: 'info@test.ru',
      pass: '12345'
    }
  }
};
