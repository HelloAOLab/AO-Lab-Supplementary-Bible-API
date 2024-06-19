import Datastore from 'nedb';
import { join } from 'path';

const dbFilePath = '/lib/nedb/db/nedb.db' || join(process.cwd(), 'lib', 'nedb', 'db', 'nedb.db');

const db = new Datastore({ filename: dbFilePath, autoload: true });

export default db;