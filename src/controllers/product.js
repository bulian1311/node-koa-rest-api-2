const Product = require('../models/product');

class ProductsController {
  /**
   * Получить весь список продуктов из базы.
   * @param {*} ctx
   */
  async getAll(ctx) {
    try {
      const products = await Product.find();
      ctx.body = products;
    } catch (err) {
      console.error(err.message);
      ctx.body = { msg: err.message };
    }
  }

  /**
   * Получить один продукт по иденьтификатору.
   * @param {*} ctx
   */
  async getOne(ctx) {
    const { id } = ctx.params;

    try {
      const product = await Product.findById(id);
      ctx.body = product;
    } catch (err) {
      console.error(err.message);
      ctx.body = { msg: err.message };
    }
  }

  /**
   * Создать новый продукт в базе данных.
   * @param {*} ctx
   */
  async create(ctx) {
    try {
      const product = new Product(ctx.request.body);
      await product.save();
      ctx.body = { msg: 'product created success' };
    } catch (err) {
      console.error(err.message);
      ctx.body = { msg: err.message };
    }
  }

  /**
   * Отредактировать один продукт в базе данных по иденьтификатору.
   * @param {*} ctx
   */
  async update(ctx) {
    const { id } = ctx.params;

    try {
      await Product.findByIdAndUpdate(id, ctx.request.body);
      ctx.body = { msg: 'product updated success' };
    } catch (err) {
      console.error(err.message);
      ctx.body = { msg: err.message };
    }
  }

  /**
   * Удалить один продукт из базы данных по иденьтификатору.
   * @param {*} ctx
   */
  async delete(ctx) {
    const { id } = ctx.params;

    try {
      await Product.findByIdAndRemove(id);
      ctx.body = { msg: 'product deleted success' };
    } catch (err) {
      console.error(err.message);
      ctx.body = { msg: err.message };
    }
  }

  /**
   * Найти продукты по ключевым словам.
   * @param {*} ctx
   */
  async search(ctx) {
    const query = ctx.request.query.query;

    try {
      const product = await Product.find({ $text: { $search: query } });
      ctx.body = product;
    } catch (err) {
      console.error(err.message);
      ctx.body = { msg: err.message };
    }
  }
}

module.exports = new ProductsController();
