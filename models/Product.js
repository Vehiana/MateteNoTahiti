const PouchDB = require('pouchdb');

class Product {
  static async getProducts() {
    return new Promise((resolve, reject) => {
      const db = new PouchDB('datas/productsdb');
      db.allDocs({
        include_docs: true
      }).then(function (res) {
        // DEBUG pouchdb
        // console.log('alldocs: ' + JSON.stringify(res));
        // res.rows.forEach(row => {
        //   console.log('row: ' + JSON.stringify(row));
        // });
        const products = res.rows.map((row) => ({"id":row.id,"name":row.doc.name,"price":row.doc.price}));
        // products.forEach(product => {
        //     console.log('Product.getProducts(): ' + JSON.stringify(product));
        //   });
        console.log('[Model] Product.getProducts(): return ' + products.length + ' rows');        
        // DEBUG error
        // throw new Error('Test an error');
        resolve(products);
      }).catch(function (err) {
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
        name: product.name,
        price: product.price,
      }).then(function (res) {
        console.log('[Model] Product.addProduct(' + JSON.stringify(product) + '): return ' + JSON.stringify(res));  
        resolve(res); // {"ok":true,"id":"...","rev":"..."}
      }).catch(function (err) {
        reject(new Error('Product.addProduct(' + JSON.stringify(product) + '): ' + err));
      });
    });
  }

  static async updateProduct(product) {
    return new Promise((resolve, reject) => {
      const db = new PouchDB('datas/productsdb');
      db.get(product.id).then(function(doc) {
        return db.put({         
        _id: doc._id,
        _rev: doc._rev,
        name: product.name,
        price: product.price,
      })}).then(function (res) {
        console.log('[Model] Product.updateProduct(' + JSON.stringify(product) + '): return ' + JSON.stringify(res));  
        resolve(res); // {"ok":true,"id":"...","rev":"..."}
      }).catch(function (err) {
        reject(new Error('Product.updateProduct(' + JSON.stringify(product) + '): ' + err));
      });
    });
  }

  static async delProduct(id) {
    return new Promise((resolve, reject) => {
      const db = new PouchDB('datas/productsdb');
      db.get(id).then(function(doc) {
        return db.remove(doc);
      }).then(function (res) {
        console.log('[Model] Product.delProduct(' + JSON.stringify(id) + '): return ' + JSON.stringify(res));  
        resolve(res); // {"ok":true,"id":"...","rev":"..."}
      }).catch(function (err) {
        reject(new Error('Product.delProduct(' + JSON.stringify(id) + '): ' + err));
      });
    });
  }

  constructor() {
    
  }
}

module.exports = Product;