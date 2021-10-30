import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframePlayer = document.querySelector('iframe');
const player = new Player(iframePlayer);
const localStorageKey = 'videoplayer-current-time';

console.log(localStorageKey);

function onTimeUpdate(evant) {
  localStorage.setItem(localStorageKey, evant.seconds);
}
const savingTime = localStorage.getItem(localStorageKey);

console.log(savingTime);
if (savingTime) {
  player.setCurrentTime(savingTime);
}
player.on('timeupdate', throttle(onTimeUpdate, 1000));
