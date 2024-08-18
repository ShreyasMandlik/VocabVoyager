// @ts-nocheck
console.log("Background script loaded");

chrome.contextMenus.create({
  id: "openPopup",
  title: "Open Popup",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("info: ", info.selectionText);
  console.log("tab: ", tab);

  chrome.storage.local.set({ selectedText: info.selectionText }, () => {
    chrome.action.openPopup();
  });
});
