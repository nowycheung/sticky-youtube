/* global chrome, $ */

const executeStickVideo = () => {
  let forceHide = false
  const player = $('#player.ytd-watch-flexy')

  const stickVideo = (scrollElement) => {
    const topPosition = scrollElement.scrollTop()
    if (topPosition > $('video.video-stream').height() && !forceHide) {
      player.addClass('sticky-video')
    } else {
      player.removeClass('sticky-video')
    }
    if (topPosition === 0) {
      forceHide = false
    }
  }

  player.click((e) => {
    if (e.target.id === 'player') {
      forceHide = true
      player.removeClass('sticky-video')
    }
  })

  $(window.document).scroll(() => stickVideo($(window.document)))
  $('#primary').scroll(() => stickVideo($('#primary')))
}

chrome.runtime.onMessage.addListener((data) => {
  if (data.videoPlaying) {
    executeStickVideo()
  }
})

chrome.runtime.sendMessage({ready: true}, (data) => {
  if (data.videoPlaying) {
    // Wait until the player element is ready
    setTimeout(() => {
      executeStickVideo()
    }, 1000)
  }
})
