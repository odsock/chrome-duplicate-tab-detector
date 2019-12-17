chrome.tabs.onCreated.addListener(function(newTab) {
  const checkUrl = 'https://play.google.com/music';

  if (newTab.pendingUrl === checkUrl) {
    chrome.tabs.query({ url: `${checkUrl}*` }, function(tabs) {
      chrome.windows.update(tabs[0].windowId, { focused: true });
      chrome.tabs.update(tabs[0].id, { selected: true });
      chrome.tabs.remove(newTab.id);
    });
  }
});
