/** Tasks
 * TODO 1 - set up IndexedDB to store recorded video blobs (and metadata like title, date) for the gallery feature
 * TODO 2 - create an object store in IndexedDB to hold video blobs and metadata (e.g., title, date)
 * TODO 3 - make transactions to add video blobs and metadata to the IndexedDB when a recording is stopped
 */

let db;
// request to open (or create) the IndexedDB database
// the "myDB" is the name of the database and 1 is the version number and has 0 object stores
// this is asynchronous and returns an IDBOpenDBRequest object
// which we can use to handle events related to the database opening process
// object stores are created in the onupgradeneeded event handler,
// which is triggered when the database is being created or upgraded
/**
 * IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs. It is a transactional database system that allows us to store and retrieve data in the browser, enabling features like a gallery for recorded videos in our Loom project.
 *
 * Key features of IndexedDB:
 * - It is event-driven and asynchronous, meaning that operations like adding, retrieving, or deleting data are performed using events and callbacks rather than blocking the main thread.
 * - It is stored in key-value pairs, where the key is a unique identifier for the data and the value can be any JavaScript object, including blobs (binary large objects) which are used to store video files.
 * - It allows us to create object stores and indexes to organize and query the data efficiently.
 * - It is supported in all modern browsers and provides a more powerful and flexible storage solution compared to localStorage, which is limited to storing small amounts of string data.
 * How to use IndexedDB:
 * 1. Open a database using indexedDB.open() method, which returns an IDBOpenDBRequest object.
 * 2. Handle the onupgradeneeded event to create object stores and indexes if the database is being created or upgraded.
 * 3. Handle the onsuccess event to get a reference to the opened database (IDBDatabase object).
 * 4. Use transactions to perform read/write operations on the database, such as adding video blobs, retrieving stored videos, or deleting videos from the gallery.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 *
 * indexedDB.open() - method to open a connection to an IndexedDB database.
 *                    It takes the name of the database and an optional version number as arguments.
 *                    If the database does not exist, it will be created.
 *                    If the version number is higher than the existing version,
 *                    the onupgradeneeded event will be triggered to allow for schema changes.
 *
 * Understanding the versions and event handlers:
 * - When you call indexedDB.open("myDB", 1), it tries to open a database named "myDB" with version 1.
 * - If "myDB" does not exist, it will be created and the onupgradeneeded event will be triggered,
 *   allowing you to set up the database schema (e.g., create object stores).
 * - If "myDB" already exists but has a version number less than 1,
 *   the onupgradeneeded event will also be triggered to allow you to upgrade the database schema.
 * - If "myDB" already exists and has version 1 or higher,
 *   the onsuccess event will be triggered, and you can access the database without needing to upgrade it.
 * The event handlers for success, error, and upgradeneeded allow you to manage the database connection and handle any necessary setup or error handling during the opening process.
 *
 * What is an object store in IndexedDB?
 * - An object store is a collection of records in an IndexedDB database, similar to a table in a relational database.
 * - Each record in an object store is a key-value pair, where the key is a unique identifier for the record and the value can be any JavaScript object, including blobs for storing video files.
 * - Object stores are created in the onupgradeneeded event handler when the database is being created or upgraded.
 * - You can create multiple object stores in a database to organize different types of data (e.g., one for videos and another for images).
 * - Object stores can also have indexes to allow for efficient querying of records based on specific properties.
 *
 * What is a transaction in IndexedDB?
 * - A transaction in IndexedDB is a wrapper around a set of operations that are performed on the database.
 *   It ensures that all operations within the transaction are completed successfully before committing the changes to the database.
 * - Transactions can be read-only or read-write, depending on the operations being performed.
 * - To perform operations on the database (e.g., adding a video blob), you need to create a transaction for the relevant object store(s) and specify the mode (readwrite for adding data).
 * - Transactions are used to group multiple operations together, ensuring that they either all succeed or all fail, maintaining the integrity of the database.
 * - You can use transactions to add video blobs and metadata to the IndexedDB when a recording is stopped, allowing you to store the recorded videos in the gallery.
 */
let request = indexedDB.open("myDB", 1);
// event handler for when the database is successfully opened
request.addEventListener("success", (event) => {
  // at this point, the database is successfully opened and we can get a reference to it
  console.log(`DB opened successfully`);
  db = request.result;
});
// event handler for when there is an error opening the database
request.addEventListener("error", (event) => {});
// event handler for when the database is being created or upgraded
request.addEventListener("upgradeneeded", (event) => {
  // at this point, the database is being created or upgraded, and we can set up the schema
  // we can create an object store to hold our video blobs
  console.log(`DB upgraded and also for initial DB creation`);
  db = request.result;
  // create an object store named "videos" with a keyPath of "id" (which will be a unique identifier for each video)
  db.createObjectStore("video", { keyPath: "id", autoIncrement: true });
  db.createObjectStore("image", { keyPath: "id", autoIncrement: true });
});
