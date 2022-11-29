// POMODORO
// time in seconds
const timer = {
  pomodoro: 1500,
  shortBreak: 300,
  longBreak: 900
};

let mode;
let timeRemaining;
let pomodoroSessions = 0;
let timerInterval;
const controlBtn = document.querySelector('#control');

const updateClock = time => {
  let min = Math.floor(time / 60);
  let sec = time - min * 60;
  min = min.toString().padStart(2, '0');
  sec = sec.toString().padStart(2, '0');
  const clock = document.querySelector('.clock');
  clock.textContent = `${min}:${sec}`;
  // update the page title
  const text = mode === 'pomodoro' ? 'Time to focus!' : 'Time for a break!';
  document.title = `${min}:${sec} - ${text}`;
};

const resetProgressBar = () => {
  const pomodoroProgressBar = document.querySelector('.pomodoro-progress-bar');
  pomodoroProgressBar.style.strokeWidth = `1rem`;
  pomodoroProgressBar.style.strokeDasharray = `${Math.PI * 2 * 135}`;
};

const switchMode = newMode => {
  mode = newMode;
  timeRemaining = timer[mode];
  updateClock(timeRemaining);
  resetProgressBar();
  const menuBtns = document.querySelectorAll('.pomodoro-menu button');
  menuBtns.forEach(button => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });
};

const updatePomodoroProgress = () => {
  const progressBarPerimeter = 2 * Math.PI * 135;
  const totalTime = timer[mode];
  const dashLength = (progressBarPerimeter * timeRemaining) / totalTime;
  const pomodoroProgressBar = document.querySelector('.pomodoro-progress-bar');
  // stroke-dasharray: first value = dash length, second value = gap length
  pomodoroProgressBar.style.strokeDasharray = `${dashLength}, ${
    progressBarPerimeter - dashLength
  }`;
  if (dashLength === 0) {
    pomodoroProgressBar.style.strokeWidth = `0`;
  }
};

const stopTimer = () => {
  clearInterval(timerInterval);
  controlBtn.dataset.action = 'start';
  controlBtn.textContent = 'start';
};

const playNotification = source => {
  const notification = document.getElementById('notification');
  notification.src = `assets/sound-effects/${source}.mp3`;
  notification.play();
};

const updateTimer = () => {
  timeRemaining--;
  updateClock(timeRemaining);
  updatePomodoroProgress();
  if (timeRemaining <= 0) {
    handleTimerEnd();
  }
};

const startTimer = () => {
  timerInterval = setInterval(updateTimer, 1000);
  controlBtn.dataset.action = 'stop';
  controlBtn.textContent = 'stop';
};

const handleTimerEnd = () => {
  clearInterval(timerInterval);
  playNotification('end');
  switch (mode) {
    case 'pomodoro':
      pomodoroSessions++;
      // if the number of completed pomodoro sessions is divisible by 4 (remainder equals to 0), switch to the long break mode
      if (pomodoroSessions % 4 === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
      break;
    default:
      switchMode('pomodoro');
  }
  startTimer();
};

// Event Listeners

// initial (default) mode: pomodoro
document.addEventListener('DOMContentLoaded', () => {
  switchMode('pomodoro');
});

// start/stop button
controlBtn.addEventListener('click', e => {
  const { action } = e.target.dataset;
  if (action === 'start') {
    playNotification('start');
    startTimer();
  } else {
    stopTimer();
  }
});

// switch mode: pomodoro, short break, long break
const pomodoroMenu = document.querySelector('.pomodoro-menu');
pomodoroMenu.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return;
  stopTimer();
  switchMode(e.target.dataset.mode);
});

// MUSIC PLAYER

const songs = [
  {
    title: 'Spring Blossom',
    fileName: 'spirit-blossom'
  },
  {
    title: 'Thousand Miles',
    fileName: 'chillhop-thousand-miles'
  },
  {
    title: 'Motivation',
    fileName: 'acoustic-motivation'
  },
  {
    title: 'Lofi Song',
    fileName: 'chill-lofi-song'
  },
  {
    title: 'In the room',
    fileName: 'in-the-room'
  },
  {
    title: 'Lofi',
    fileName: 'lofi'
  },
  {
    title: 'Rain and Nostalgia',
    fileName: 'rain-and-nostalgia'
  },
  {
    title: 'Sunset Vibes',
    fileName: 'sunset-vibes'
  },
  {
    title: 'Travel to the City',
    fileName: 'travel-to-the-city'
  },
  {
    title: 'Where the Light is',
    fileName: 'where-the-light-is'
  },
  {
    title: 'The Beat of Nature',
    fileName: 'the-beat-of-nature'
  },
  {
    title: 'To Meet the Light',
    fileName: 'to-meet-the-light'
  }
];

const audio = document.getElementById('audio');
const musicContainer = document.querySelector('.music-container');
// keep track of songs
let songIndex = 0;

const playSong = () => {
  musicContainer.classList.add('play');
  // replace play icon with pause icon
  document.querySelector('#play i').classList.remove('fa-play');
  document.querySelector('#play i').classList.add('fa-pause');
  audio.play();
};

const pauseSong = () => {
  musicContainer.classList.remove('play');
  document.querySelector('#play i').classList.add('fa-play');
  document.querySelector('#play i').classList.remove('fa-pause');
  audio.pause();
};

const loadSong = () => {
  const { title, fileName } = songs[songIndex];
  audio.src = `assets/music/${fileName}.mp3`;
  document.getElementById('cover').src = `assets/images/${fileName}.jpg`;
  document.querySelector('.song-title').textContent = title;
};

const nextSong = () => {
  songIndex++;
  if (songIndex === songs.length) {
    songIndex = 0;
  }
  loadSong();
  playSong();
};

const previousSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong();
  playSong();
};

const updateProgress = e => {
  const { duration, currentTime } = e.target;
  const progressPercent = (currentTime / duration) * 100;
  const progressBar = document.querySelector('.progress');
  progressBar.style.width = `${progressPercent}%`;
};

const setProgress = function (e) {
  // get total width of the progress container, this = progress container
  const totalWidth = this.clientWidth;
  // get the x coordinate where the click event happened inside the progress container element, this will be the new progress width
  const progressWidth = e.offsetX;
  const songDuration = audio.duration;
  // set the new currentTime
  audio.currentTime = (progressWidth * songDuration) / totalWidth;
};

// Event Listeners

// play song
document.getElementById('play').addEventListener('click', () => {
  const isPlaying = document
    .querySelector('.music-container')
    .classList.contains('play');
  // if there's a song playing, pause
  if (isPlaying) {
    pauseSong();
    return;
  }
  playSong();
});

// change song: next and previous
document.getElementById('next').addEventListener('click', nextSong);
document.getElementById('prev').addEventListener('click', previousSong);

// Song ends: ended event
audio.addEventListener('ended', nextSong);

// Update progress: timeupdate event is fired when currentTime attribute has been updated
audio.addEventListener('timeupdate', updateProgress);

// Click on the progress bar, change song's current time
document
  .querySelector('.progress-container')
  .addEventListener('click', setProgress);
