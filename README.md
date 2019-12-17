# Chrome-google-music-tab-picker

Chrome-google-music-tab-picker is an extension for Google Chrome which selects an existing Google Play Music tab if a new one is opened.

On opening a new tab with a URL matching https://play.google.com/music, and a tab exists in the same window with a URL that starts with https://play.google.com/music, it closes the new tab and selects the existing tab. If there's no existing tab, the new tab is opened as usual.

Notes and limitations:

- Only applies to new tabs--navigation within a single tab is not affected.
- Does not detect new tabs which are opened via javascript (e.g. via bookmarklets)
- Does not auto-update
