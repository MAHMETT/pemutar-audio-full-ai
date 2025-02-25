let currentAudio = null; // Untuk menyimpan backsound scene
let currentAdditionalAudio = null; // Untuk menyimpan backsound tambahan

// Fungsi untuk memperbarui status musik
function updateMusicStatus(status) {
    document.getElementById('music-status').textContent = status; // Update status musik
}

// Fungsi untuk menghentikan audio yang diputar
function stopAudio(audio, statusText) {
    if (audio) {
        audio.pause(); // Hentikan pemutaran
        audio.currentTime = 0; // Reset waktu pemutaran
        updateMusicStatus(statusText); // Update status
    }
}

// Fungsi untuk memutar musik
function playMusic(src, name, isAdditional = false) {
    if (isAdditional) {
        // Jika ini adalah backsound tambahan
        if (currentAdditionalAudio) {
            currentAdditionalAudio.pause(); // Hentikan backsound tambahan yang sedang diputar
            currentAdditionalAudio.currentTime = 0; // Reset waktu pemutaran
        }
        currentAdditionalAudio = new Audio(src); // Buat objek audio baru
        currentAdditionalAudio.play().catch((error) => {
            console.error('Gagal memutar backsound tambahan:', error);
        });
        updateMusicStatus(`Play: ${name} (Additional)`); // Update status
    } else {
        // Jika ini adalah backsound scene
        if (currentAudio) {
            currentAudio.pause(); // Hentikan backsound scene yang sedang diputar
            currentAudio.currentTime = 0; // Reset waktu pemutaran
        }
        currentAudio = new Audio(src); // Buat objek audio baru
        currentAudio.play().catch((error) => {
            console.error('Gagal memutar backsound scene:', error);
        });
        updateMusicStatus(`Play: ${name}`); // Update status
    }
}

// Fungsi untuk menghentikan backsound scene
function stopBacksound() {
    stopAudio(currentAudio, 'Backsound Scene Stopped');
}

// Fungsi untuk menghentikan backsound tambahan
function stopAdditional() {
    stopAudio(currentAdditionalAudio, 'Backsound Tambahan Stopped');
}

// Fungsi untuk menghentikan semua audio
function stopAll() {
    if (currentAudio) {
        stopAudio(currentAudio, 'All Music Stopped'); // Hentikan backsound scene
    }
    if (currentAdditionalAudio) {
        stopAudio(currentAdditionalAudio, 'All Music Stopped'); // Hentikan backsound tambahan
    }
    if (!currentAudio && !currentAdditionalAudio) {
        console.log('Tidak ada audio yang sedang diputar.');
        updateMusicStatus('No Music Playing'); // Status jika tidak ada musik yang diputar
    }
}

// Event listener untuk tombol musik
document.querySelectorAll('.music-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const musicSrc = button.getAttribute('data-src'); // Ambil path file audio
        const musicName = button.getAttribute('data-name'); // Ambil nama musik
        const isAdditional = button.getAttribute('data-additional') === 'true'; // Cek apakah ini backsound tambahan
        playMusic(musicSrc, musicName, isAdditional); // Putar musik
    });
});

// Event listener untuk tombol stop
document
    .getElementById('stop-backsound-btn')
    .addEventListener('click', stopBacksound);
document
    .getElementById('stop-additional-btn')
    .addEventListener('click', stopAdditional);
document.getElementById('stop-all-btn').addEventListener('click', stopAll);

// Fungsi untuk mengatur navigasi scene
function navigateToScene(sceneId) {
    // Scroll ke scene yang dipilih
    const sceneElement = document.getElementById(sceneId);
    if (sceneElement) {
        sceneElement.scrollIntoView({ behavior: 'smooth' }); // Menggulir ke scene yang dipilih
    } else {
        console.log('Scene tidak ditemukan: ' + sceneId);
    }
}

// Event listener untuk tombol navigasi scene
document.querySelectorAll('.nav-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const sceneId = button.getAttribute('data-scene'); // Ambil ID scene
        navigateToScene(sceneId); // Navigasi ke scene tersebut
    });
});
