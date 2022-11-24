// POMODORO
// timer in seconds
const timer = {
  pomodoro: 1500,
  shortBreak: 300,
  longBreak: 900
};
// initial mode is pomodoro
let mode = 'pomodoro';
let totalTime = 1500; // 25min
let timeRemaining;
let pomodoroInterval;
let pomodoroRounds = 0;
let pause = false;
const controlBtn = document.querySelector('#control');

const updateClock = time => {
  let min = Math.floor(time / 60);
  let sec = time - min * 60;
  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;
  const element = document.querySelector('.clock');
  element.textContent = `${min}:${sec}`;
};

const startTimer = () => {
  timeRemaining = timer[mode];
  if (pause) {
    updateTimer();
    pause = false;
  }
  pomodoroInterval = setInterval(updateTimer, 1000);
  controlBtn.dataset.action = 'pause';
  controlBtn.textContent = 'pause';
};

const stopTimer = () => {
  clearInterval(pomodoroInterval);
  controlBtn.dataset.action = 'start';
  controlBtn.textContent = 'start';
};

const playNotification = () => {
  let count = 1;
  const notification = document.getElementById('notification');
  notification.src = 'assets/sound-effects/notification.mp3';
  notification.play();
  notification.addEventListener('ended', () => {
    if (count < 3) {
      count++;
      notification.play();
    }
  });
};

const updatePomodoroProgress = () => {
  const progressBarPerimeter = 2 * Math.PI * 135;
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

const switchMode = newMode => {
  mode = newMode;
  totalTime = timer[mode];
  const clock = document.querySelector('.clock');
  clock.textContent =
    mode === 'shortBreak' ? '05:00' : mode === 'longBreak' ? '15:00' : '25:00';
  const menuBtns = document.querySelectorAll('.pomodoro-menu button');
  menuBtns.forEach(button => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });
};

const resetClock = () => {
  timer.pomodoro = 1500;
  timer.shortBreak = 300;
  timer.longBreak = 900;
  controlBtn.removeAttribute('disabled', '');
  const pomodoroProgressBar = document.querySelector('.pomodoro-progress-bar');
  pomodoroProgressBar.style.strokeWidth = `1rem`;
  pomodoroProgressBar.style.strokeDasharray = `${Math.PI * 2 * 135}`;
  pause = false;
};

const handleTimerEnd = () => {
  stopTimer();
  controlBtn.setAttribute('disabled', '');
  playNotification();
  setTimeout(() => {
    resetClock();
    if (mode !== 'pomodoro') {
      switchMode('pomodoro');
    } else {
      pomodoroRounds++;
      if (pomodoroRounds <= 3) {
        switchMode('shortBreak');
      } else {
        switchMode('longBreak');
        // reset pomodoro rounds, after the long break it'll restart the pomodoro circle
        pomodoroRounds = 0;
      }
    }
    startTimer();
  }, 6000);
};

const updateTimer = () => {
  timer[mode] = timeRemaining--;
  if (timer[mode] === 0) {
    handleTimerEnd();
    return;
  }
  updateClock(timeRemaining);
  updatePomodoroProgress();
};

controlBtn.addEventListener('click', e => {
  const action = e.target.dataset.action;
  if (action === 'start') {
    startTimer();
    // safari fix: safari doesn't play audio without a user interaction first
    // play a silent audio on first interaction on page, before we actually need the sound effect, then we modify the audio src
    const notification = document.getElementById('notification');
    notification.src =
      'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    notification.play();
  } else {
    stopTimer();
    pause = true;
  }
});

// switch mode: pomodoro, short break, long break
const pomodoroMenu = document.querySelector('.pomodoro-menu');
pomodoroMenu.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return;
  switchMode(e.target.dataset.mode);
  stopTimer();
  resetClock();
  // reset the rounds when user manually switch modes
  pomodoroRounds = 0;
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
