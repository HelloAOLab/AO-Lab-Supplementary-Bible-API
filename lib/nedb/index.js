import Datastore from 'nedb';

const db = new Datastore({ filename: './lib/nedb/db/nedb.db', autoload: true });

export default db;