/* global chrome */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.status === 'complete') {
    const videoPlaying = !!changeInfo.title
    chrome.tabs.sendMessage(tabId, {videoPlaying})
  }
})

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  if (data.ready) {
    const videoPlaying = data.ready
    sendResponse({videoPlaying})
  }
})
