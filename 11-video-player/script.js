// -------------------------------
// DOM Elements
// -------------------------------
const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');

let lastVolume = 1;
let fullscreen = false;

// -------------------------------
// Utils
// -------------------------------
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

function setIcon(element, iconClass, title) {
  element.className = '';
  element.classList.add('fas', iconClass);
  if (title) element.setAttribute('title', title);
};

// -------------------------------
// Play & Pause
// -------------------------------
function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
  if (video.paused) {
    video.play();
    setIcon(playBtn, 'fa-pause', 'Pause');
  } else {
    video.pause();
    setIcon(playBtn, 'fa-play', 'Play');
  }
}

// -------------------------------
// Progress Bar
// -------------------------------
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
  currentTime.textContent = `${formatTime(video.currentTime)} /`;
  duration.textContent = `${formatTime(video.duration)}`;
}

function setProgress(e) {
  const newTime = (e.offsetX / progressRange.offsetWidth) * video.duration;
  video.currentTime = newTime;
  updateProgress()
}

// -------------------------------
// Volume Controls
// -------------------------------
function updateVolumeIcon(volume) {
  if (volume === 0) setIcon(volumeIcon, 'fa-volume-off', 'Mute');
  else if (volume <= 0.7) setIcon(volumeIcon, 'fa-volume-down', 'Mute');
  else setIcon(volumeIcon, 'fa-volume-up', 'Mute');
}

function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  if (volume < 0.1) volume = 0;
  else if (volume > 0.9) volume = 1;
  video.volume = volume;
  volumeBar.style.width = `${volume * 100}%`;
  updateVolumeIcon(volume);
  lastVolume = volume;
}

function toggleMute() {
  video.muted = !video.muted;
  if (video.muted) {
    lastVolume = video.volume;
    volumeBar.style.width = 0;
    setIcon(volumeIcon, 'fa-volume-mute', 'Unmute');
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    updateVolumeIcon(lastVolume);
  }
}

// -------------------------------
// Playback Speed
// -------------------------------
function changeSpeed() {
  video.playbackRate = speed.value;
}

// -------------------------------
// Fullscreen
// -------------------------------
function openFullscreen(elem) {
  if (elem.requestFullscreen) elem.requestFullscreen();
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

function closeFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
}

function toggleFullscreen() {
  fullscreen ? closeFullscreen() : openFullscreen(player);
  fullscreen = !fullscreen;
}

// -------------------------------
// Event Listeners
// -------------------------------
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
video.addEventListener('ended', showPlayIcon);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);

// -------------------------------
// On Load
// -------------------------------
speed.value = "1";
video.playbackRate = speed.value;