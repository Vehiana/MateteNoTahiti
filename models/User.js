const PouchDB = require('pouchdb');

class User {
  static async getUsers() {
    return new Promise((resolve, reject) => {
      const db = new PouchDB('datas/usersdb');
      db.allDocs({
        include_docs: true
      }).then(function (res) {
        // DEBUG pouchdb
        // console.log('alldocs: ' + JSON.stringify(res));
        // res.rows.forEach(row => {
        //   console.log('row: ' + JSON.stringify(row));
        // });
        const users = res.rows.map((row) => ({"id":row.id,"name":row.doc.name,"email":row.doc.email}));
        // users.forEach(user => {
        //     console.log('User.getUsers(): ' + JSON.stringify(user));
        //   });
        console.log('[Model] User.getUsers(): return ' + users.length + ' rows');        
        // DEBUG error
        // throw new Error('Test an error');
        resolve(users);
      }).catch(function (err) {
        reject(new Error('User.getUsers(): ' + err));
      });
    });
  }

  static async getUser(id) {
    return new Promise((resolve, reject) => {
      const db = new PouchDB('datas/usersdb');
      db.get(id).then(function (res) {
        console.log('[Model] User.getUser(' + JSON.stringify(id) + '): return ' + JSON.stringify(res));  
        resolve(res); 
      }).catch(function (err) {
        reject(new Error('User.getUser(' + JSON.stringify(id) + '): ' + err));
      });
    });
  }

  static async addUser(user) {
    return new Promise((resolve, reject) => {
      const db = new PouchDB('datas/usersdb');
      db.post({         
        name: user.name,
        email: user.email,
      }).then(function (res) {
        console.log('[Model] User.addUser(' + JSON.stringify(user) + '): return ' + JSON.stringify(res));  
        resolve(res); // {"ok":true,"id":"...","rev":"..."}
      }).catch(function (err) {
        reject(new Error('User.addUser(' + JSON.stringify(user) + '): ' + err));
      });
    });
  }

  static async updateUser(user) {
    return new Promise((resolve, reject) => {
      const db = new PouchDB('datas/usersdb');
      db.get(user.id).then(function(doc) {
        return db.put({         
        _id: doc._id,
        _rev: doc._rev,
        name: user.name,
        email: user.email,
      })}).then(function (res) {
        console.log('[Model] User.updateUser(' + JSON.stringify(user) + '): return ' + JSON.stringify(res));  
        resolve(res); // {"ok":true,"id":"...","rev":"..."}
      }).catch(function (err) {
        reject(new Error('User.updateUser(' + JSON.stringify(user) + '): ' + err));
      });
    });
  }

  static async delUser(id) {
    return new Promise((resolve, reject) => {
      const db = new PouchDB('datas/usersdb');
      db.get(id).then(function(doc) {
        return db.remove(doc);
      }).then(function (res) {
        console.log('[Model] User.delUser(' + JSON.stringify(id) + '): return ' + JSON.stringify(res));  
        resolve(res); // {"ok":true,"id":"...","rev":"..."}
      }).catch(function (err) {
        reject(new Error('User.delUser(' + JSON.stringify(id) + '): ' + err));
      });
    });
  }

  constructor() {
    
  }
}

module.exports = User;