// @ts-nocheck
// Establish a connection to the background script
// When the popup loads, retrieve the stored text
chrome.storage.local.get("selectedText", (result) => {
  if (result.selectedText) {
    console.log("Received selected text in popup: ", result.selectedText);
    document.getElementById("result").innerText = result.selectedText;
  }
});
