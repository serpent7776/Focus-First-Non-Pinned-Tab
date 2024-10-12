function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    shortcut: document.querySelector("#shortcut").value
  }).then(() => {
    const status = document.createElement('div');
    status.textContent = 'Options saved.';
    status.className = 'status';
    document.body.appendChild(status);
    setTimeout(() => {
      document.body.removeChild(status);
    }, 1500);
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
