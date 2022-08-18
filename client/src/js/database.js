import { openDB } from "idb";

const initdb = async () =>
    openDB("jate", 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains("jate")) {
                console.log("jate database already exists");
                return;
            }
            db.createObjectStore("jate", {
                keyPath: "id",
                autoIncrement: true,
            });
            console.log("jate database created");
        },
    });

// TODO: Add logic to a method that accepts some content and adds it to the database
// SETTER
export const putDb = async (content) => {
    // save stuff to indexDB
    try {
        // connect idb
        const jateDB = await openDB("jate", 1);
        // make new transaction with read and write permit
        const tx = jateDB.transaction("jate", "readwrite");
        // open object store
        const store = tx.objectStore("jate");
        // put content into store 
        // without specifying Key, it will write new key/value every time it saved
        const request = store.put({ id:1, value: content });
        const result = await request;

        console.log("Data successfully saved to database", result);
    } catch (error) {
        console.error("putDb not implemented", error);
    }
};

// TODO: Add logic for a method that gets all the content from the database
// GETTER
export const getDb = async () => {
  try {
    // connect idb
    const jateDB = await openDB("jate", 1);
    // make new transaction with read and write permit
    const tx = jateDB.transaction("jate", "readwrite");
    // open object store
    const store = tx.objectStore("jate");
    // get values stored from idb
    // since the main getDB did not specify database key, we getAll
    const request = store.getAll();
    const result = await request;
    console.log('data got from iDB: ', result)
  } catch (error) {
    console.error("getDb not implemented", error);
  }

}


initdb();
