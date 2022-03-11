import {MongoClient, ObjectId} from 'mongodb';
import {readFile} from "fs/promises";


export function getSessions() {
    return executeDBCommand(
        (client) => client.db(dbName),
        (db) => db.collection(sessionsCollection).find().toArray()
    );
}

export function getSessionBy(id) {
    return executeDBCommand(
        (client) => client.db(dbName),
        (db) => db.collection(sessionsCollection).findOne({_id: new ObjectId(id)})
    );
}

export function insertSessionsData() {
    return executeDBCommand(
        (client) => client.db(dbName),
        (db) => db.collection(sessionsCollection).insertMany(sessions)
    );
}

export function addUser(user){

    return executeDBCommand(
        (client) => client.db(dbName),
        (db) => db.collection(users).insertOne(user)
    );
}
export function getUserBy(id) {

    return executeDBCommand(
        (client) => client.db(dbName),
        (db) => db.collection(users).findOne({_id: id})
    );
}
const dbName = 'globomantics';

const sessionsCollection = 'sessions';
const users = 'users';

export const sessions = JSON.parse(
    await readFile(
        new URL('../data/sessions.json', import.meta.url)
    )
);

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
