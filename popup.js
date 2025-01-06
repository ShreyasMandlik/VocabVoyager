// @ts-nocheck
chrome.storage.local.get("selectedText", (result) => {
  if (result) {
    const data = result.selectedText;

    if (data.word) {
      document.getElementById("result").innerText = data.word;
    } else {
      document.getElementById("result").style.display = "none";
    }

    if (data.meaning) {
      document.getElementById("definition").innerText = data.meaning;
    } else {
      document.getElementById("definition").style.display = "none";
    }

    function setSection(section, definitionId, exampleId, sectionId) {
      if (data[section] && data[section].definition && data[section].example) {
        document.getElementById(definitionId).innerText =
          data[section].definition;
        document.getElementById(exampleId).innerText = data[section].example;
      } else {
        const sectionDiv = document.getElementById(sectionId);
        sectionDiv.style.display = "none";
      }
    }

    setSection("Noun", "noun", "noun-example", "noun-section");

    setSection("Verb", "verb", "verb-example", "verb-section");

    setSection(
      "Adjective",
      "adjective",
      "adjective-example",
      "adjective-section"
    );

    setSection("Adverb", "adverb", "adverb-example", "adverb-section");
  }
});
