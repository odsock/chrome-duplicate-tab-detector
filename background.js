chrome.tabs.onCreated.addListener(function(newTab) {
  const checkUrls = ['https://play.google.com/music', 'https://music.youtube.com/'];

  const checkUrlIndex = checkUrls.indexOf(newTab.pendingUrl);
  if (checkUrlIndex >= 0) {
    // console.debug(`pending url: ${newTab.pendingUrl}`);
    // console.debug(`index: ${checkUrlIndex}`)
    chrome.tabs.query({ url: `${checkUrls[checkUrlIndex]}*` }, function(tabs) {
      // console.debug(`tab count: ${tabs.length}`);

      if (tabs.length == 1) {
        // console.debug(`new tab id: ${tabs[0].id} window id: ${tabs[0].windowId}`);
        chrome.windows.getAll({ populate: true }, function(windows) {
          // console.debug(`window count: ${windows.length}`);

          let maxTabsWindow = windows[0];
          windows.forEach(value => {
            // console.debug(`window ${value.id} tab count: ${value.tabs.length}`);
            if (value.tabs.length > maxTabsWindow.tabs.length) {
              maxTabsWindow = value;
            }
          });

          // console.debug(`moving tab to window id: ${maxTabsWindow.id}`);
          chrome.tabs.move(tabs[0].id, { windowId: maxTabsWindow.id, index: 0 });
          // console.debug(`pinning tab id: ${tabs[0].id}`);
          chrome.tabs.update(tabs[0].id, { pinned: true });
          // console.debug(`selecting tab id: ${tabs[0].id}`);
          chrome.tabs.update(tabs[0].id, { selected: true });
          // console.debug(`focusing window id: ${maxTabsWindow.id}`);
          chrome.windows.update(maxTabsWindow.id, { focused: true });
        });

      } else if (tabs.length > 1) {
        // console.debug(`focusing window id: ${tabs[0].windowId}`);
        chrome.windows.update(tabs[0].windowId, { focused: true });
        // console.debug(`selecting tab id: ${tabs[0].id}`);
        chrome.tabs.update(tabs[0].id, { selected: true });
        // console.debug(`removing tab id: ${newTab.id}`);
        chrome.tabs.remove(newTab.id);
      }
    });
  }
});
