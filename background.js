// @ts-nocheck
console.log("Background script loaded");

chrome.contextMenus.create({
  id: "openPopup",
  title: "Find Word Definition",
  contexts: ["selection", "link"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("info: ", info.selectionText);

  const selectedWord = info.selectionText;

  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
    selectedWord
  )}`;

  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      chrome.storage.local.set({ selectedText: data }, () => {
        chrome.action.openPopup();
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
