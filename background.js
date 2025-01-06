// @ts-nocheck
console.log("Background script loaded");

const GOOGLE_API_KEY = "Your API Key";
chrome.contextMenus.create({
  id: "openPopup",
  title: "Find Word Definition",
  contexts: ["selection", "link"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedWord = info.selectionText;

  const apiUrl =
    "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

  const requestData = {
    contents: [
      {
        parts: [
          {
            text: `Define the word "${selectedWord}" and provide the following information in JSON format:
            - The meaning of the word in 40-50 characters.
            - Parts of speech with examples for each part.
              - For each part of speech, include:
                - A key for the part of speech (e.g., "Noun", "Verb", etc.).
                - A value that includes the definition (in 40-50 characters) and an example sentence.

            Example output format (ensure JSON formatting is valid with proper key-value pairs):
            {
              "word": "The Word which is being defined",
              "meaning": "Meaning of the word in 40-50 characters",
              "Noun": {
                "definition": "Definition of the noun in 40-50 characters",
                "example": "Example sentence using the noun"
              },
              "Verb": {
                "definition": "Definition of the verb in 40-50 characters",
                "example": "Example sentence using the verb"
              },
              "Adjective": {
                "definition": "Definition of the adjective in 40-50 characters",
                "example": "Example sentence using the adjective"
              },
              "Adverb": {
                "definition": "Definition of the adverb in 40-50 characters",
                "example": "Example sentence using the adverb"
              }
            }

            - Return the result only in the JSON format above, without any additional explanation or text.`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.6,
    },
  };

  fetch(`${apiUrl}?key=${GOOGLE_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const apiContent = data.candidates[0].content;
      const results = JSON.parse(apiContent.parts[0].text);

      chrome.storage.local.set({ selectedText: results }, () => {
        chrome.action.openPopup();
      });
    })
    .catch((error) => {
      console.error("Something went wrong", error);
    });
});
