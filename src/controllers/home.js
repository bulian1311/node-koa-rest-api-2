class Home {
  async home(ctx) {
    ctx.body = {
      msg: 'MagMer API 2.0'
    };
  }
}

module.exports = new Home();
