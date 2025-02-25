let currentAudio = null; // Untuk menyimpan backsound scene
let currentAdditionalAudio = null; // Untuk menyimpan backsound tambahan

// Fungsi untuk memutar musik
function playMusic(src, name, isAdditional = false) {
    if (isAdditional) {
        if (currentAdditionalAudio) {
            currentAdditionalAudio.pause();
            currentAdditionalAudio.currentTime = 0;
        }
        currentAdditionalAudio = new Audio(src);
        currentAdditionalAudio.play();
    } else {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentAudio = new Audio(src);
        currentAudio.play();
    }
    document.getElementById('music-status').textContent = `Play: ${name}`;
}

// Fungsi untuk menghentikan backsound scene
function stopBacksound() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        document.getElementById('music-status').textContent =
            'Backsound Scene Stopped';
    }
}

// Fungsi untuk menghentikan backsound tambahan
function stopAdditional() {
    if (currentAdditionalAudio) {
        currentAdditionalAudio.pause();
        currentAdditionalAudio.currentTime = 0;
        document.getElementById('music-status').textContent =
            'Backsound Tambahan Stopped';
    }
}

// Fungsi untuk menghentikan semua audio
function stopAll() {
    stopBacksound(); // Hentikan backsound scene
    stopAdditional(); // Hentikan backsound tambahan
    document.getElementById('music-status').textContent = 'All Music Stopped';
}

// Event listener untuk tombol musik
document.querySelectorAll('.music-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const musicSrc = button.getAttribute('data-src');
        const musicName = button.getAttribute('data-name');
        const isAdditional = button.getAttribute('data-additional') === 'true';
        playMusic(musicSrc, musicName, isAdditional);
    });
});

// Event listener untuk tombol stop
document.getElementById('stop-backsound-btn').addEventListener('click', stopBacksound);
document.getElementById('stop-additional-btn').addEventListener('click', stopAdditional);
document.getElementById('stop-all-btn').addEventListener('click', stopAll);
