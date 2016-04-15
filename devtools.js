// Can use
// chrome.devtools.*
// chrome.extension.*

// Create a tab in the devtools area
chrome.devtools.panels.create("Forecast", "toast.png", "app/index.html", function(panel) {});
