const PouchDB = require('pouchdb');
const db = new PouchDB('datas/productsdb');

class Product {
  static async getProducts(user_id = null) {
    return new Promise((resolve, reject) => {
      const db = new PouchDB('datas/productsdb');
      db.allDocs({ include_docs: true })
        .then(function (res) {
          const products = res.rows.map((row) => ({
            id: row.id,
            user_id: row.doc.user_id,
            photo: row.doc.photo,
            description: row.doc.description,
            name_product: row.doc.name_product,
            price: row.doc.price,
            category: row.doc.category,
            unit: row.doc.unit,
            status: row.doc.status
          }));

          const filteredProducts = user_id
            ? products.filter((product) => product.user_id === user_id)
            : products;

          console.log('[Model] Product.getProducts(): return ' + filteredProducts.length + ' rows');
          resolve(filteredProducts);
        })
        .catch(function (err) {
          reject(new Error('Product.getProducts(): ' + err));
        });
    });
  }

  static async getProduct(id) {
    return new Promise((resolve, reject) => {
      const db = new PouchDB('datas/productsdb');
      db.get(id).then(function (res) {
        console.log('[Model] Product.getProduct(' + JSON.stringify(id) + '): return ' + JSON.stringify(res));
        resolve(res);
      }).catch(function (err) {
        reject(new Error('Product.getProduct(' + JSON.stringify(id) + '): ' + err));
      });
    });
  }
  
  static async addProduct(product) {
    return new Promise((resolve, reject) => {
      const db = new PouchDB('datas/productsdb');
      db.post({
        user_id: product.user_id,
        photo: product.photo,
        description: product.description,
        name_product: product.name_product,
        price: product.price,
        category: product.category,
        unit: product.unit,
        status: product.status
      }).then(function (res) {
        console.log('[Model] Product.addProduct(' + JSON.stringify(product) + '): return ' + JSON.stringify(res));
        resolve(res);
      }).catch(function (err) {
        reject(new Error('Product.addProduct(' + JSON.stringify(product) + '): ' + err));
      });
    });
  }

  static async updateProduct(product) {
    return new Promise((resolve, reject) => {
      const db = new PouchDB('datas/productsdb');
      db.get(product.id).then(function (doc) {
        return db.put({
          _id: doc._id,
          _rev: doc._rev,
          user_id: product.user_id,
          photo: product.photo || doc.photo,
          description: product.description,
          name_product: product.name_product,
          price: product.price,
          category: product.category,
          unit: product.unit,
          status: product.status
        });
      }).then(function (res) {
        console.log('[Model] Product.updateProduct(' + JSON.stringify(product) + '): return ' + JSON.stringify(res));
        resolve(res);
      }).catch(function (err) {
        reject(new Error('Product.updateProduct(' + JSON.stringify(product) + '): ' + err));
      });
    });
  }

  static async delProduct(id) {
    return new Promise((resolve, reject) => {
      const db = new PouchDB('datas/productsdb');
      db.get(id).then(function (doc) {
        return db.remove(doc);
      }).then(function (res) {
        console.log('[Model] Product.delProduct(' + JSON.stringify(id) + '): return ' + JSON.stringify(res));
        resolve(res);
      }).catch(function (err) {
        reject(new Error('Product.delProduct(' + JSON.stringify(id) + '): ' + err));
      });
    });
  }

  constructor() {}
}

module.exports = Product;