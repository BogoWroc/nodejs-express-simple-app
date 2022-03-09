import {MongoClient} from 'mongodb';


export function insert(sessions) {

    return executeDBCommand(
        (client) => client.db(dbName),
        (db) => db.collection(newspapersCollection).insertMany(sessions)
    );
}

const dbName = 'globomantics';
const newspapersCollection = 'sessions';

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
