// YT voodoo magic
let tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const { timestamp, when, videoId } = URI(window.location.href).search(true);
if (typeof timestamp !== 'string' || typeof when !== 'string' || typeof videoId !== 'string') {
  window.location.href = '/';
}

const playYet = event => {
  const countdown = Math.floor((+when - (new Date().getTime() + +timestamp)) / 1000);
  document.querySelector('.countdown').innerHTML = countdown > 0 ? countdown : 'enjoy!';
  new Date().getTime() + +timestamp < +when
    ? setTimeout(playYet.bind(undefined, event), 1000)
    : event.target.playVideo();
};

let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: videoId || 'YkADj0TPrJA',
    events: {
      onReady: onPlayerReady,
    },
  });
}

const onPlayerReady = event => {
  setTimeout(playYet.bind(undefined, event), 1000);
};
