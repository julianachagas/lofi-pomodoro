# LoFi Pomodoro 🎵

Pomodoro timer with LoFi music player create with HTML, CSS/SASS, and JavaScript.

This application implements the pomodoro technique and tells the user exactly when to work and when to take a break. You have 25-minute focus sessions followed by five-minute breaks and a longer 15-minute break after four consecutive focus sessions.

The pomodoro process is as follows:

- Start a 25-minute timer (pomodoro mode)
- Work until the timer rings
- Take a five minutes break (short break mode)
- Every four pomodoros, take a longer break (15 minutes)

The user can also use the music player to play some lofi songs during the pomodoro sessions and breaks.

This project was a great way to learn more about the HTML5 Audio API and to practice JavaScript topics like DOM manipulation, event listeners, and timer functions (`setTimeout`, `setInterval`).

### Status

🚧 _in progress_ 🚧

## 🛠️ Technologies

- HTML
- CSS
- SASS
- JavaScript

## 💡 Features

Pomodoro

- User is able to set the timer to pomodoro mode, short break, or long break.
  - Pomodoro: 25 minutes
  - Short break: 5 minutes
  - Long break: 15 minutes
- User can pause and resume the timer
- A notification sound is played when the timer is up and the app will transition to another mode.
- Circular progress bar that updates every second and represents how far through their timer the user is
- The app will automatically start a short break session at the end of a pomodoro session and vice versa. After four pomodoro sessions, the app will switch to the long break mode. Once the break is finished, it'll go back to the pomodoro mode and start a new session.
- The countdown timer is displayed in the page title. This allows the user to quickly see how many minutes are left in a session without switching tabs.

Music Player

- Display song's title, progress bar, and cover image
- Play and pause songs
- Switch songs
- The user is able to click anywhere on the song's progress bar and go to that point in the song

## 📚 Useful resources

- Free music used in this project from [Pixabay](https://pixabay.com/)

- [Brad Traversy](https://www.youtube.com/watch?v=QTHRWGn_sJw&ab_channel=TraversyMedia): Music player | Vanilla JavaScript

- [StackOverflow](https://stackoverflow.com/questions/31776548/why-cant-javascript-play-audio-files-on-iphone-safari): Why can't JavaScript .play() audio files on iPhone safari?

## 👩🏻‍💻 Author

<a href="https://www.linkedin.com/in/juliana--chagas/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
<a href="https://twitter.com/JulianaCoding" target="_blank"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"></a>

---

##### Made with 💜 by Juliana Chagas
