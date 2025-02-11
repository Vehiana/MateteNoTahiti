const PouchDB = require('pouchdb');
require('dotenv').config();

const initializeDatabase = () => {
  const db = new PouchDB(process.env.DB_URL || 'local_database');
  return db;
};

module.exports = {
  initializeDatabase,
};