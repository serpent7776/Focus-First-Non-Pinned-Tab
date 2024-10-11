function updateCommand(shortcut) {
  browser.commands.update({
    name: "focus-first-non-pinned-tab",
    shortcut: shortcut
  });
}

function onError(error) {
  console.error(`${error}`);
}

browser.storage.sync.get("shortcut").then((result) => {
  if (result.shortcut) {
    updateCommand(result.shortcut);
  }
}, onError);

browser.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.shortcut) {
    updateCommand(changes.shortcut.newValue);
  }
});

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
