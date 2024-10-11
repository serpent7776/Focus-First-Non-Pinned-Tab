function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    shortcut: document.querySelector("#shortcut").value
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#shortcut").value = result.shortcut || "Alt+0";
  }

  function onError(error) {
    console.error(`${error}`);
  }

  const getting = browser.storage.sync.get("shortcut");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
