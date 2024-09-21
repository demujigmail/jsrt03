// Elemen-elemen di halaman
const mainPage = document.getElementById('main-page');
const settingPage = document.getElementById('setting-page');
const resultElement = document.getElementById('result');
const remainingElement = document.getElementById('remaining');
const randomButton = document.getElementById('random-button');
const resetButton = document.getElementById('reset-button');
const settingButton = document.getElementById('setting-button');
const cancelButton = document.getElementById('cancel-button');
const saveButton = document.getElementById('save-button');
const startNumberInput = document.getElementById('start-number');
const endNumberInput = document.getElementById('end-number');

//
let startNumber = 300;
let endNumber = 397;
let availableNumbers = [];
let isAnimating = false;

// Inisialisasi awal
function initialize() {
    availableNumbers = Array.from({ length: endNumber - startNumber + 1 }, (_, i) => startNumber + i);
    remainingElement.innerText = availableNumbers.length;
}

function randomizeNumber() {
    if (availableNumbers.length > 0 && !isAnimating) {
        isAnimating = true;
        let animationDuration = 2000; // Durasi animasi 2 detik
        let intervalTime = 100; // Waktu setiap perubahan nomor selama animasi
        let animationStartTime = Date.now();
        
        const animationInterval = setInterval(() => {
            // Menampilkan angka acak selama animasi
            const randomDisplayNumber = Math.floor(Math.random() * (endNumber - startNumber + 1)) + startNumber;
            resultElement.innerText = randomDisplayNumber;
            
            // Cek apakah waktu animasi sudah lebih dari 2 detik
            if (Date.now() - animationStartTime >= animationDuration) {
                clearInterval(animationInterval); // Hentikan interval setelah 2 detik
                // Setelah animasi, tampilkan nomor yang sesungguhnya
                const randomIndex = Math.floor(Math.random() * availableNumbers.length);
                const selectedNumber = availableNumbers.splice(randomIndex, 1)[0];
                resultElement.innerText = selectedNumber;
                remainingElement.innerText = availableNumbers.length;
                isAnimating = false;
            }
        }, intervalTime);
    } else if (availableNumbers.length === 0) {
        resultElement.innerText = "Habis";
    }
}

function resetNumbers() {
    initialize();
    resultElement.innerText = "---";
    isAnimating = false;
}

// Navigasi antar halaman
function showMainPage() {
    mainPage.classList.add('active');
    settingPage.classList.remove('active');
}

function showSettingPage() {
    mainPage.classList.remove('active');
    settingPage.classList.add('active');
}

// Event listeners
randomButton.addEventListener('click', randomizeNumber);
resetButton.addEventListener('click', resetNumbers);
settingButton.addEventListener('click', showSettingPage);
cancelButton.addEventListener('click', showMainPage);

saveButton.addEventListener('click', () => {
    startNumber = parseInt(startNumberInput.value);
    endNumber = parseInt(endNumberInput.value);
    initialize();
    showMainPage();
});

// Inisialisasi ketika halaman pertama kali dibuka
initialize();
