const Product = require('../src/models/product');

module.exports = async () => {
  try {
    await Product.deleteMany({});

    await Product.insertMany([
      {
        title: 'Test product 1',
        description: 'Test description 1 descriptionsearch',
        price: 123,
        url: 'test.ru',
        images: [{ url: 'image.ru', alt: 'test img' }],
        specifications: { 'test key': 'test value' },
        producer: { name: 'Test producer' },
        category: 'Test category',
        tags: ['Test tag']
      },
      {
        title: 'Test product 2 titlesearch',
        description: 'Test description 2',
        price: 123,
        url: 'test.ru',
        images: [{ url: 'image.ru', alt: 'test img' }],
        specifications: { 'test key': 'test value' },
        producer: { name: 'Test producer' },
        category: 'Test category',
        tags: ['Test tag']
      },
      {
        title: 'Test product 3',
        description: 'Test description 3',
        price: 123,
        url: 'test.ru',
        images: [{ url: 'image.ru', alt: 'test img' }],
        specifications: { 'test key': 'test value' },
        producer: { name: 'Test producer' },
        category: 'Test category categorysearch',
        tags: ['Test tag']
      }
    ]);
  } catch (err) {
    console.error(err.message);
  }
};
