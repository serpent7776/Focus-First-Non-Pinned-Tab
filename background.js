browser.commands.onCommand.addListener((command) => {
  if (command === "focus-first-non-pinned-tab") {
    browser.windows.getCurrent().then((currentWindow) => {
      browser.tabs.query({ windowId: currentWindow.id, pinned: false }).then((tabs) => {
        if (tabs.length > 0) {
          browser.tabs.update(tabs[0].id, { active: true });
        }
      });
    });
  }
});
