/* global chrome, $ */

const activateSticky = (active, player) => {
  if (active) {
    player.addClass('sticky-video')
    chrome.runtime.sendMessage({iconUrl: '../../icons/icon19.png'})
  } else {
    player.removeClass('sticky-video')
    chrome.runtime.sendMessage({iconUrl: '../../icons/icon19-gray.png'})
  }
}

const executeStickVideo = () => {
  let forceHide = false
  const player = $('#player:not([hidden])')
  const videoStream = $('video.video-stream')
  const document = $(window.document)
  const primary = $('#columns #primary')

  const detectPlayer = (scrollElement) => {
    const topPosition = scrollElement.scrollTop()
    const active = topPosition > videoStream.height() && !forceHide
    activateSticky(active, player)

    if (topPosition === 0) {
      forceHide = false
    }
  }

  player.click((e) => {
    if (e.target.id === 'player') {
      forceHide = true
      activateSticky(false, player)
    }
  })

  document.scroll(() => detectPlayer(document))
  primary.scroll(() => detectPlayer(primary))
}

chrome.runtime.onMessage.addListener((data) => {
  if (data.videoPlaying) {
    executeStickVideo()
  }
})

chrome.runtime.sendMessage({ready: true}, (data) => {
  if (data.videoPlaying) {
    // Wait until the player element is ready
    setTimeout(executeStickVideo, 1000)
  }
})
