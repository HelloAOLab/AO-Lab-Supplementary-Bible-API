import Datastore from 'nedb';
import { join } from 'path';

const dbFilePath = process.env.NEDB_FILE_PATH || join(process.cwd(), 'lib', 'nedb', 'db', 'nedb.db');

const db = new Datastore({ filename: dbFilePath, autoload: true });

export default db;