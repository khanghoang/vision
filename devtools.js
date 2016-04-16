// Can use
// chrome.devtools.*
// chrome.extension.*

// Create a tab in the devtools area
chrome.devtools.panels.create("Vision", "toast.png", "dist/index.html", function(panel) {});
