// Function to set the temporary data in local storage
function setTemporaryData(key, data) {
  var expiration = Date.now() + 60000; // One minute from now
  var tempData = {
    data: data,
    expiration: expiration,
  };
  localStorage.setItem(key, JSON.stringify(tempData));
}

// Function to get the temporary data from local storage
function getTemporaryData(key) {
  var tempData = localStorage.getItem(key);
  if (tempData) {
    tempData = JSON.parse(tempData);
    if (Date.now() < tempData.expiration) {
      return tempData.data;
    } else {
      localStorage.removeItem(key); // Remove expired data
    }
  }
  return null;
}

window.utils = {
  setTemporaryData,
  getTemporaryData,
};
console.log("gelloo");
