# Chrome-google-music-tab-picker

Chrome-google-music-tab-picker is an extension for Google Chrome which selects an existing Google Play Music or Youtube Music tab if a new one is opened.

On opening a new tab with the URL https://play.google.com/music, or https://music.youtube.com, if there is an existing tab with that URL the new tab is closed and the existing tab is selected.

If there is no existing tab, the new tab is pinned in the existing window with the most tabs.

Notes and limitations:

- Only applies to new tabs -- navigation within a single tab is not affected.
- Does not detect new tabs which are opened via javascript (e.g. via bookmarklets)
- Does not auto-update
