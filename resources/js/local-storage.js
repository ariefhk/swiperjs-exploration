// Function to get data from local storage
export const getLocalStorageData = (keyName) => {
  try {
    const savedItem = localStorage.getItem(keyName);
    // Check if the saved item looks like a JSON object or not
    if (savedItem && (savedItem.startsWith("{") || savedItem.startsWith("["))) {
      return JSON.parse(savedItem);
    }
    return savedItem;
  } catch (error) {
    console.error(`Error parsing localStorage item '${keyName}':`, error);
    return null;
  }
};

// Function to save data to local storage
export const saveLocalStorageData = (keyName, value) => {
  try {
    if (typeof value === "object") {
      localStorage.setItem(keyName, JSON.stringify(value));
    } else {
      localStorage.setItem(keyName, value);
    }
  } catch (error) {
    console.error(`Error saving localStorage item '${keyName}':`, error);
  }
};

// Function to delete data from local storage
export const deleteLocalStorageData = (keyName) => {
  try {
    localStorage.removeItem(keyName);
  } catch (error) {
    console.error(`Error removing localStorage item '${keyName}':`, error);
  }
};

// Function to update data in local storage
export const updateLocalStorageData = (keyName, updateVal) => {
  try {
    const getItem = localStorage.getItem(keyName);
    if (!getItem) {
      console.warn(`Item with key '${keyName}' not found!`);
      return;
    }
    if (typeof updateVal === "object") {
      localStorage.setItem(keyName, JSON.stringify(updateVal));
    } else {
      localStorage.setItem(keyName, updateVal);
    }
  } catch (error) {
    console.error(`Error updating localStorage item '${keyName}':`, error);
  }
};

// Function to clear all data from local storage
export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
