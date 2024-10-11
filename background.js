browser.commands.onCommand.addListener((command) => {
  if (command === "focus-first-non-pinned-tab") {
    browser.tabs.query({ pinned: false }).then((tabs) => {
      if (tabs.length > 0) {
        browser.tabs.update(tabs[0].id, { active: true });
      }
    });
  }
});
