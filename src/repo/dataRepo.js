import {MongoClient, ObjectId} from 'mongodb';


export function get() {
    return executeDBCommand(
        (client) => client.db(dbName),
        (db) => db.collection(sessionsCollection).find().toArray()
    );
}

export function getBy(id) {
    return executeDBCommand(
        (client) => client.db(dbName),
        (db) => db.collection(sessionsCollection).findOne({_id: new ObjectId(id)})
    );
}

export function insert(sessions) {
    return executeDBCommand(
        (client) => client.db(dbName),
        (db) => db.collection(sessionsCollection).insertMany(sessions)
    );
}

const dbName = 'globomantics';
const sessionsCollection = 'sessions';

function executeDBCommand(resolveDb, dbOp) {
    const url = 'mongodb://root:example@localhost:27017';

    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(url);
        try {
            await client.connect();
            const db = resolveDb(client);

            const results = await dbOp(db);
            resolve(results);
        } catch (e) {
            reject(e);
        } finally {
            await client.close();
        }
    });
}
