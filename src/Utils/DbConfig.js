const dbName = "MyDatabase";
const storeName = "MyObjectStore";
const dbVersion = 1;

const IndexedDBService = {
  db: null,

  initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(storeName, { keyPath: "id" });
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };

      request.onerror = (event) => {
        reject("IndexedDB initialization error: ", event.target.error);
      };
    });
  },

  addItem(item) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.add(item);

      request.onsuccess = () => resolve();
      request.onerror = (event) =>
        reject("Error adding item: ", event.target.error);
    });
  },

  // ... Other CRUD methods ...
};

export default IndexedDBService;
