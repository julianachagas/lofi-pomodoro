const songs = [
  {
    title: 'Spring Blossom',
    source: 'spirit-blossom.mp3',
    cover: 'spirit-blossom.jpg'
  },
  {
    title: 'Thousand Miles',
    source: 'chillhop-thousand-miles.mp3',
    cover: 'chillhop-thousand-miles.jpg'
  },
  {
    title: 'Motivation',
    source: 'acoustic-motivation.mp3',
    cover: 'acoustic-motivation.jpg'
  },
  {
    title: 'Lofi Song',
    source: 'chill-lofi-song.mp3',
    cover: 'chill-lofi-song.jpg'
  },
  {
    title: 'In the room',
    source: 'in-the-room.mp3',
    cover: 'in-the-room.jpg'
  },
  {
    title: 'Lofi',
    source: 'lofi.mp3',
    cover: 'lofi.jpg'
  },
  {
    title: 'Rain and Nostalgia',
    source: 'rain-and-nostalgia.mp3',
    cover: 'rain-and-nostalgia.jpg'
  },
  {
    title: 'Sunset Vibes',
    source: 'sunset-vibes.mp3',
    cover: 'sunset-vibes.jpg'
  },
  {
    title: 'Travel to the City',
    source: 'travel-to-the-city.mp3',
    cover: 'travel-to-the-city.jpg'
  },
  {
    title: 'Where the light is',
    source: 'where-the-light-is.mp3',
    cover: 'where-the-light-is.jpg'
  },
  {
    title: 'The Beat of Nature',
    source: 'the-beat-of-nature.mp3',
    cover: 'the-beat-of-nature.jpg'
  },
  {
    title: 'To meet the light',
    source: 'to-meet-the-light.mp3',
    cover: 'to-meet-the-light.jpg'
  }
];

let songIndex = 0;
const audio = document.getElementById('audio');
const musicContainer = document.querySelector('.music-container');

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
  const { title, source, cover } = songs[songIndex];
  audio.src = `assets/music/${source}`;
  document.getElementById('cover').src = `assets/images/${cover}`;
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
  // get the coordinate where the click event happened inside the progress container element, this will be the new progress width
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
