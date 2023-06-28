const tabs = {};
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "closeTab") {
    if (tabs[sender.tab.id]) {
      chrome.tabs.remove(sender.tab.id, function () {
        console.log("Tab closed successfully.");
      });
    }
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "openTab") {
    chrome.tabs.create({ url: message.url }, function (tab) {
      tabs[tab.id] = tab;
    });
  }
});
