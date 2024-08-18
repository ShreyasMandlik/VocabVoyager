// @ts-nocheck
chrome.storage.local.get("selectedText", (result) => {
  if (result) {
    const data = result.selectedText;
    console.log("result1: ", data[0].word);
    console.log("result2: ", data[0].meanings[0].definitions[0].definition);
    document.getElementById("result").innerText = data[0].word;
    document.getElementById("definition").innerText =data[0].meanings[0].definitions[0].definition;
  }
});
