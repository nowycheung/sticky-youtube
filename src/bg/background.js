/* global chrome */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.status === 'complete') {
    chrome.tabs.sendMessage(tabId, {videoPlaying: !!changeInfo.title})
  }
})

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  if (data.ready) {
    sendResponse({videoPlaying: data.ready})
  }

  if (data.iconUrl) {
    chrome.browserAction.setIcon({path: data.iconUrl})
  }
})
