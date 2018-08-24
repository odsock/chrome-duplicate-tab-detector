chrome.tabs.onCreated.addListener(function(newTab) {
  const checkUrl = 'https://play.google.com/music'

  if (newTab.url === checkUrl) {
    chrome.tabs.getAllInWindow(newTab.windowId, function(tabs) {
      tabs.forEach(function(otherTab) {
        if (
          otherTab.id !== newTab.id &&
          otherTab.url.startsWith(checkUrl)
        ) {
          chrome.tabs.update(otherTab.id, { selected: true });
          chrome.tabs.remove(newTab.id);
          return;
        }
      });
    });
  };
});
