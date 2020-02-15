chrome.tabs.onCreated.addListener(function(newTab) {
  const checkUrl = 'https://play.google.com/music';

  if (newTab.pendingUrl === checkUrl) {
    console.debug(`pending url: ${newTab.pendingUrl}`);
    chrome.tabs.query({ url: `${checkUrl}*` }, function(tabs) {
      console.debug(`tabs found: ${tabs.length}`);
      if (tabs.length == 1) {
        console.debug(`tab id: ${tabs[0].id}`);
        console.debug(`tab current window id: ${tabs[0].windowId}`);
        chrome.windows.getAll({ populate: true }, function(windows) {
          console.debug(`window count: ${windows.length}`);
          let i = 0;
          let maxTabsWindowId = 0;
          let maxTabs = 0;
          while(windows.length > i) {
            console.debug(`window ${windows[i].id} tab count: ${windows[i].tabs.length}`);
            if (windows[i].tabs.length > maxTabs) {
              maxTabs = windows[i].tabs.length;
              maxTabsWindowId = windows[i].id;
            }
            i++;
          }
          console.debug(`max tabs window id: ${maxTabsWindowId}`);
          chrome.tabs.move(tabs[0].id, { windowId: maxTabsWindowId, index: 0 });
          chrome.tabs.update(tabs[0].id, { pinned: true });
          chrome.tabs.update(tabs[0].id, { selected: true });
          chrome.windows.update(tabs[0].windowId, { focused: true });
        })
      } else if (tabs.length > 1) {
        console.debug(`window id: ${tabs[0].windowId}`);
        chrome.windows.update(tabs[0].windowId, { focused: true });
        chrome.tabs.update(tabs[0].id, { selected: true });
        chrome.tabs.remove(newTab.id);
      }
    });
  }
});
