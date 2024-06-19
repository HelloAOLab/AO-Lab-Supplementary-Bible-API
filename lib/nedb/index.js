import Datastore from 'nedb';

const db = new Datastore({ filename: './db/nedb.db', autoload: true });

export default db;