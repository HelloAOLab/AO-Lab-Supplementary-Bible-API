import Datastore from 'nedb';
import { join } from 'path';
const db = new Datastore({ filename: join(process.cwd(), 'db', 'nedb.db'), autoload: true });

export default db;