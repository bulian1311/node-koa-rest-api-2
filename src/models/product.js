const mongoose = require('mongoose');
const mongooseAlgolia = require('mongoose-algolia');
const { Schema } = mongoose;

const productSchema = Schema({
  title: { type: String },

  description: { type: String },

  price: { type: String },

  url: { type: String },

  images: [{ url: String, alt: String }],

  specifications: { type: Map, of: String },

  producer: { name: String, url: String },

  category: { type: String },

  tags: [{ type: String }]
});

//productSchema.index({ title: 'text', description: 'text', category: 'text' });

productSchema.plugin(mongooseAlgolia, {
  appId: 'A77JTVZB2R',
  apiKey: '2f2224610e8d8652dc620ea451b9a1ab',
  indexName: 'magmer_products',
  selector: '_id title description producer category tags',
  // populate: {
  //   path: 'comments',
  //   select: 'author'
  // },
  // defaults: {
  //   author: 'unknown'
  // },
  // mappings: {
  //   title: function(value) {
  //     return value;
  //   }
  // },
  // virtuals: {
  //   whatever: function(doc) {
  //     return `Custom data ${doc.title}`;
  //   }
  // },
  debug: true
});

let Product = mongoose.model('product', productSchema);

Product.SyncToAlgolia();
Product.SetAlgoliaSettings({
  searchableAttributes: ['title', 'category', 'tags', 'description', 'producer']
});

module.exports = Product;
