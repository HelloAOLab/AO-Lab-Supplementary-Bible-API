import Datastore from 'nedb';
import path, { join } from 'path';

const db = new Datastore({ filename: path.join(process.cwd(), 'lib', 'nedb', 'db', 'nedb.db'), autoload: true });

export default db;