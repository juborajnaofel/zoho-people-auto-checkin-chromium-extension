// background.js
// chrome.tabs.onActivated.addListener((activeInfo) => {

// });

// chrome.storage.sync.clear(function() {
//   if (chrome.runtime.lastError) {
//     console.error('Error clearing storage:', chrome.runtime.lastError);
//   } else {
//     console.log('Storage cleared successfully.');
    
//     // Reload the extension
//     chrome.runtime.reload();
//   }
// });

chrome.runtime.onStartup.addListener(function() {
  chrome.tabs.create({ url: "https://people.zoho.com/codeshaper/zp#home/dashboard" });
});


chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    for (let tab of tabs) {
      if (!tab.active) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        }, () => {
          console.log(`Injected script into tab: ${tab.id}`);
        });
        break;
      }
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "setTime") {
    chrome.storage.local.set({ timer: message.data }, function () {
    
    });
  }
});
