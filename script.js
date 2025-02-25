let currentAudio = null; // Untuk menyimpan backsound scene
let currentAdditionalAudio = null; // Untuk menyimpan backsound tambahan

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
    }
    document.getElementById('music-status').textContent = `Play: ${name}`; // Update status
}

// Fungsi untuk menghentikan backsound scene
function stopBacksound() {
    if (currentAudio) {
        currentAudio.pause(); // Hentikan pemutaran
        currentAudio.currentTime = 0; // Reset waktu pemutaran
        document.getElementById('music-status').textContent =
            'Backsound Scene Stopped'; // Update status
    } else {
        console.log('Tidak ada backsound scene yang sedang diputar.');
    }
}

// Fungsi untuk menghentikan backsound tambahan
function stopAdditional() {
    if (currentAdditionalAudio) {
        currentAdditionalAudio.pause(); // Hentikan pemutaran
        currentAdditionalAudio.currentTime = 0; // Reset waktu pemutaran
        document.getElementById('music-status').textContent =
            'Backsound Tambahan Stopped'; // Update status
    } else {
        console.log('Tidak ada backsound tambahan yang sedang diputar.');
    }
}

// Fungsi untuk menghentikan semua audio
function stopAll() {
    if (currentAudio || currentAdditionalAudio) {
        if (currentAudio) {
            currentAudio.pause(); // Hentikan backsound scene
            currentAudio.currentTime = 0; // Reset waktu pemutaran
        }
        if (currentAdditionalAudio) {
            currentAdditionalAudio.pause(); // Hentikan backsound tambahan
            currentAdditionalAudio.currentTime = 0; // Reset waktu pemutaran
        }
        document.getElementById('music-status').textContent =
            'All Music Stopped'; // Update status
    } else {
        console.log('Tidak ada audio yang sedang diputar.');
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
