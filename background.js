// Keep track of active tabs
const activeTabs = new Set();

// Handle extension icon clicks
chrome.action.onClicked.addListener(async (tab) => {
  const tabId = tab.id;
  const isEnabled = activeTabs.has(tabId);
  
  if (isEnabled) {
    activeTabs.delete(tabId);
  } else {
    activeTabs.add(tabId);
  }

  // Update icon
  await chrome.action.setIcon({
    tabId: tabId,
    path: {
      16: `icons/icon16${isEnabled ? '-off' : ''}.png`,
      48: `icons/icon48${isEnabled ? '-off' : ''}.png`,
      128: `icons/icon128${isEnabled ? '-off' : ''}.png`
    }
  });

  // Send message to content script
  try {
    await chrome.tabs.sendMessage(tabId, { enabled: !isEnabled });
  } catch (error) {
    console.error('Error sending message to content script:', error);
  }
});

// Clean up when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => {
  activeTabs.delete(tabId);
});