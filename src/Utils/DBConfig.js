const dbName = "MyDatabase";
const dbVersion = 1;
export const storeName = "MyObjectStore";
export const tblPreSetting = "MyPreSetting";

const IndexedDBService = {
  db: null,

  initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        // main content data obj
        db.createObjectStore(storeName, { keyPath: "id" });
        // pre settings data obj
        db.createObjectStore(tblPreSetting, { keyPath: "id" });
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

  addItem(item, objName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([objName], "readwrite");
      const store = transaction.objectStore(objName);
      const request = store.add(item);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject("Error adding item: ", event.target.error);
    });
  },

  getData(key, objName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([objName], "readonly");
      const store = transaction.objectStore(objName);
      const request = store.get(key);

      request.onsuccess = (event) => {
        if (event.target.result) {
          resolve(event.target.result);
        }
      };

      request.onerror = (event) => {
        reject("Error retrieving data: ", event.target.error);
      };
    });
  },

  getAllData() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.openCursor();
      const allData = [];

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          allData.push(cursor.value);
          cursor.continue();
        } else {
          // No more entries
          resolve(allData);
        }
      };

      request.onerror = (event) => {
        reject("Error in fetching all data: ", event.target.error);
      };
    });
  },

  closeDB() {
    if (this.db) {
      this.db.close();
      this.db = null;
      console.log("Database connection closed.");
    }
  },

  updateItem(item, objName) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject("Database not initialized");
        return;
      }

      const transaction = this.db.transaction([objName], "readwrite");
      const store = transaction.objectStore(objName);
      const request = store.put(item);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject("Error updating item: ", event.target.error);
      };
    });
  },

  deleteItem(id) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject("Database not initialized");
        return;
      }

      const transaction = this.db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject("Error deleting item: ", event.target.error);
      };
    });
  },

  clearObjectStore() {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject("Database not initialized");
        return;
      }

      const transaction = this.db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => {
        console.log(`Object store ${storeName} cleared`);
        resolve();
      };

      request.onerror = (event) => {
        console.error("Error clearing object store:", event.target.error);
        reject("Error clearing object store: ", event.target.error);
      };
    });
  },
};

export default IndexedDBService;
