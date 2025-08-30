
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playlist = document.getElementById("playlist").getElementsByTagName("li");

let currentSongIndex = 0;
let isPlaying = false;

// 🎵 Load first song
function loadSong(index) {
    let song = playlist[index];
    audio.src = song.getAttribute("data-src");

    // highlight active song
    for (let li of playlist) li.classList.remove("active");
    song.classList.add("active");
}

loadSong(currentSongIndex);

// 🎵 Play / Pause toggle
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        document.body.classList.remove("playing");
    } else {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        document.body.classList.add("playing");
    }
    isPlaying = !isPlaying;
}

// 🎵 Previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
    document.body.classList.add("playing");
}

// 🎵 Next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
    document.body.classList.add("playing");
}

// 🎵 Auto play next when song ends
audio.addEventListener("ended", nextSong);

// 🎵 Playlist click
for (let i = 0; i < playlist.length; i++) {
    playlist[i].addEventListener("click", () => {
        currentSongIndex = i;
        loadSong(currentSongIndex);
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
        document.body.classList.add("playing");
    });
}

// 🎵 Button events
playPauseBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
