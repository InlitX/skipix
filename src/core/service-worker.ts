browser.runtime.onInstalled.addListener(function() {});

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "updateBadge") {
    browser.action.getBadgeText({}).then(function(result) {
      var current = parseInt(result) || 0;
      browser.action.setBadgeText({ text: String(current + 1) });
      browser.action.setBadgeBackgroundColor({ color: "#22c55e" });
    }).catch(function() {});
  }
});
